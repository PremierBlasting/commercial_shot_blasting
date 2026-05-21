import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Users, Mail, MapPin, UserPlus, UserMinus, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback: office team from the newsletter
const staticOfficeTeam = [
  {
    id: 1, name: "Christopher Tansley", role: "Managing Director", memberType: "office" as const, status: "active" as const,
    bio: "Christopher is the big boss man that's outnumbered by the ladies in the office! Christopher supports our team to learn and grow and deals with the overall development of the business.",
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

// Static new joiners from newsletter
const staticNewJoiners = [
  {
    id: 10, name: "Aneesha Clay", role: "Caregiver", memberType: "caregiver" as const, status: "active" as const,
    bio: "My name's Aneesha. I'm from Edwalton and I live with my nan. I don't have any kids or pets, but I do love dogs and hope to have one in the future. I have lived with my nan for 8 years now and I am much closer to my older family members. I realised the company and support I bring my nan and I wanted to also do that for others. Outside of work I read books, go to the gym and spend time with family. I also love travelling!",
    email: null, location: "Edwalton", photoUrl: null, joinedMonth: "May 2026", leftMonth: null, isActive: true, sortOrder: 10, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 11, name: "Rose Masina", role: "Live-in Carer", memberType: "caregiver" as const, status: "active" as const,
    bio: "Rose comes from Bestwood and is Bob's new live-in carer.",
    email: null, location: "Bestwood", photoUrl: null, joinedMonth: "May 2026", leftMonth: null, isActive: true, sortOrder: 11, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 12, name: "Sam Jones", role: "Caregiver", memberType: "caregiver" as const, status: "active" as const,
    bio: "Sam comes from Broxtowe and will be working in the community.",
    email: null, location: "Broxtowe", photoUrl: null, joinedMonth: "May 2026", leftMonth: null, isActive: true, sortOrder: 12, createdAt: new Date(), updatedAt: new Date(),
  },
];

export default function CarerHubTeam() {
  const { data: teamData, isLoading } = trpc.carerHub.team.list.useQuery();

  const activeTeam = teamData && teamData.length > 0 ? teamData : staticOfficeTeam;
  const officeTeam = activeTeam.filter((m) => m.memberType === "office");
  const caregivers = activeTeam.filter((m) => m.memberType === "caregiver");
  const newJoiners = teamData && teamData.length > 0
    ? activeTeam.filter((m) => m.joinedMonth)
    : staticNewJoiners;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Our Team", href: "/carer-hub/team", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-teal-200" />
            </div>
            <div>
              <p className="text-teal-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Team
              </h1>
            </div>
          </div>
          <p className="text-teal-100 text-lg max-w-2xl leading-relaxed mt-4">
            Meet the wonderful people who make up our team — from the caregivers out in the community
            every day to the office team keeping everything running smoothly behind the scenes.
          </p>
        </div>
      </section>

      {/* New Joiners */}
      {newJoiners.length > 0 && (
        <section className="py-12 bg-green-50 border-b border-green-200">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <UserPlus className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Caregivers Joining Us
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newJoiners.map((member) => (
                <MemberCard key={member.id} member={member} accent="green" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Office Team */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-6 h-6 text-[#2C5F7F]" />
            <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Behind the Scenes Team
            </h2>
          </div>
          {isLoading ? (
            <LoadingGrid />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {officeTeam.map((member) => (
                <MemberCard key={member.id} member={member} accent="blue" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Caregivers */}
      {caregivers.length > 0 && (
        <section className="py-12 bg-[#F5F1E8]">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Caregivers
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caregivers.map((member) => (
                <MemberCard key={member.id} member={member} accent="teal" />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function MemberCard({ member, accent }: { member: any; accent: "blue" | "teal" | "green" }) {
  const colours = {
    blue: { border: "border-blue-200", bg: "bg-blue-50", avatar: "bg-blue-200", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
    teal: { border: "border-teal-200", bg: "bg-teal-50", avatar: "bg-teal-200", icon: "text-teal-600", badge: "bg-teal-100 text-teal-700" },
    green: { border: "border-green-200", bg: "bg-green-50", avatar: "bg-green-200", icon: "text-green-600", badge: "bg-green-100 text-green-700" },
  }[accent];

  return (
    <Card className={`border-2 ${colours.border} ${colours.bg} hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {member.photoUrl ? (
            <img src={member.photoUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
          ) : (
            <div className={`w-16 h-16 rounded-full ${colours.avatar} flex items-center justify-center border-2 border-white shadow`}>
              <span className={`text-xl font-bold ${colours.icon}`}>
                {member.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#2C2C2C] text-base leading-tight">{member.name}</h3>
            {member.role && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${colours.badge}`}>
                {member.role}
              </span>
            )}
          </div>
        </div>

        {member.bio && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
            {member.bio}
          </p>
        )}

        <div className="space-y-1">
          {member.location && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{member.location}</span>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <a href={`mailto:${member.email}`} className="hover:text-[#2C5F7F] transition-colors truncate">
                {member.email}
              </a>
            </div>
          )}
          {member.joinedMonth && (
            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
              <UserPlus className="w-3 h-3" />
              <span>Joined {member.joinedMonth}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
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
  );
}
