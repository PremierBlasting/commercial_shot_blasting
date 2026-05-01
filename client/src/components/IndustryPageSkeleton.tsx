/**
 * IndustryPageSkeleton — shown while an industry page chunk is being lazy-loaded.
 * Mirrors the rough layout of industry pages (hero, services grid, stats, gallery, CTA)
 * so the page feels stable during load rather than showing a blank spinner.
 */
export function IndustryPageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header placeholder */}
      <div className="h-16 bg-[#1a2e3b] w-full" />

      {/* Hero placeholder */}
      <div className="bg-[#1e4159] py-20">
        <div className="container max-w-4xl">
          <div className="h-4 w-40 bg-white/20 rounded mb-3" />
          <div className="h-12 w-3/4 bg-white/30 rounded mb-4" />
          <div className="h-12 w-1/2 bg-white/30 rounded mb-6" />
          <div className="h-5 w-full bg-white/20 rounded mb-2" />
          <div className="h-5 w-5/6 bg-white/20 rounded mb-8" />
          <div className="flex gap-4">
            <div className="h-11 w-40 bg-white/30 rounded-lg" />
            <div className="h-11 w-44 bg-white/20 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Services / applications grid placeholder */}
      <div className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-8 w-72 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-100 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mb-4" />
                <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-4/5 bg-gray-100 rounded mb-4" />
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-6 w-20 bg-gray-100 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row placeholder */}
      <div className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-10 w-20 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-4 w-28 bg-gray-100 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery / before-after placeholder */}
      <div className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA placeholder */}
      <div className="py-16 bg-[#1e4159]">
        <div className="container text-center">
          <div className="h-8 w-80 bg-white/20 rounded mx-auto mb-4" />
          <div className="h-5 w-96 bg-white/15 rounded mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <div className="h-11 w-40 bg-white/30 rounded-lg" />
            <div className="h-11 w-44 bg-white/20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
