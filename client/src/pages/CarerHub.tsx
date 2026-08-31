import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy, Heart, Users, Star, Calendar, Gift, Camera,
  Phone, CreditCard, BookOpen, UserCheck, ArrowRight, Newspaper
} from "lucide-react";

const sections = [
  {
    title: "The 100 Club",
    description: "Celebrating our remarkable clients who have reached the incredible milestone of 100 years old.",
    href: "/carer-hub/100-club",
    icon: Trophy,
    colour: "bg-amber-50 border-amber-200",
    iconColour: "text-amber-600",
    badge: "Milestone",
  },
  {
    title: "Family Feedback",
    description: "Heartfelt messages and letters of thanks from the families of the clients we care for.",
    href: "/carer-hub/family-feedback",
    icon: Heart,
    colour: "bg-rose-50 border-rose-200",
    iconColour: "text-rose-600",
    badge: "Testimonials",
  },
  {
    title: "Our Team",
    description: "Meet the caregivers and office team — new joiners, leavers, and the people behind the care.",
    href: "/carer-hub/team",
    icon: Users,
    colour: "bg-teal-50 border-teal-200",
    iconColour: "text-teal-600",
    badge: "People",
  },
  {
    title: "SUPER CRUMS",
    description: "Recognising caregivers who step up in emergencies. Core Response to Unforeseen Modifications to Schedules.",
    href: "/carer-hub/super-crums",
    icon: Star,
    colour: "bg-purple-50 border-purple-200",
    iconColour: "text-purple-600",
    badge: "Recognition",
  },
  {
    title: "100% Attendance Club",
    description: "Monthly recognition for caregivers with perfect attendance — every visit, every time.",
    href: "/carer-hub/attendance-club",
    icon: UserCheck,
    colour: "bg-green-50 border-green-200",
    iconColour: "text-green-600",
    badge: "Recognition",
  },
  {
    title: "Workiversaries",
    description: "Celebrating the anniversaries of our dedicated team members and their years of service.",
    href: "/carer-hub/workiversaries",
    icon: Gift,
    colour: "bg-indigo-50 border-indigo-200",
    iconColour: "text-indigo-600",
    badge: "Celebrations",
  },
  {
    title: "Birthdays",
    description: "Monthly birthday shout-outs for our clients and caregivers — because every birthday matters.",
    href: "/carer-hub/birthdays",
    icon: Calendar,
    colour: "bg-pink-50 border-pink-200",
    iconColour: "text-pink-600",
    badge: "Celebrations",
  },
  {
    title: "Magic Moments",
    description: "Photos and stories of special outings, activities, and memorable moments shared with our clients.",
    href: "/carer-hub/magic-moments",
    icon: Camera,
    colour: "bg-sky-50 border-sky-200",
    iconColour: "text-sky-600",
    badge: "Stories",
  },
  {
    title: "On-Call Rota",
    description: "Weekend on-call schedule — who to contact from Friday 5pm to Monday 8am.",
    href: "/carer-hub/on-call-rota",
    icon: Phone,
    colour: "bg-orange-50 border-orange-200",
    iconColour: "text-orange-600",
    badge: "Operations",
  },
  {
    title: "Payroll Calendar",
    description: "Pay period dates and payment schedule for the year — plan ahead with confidence.",
    href: "/carer-hub/payroll",
    icon: CreditCard,
    colour: "bg-slate-50 border-slate-200",
    iconColour: "text-slate-600",
    badge: "Finance",
  },
  {
    title: "Quick Links & Resources",
    description: "Useful links for caregivers — Blue Light Card, training apps, fuel cards, and more.",
    href: "/carer-hub/quick-links",
    icon: BookOpen,
    colour: "bg-lime-50 border-lime-200",
    iconColour: "text-lime-600",
    badge: "Resources",
  },
  {
    title: "Behind the Scenes Team",
    description: "Meet the office team — who does what and how to get in touch with the right person.",
    href: "/carer-hub/behind-the-scenes",
    icon: Newspaper,
    colour: "bg-cyan-50 border-cyan-200",
    iconColour: "text-cyan-600",
    badge: "Team",
  },
];

export default function CarerHub() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F7F] to-[#1a3a4d] text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-blue-200 font-medium mb-2 uppercase tracking-wide text-sm">
              Replacing the Caregiver Chronicles
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              CarerHub
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
              Your one-stop hub for everything that matters to our team — from celebrating milestones and
              recognising outstanding caregivers, to practical resources and the latest team news. Everything
              the Caregiver Chronicles covered, now in one permanent, always-accessible place.
            </p>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-[#2C2C2C] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What's Inside CarerHub
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              All the sections from the monthly newsletter, now available permanently and kept up to date
              by the team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                <Card
                  className={`h-full border-2 ${section.colour} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm`}>
                        <section.icon className={`w-6 h-6 ${section.iconColour}`} />
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full border">
                        {section.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-2 group-hover:text-[#2C5F7F] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-1 text-[#2C5F7F] text-sm font-medium group-hover:gap-2 transition-all">
                      View section <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
