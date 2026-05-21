import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Star, Trophy, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter
const staticCrums = [
  { id: 1, caregiverName: "Monicca", month: "March 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, caregiverName: "Rachel", month: "March 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, caregiverName: "Sharon", month: "March 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, caregiverName: "Emma", month: "April 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, caregiverName: "Lucy", month: "April 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, caregiverName: "Emilie", month: "April 2026", isTopCrum: false, createdAt: new Date(), updatedAt: new Date() },
];

export default function CarerHubSuperCrums() {
  const { data: crums, isLoading } = trpc.carerHub.crumAwards.list.useQuery({});
  const displayCrums = (crums && crums.length > 0) ? crums : staticCrums;

  // Group by month
  const byMonth: Record<string, typeof displayCrums> = {};
  displayCrums.forEach((c) => {
    if (!byMonth[c.month]) byMonth[c.month] = [];
    byMonth[c.month].push(c);
  });
  const months = Object.keys(byMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "SUPER CRUMS", href: "/carer-hub/super-crums", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-900 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-purple-200" />
            </div>
            <div>
              <p className="text-purple-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                SUPER CRUMS
              </h1>
            </div>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl leading-relaxed mt-4">
            <strong>Core Response to Unforeseen Modifications to Schedules</strong> — otherwise known as the
            "can you just…" calls. These are the caregivers who step up for their clients in emergencies,
            ensuring no one is ever left without care.
          </p>
        </div>
      </section>

      {/* What is CRUMS */}
      <section className="py-10 bg-purple-50 border-b border-purple-100">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-purple-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              About SUPER CRUMS
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our clients are always visited by a familiar face and member of their dedicated team. This is a
              commitment that rarely happens in healthcare today — and our whole team believes it is crucial to
              client wellbeing.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              As a show of appreciation for stepping up in emergencies, we offer our CRUMS rate — an enhanced
              rate of pay per visit. It is also very reassuring knowing that, short of a world emergency, some
              people will always turn up and do what is needed — and more often than not, more than is needed.
            </p>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Top CRUM Prize</span>
              </div>
              <p className="text-sm text-purple-700">
                Top CRUMS receive a <strong>£10 Gift Voucher</strong> of their choice. Contact Julie at{" "}
                <a href="mailto:julie.tansley@rightathome.co.uk" className="underline hover:text-purple-900">
                  julie.tansley@rightathome.co.uk
                </a>{" "}
                to let her know your preference by the 15th of the month — vouchers are not carried over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRUMS by Month */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-3xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                    <div className="flex gap-3">
                      {[1, 2, 3].map((j) => <div key={j} className="h-10 w-24 bg-gray-200 rounded-full" />)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : months.length > 0 ? (
            <div className="space-y-8">
              {months.map((month) => (
                <Card key={month} className="border-2 border-purple-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-500" />
                      {month}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {byMonth[month].map((crum) => (
                        <div
                          key={crum.id}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                            crum.isTopCrum
                              ? "bg-purple-600 text-white border-purple-600 shadow-md"
                              : "bg-purple-50 text-purple-800 border-purple-300"
                          }`}
                        >
                          {crum.isTopCrum && <Trophy className="w-4 h-4" />}
                          <Star className="w-3 h-3" />
                          {crum.caregiverName}
                          {crum.isTopCrum && <span className="text-xs ml-1">(Top CRUM)</span>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No CRUM awards recorded yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
