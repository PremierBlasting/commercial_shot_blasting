import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowLeft, Share2, Clock, User } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";
import { trpc } from "@/lib/trpc";

const SITE_URL = "https://commercialshotblasting.co.uk";

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, text: post?.excerpt, url: window.location.href });
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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
              <Button variant="outline" className="bg-white" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />Share
              </Button>
            </div>

            {/* ── Prose content ── */}
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
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

            {/* CTA */}
            <div className="mt-14 bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] rounded-2xl p-8 md:p-10 text-white text-center shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Need Professional Shot Blasting?
              </h3>
              <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">
                Our expert team covers Birmingham, the West Midlands, and the whole of the UK. Get a free, no-obligation quote today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-gray-100 font-semibold px-8">
                    Get a Free Quote
                  </Button>
                </Link>
                <a href="tel:07970566409">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                    Call 07970 566409
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </article>

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
