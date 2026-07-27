import { useState, useMemo, lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Tag, Clock } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { trpc } from "@/lib/trpc";

const LeadFormLazy = lazy(() => import("@/components/LeadForm").then(m => ({ default: m.LeadForm })));

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function Blog() {
  useSEO({
    title: "Shot Blasting Blog | Industry News & Tips",
    description: "Expert insights on shot blasting, surface preparation, and industrial cleaning. Latest news, techniques, and best practices from our team.",
    keywords: "shot blasting blog, surface preparation tips, industrial cleaning, blasting techniques, industry news",
    canonical: "https://commercialshotblasting.co.uk/blog",
  });

  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Derive unique categories from posts
  const categories = useMemo(() => {
    if (!posts) return ["All"];
    const cats = Array.from(
      new Set(posts.map((p) => p.category).filter((c): c is string => !!c))
    ).sort();
    return ["All", ...cats];
  }, [posts]);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="container">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            CSB Blog
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Expert insights, techniques, and industry knowledge from our shot blasting specialists
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 flex-grow">
        <div className="container">
          {/* ── Category Filter Pills ── */}
          {!isLoading && categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5F7F] ${
                    activeCategory === cat
                      ? "bg-[#2C5F7F] text-white border-[#2C5F7F] shadow-md"
                      : "bg-white text-[#2C5F7F] border-[#2C5F7F]/40 hover:bg-[#2C5F7F]/10"
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                  {cat !== "All" && posts && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({posts.filter((p) => p.category === cat).length})
                    </span>
                  )}
                  {cat === "All" && posts && (
                    <span className="ml-1.5 text-xs opacity-70">({posts.length})</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const readTime = estimateReadTime(post.content);
                  return (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                        {/* Featured Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            loading="lazy"
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={800}
                            height={600}
                          />
                          {post.category && (
                            <div className="absolute top-4 left-4 bg-[#2C5F7F] text-white px-4 py-2 rounded font-semibold shadow-lg">
                              {post.category}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <CardContent className="p-6">
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                                "en-GB",
                                { day: "numeric", month: "long", year: "numeric" }
                              )}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {readTime} min read
                            </span>
                          </div>

                          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#2C5F7F] transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                          {post.tags && (() => {
                            try {
                              const tags: string[] = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags;
                              return tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                    >
                                      <Tag className="w-3 h-3" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              ) : null;
                            } catch {
                              return null;
                            }
                          })()}

                          <div className="text-[#2C5F7F] font-semibold group-hover:underline">
                            Read full article →
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Empty state when filter yields 0 results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">
                    No posts in this category yet.
                  </p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-4 text-[#2C5F7F] font-semibold hover:underline"
                  >
                    View all posts
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              {activeCategory !== "All" ? (
                <>
                  <p className="text-xl text-gray-600">No posts in this category yet.</p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-4 text-[#2C5F7F] font-semibold hover:underline"
                  >
                    View all posts
                  </button>
                </>
              ) : (
                <p className="text-xl text-gray-600">No blog posts available yet.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Get a Quote Section */}
      <section className="py-16 bg-[#1a3a4d]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Request a Free Site Survey</h2>
            <p className="text-white/70">Our team covers England &amp; Wales. We'll get back to you within 24 hours.</p>
          </div>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-white/40">Loading form…</div>}>
            <LeadFormLazy variant="dark" heading="" showWhatsApp={true} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}
