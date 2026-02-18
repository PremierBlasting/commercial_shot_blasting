import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export function BlogPreview() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-semibold mb-2">Learn More About What We Do</p>
            <h2 className="text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              CSB Blog
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  const visiblePosts = 3;
  const maxIndex = Math.max(0, posts.length - visiblePosts);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const displayedPosts = posts.slice(currentIndex, currentIndex + visiblePosts);

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-[#2C5F7F] font-semibold mb-2">Learn More About What We Do</p>
          <h2 className="text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            CSB Blog
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          {posts.length > visiblePosts && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Previous posts"
              >
                <ChevronLeft className="w-6 h-6 text-[#2C5F7F]" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Next posts"
              >
                <ChevronRight className="w-6 h-6 text-[#2C5F7F]" />
              </button>
            </>
          )}

          {/* Blog Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img loading="lazy"
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-[#2C5F7F] text-white px-3 py-1 rounded text-sm font-semibold">
                        {post.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#2C5F7F] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 text-[#2C5F7F] font-semibold text-sm group-hover:underline">
                      Read more →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#2C5F7F] font-semibold hover:underline">
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
