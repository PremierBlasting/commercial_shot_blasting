// schema-bootstrap.js — Synchronous JSON-LD schema injection for /service-areas/:slug pages
// Runs before React hydration so schemas are present for Google's Rich Results Test
(function(){
  'use strict';
  var p = window.location.pathname.replace(/\/+$/, '');
  var m = p.match(/^\/service-areas\/([a-z0-9][a-z0-9-]*)$/);
  if (!m) return;
  var slug = m[1];
  var NAMES = {"luton":"Luton","bedford":"Bedford","dunstable":"Dunstable","leighton-buzzard":"Leighton Buzzard","ampthill":"Ampthill","arlesey":"Arlesey","aspley-guise":"Aspley Guise","barton-le-clay":"Barton-le-Clay","biggleswade":"Biggleswade","blunham":"Blunham","bromham":"Bromham","caddington":"Caddington","carlton":"Carlton","clophill":"Clophill","cranfield":"Cranfield","eaton-bray":"Eaton Bray","flitwick":"Flitwick","harlington":"Harlington","henlow":"Henlow","houghton-regis":"Houghton Regis","kempston":"Kempston","lidlington":"Lidlington","marston-moretaine":"Marston Moretaine","maulden":"Maulden","potton":"Potton","sandy":"Sandy","shefford":"Shefford","silsoe":"Silsoe","southill":"Southill","stotfold":"Stotfold","toddington":"Toddington","woburn":"Woburn","wootton":"Wootton","cambridge":"Cambridge","peterborough":"Peterborough","ely":"Ely","huntingdon":"Huntingdon","bar-hill":"Bar Hill","burwell":"Burwell","chatteris":"Chatteris","cottenham":"Cottenham","doddington":"Doddington","fulbourn":"Fulbourn","gamlingay":"Gamlingay","girton":"Girton","godmanchester":"Godmanchester","histon":"Histon","impington":"Impington","linton":"Linton","little-paxton":"Little Paxton","littleport":"Littleport","march":"March","melbourn":"Melbourn","orwell":"Orwell","ramsey":"Ramsey","sawston":"Sawston","sawtry":"Sawtry","soham":"Soham","st-ives":"St Ives","st-neots":"St Neots","swavesey":"Swavesey","waterbeach":"Waterbeach","whittlesey":"Whittlesey","willingham":"Willingham","wisbech":"Wisbech","yaxley":"Yaxley","st-albans":"St Albans","watford":"Watford","stevenage":"Stevenage","hemel-hempstead":"Hemel Hempstead","abbots-langley":"Abbots Langley","baldock":"Baldock","berkhamsted":"Berkhamsted","bishops-stortford":"Bishops Stortford","borehamwood":"Borehamwood","bovingdon":"Bovingdon","broxbourne":"Broxbourne","buntingford":"Buntingford","bushey":"Bushey","cheshunt":"Cheshunt","chorleywood":"Chorleywood","harpenden":"Harpenden","hatfield":"Hatfield","hertford":"Hertford","hitchin":"Hitchin","hoddesdon":"Hoddesdon","kings-langley":"Kings Langley","knebworth":"Knebworth","letchworth":"Letchworth","potters-bar":"Potters Bar","radlett":"Radlett","rickmansworth":"Rickmansworth","royston":"Royston","sawbridgeworth":"Sawbridgeworth","tring":"Tring","ware":"Ware","welwyn":"Welwyn","welwyn-garden-city":"Welwyn Garden City","norwich":"Norwich","kings-lynn":"King's Lynn","great-yarmouth":"Great Yarmouth","thetford":"Thetford","acle":"Acle","attleborough":"Attleborough","aylsham":"Aylsham","brundall":"Brundall","caister-on-sea":"Caister-on-Sea","costessey":"Costessey","cromer":"Cromer","dereham":"Dereham","diss":"Diss","downham-market":"Downham Market","fakenham":"Fakenham","gorleston":"Gorleston","harleston":"Harleston","hethersett":"Hethersett","holt":"Holt","hunstanton":"Hunstanton","long-stratton":"Long Stratton","loddon":"Loddon","north-walsham":"North Walsham","reepham":"Reepham","sheringham":"Sheringham","sprowston":"Sprowston","stalham":"Stalham","swaffham":"Swaffham","taverham":"Taverham","watton":"Watton","wells-next-the-sea":"Wells-next-the-Sea","wymondham":"Wymondham","ipswich":"Ipswich","bury-st-edmunds":"Bury St Edmunds","lowestoft":"Lowestoft","felixstowe":"Felixstowe","aldeburgh":"Aldeburgh","beccles":"Beccles","brandon":"Brandon","bungay":"Bungay","clare":"Clare","debenham":"Debenham","eye":"Eye","framlingham":"Framlingham","hadleigh":"Hadleigh","halesworth":"Halesworth","haverhill":"Haverhill","kesgrave":"Kesgrave","leiston":"Leiston","mildenhall":"Mildenhall","needham-market":"Needham Market","newmarket":"Newmarket","saxmundham":"Saxmundham","southwold":"Southwold","stowmarket":"Stowmarket","sudbury":"Sudbury","wickham-market":"Wickham Market","woodbridge":"Woodbridge","derby":"Derby","chesterfield":"Chesterfield","ilkeston":"Ilkeston","buxton":"Buxton","alfreton":"Alfreton","ashbourne":"Ashbourne","bakewell":"Bakewell","belper":"Belper","bolsover":"Bolsover","chapel-en-le-frith":"Chapel-en-le-Frith","clay-cross":"Clay Cross","glossop":"Glossop","hathersage":"Hathersage","heanor":"Heanor","long-eaton":"Long Eaton","matlock":"Matlock","new-mills":"New Mills","ripley":"Ripley","shirebrook":"Shirebrook","staveley":"Staveley","swadlincote":"Swadlincote","whaley-bridge":"Whaley Bridge","wirksworth":"Wirksworth","leicester":"Leicester","loughborough":"Loughborough","hinckley":"Hinckley","market-harborough":"Market Harborough","anstey":"Anstey","ashby-de-la-zouch":"Ashby-de-la-Zouch","barrow-upon-soar":"Barrow upon Soar","blaby":"Blaby","braunstone":"Braunstone","burbage":"Burbage","castle-donington":"Castle Donington","countesthorpe":"Countesthorpe","earl-shilton":"Earl Shilton","enderby":"Enderby","groby":"Groby","ibstock":"Ibstock","kegworth":"Kegworth","kibworth":"Kibworth","lutterworth":"Lutterworth","market-bosworth":"Market Bosworth","measham":"Measham","melton-mowbray":"Melton Mowbray","mountsorrel":"Mountsorrel","narborough":"Narborough","oadby":"Oadby","quorn":"Quorn","shepshed":"Shepshed","sileby":"Sileby","syston":"Syston","wigston":"Wigston","lincoln":"Lincoln","grantham":"Grantham","boston":"Boston","spalding":"Spalding","alford":"Alford","bourne":"Bourne","brigg":"Brigg","caistor":"Caistor","cleethorpes":"Cleethorpes","crowland":"Crowland","gainsborough":"Gainsborough","grimsby":"Grimsby","holbeach":"Holbeach","horncastle":"Horncastle","immingham":"Immingham","louth":"Louth","mablethorpe":"Mablethorpe","market-deeping":"Market Deeping","market-rasen":"Market Rasen","skegness":"Skegness","sleaford":"Sleaford","stamford":"Stamford","sutton-bridge":"Sutton Bridge","wainfleet":"Wainfleet","woodhall-spa":"Woodhall Spa","northampton":"Northampton","kettering":"Kettering","wellingborough":"Wellingborough","corby":"Corby","brackley":"Brackley","brixworth":"Brixworth","burton-latimer":"Burton Latimer","daventry":"Daventry","desborough":"Desborough","duston":"Duston","earls-barton":"Earls Barton","higham-ferrers":"Higham Ferrers","irthlingborough":"Irthlingborough","long-buckby":"Long Buckby","oundle":"Oundle","raunds":"Raunds","rothwell":"Rothwell","rushden":"Rushden","thrapston":"Thrapston","towcester":"Towcester","walgrave":"Walgrave","wollaston":"Wollaston","nottingham":"Nottingham","mansfield":"Mansfield","worksop":"Worksop","newark":"Newark","arnold":"Arnold","beeston":"Beeston","bingham":"Bingham","bulwell":"Bulwell","eastwood":"Eastwood","hucknall":"Hucknall","kimberley":"Kimberley","newark-on-trent":"Newark-on-Trent","ollerton":"Ollerton","retford":"Retford","ruddington":"Ruddington","southwell":"Southwell","stapleford":"Stapleford","sutton-in-ashfield":"Sutton-in-Ashfield","west-bridgford":"West Bridgford","wollaton":"Wollaton","hereford":"Hereford","leominster":"Leominster","ross-on-wye":"Ross-on-Wye","ledbury":"Ledbury","bromyard":"Bromyard","kington":"Kington","weobley":"Weobley","wigmore":"Wigmore","shrewsbury":"Shrewsbury","telford":"Telford","oswestry":"Oswestry","bridgnorth":"Bridgnorth","albrighton":"Albrighton","bishops-castle":"Bishops Castle","broseley":"Broseley","church-stretton":"Church Stretton","cleobury-mortimer":"Cleobury Mortimer","craven-arms":"Craven Arms","dawley":"Dawley","ellesmere":"Ellesmere","ludlow":"Ludlow","madeley":"Madeley","market-drayton":"Market Drayton","much-wenlock":"Much Wenlock","newport":"Newport","oakengates":"Oakengates","wellington":"Wellington","wem":"Wem","whitchurch":"Whitchurch","stoke-on-trent":"Stoke-on-Trent","stafford":"Stafford","tamworth":"Tamworth","newcastle-under-lyme":"Newcastle-under-Lyme","abbots-bromley":"Abbots Bromley","biddulph":"Biddulph","brewood":"Brewood","burntwood":"Burntwood","cheadle":"Cheadle","eccleshall":"Eccleshall","fazeley":"Fazeley","hednesford":"Hednesford","kidsgrove":"Kidsgrove","kinver":"Kinver","leek":"Leek","penkridge":"Penkridge","rugeley":"Rugeley","stone":"Stone","tutbury":"Tutbury","uttoxeter":"Uttoxeter","wombourne":"Wombourne","leamington-spa":"Leamington Spa","rugby":"Rugby","warwick":"Warwick","nuneaton":"Nuneaton","alcester":"Alcester","atherstone":"Atherstone","bedworth":"Bedworth","bulkington":"Bulkington","coleshill":"Coleshill","henley-in-arden":"Henley-in-Arden","kenilworth":"Kenilworth","polesworth":"Polesworth","shipston-on-stour":"Shipston-on-Stour","southam":"Southam","studley":"Studley","wellesbourne":"Wellesbourne","whitnash":"Whitnash","birmingham":"Birmingham","wolverhampton":"Wolverhampton","coventry":"Coventry","solihull":"Solihull","aldridge":"Aldridge","bilston":"Bilston","bloxwich":"Bloxwich","brierley-hill":"Brierley Hill","brownhills":"Brownhills","coseley":"Coseley","darlaston":"Darlaston","dorridge":"Dorridge","erdington":"Erdington","halesowen":"Halesowen","kingswinford":"Kingswinford","knowle":"Knowle","meriden":"Meriden","oldbury":"Oldbury","rowley-regis":"Rowley Regis","sedgley":"Sedgley","smethwick":"Smethwick","stourbridge":"Stourbridge","tipton":"Tipton","wednesbury":"Wednesbury","west-bromwich":"West Bromwich","willenhall":"Willenhall","worcester":"Worcester","kidderminster":"Kidderminster","redditch":"Redditch","bromsgrove":"Bromsgrove","alvechurch":"Alvechurch","bewdley":"Bewdley","broadway":"Broadway","droitwich-spa":"Droitwich Spa","evesham":"Evesham","great-malvern":"Great Malvern","hagley":"Hagley","malvern":"Malvern","pershore":"Pershore","stourport-on-severn":"Stourport-on-Severn","tenbury-wells":"Tenbury Wells","upton-upon-severn":"Upton-upon-Severn","sheffield":"Sheffield","rotherham":"Rotherham","doncaster":"Doncaster","barnsley":"Barnsley","anston":"Anston","askern":"Askern","aughton":"Aughton","bawtry":"Bawtry","bentley":"Bentley","chapeltown":"Chapeltown","conisbrough":"Conisbrough","dinnington":"Dinnington","dodworth":"Dodworth","edlington":"Edlington","goldthorpe":"Goldthorpe","hoyland":"Hoyland","maltby":"Maltby","mexborough":"Mexborough","penistone":"Penistone","rawmarsh":"Rawmarsh","rossington":"Rossington","stocksbridge":"Stocksbridge","swinton":"Swinton","thorne":"Thorne","tickhill":"Tickhill","wath-upon-dearne":"Wath-upon-Dearne","wombwell":"Wombwell","leeds":"Leeds","bradford":"Bradford","wakefield":"Wakefield","huddersfield":"Huddersfield","baildon":"Baildon","batley":"Batley","bingley":"Bingley","brighouse":"Brighouse","castleford":"Castleford","cleckheaton":"Cleckheaton","dewsbury":"Dewsbury","elland":"Elland","garforth":"Garforth","guiseley":"Guiseley","halifax":"Halifax","hebden-bridge":"Hebden Bridge","heckmondwike":"Heckmondwike","holmfirth":"Holmfirth","horsforth":"Horsforth","ilkley":"Ilkley","keighley":"Keighley","knottingley":"Knottingley","mirfield":"Mirfield","morley":"Morley","normanton":"Normanton","ossett":"Ossett","otley":"Otley","pontefract":"Pontefract","pudsey":"Pudsey","shipley":"Shipley","sowerby-bridge":"Sowerby Bridge","todmorden":"Todmorden","wetherby":"Wetherby","yeadon":"Yeadon","chester":"Chester","crewe":"Crewe","warrington":"Warrington","macclesfield":"Macclesfield","alsager":"Alsager","bollington":"Bollington","congleton":"Congleton","ellesmere-port":"Ellesmere Port","frodsham":"Frodsham","holmes-chapel":"Holmes Chapel","knutsford":"Knutsford","middlewich":"Middlewich","nantwich":"Nantwich","neston":"Neston","northwich":"Northwich","poynton":"Poynton","runcorn":"Runcorn","sandbach":"Sandbach","tarporley":"Tarporley","widnes":"Widnes","wilmslow":"Wilmslow","winsford":"Winsford","gloucester":"Gloucester","cheltenham":"Cheltenham","stroud":"Stroud","cirencester":"Cirencester","bishops-cleeve":"Bishops Cleeve","bourton-on-the-water":"Bourton-on-the-Water","chipping-campden":"Chipping Campden","cinderford":"Cinderford","coleford":"Coleford","dursley":"Dursley","fairford":"Fairford","lechlade":"Lechlade","lydney":"Lydney","mitcheldean":"Mitcheldean","moreton-in-marsh":"Moreton-in-Marsh","nailsworth":"Nailsworth","newent":"Newent","painswick":"Painswick","stow-on-the-wold":"Stow-on-the-Wold","stonehouse":"Stonehouse","tetbury":"Tetbury","tewkesbury":"Tewkesbury","winchcombe":"Winchcombe","barnstaple":"Barnstaple","ilfracombe":"Ilfracombe","bideford":"Bideford","south-molton":"South Molton","appledore":"Appledore","braunton":"Braunton","combe-martin":"Combe Martin","croyde":"Croyde","great-torrington":"Great Torrington","instow":"Instow","lynton":"Lynton","lynmouth":"Lynmouth","westward-ho":"Westward Ho!","woolacombe":"Woolacombe","taunton":"Taunton","weston-super-mare":"Weston-super-Mare","yeovil":"Yeovil","bridgwater":"Bridgwater","axbridge":"Axbridge","bruton":"Bruton","burnham-on-sea":"Burnham-on-Sea","castle-cary":"Castle Cary","chard":"Chard","cheddar":"Cheddar","clevedon":"Clevedon","crewkerne":"Crewkerne","frome":"Frome","glastonbury":"Glastonbury","highbridge":"Highbridge","ilminster":"Ilminster","keynsham":"Keynsham","langport":"Langport","martock":"Martock","midsomer-norton":"Midsomer Norton","minehead":"Minehead","nailsea":"Nailsea","portishead":"Portishead","shepton-mallet":"Shepton Mallet","south-petherton":"South Petherton","street":"Street","wells":"Wells","wincanton":"Wincanton","swindon":"Swindon","salisbury":"Salisbury","chippenham":"Chippenham","trowbridge":"Trowbridge","amesbury":"Amesbury","bradford-on-avon":"Bradford-on-Avon","calne":"Calne","corsham":"Corsham","cricklade":"Cricklade","devizes":"Devizes","downton":"Downton","highworth":"Highworth","ludgershall":"Ludgershall","malmesbury":"Malmesbury","marlborough":"Marlborough","melksham":"Melksham","mere":"Mere","pewsey":"Pewsey","royal-wootton-bassett":"Royal Wootton Bassett","tidworth":"Tidworth","tisbury":"Tisbury","warminster":"Warminster","westbury":"Westbury","wilton":"Wilton","milton-keynes":"Milton Keynes","aylesbury":"Aylesbury","high-wycombe":"High Wycombe","buckingham":"Buckingham","amersham":"Amersham","beaconsfield":"Beaconsfield","bourne-end":"Bourne End","chalfont-st-giles":"Chalfont St Giles","chalfont-st-peter":"Chalfont St Peter","chesham":"Chesham","gerrards-cross":"Gerrards Cross","great-missenden":"Great Missenden","haddenham":"Haddenham","marlow":"Marlow","newport-pagnell":"Newport Pagnell","olney":"Olney","princes-risborough":"Princes Risborough","stony-stratford":"Stony Stratford","wendover":"Wendover","winslow":"Winslow","wolverton":"Wolverton","cardiff":"Cardiff","wrexham":"Wrexham","merthyr-tydfil":"Merthyr Tydfil","aberdare":"Aberdare","abergavenny":"Abergavenny","bargoed":"Bargoed","barry":"Barry","blackwood":"Blackwood","bridgend":"Bridgend","caerphilly":"Caerphilly","caldicot":"Caldicot","chepstow":"Chepstow","cwmbran":"Cwmbran","ebbw-vale":"Ebbw Vale","maesteg":"Maesteg","monmouth":"Monmouth","mountain-ash":"Mountain Ash","neath":"Neath","penarth":"Penarth","pontyclun":"Pontyclun","pontypool":"Pontypool","pontypridd":"Pontypridd","port-talbot":"Port Talbot","porth":"Porth","risca":"Risca","tredegar":"Tredegar","usk":"Usk","banbury":"Banbury","basildon":"Basildon","bath":"Bath","birkenhead":"Birkenhead","bolton":"Bolton","bristol":"Bristol","burton-upon-trent":"Burton upon Trent","cannock-chase":"Cannock Chase","cannock":"Cannock","chelmsford":"Chelmsford","coalville":"Coalville","colchester":"Colchester","dronfield":"Dronfield","dudley":"Dudley","guildford":"Guildford","kingswood":"Kingswood","lichfield":"Lichfield","liverpool":"Liverpool","manchester":"Manchester","oldham":"Oldham","oxford":"Oxford","portsmouth":"Portsmouth","reading":"Reading","rochdale":"Rochdale","salford":"Salford","scunthorpe":"Scunthorpe","slough":"Slough","southend-on-sea":"Southend-on-Sea","stockport":"Stockport","stoke":"Stoke-on-Trent","stratford-upon-avon":"Stratford-upon-Avon","sutton-coldfield":"Sutton Coldfield","walsall":"Walsall"};
  var n = NAMES[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-([a-z])/g, function(_, c){ return ' ' + c.toUpperCase(); }));
  var S = 'https://commercialshotblasting.co.uk';
  var url = S + '/service-areas/' + slug;

  function inject(obj) {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify(obj);
    document.head.appendChild(el);
  }

  // 1. FAQPage
  inject({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide shot blasting in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have dedicated mobile shot blasting teams covering " + n + " and the surrounding area. We can be on-site within days of your enquiry. Call 07970 566409 for a free quote."
        }
      },
      {
        "@type": "Question",
        "name": "How much does shot blasting cost in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Costs depend on the project size, surface type, and accessibility. We provide free, no-obligation quotes for all " + n + " projects. Call 07970 566409 for a quick estimate. Most projects range from \u00a3500 to \u00a35,000 depending on scope."
        }
      },
      {
        "@type": "Question",
        "name": "What services do you offer in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer the full range of shot blasting services in " + n + " including structural steel, containers, cladding, fire escapes, floor preparation, pipework, and more. All services are mobile \u2014 we come to your site."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you start a project in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically provide quotes within 24 hours and can be on-site in " + n + " within 2\u20135 working days depending on project size and our current schedule. Emergency projects can be accommodated."
        }
      },
      {
        "@type": "Question",
        "name": "What surface finish do you achieve in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically achieve SA2.5 (near-white metal) finish which is the industry standard for structural steel preparation before protective coating application. We can also provide SA3 (white metal) finish if required."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work on weekends in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we can work weekends and evenings in " + n + " to minimise disruption to your operations. Weekend work is subject to availability and may incur a small premium."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you serve in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve manufacturing, construction, automotive, aerospace, marine, food processing, pharmaceutical, and many other industries in " + n + ". Our mobile teams handle both commercial and industrial projects."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide containment and cleanup in " + n + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our " + n + " projects include full containment to protect surrounding areas and thorough cleanup after completion. We leave your site clean and ready for the next stage of work."
        }
      }
    ]
  });

  // 2. LocalBusiness
  inject({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url + "/#localbusiness",
    "name": "Commercial Shot Blasting \u2014 " + n,
    "url": url,
    "telephone": "+447970566409",
    "email": "info@commercialshotblasting.co.uk",
    "description": "Professional mobile shot blasting services in " + n + " and surrounding areas. Specialists in structural steel, containers, cladding, and floor preparation.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": n,
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": n
    },
    "priceRange": "\u00a3\u00a3",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/commercialshotblasting",
      "https://www.linkedin.com/company/commercial-shot-blasting"
    ]
  });

  // 3. BreadcrumbList
  inject({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": S
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Areas",
        "item": S + "/service-areas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Shot Blasting in " + n,
        "item": url
      }
    ]
  });

})();
