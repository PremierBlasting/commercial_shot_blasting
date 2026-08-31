import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Newspaper, Mail, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback - office team from newsletter
const staticOfficeTeam = [
  {
    id: 1, name: "Christopher Tansley", role: "Managing Director", memberType: "office" as const, status: "active" as const,
    bio: "Christopher is the big boss man that's outnumbered by the ladies in the office! Christopher supports our team to learn and grow and deals with the overall development of Right at Home Nottingham.",
    email: "christopher.tansley@rightathome.co.uk", location: null, photoUrl: null, joinedMonth: null, leftMonth: null, isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, name: "Emma Blackmore", role: "Registered Manager", memberType: "office" as const, status: "active" as const,
    bio: "Emma is the person that looks after us all! Emma deals with complaints, auditing, and day to day running of the business. Rotas and holidays are now in her job remit!",
    email: "emma.blackmore@rightathome.co.uk", location: null, photoUrl: null, joinedMonth: null, leftMonth: null, isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, name: "Julie Tansley", role: "Accounts Manager", memberType: "office" as const, status: "active" as const,
    bio: "Julie deals with payroll and everything that goes with it such as mileage and reimbursements for parking etc.",
    email: "julie.tansley@rightathome.co.uk", location: null, photoUrl: null, joinedMonth: null, leftMonth: null, isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, name: "Emilie Allen", role: "Deputy Care Manager", memberType: "office" as const, status: "active" as const,
    bio: "Emilie is Emma's right hand person.",
    email: "emilie.allen@rightathome.co.uk", location: null, photoUrl: null, joinedMonth: null, leftMonth: null, isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, name: "Lucy", role: "Senior Caregiver", memberType: "caregiver" as const, status: "active" as const,
    bio: "Lucy is our senior carer. Although mainly based in the community she can occasionally be found in the office manning the phones or auditing. Always on the end of the phone and happy to give advice or a listening ear.",
    email: "supportnotts@rightathome.co.uk", location: null, photoUrl: null, joinedMonth: null, leftMonth: null, isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function CarerHubBehindTheScenes() {
  const { data: teamData, isLoading } = trpc.carerHub.team.list.useQuery();
  const officeTeam = teamData && teamData.length > 0
    ? teamData.filter((m) => m.memberType === "office")
    : staticOfficeTeam;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Behind the Scenes Team", href: "/carer-hub/behind-the-scenes", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-900 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-cyan-200" />
            </div>
            <div>
              <p className="text-cyan-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Behind the Scenes Team
              </h1>
            </div>
          </div>
          <p className="text-cyan-100 text-lg max-w-2xl leading-relaxed mt-4">
            The office team who keep everything running smoothly — who does what, and how to get in touch
            with the right person for the right reason.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4 mb-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {officeTeam.map((member) => (
                <Card key={member.id} className="border-2 border-cyan-200 bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover border-3 border-cyan-200 shadow"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center border-2 border-cyan-200 shadow flex-shrink-0">
                          <span className="text-2xl font-bold text-cyan-600">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-[#2C2C2C] leading-tight">{member.name}</h3>
                        {member.role && (
                          <span className="inline-block text-xs font-semibold bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full mt-1">
                            {member.role}
                          </span>
                        )}
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm font-medium text-[#2C5F7F] hover:text-[#1a3d52] transition-colors bg-cyan-50 rounded-lg px-4 py-2 border border-cyan-200 hover:bg-cyan-100"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Office Contact Info */}
          <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-cyan-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-6 h-6 text-cyan-600" />
              <h3 className="text-xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                General Contact Reminders
              </h3>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                When you phone the office please use <strong className="text-[#2C5F7F]">0115 6482460</strong> rather than 0115 8800911.
                This will enable your call to be answered by someone who might be able to help you.
              </p>
              <p>
                Please call the office, and not the on-call phone, between <strong>8:30am – 5pm, Monday – Friday</strong>.
              </p>
              <p>
                For general support queries, email: <a href="mailto:supportnotts@rightathome.co.uk" className="text-[#2C5F7F] underline hover:text-[#1a3d52]">supportnotts@rightathome.co.uk</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
