import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Calendar, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter - May 2026
const staticBirthdays = [
  { id: 1, personName: "Sam J.", personType: "caregiver" as const, age: 44, birthdayDate: "9th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, personName: "Sue/Monicca", personType: "caregiver" as const, age: undefined, birthdayDate: "12th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, personName: "Jill", personType: "caregiver" as const, age: 62, birthdayDate: "27th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 4, personName: "Ray W.", personType: "client" as const, age: 79, birthdayDate: "1st May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 5, personName: "Janice B.", personType: "client" as const, age: 85, birthdayDate: "5th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 6, personName: "Joyce G.", personType: "client" as const, age: 83, birthdayDate: "15th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 7, personName: "Ann N.", personType: "client" as const, age: 86, birthdayDate: "20th May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
  { id: 8, personName: "Norman B.", personType: "client" as const, age: undefined, birthdayDate: "22nd May", month: "May 2026", createdAt: new Date(), updatedAt: new Date() },
];

export default function CarerHubBirthdays() {
  const { data: birthdays, isLoading } = trpc.carerHub.birthdays.list.useQuery({});
  const displayBirthdays = (birthdays && birthdays.length > 0) ? birthdays : staticBirthdays;

  // Group by month
  const byMonth: Record<string, typeof displayBirthdays> = {};
  displayBirthdays.forEach((b) => {
    if (!byMonth[b.month]) byMonth[b.month] = [];
    byMonth[b.month].push(b);
  });
  const months = Object.keys(byMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Birthdays", href: "/carer-hub/birthdays", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-500 to-pink-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-pink-200" />
            </div>
            <div>
              <p className="text-pink-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Birthday Shout-Outs
              </h1>
            </div>
          </div>
          <p className="text-pink-100 text-lg max-w-2xl leading-relaxed mt-4">
            A big happy birthday to all our lovely clients and caregivers celebrating this month.
            Every birthday matters and every person deserves to feel special on their day.
          </p>
        </div>
      </section>

      {/* Birthdays by Month */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : months.length > 0 ? (
            <div className="space-y-10">
              {months.map((month) => {
                const caregivers = byMonth[month].filter((b) => b.personType === "caregiver");
                const clients = byMonth[month].filter((b) => b.personType === "client");
                return (
                  <div key={month}>
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <Calendar className="w-5 h-5 text-pink-500" />
                      {month}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Caregiver Birthdays */}
                      {caregivers.length > 0 && (
                        <Card className="border-2 border-pink-200 bg-pink-50">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Users className="w-5 h-5 text-pink-600" />
                              <h4 className="font-bold text-pink-800">Caregiver Birthdays</h4>
                              <span className="text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full ml-auto">
                                {caregivers.length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {caregivers.map((b) => (
                                <div key={b.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-pink-100">
                                  <div>
                                    <span className="font-semibold text-[#2C2C2C]">{b.personName}</span>
                                    {b.age && <span className="text-sm text-gray-500 ml-2">turns {b.age}</span>}
                                  </div>
                                  {b.birthdayDate && (
                                    <span className="text-sm font-medium text-pink-600">{b.birthdayDate}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Client Birthdays */}
                      {clients.length > 0 && (
                        <Card className="border-2 border-rose-200 bg-rose-50">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Heart className="w-5 h-5 text-rose-600" />
                              <h4 className="font-bold text-rose-800">Client Birthdays</h4>
                              <span className="text-xs bg-rose-200 text-rose-700 px-2 py-0.5 rounded-full ml-auto">
                                {clients.length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {clients.map((b) => (
                                <div key={b.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-rose-100">
                                  <div>
                                    <span className="font-semibold text-[#2C2C2C]">{b.personName}</span>
                                    {b.age && <span className="text-sm text-gray-500 ml-2">turns {b.age}</span>}
                                  </div>
                                  {b.birthdayDate && (
                                    <span className="text-sm font-medium text-rose-600">{b.birthdayDate}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No birthdays recorded yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
