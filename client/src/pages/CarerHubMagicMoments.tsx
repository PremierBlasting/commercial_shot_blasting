import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Camera, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter
const staticMoments = [
  {
    id: 1,
    title: "Emily, Janice and Aubrey at the Garden Centre",
    description: "Emily took Janice and Aubrey to their local garden centre last week.",
    participants: "Emily, Janice and Aubrey",
    month: "May 2026",
    images: JSON.stringify([]),
    isActive: true,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Sam and Bob's Day Out at The Old Wharf Tearoom",
    description: "Sam and Bob enjoyed a day out with Bob's daughter, Helen, to The Old Wharf Tearoom at Hickling and had a walk down the Grantham Canal.",
    participants: "Sam, Bob and Helen",
    month: "May 2026",
    images: JSON.stringify([]),
    isActive: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "V's Latest Masterpiece",
    description: "This is V's latest masterpiece… I'm sure we can agree that it has a certain 'charm' to it…",
    participants: "V",
    month: "May 2026",
    images: JSON.stringify([]),
    isActive: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CarerHubMagicMoments() {
  const { data: moments, isLoading } = trpc.carerHub.magicMoments.list.useQuery();
  const displayMoments = (moments && moments.length > 0) ? moments : staticMoments;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Magic Moments", href: "/carer-hub/magic-moments", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-sky-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Camera className="w-8 h-8 text-sky-200" />
            </div>
            <div>
              <p className="text-sky-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Magic Moments
              </h1>
            </div>
          </div>
          <p className="text-sky-100 text-lg max-w-2xl leading-relaxed mt-4">
            The moments that remind us why we do what we do. Photos and stories of outings, activities,
            and the special times shared between our caregivers and the people they care for.
          </p>
        </div>
      </section>

      {/* Moments Grid */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayMoments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayMoments.map((moment) => {
                const images = moment.images ? JSON.parse(moment.images) as string[] : [];
                return (
                  <Card key={moment.id} className="border-2 border-sky-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                    {images.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1 h-48">
                        {images.slice(0, 4).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${moment.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-sky-300" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      {moment.month && (
                        <div className="flex items-center gap-1 text-xs text-sky-600 font-medium mb-2">
                          <Calendar className="w-3 h-3" />
                          {moment.month}
                        </div>
                      )}
                      <h3 className="font-bold text-[#2C2C2C] text-base mb-2 leading-tight">
                        {moment.title}
                      </h3>
                      {moment.description && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {moment.description}
                        </p>
                      )}
                      {moment.participants && (
                        <div className="flex items-center gap-2 text-xs text-sky-700 bg-sky-50 rounded-full px-3 py-1 w-fit">
                          <Users className="w-3 h-3" />
                          {moment.participants}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No magic moments shared yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
