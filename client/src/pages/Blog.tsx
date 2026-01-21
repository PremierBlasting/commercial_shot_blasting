import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Blog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                    {/* Featured Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4 bg-[#2C5F7F] text-white px-4 py-2 rounded font-semibold shadow-lg">
                          {post.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#2C5F7F] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                      {post.tags && JSON.parse(post.tags).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {JSON.parse(post.tags).slice(0, 3).map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="text-[#2C5F7F] font-semibold group-hover:underline">
                        Read full article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No blog posts available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
