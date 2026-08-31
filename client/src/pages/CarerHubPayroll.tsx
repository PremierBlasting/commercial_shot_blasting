import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { CreditCard, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter - 2026
const staticPayroll = [
  { id: 1, paidFrom: "18/04/2026", paidTo: "17/05/2026", payDate: "26/05/2026", year: 2026, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, paidFrom: "18/05/2026", paidTo: "17/06/2026", payDate: "26/06/2026", year: 2026, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, paidFrom: "18/06/2026", paidTo: "17/07/2026", payDate: "24/07/2026", year: 2026, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, paidFrom: "18/07/2026", paidTo: "17/08/2026", payDate: "26/08/2026", year: 2026, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, paidFrom: "18/08/2026", paidTo: "17/09/2026", payDate: "25/09/2026", year: 2026, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, paidFrom: "18/09/2026", paidTo: "17/10/2026", payDate: "26/10/2026", year: 2026, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, paidFrom: "18/10/2026", paidTo: "17/11/2026", payDate: "26/11/2026", year: 2026, sortOrder: 6, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, paidFrom: "18/11/2026", paidTo: "17/12/2026", payDate: "24/12/2026", year: 2026, sortOrder: 7, createdAt: new Date(), updatedAt: new Date() },
];

function isCurrentPeriod(paidFrom: string, paidTo: string): boolean {
  try {
    const today = new Date();
    const [fd, fm, fy] = paidFrom.split("/").map(Number);
    const [td, tm, ty] = paidTo.split("/").map(Number);
    const from = new Date(fy, fm - 1, fd);
    const to = new Date(ty, tm - 1, td);
    return today >= from && today <= to;
  } catch {
    return false;
  }
}

export default function CarerHubPayroll() {
  const { data: payroll, isLoading } = trpc.carerHub.payroll.list.useQuery({});
  const displayPayroll = (payroll && payroll.length > 0) ? payroll : staticPayroll;

  // Group by year
  const byYear: Record<number, typeof displayPayroll> = {};
  displayPayroll.forEach((p) => {
    if (!byYear[p.year]) byYear[p.year] = [];
    byYear[p.year].push(p);
  });
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Payroll Calendar", href: "/carer-hub/payroll", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 to-slate-900 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-slate-200" />
            </div>
            <div>
              <p className="text-slate-300 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Payroll Calendar
              </h1>
            </div>
          </div>
          <p className="text-slate-200 text-lg max-w-2xl leading-relaxed mt-4">
            Your pay period dates and payment schedule for the year. Plan ahead and know exactly when
            to expect your pay.
          </p>
        </div>
      </section>

      {/* Payroll Table */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-3xl">
          {isLoading ? (
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : years.length > 0 ? (
            <div className="space-y-8">
              {years.map((year) => (
                <Card key={year} className="border-2 border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-slate-700 text-white px-6 py-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold">CareGiver Payroll Calendar {year}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Paid From</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Paid To / Cut-off</th>
                          <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Pay Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {byYear[year]
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((entry) => {
                            const current = isCurrentPeriod(entry.paidFrom, entry.paidTo);
                            return (
                              <tr
                                key={entry.id}
                                className={`border-b border-gray-100 ${current ? "bg-green-50 border-l-4 border-l-green-500" : ""}`}
                              >
                                <td className="px-6 py-4 text-sm text-[#2C2C2C] font-medium">{entry.paidFrom}</td>
                                <td className="px-6 py-4 text-sm text-[#2C2C2C]">{entry.paidTo}</td>
                                <td className="px-6 py-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    {current && <CheckCircle className="w-4 h-4 text-green-500" />}
                                    <span className={`font-semibold ${current ? "text-green-700" : "text-[#2C5F7F]"}`}>
                                      {entry.payDate}
                                    </span>
                                    {current && (
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                        Current Period
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No payroll calendar entries yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
