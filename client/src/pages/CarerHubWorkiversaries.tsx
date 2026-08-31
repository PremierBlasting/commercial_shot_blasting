import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Gift, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter
const staticWorkiversaries = [
  {
    id: 1, caregiverName: "Sharon", years: 7, anniversaryDate: "3rd May", month: "April 2026",
    note: "who has been with us almost since time began…",
    photoUrl: null, createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function CarerHubWorkiversaries() {
  const { data: workiversaries, isLoading } = trpc.carerHub.workiversaries.list.useQuery({});
  const displayWorkiversaries = (workiversaries && workiversaries.length > 0) ? workiversaries : staticWorkiversaries;

  // Group by month
  const byMonth: Record<string, typeof displayWorkiversaries> = {};
  displayWorkiversaries.forEach((w) => {
    if (!byMonth[w.month]) byMonth[w.month] = [];
    byMonth[w.month].push(w);
  });
  const months = Object.keys(byMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Workiversaries", href: "/carer-hub/workiversaries", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-900 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="w-8 h-8 text-indigo-200" />
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Workiversaries
              </h1>
            </div>
          </div>
          <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed mt-4">
            A massive thank you to those celebrating another year in gainful employment with us. Your
            dedication to our clients and your commitment to the team means everything.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-10 bg-indigo-50 border-b border-indigo-100">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-indigo-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Celebrating Your Years of Service
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              This section gives a shout-out to those caregivers celebrating another year in gainful
              employment with us. To say a massive thank you for all that you do for our clients — and for
              sticking with us — you will also receive a gift voucher to treat yourself.
            </p>
            <p className="text-sm text-indigo-700 font-medium">
              Contact Julie at{" "}
              <a href="mailto:julie.tansley@rightathome.co.uk" className="underline hover:text-indigo-900">
                julie.tansley@rightathome.co.uk
              </a>{" "}
              to let her know what sort of voucher you would like by the 15th of the month.
            </p>
          </div>
        </div>
      </section>

      {/* Workiversaries by Month */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-3xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-5 bg-gray-200 rounded w-1/4 mb-4" />
                    <div className="h-20 bg-gray-200 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : months.length > 0 ? (
            <div className="space-y-8">
              {months.map((month) => (
                <div key={month}>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    {month}
                  </h3>
                  <div className="grid gap-4">
                    {byMonth[month].map((w) => (
                      <Card key={w.id} className="border-2 border-indigo-200 bg-white shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            {w.photoUrl ? (
                              <img src={w.photoUrl} alt={w.caregiverName} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                                <span className="text-2xl font-bold text-indigo-600">
                                  {w.caregiverName.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {w.caregiverName}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                  {w.years} {w.years === 1 ? "year" : "years"}
                                </span>
                                {w.anniversaryDate && (
                                  <span className="text-sm text-gray-500">on {w.anniversaryDate}</span>
                                )}
                              </div>
                              {w.note && (
                                <p className="text-sm text-gray-600 mt-2 italic">{w.note}</p>
                              )}
                            </div>
                            <Gift className="w-8 h-8 text-indigo-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No workiversaries recorded yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
