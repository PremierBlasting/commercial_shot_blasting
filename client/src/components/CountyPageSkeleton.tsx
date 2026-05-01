/**
 * CountyPageSkeleton — shown while a county page chunk is being lazy-loaded.
 * Mirrors the rough layout of CountyPage so the page feels stable during load.
 */
export function CountyPageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header placeholder */}
      <div className="h-16 bg-[#1a2e3b] w-full" />

      {/* Breadcrumb placeholder */}
      <div className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container flex gap-2 items-center">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-2 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-2 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Hero placeholder */}
      <div className="bg-[#1a2e3b] py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="h-4 w-48 bg-white/20 rounded mb-3" />
          <div className="h-10 w-3/4 bg-white/30 rounded mb-4" />
          <div className="h-10 w-2/3 bg-white/30 rounded mb-6" />
          <div className="h-5 w-full bg-white/20 rounded mb-2" />
          <div className="h-5 w-5/6 bg-white/20 rounded mb-8" />
          <div className="flex gap-4">
            <div className="h-11 w-36 bg-white/30 rounded-md" />
            <div className="h-11 w-44 bg-white/20 rounded-md" />
          </div>
        </div>
      </div>

      {/* Services grid placeholder */}
      <div className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-8 w-72 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-gray-100 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
                <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-4/5 bg-gray-100 rounded mb-4" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries grid placeholder */}
      <div className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-5 w-24 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Towns list placeholder */}
      <div className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-3" />
            <div className="h-8 w-80 bg-gray-200 rounded mx-auto mb-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
