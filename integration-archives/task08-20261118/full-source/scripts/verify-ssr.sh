#!/usr/bin/env bash
# Adapted from /home/ubuntu/skills/webdev-ssr-conversion/scripts/verify-ssr.sh.
# Task08: actual HTTP only; current Task07 head + inert public boot, no JS.
# Does NOT start a server, seed a DB, follow redirects, or execute measurement.
# Parent must first confirm the actual fixture/public server and route-gate safety.
# Usage: PARENT_SERVER_READY=1 BASE=http://localhost:4101 bash scripts/verify-ssr.sh
# Public use additionally requires TASK08_PUBLIC_HTTP_APPROVED=1.
# This is raw-HTML acceptance only, not browser/geometry/worker/hydration evidence.
set -euo pipefail
: "${PARENT_SERVER_READY:?Set PARENT_SERVER_READY=1 only after parent confirms actual server readiness}"
[ "$PARENT_SERVER_READY" = "1" ] || { echo "Parent readiness not granted" >&2; exit 2; }
BASE="${BASE:-http://localhost:4101}"
BASE="${BASE%/}"
export BASE
python3 - <<'PY'
import json, os, re, subprocess, sys, tempfile
from html.parser import HTMLParser
from urllib.parse import urlsplit

base = os.environ['BASE']
u = urlsplit(base)
if u.scheme not in ('http', 'https') or not u.hostname or u.username or u.password or u.query or u.fragment or u.path not in ('', '/'):
    raise SystemExit('BASE must be an explicit origin without credentials, query or path')
if u.hostname not in ('localhost', '127.0.0.1', '::1') and os.environ.get('TASK08_PUBLIC_HTTP_APPROVED') != '1':
    raise SystemExit('Nonlocal origin requires TASK08_PUBLIC_HTTP_APPROVED=1 from parent')
release = 'csb-task08-20261118-v3'
origin = 'https://commercialshotblasting.co.uk'
paths = {
 '/services/structural-steel-frames': ('P0066', 'Structural Steel Frames', 'What Happens If Steel Isn\'t Prepared to Sa 2.5?', ['gallery.list', 'testimonials.list']),
 '/counties/hampshire': ('P0116', 'Hampshire', 'Request A Site Visit', []),
 '/blog/factory-warehouse-cladding-restoration': ('P0002', 'Factory', 'UK Commercial Shot Blasting Contractor', ['blog.getBySlug', 'blog.getRelated']),
 '/': ('P0001', 'Commercial Shot Blasting', 'View Our Work', ['gallery.list', 'testimonials.list', 'blog.list']),
}
# Needles above are real existing visible component copy INSIDE #root,
# never record metadata/excerpt or serialized state. No copied crawler bodies.
searches = ['', '?', '?adwords=ppc&utm_campaign=fixture&gclid=TASK08_INERT_CLICK&ref=a%2Bb%2Fc%3Dd%20e&plus=a+b&dup=one&dup=two&empty=&bare?second=%ZZ']
uas = ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)']
if os.environ.get('FULL_UA_MATRIX') == '1': uas += ['Twitterbot/1.0', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)']

class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.root_depth=None; self.root_text=[]; self.root_tags=[]; self.head=False
        self.titles=[]; self.current_title=None; self.meta={}; self.links=[]; self.boot=[]; self.metadata_boot=[]; self.active_script=None; self.script_chunks=[]
        self.root_count=0; self.boot_inside=False; self.legacy=[]; self.fallback=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.stack.append(tag)
        if tag == 'head': self.head=True
        if a.get('id') == 'root': self.root_count+=1; self.root_depth=len(self.stack)
        if self.root_depth is not None: self.root_tags.append((tag,a))
        if a.get('id') in ('ssr-content','ssr-service-content','ssr-county-content','homepage-ssr-content','county-ssr-content','service-ssr-content'): self.legacy.append(a.get('id'))
        if self.head and tag == 'title': self.current_title=[]
        if self.head and tag == 'meta': self.meta.setdefault(a.get('name', a.get('property','')).lower(),[]).append(a.get('content',''))
        if self.head and tag == 'link': self.links.append(a)
        if tag == 'script' and a.get('id') in ('rendering-pilot-boot','route-metadata-boot'):
            if a.get('id') == 'rendering-pilot-boot' and self.root_depth is not None: self.boot_inside=True
            self.active_script=(a.get('id'),a); self.script_chunks=[]
        if tag in ('meta','link','img','input','source','br','hr','area','base','embed','param','track','wbr'): self.stack.pop()
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag,attrs); self.handle_endtag(tag)
    def handle_endtag(self, tag):
        if tag == 'script' and self.active_script:
            ident,a=self.active_script; (self.boot if ident=='rendering-pilot-boot' else self.metadata_boot).append((a,''.join(self.script_chunks))); self.active_script=None
        if tag == 'title' and self.current_title is not None: self.titles.append(''.join(self.current_title)); self.current_title=None
        if tag in self.stack:
            i=len(self.stack)-1-self.stack[::-1].index(tag)
            if self.root_depth is not None and i+1 <= self.root_depth: self.root_depth=None
            self.stack=self.stack[:i]
        if tag == 'head': self.head=False
    def handle_data(self, data):
        if self.active_script: self.script_chunks.append(data)
        if self.current_title is not None: self.current_title.append(data)
        if self.root_depth is not None and not any(t in ('script','style','template','noscript') for t in self.stack): self.root_text.append(data)
    def handle_comment(self,data):
        if data in ('$!', '$?'): self.fallback=True

passes=0; failures=[]; pending=[]
def check(ok, why):
    if not ok: raise AssertionError(why)
def fetch(url, ua):
    # --path-as-is retains the raw query/path; never -L (would hide status owners).
    with tempfile.TemporaryDirectory(prefix='task08-http-') as tmp:
        hp=tmp+'/headers'; bp=tmp+'/body'
        p=subprocess.run(['curl','--silent','--show-error','--compressed','--path-as-is','--max-time','15','--connect-timeout','5','-D',hp,'-o',bp,'-w','%{http_code}','-A',ua,base+url],capture_output=True,text=True)
        check(p.returncode==0, 'curl transport: '+p.stderr[:180])
        text=open(bp,encoding='utf-8').read(); headers={}
        for line in open(hp,encoding='latin1'):
            if ':' in line:
                k,v=line.split(':',1); headers[k.lower()]=v.strip()
        doc=Document(); doc.feed(text)
        return int(p.stdout),headers,text,doc

def head(doc,path,title,noindex=False):
    check(len(doc.titles)==1 and title in doc.titles[0], 'single correct Task07 title')
    for key in ['description','og:title','og:description','og:url','twitter:card','robots']:
        check(len(doc.meta.get(key,[]))==1 and doc.meta[key][0], 'single '+key)
    check(title in doc.meta['og:title'][0], 'og:title value')
    robots=doc.meta['robots'][0].lower()
    check(('noindex' in robots)==noindex,'Task07 robots policy')
    canonical=[a.get('href') for a in doc.links if 'canonical' in a.get('rel','').lower().split()]
    check(canonical==[origin+path], 'exact canonical without incoming query')
    check(doc.meta['og:url']==[origin+path], 'exact og:url')
    check(len(doc.metadata_boot)==1,'retained separate Task07 metadata boot')
    check(doc.metadata_boot[0][0].get('type')=='application/json','inert Task07 metadata boot')
    json.loads(doc.metadata_boot[0][1])

def pilot(url,ua,path):
    ident,title,needle,keys=paths[path]
    status,h,text,d=fetch(url,ua)
    check(status==200,'status='+str(status)); check(h.get('x-rendering-pilot')=='rendered','explicit rendered response (rollback is failure)')
    cache=h.get('cache-control','').lower()
    check(all(x in cache for x in ('no-cache','no-store','must-revalidate')),'pilot no shared cache')
    check(d.root_count==1,'one real root'); check(not d.boot_inside,'boot outside root')
    check(not d.legacy,'no separate clipped copied pilot body '+repr(d.legacy))
    check(not d.fallback,'unresolved/errored Suspense boundary')
    body=' '.join(' '.join(d.root_text).split())
    check(needle in body, 'real root-body copy: '+needle)
    check(any(tag=='h1' for tag,_ in d.root_tags),'primary h1 in root')
    check(any(tag=='form' for tag,_ in d.root_tags),'native lead form in root')
    check(any(tag=='a' and a.get('href')=='/services' for tag,a in d.root_tags),'maintained service link inside root')
    head(d,path,title)
    check(len(d.boot)==1,'single rendering-pilot-boot')
    attrs,raw=d.boot[0]; check(attrs.get('type')=='application/json','inert rendering payload')
    check(not any(c in raw for c in '<>&\u2028\u2029'),'escaped delimiter/separator payload')
    b=json.loads(raw)
    check(set(b)=={'schemaVersion','release','pathname','pilotId','success','renderValues','state'},'strict boot envelope')
    check((b['schemaVersion'],b['release'],b['pathname'],b['pilotId'],b['success'])==(1,release,path,ident,True),'route/release marker')
    check(set(b['renderValues'])=={'year'} and isinstance(b['renderValues']['year'],int),'render values')
    state=b['state']['json']; check(set(state)=={'queries','mutations'} and state['mutations']==[],'public cache, no mutations')
    seen=[]
    for q in state['queries']:
        check(q['state']['status']=='success' and q['state']['error'] is None,'successful public query only')
        k=q['queryKey']; seen.append('.'.join(k[0])); check(k[1]['type']=='query','query key type')
        if seen[-1] in ('gallery.list','testimonials.list','blog.list'): check(k[1]=={'type':'query'},'undefined input omits input')
    check(sorted(seen)==sorted(keys),'exact route public keys')
    check('TASK08_INERT_CLICK' not in raw and 'utm_campaign' not in raw,'incoming attribution not serialized')
    for a in d.links:
        check('server-ssr' not in a.get('href','') and 'entry-server.js' not in a.get('href',''),'no Node renderer chunk browser preload')
    check(any(a.get('rel')=='stylesheet' for a in d.links),'render-blocking stylesheet retained')

def guard(url,status=200,noindex=False,title=None,path=None,media=False):
    got,h,text,d=fetch(url,uas[0]); check(got==status,'guard status='+str(got)); check(not d.boot,'guard must not acquire pilot boot')
    check(h.get('x-rendering-pilot')!='rendered','guard must not be rendered pilot')
    if not media and status==404: check(any('noindex' in v.lower() for v in d.meta.get('robots',[])),'real 404+noindex')
    if title: head(d,path,title,noindex)
    if status==503: check(h.get('retry-after')=='60' and 'no-store' in h.get('cache-control',''),'upstream outage 503 + Retry-After/no-store')

def run(label,fn):
    global passes
    try: fn(); passes+=1; print('[PASS]',label)
    except Exception as e: failures.append((label,str(e))); print('[FAIL]',label,str(e))

print('== Task08 actual raw HTTP verification against',base,'==')
for path in paths:
    for search in searches:
        for i,ua in enumerate(uas): run(path+search+' UA'+str(i),lambda p=path,s=search,a=ua:pilot(p+s,a,p))
for p,title,noindex in [('/services/intumescent-painting','Intumescent',False),('/counties/kent','Kent',False),('/privacy-policy','Privacy',True),('/service-areas/abbots-bromley','Abbots Bromley',True)]:
    run('nonpilot '+p,lambda p=p,t=title,n=noindex:guard(p,status=200,noindex=n,title=t,path=p))
for p in ['/index.html','/index.html?dup=one&dup=two','/404','/definitely-not-a-route','/blog/task08-this-slug-does-not-exist','/services/not-a-real-service','/counties/not-a-real-county']:
    run('Task04 404 '+p,lambda p=p:guard(p,404))
# Bare /assets intentionally uses existing static-directory 301 to /assets/;
# /manus-storage/* intentionally uses the protected CDN 307 handler. Neither is
# a page/retired-resource 404 guard and routing is not changed for this harness.
for p in ['/assets/','/assets/task08-retired-chunk.js','/task08-retired-resource.webp']:
    run('retired resource '+p,lambda p=p:guard(p,404,media=True))
# Draft/outage routes require a parent's controlled authoritative lookup harness.
# Never invent a published primary record / live DB outage to manufacture these.
for env,status in [('TASK08_DRAFT_GUARD_PATH',404),('TASK08_OUTAGE_GUARD_PATH',503)]:
    p=os.environ.get(env)
    if p: run(env+' '+p,lambda p=p,s=status:guard(p,s))
    else:
        pending.append(env)
        print('[PENDING]',env,'requires controlled parent route-gate fixture; not counted as passed')
print('== Result PASS=%d FAIL=%d PENDING=%d; raw HTTP only, real DOM hydration is separate ==' % (passes,len(failures),len(pending)))
if not passes or failures: sys.exit(1)
if pending: sys.exit(2)
PY
