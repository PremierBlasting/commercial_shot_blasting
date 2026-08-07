import { Button } from "@/components/ui/button";
import { useMemo, lazy, Suspense } from "react";
import { Calendar, Tag, ArrowLeft, Clock, User } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { Link, useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";
import { trpc } from "@/lib/trpc";

const LeadFormLazy = lazy(() => import("@/components/LeadForm").then(m => ({ default: m.LeadForm })));

const SITE_URL = "https://commercialshotblasting.co.uk";

// Glossary terms to auto-link in blog content (ordered longest-first to avoid partial matches)
const GLOSSARY_TERMS: { term: string; id: string }[] = [
  { term: "BS EN ISO 8501-1", id: "bs-en-iso-8501-1" },
  { term: "DFT (Dry Film Thickness)", id: "dft" },
  { term: "Dry Film Thickness", id: "dft" },
  { term: "Intumescent Paint", id: "intumescent-paint" },
  { term: "intumescent paint", id: "intumescent-paint" },
  { term: "Intumescent paint", id: "intumescent-paint" },
  { term: "Grit Blasting", id: "grit-blasting" },
  { term: "grit blasting", id: "grit-blasting" },
  { term: "Mill Scale", id: "mill-scale" },
  { term: "mill scale", id: "mill-scale" },
  { term: "Surface Profile", id: "surface-profile" },
  { term: "surface profile", id: "surface-profile" },
  { term: "Rust Grade", id: "rust-grade" },
  { term: "rust grade", id: "rust-grade" },
  { term: "Shot Blasting", id: "shot-blasting" },
  { term: "shot blasting", id: "shot-blasting" },
  { term: "Sa 2.5", id: "sa-2-5" },
  { term: "SA 2.5", id: "sa-2-5" },
  { term: "Sa 3", id: "sa-3" },
  { term: "SA 3", id: "sa-3" },
  { term: "SSPC", id: "sspc" },
  { term: "NACE", id: "nace" },
];

/**
 * Inject glossary links into blog HTML content.
 * Only links the FIRST occurrence of each term to avoid over-linking.
 * Skips terms that are already inside an <a> tag.
 */
function injectGlossaryLinks(html: string): string {
  let result = html;
  const linked = new Set<string>(); // track which glossary IDs have been linked

  for (const { term, id } of GLOSSARY_TERMS) {
    if (linked.has(id)) continue; // already linked this term's target
    // Escape special regex chars in the term
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match the term only when NOT already inside an <a ...>...</a>
    // Strategy: split on existing anchor tags, only replace in non-anchor segments
    const anchorSplit = result.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/i);
    let replaced = false;
    const parts = anchorSplit.map((part) => {
      if (replaced) return part;
      if (part.startsWith("<a")) return part; // inside existing anchor — skip
      const regex = new RegExp(`(${escaped})`, "g");
      let firstMatch = false;
      return part.replace(regex, (_match, p1) => {
        if (firstMatch || replaced) return p1;
        firstMatch = true;
        replaced = true;
        return `<a href="/glossary#${id}" class="glossary-link" title="See definition: ${term}">${p1}</a>`;
      });
    });
    result = parts.join("");
    if (replaced) linked.add(id);
  }
  return result;
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function ArticleJsonLd({ post, slug }: { post: { title: string; excerpt: string; author: string; category?: string | null; tags?: string | null; publishedAt: Date | string; updatedAt: Date | string; content: string; featuredImage: string }; slug: string }) {
  const tags: string[] = post.tags ? (typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags) : [];
  const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Commercial Shot Blasting",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Commercial Shot Blasting",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
      },
    },
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post.updatedAt).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    "url": `${SITE_URL}/blog/${slug}`,
    "image": {
      "@type": "ImageObject",
      "url": post.featuredImage,
    },
    "wordCount": wordCount,
    "keywords": tags.join(", "),
    "articleSection": post.category || "Shot Blasting",
    "inLanguage": "en-GB",
    "isPartOf": {
      "@type": "Blog",
      "name": "Commercial Shot Blasting Blog",
      "url": `${SITE_URL}/blog`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug });
  const { data: related } = trpc.blog.getRelated.useQuery(
    { slug, category: post?.category ?? null },
    { enabled: !!post }
  );

  useSEO({
    title: post?.title ? `${post.title} | Commercial Shot Blasting Blog` : "Blog Post | Commercial Shot Blasting",
    description: post?.excerpt || "Expert insights on shot blasting and surface preparation from Commercial Shot Blasting.",
    keywords: (post?.tags ? (typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags).join(", ") : undefined) || "shot blasting, surface preparation, industrial cleaning",
    canonical: slug ? `${SITE_URL}/blog/${slug}` : undefined,
  });

  // Enrich blog content with glossary links (first occurrence of each term only)
  const enrichedContent = useMemo(
    () => (post?.content ? injectGlossaryLinks(post.content) : ""),
    [post?.content]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F6F1]">
        <Header />
        <div className="flex-grow container py-16">
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-80 bg-gray-200 rounded-2xl" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F6F1]">
        <Header />
        <div className="flex-grow container py-16 text-center">
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const tags: string[] = post.tags ? (typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags) : [];
  const readTime = estimateReadTime(post.content);
  const publishDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1]">
      <Header />

      {/* Article JSON-LD injected into <head> via portal-style script tag */}
      <ArticleJsonLd post={post} slug={slug} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${slug}`, isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* ── Hero ── */}
      <div className="relative h-[480px] md:h-[560px] overflow-hidden mt-4">
        <img
          loading="eager"
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-10 md:pb-14">
          <div className="max-w-3xl mx-auto text-white">
            {post.category && (
              <span className="inline-block bg-[#2C5F7F] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{publishDate}</span>
              {post.author && <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>}
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article ── */}
      <article className="flex-grow py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Excerpt / lead */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-300 italic font-light">
              {post.excerpt}
            </p>

            {/* Nav bar */}
            <div className="flex justify-between items-center mb-10">
              <Link href="/blog">
                <Button variant="outline" className="bg-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />Back to Blog
                </Button>
              </Link>
              <ShareButton
                title={post.title}
                url={`/blog/${slug}`}
                description={post.excerpt}
              />
            </div>

            {/* ── Prose content ── */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: enrichedContent }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Tagged</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full shadow-sm">
                      <Tag className="w-3.5 h-3.5 text-[#2C5F7F]" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — native LeadForm */}
            <div className="mt-14">
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400">Loading form…</div>}>
                <LeadFormLazy variant="light" heading="Request a Free Site Survey" subheading="Our expert team covers England &amp; Wales. We'll get back to you within 24 hours." showWhatsApp={true} />
              </Suspense>
            </div>

          </div>
        </div>
      </article>

      {/* ── Book a Site Survey CTA Banner ── */}
      <section className="bg-[#1a3d52] py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to discuss your project?
              </h2>
              <p className="text-white/75 text-base max-w-xl">
                Our team covers England &amp; Wales. Book a free, no-obligation site survey and receive a fixed-price quotation within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="/site-survey"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1a3d52] font-bold px-7 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-base whitespace-nowrap shadow-lg"
              >
                Book a Free Site Survey
              </a>
              <a
                href="tel:07721375756"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-base whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                07721 375756
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Posts ── */}
      {related && related.length > 0 && (
        <section className="bg-white py-14 md:py-18 border-t border-gray-200">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((relPost) => {
                  const relDate = new Date(relPost.publishedAt || relPost.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  });
                  const relReadTime = estimateReadTime(relPost.content);
                  return (
                    <Link key={relPost.id} href={`/blog/${relPost.slug}`}>
                      <article className="group bg-[#F8F6F1] rounded-xl overflow-hidden border border-gray-200 hover:border-[#2C5F7F] hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={relPost.featuredImage}
                            alt={relPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {relPost.category && (
                            <span className="absolute top-3 left-3 bg-[#2C5F7F] text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                              {relPost.category}
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-bold text-[#2C2C2C] text-base leading-snug mb-2 group-hover:text-[#2C5F7F] transition-colors line-clamp-3">
                            {relPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {relPost.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{relDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relReadTime} min</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
