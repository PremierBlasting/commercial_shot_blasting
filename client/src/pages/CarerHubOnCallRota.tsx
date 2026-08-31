import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Phone, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter - May 2026
const staticRota = [
  { id: 1, dateRange: "1st - 4th May", phoneHolder: "Emilie / Emma", month: "May 2026", sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, dateRange: "8th - 11th May", phoneHolder: "Emma", month: "May 2026", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, dateRange: "15th - 18th May", phoneHolder: "Emma / Emilie", month: "May 2026", sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, dateRange: "22nd - 25th May", phoneHolder: "Lucy", month: "May 2026", sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
];

export default function CarerHubOnCallRota() {
  const { data: rota, isLoading } = trpc.carerHub.onCallRota.list.useQuery({});
  const displayRota = (rota && rota.length > 0) ? rota : staticRota;

  // Group by month
  const byMonth: Record<string, typeof displayRota> = {};
  displayRota.forEach((r) => {
    if (!byMonth[r.month]) byMonth[r.month] = [];
    byMonth[r.month].push(r);
  });
  const months = Object.keys(byMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "On-Call Rota", href: "/carer-hub/on-call-rota", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-8 h-8 text-orange-200" />
            </div>
            <div>
              <p className="text-orange-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                On-Call Rota
              </h1>
            </div>
          </div>
          <p className="text-orange-100 text-lg max-w-2xl leading-relaxed mt-4">
            The weekend on-call schedule — who to contact from Friday 5pm until Monday 8am.
            Only call if it is important or urgent. If it can wait until office hours, please do.
          </p>
        </div>
      </section>

      {/* Important Rules */}
      <section className="py-8 bg-orange-50 border-b border-orange-200">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-2">Important Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">•</span>
                    <span>Only call the on-call phone if it is <strong>important or urgent</strong>. If it can be left until office hours, please wait until Monday and call the office then.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">•</span>
                    <span>Please <strong>do not call before 6am or after 10pm</strong> unless it is a life or death emergency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">•</span>
                    <span>For non-urgent matters, please call the office between <strong>8:30am – 5pm, Monday – Friday</strong> on <strong>0115 6482460</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rota Table */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-3xl">
          {isLoading ? (
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : months.length > 0 ? (
            <div className="space-y-8">
              {months.map((month) => (
                <Card key={month} className="border-2 border-orange-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-orange-500 text-white px-6 py-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <h3 className="font-bold">{month} — Weekend On-Call</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-orange-50 border-b border-orange-200">
                          <th className="text-left px-6 py-3 text-sm font-semibold text-orange-800">Dates</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-orange-800">Phone Holder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {byMonth[month]
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((entry, idx) => (
                            <tr key={entry.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}`}>
                              <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">{entry.dateRange}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-orange-500" />
                                  {entry.phoneHolder}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No rota entries yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
