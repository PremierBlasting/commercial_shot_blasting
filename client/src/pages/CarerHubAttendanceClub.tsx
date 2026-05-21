import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { UserCheck, Trophy, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter - April 2026
const staticAttendance = [
  "Aaron", "Jill", "Lucy", "Sam J.",
  "Debbie", "Jules", "Mechelle", "Sam S.",
  "Emillie", "Karen", "Pascale", "Sasha",
  "Emily", "Kayleigh", "Rachel", "Sharon",
  "Emma", "Lerato", "Rose", "Susan",
].map((name, i) => ({
  id: i + 1, caregiverName: name, month: "April 2026", createdAt: new Date(), updatedAt: new Date(),
}));

export default function CarerHubAttendanceClub() {
  const { data: attendance, isLoading } = trpc.carerHub.attendanceClub.list.useQuery({});
  const displayAttendance = (attendance && attendance.length > 0) ? attendance : staticAttendance;

  // Group by month
  const byMonth: Record<string, typeof displayAttendance> = {};
  displayAttendance.forEach((a) => {
    if (!byMonth[a.month]) byMonth[a.month] = [];
    byMonth[a.month].push(a);
  });
  const months = Object.keys(byMonth).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "100% Attendance Club", href: "/carer-hub/attendance-club", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-green-200" />
            </div>
            <div>
              <p className="text-green-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                100% Attendance Club
              </h1>
            </div>
          </div>
          <p className="text-green-100 text-lg max-w-2xl leading-relaxed mt-4">
            Not everyone can pick up a CRUMS visit — but showing up for every single scheduled visit is
            its own remarkable achievement. This club recognises those who have done exactly that.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-10 bg-green-50 border-b border-green-100">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              About the 100% Club
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We recognise that not everyone can or is able to pick up a CRUMS visit when asked — for reasons
              such as family commitments, health, or other work. So in recognition of your professionalism
              and dedication, we have our 100% Club.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We register 100% monthly attendance and everyone who gets listed each month will have a ticket
              put into a prize draw with a <strong>top prize of £150</strong>! This is a prize draw every
              Christmas — a shout-out to those who have turned up for every scheduled visit and carried out
              their commitment to their clients.
            </p>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Important Reminder</span>
              </div>
              <p className="text-sm text-green-700">
                It is your responsibility to confirm that we have received your requirements with any requested
                days off, because it is trickier to change schedules once they have been set.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attendance Lists by Month */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-6" />
                <div className="grid grid-cols-4 gap-3">
                  {Array(20).fill(0).map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : months.length > 0 ? (
            <div className="space-y-8">
              {months.map((month) => (
                <Card key={month} className="border-2 border-green-200 bg-white shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        {month} — 100% Attendance
                      </h3>
                      <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {byMonth[month].length} caregivers
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {byMonth[month]
                        .sort((a, b) => a.caregiverName.localeCompare(b.caregiverName))
                        .map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-2 text-sm font-medium text-green-800"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="truncate">{entry.caregiverName}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No attendance records yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
