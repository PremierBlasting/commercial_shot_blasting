import { trpc } from "@/lib/trpc";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Featured Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container py-12">
          <div className="max-w-4xl mx-auto text-white">
            {post.category && (
              <span className="inline-block bg-[#2C5F7F] px-4 py-2 rounded font-semibold mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm">
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
              {post.author && <span>By {post.author}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="flex-grow py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            <p className="text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200 italic">
              {post.excerpt}
            </p>

            {/* Share Button */}
            <div className="flex justify-between items-center mb-8">
              <Link href="/blog">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-[#2C2C2C] mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-[#2C2C2C] mt-8 mb-4" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-[#2C2C2C] mt-6 mb-3" {...props} />,
                  p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-[#2C2C2C]" {...props} />,
                  a: ({ node, ...props }) => <a className="text-[#2C5F7F] hover:underline" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-[#2C5F7F] pl-4 italic text-gray-600 my-4" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && JSON.parse(post.tags).length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {JSON.parse(post.tags).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"
                    >
                      <Tag className="w-4 h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-br from-[#2C5F7F] to-[#1e4159] rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Need Professional Shot Blasting Services?</h3>
              <p className="text-lg mb-6">
                Our expert team is ready to help with your project. Get a free quote today.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-[#2C5F7F] hover:bg-gray-100">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
