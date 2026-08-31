import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Trophy, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback data from the May 2026 newsletter
const staticMembers = [
  { id: 1, clientName: "Olga W.", location: "Keyworth", joinedAt: new Date("2026-05-01"), note: "Our fourth member", isActive: true, photoUrl: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, clientName: "Jim W.", location: null, joinedAt: new Date("2024-01-01"), note: null, isActive: true, photoUrl: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, clientName: "Joan A.", location: null, joinedAt: new Date("2024-06-01"), note: null, isActive: true, photoUrl: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, clientName: "Jane S.", location: null, joinedAt: new Date("2025-01-01"), note: null, isActive: true, photoUrl: null, createdAt: new Date(), updatedAt: new Date() },
];

export default function CarerHub100Club() {
  const { data: members, isLoading } = trpc.carerHub.centenarians.list.useQuery();
  const displayMembers = (members && members.length > 0) ? members : staticMembers;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "The 100 Club", href: "/carer-hub/100-club", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-amber-200" />
            </div>
            <div>
              <p className="text-amber-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                The 100 Club
              </h1>
            </div>
          </div>
          <p className="text-amber-100 text-lg max-w-2xl leading-relaxed mt-4">
            Reaching a century is a truly remarkable achievement. This exclusive club celebrates the extraordinary
            clients in our care who have reached 100 years old — a testament to their resilience, spirit, and the
            wonderful lives they have lived.
          </p>
          <p className="text-amber-200 text-sm mt-3 italic">
            Not to be confused with the 100% Club — that's something very different!
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Centenarian Members
            </h2>
            <p className="text-gray-600">
              {displayMembers.length} {displayMembers.length === 1 ? "member" : "members"} in the 100 Club
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayMembers.map((member, idx) => (
                <Card key={member.id} className="border-2 border-amber-200 bg-amber-50 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.clientName}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-amber-300 shadow"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-amber-200 flex items-center justify-center mx-auto mb-4 border-4 border-amber-300 shadow">
                        <Trophy className="w-10 h-10 text-amber-600" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {member.clientName}
                    </h3>
                    {member.location && (
                      <div className="flex items-center justify-center gap-1 text-amber-700 text-sm mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{member.location}</span>
                      </div>
                    )}
                    <div className="inline-flex items-center gap-1 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                      <Trophy className="w-3 h-3" />
                      100 Club Member #{idx + 1}
                    </div>
                    {member.note && (
                      <p className="text-xs text-gray-500 mt-3 italic">{member.note}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* About section */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-amber-200 max-w-2xl mx-auto text-center">
            <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              About the 100 Club
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The 100 Club is a very special section that does not come up very often. When one of our clients
              reaches the incredible milestone of 100 years old, they are welcomed into this exclusive group.
              It is our way of honouring their extraordinary achievement and the privilege we have of being
              part of their lives.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
