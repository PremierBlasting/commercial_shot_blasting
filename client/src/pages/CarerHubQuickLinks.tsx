import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { BookOpen, ExternalLink, Phone, Smartphone, CreditCard, Music, Fuel, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback from newsletter
const staticLinks = [
  {
    id: 1, title: "Office Phone Number", url: "tel:01156482460", description: "Please use 0115 6482460 rather than 0115 8800911. This will enable your call to be answered by someone who might be able to help you. Call between 8:30am – 5pm, Monday – Friday.", category: "Contact", isActive: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, title: "Blue Light Card", url: "https://www.bluelightcard.co.uk/", description: "Many discounts available from new cars to holidays to restaurants to parking and days out. Apply for your Blue Light Card today.", category: "Benefits", isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, title: "Concerts for Carers", url: "https://www.concertsforcarers.org.uk/", description: "Free and discounted concert tickets for carers across the UK.", category: "Benefits", isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, title: "Esso Wex Fuel Card", url: "https://www.wex.essocard.com/user/register", description: "Register for an Esso Wex Fuel Card for fuel discounts.", category: "Benefits", isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, title: "My Learning Cloud App", url: "https://rightathome.appiancloud.com", description: "Available to download for all Apple and Android devices. Search for 'My Learning Cloud' in your App store. RAH Nottingham's unique code is: 788238", category: "Training", isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 6, title: "Wheatcroft Office Barrier Code", url: "#", description: "Barrier code for the Wheatcroft office: 2864", category: "Office", isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date(),
  },
];

const categoryIcons: Record<string, any> = {
  Contact: Phone,
  Benefits: Tag,
  Training: Smartphone,
  Office: BookOpen,
  Finance: CreditCard,
  Music: Music,
  Fuel: Fuel,
};

const categoryColours: Record<string, string> = {
  Contact: "bg-blue-50 border-blue-200 text-blue-700",
  Benefits: "bg-green-50 border-green-200 text-green-700",
  Training: "bg-purple-50 border-purple-200 text-purple-700",
  Office: "bg-orange-50 border-orange-200 text-orange-700",
  Finance: "bg-slate-50 border-slate-200 text-slate-700",
  Music: "bg-pink-50 border-pink-200 text-pink-700",
  Fuel: "bg-amber-50 border-amber-200 text-amber-700",
};

export default function CarerHubQuickLinks() {
  const { data: links, isLoading } = trpc.carerHub.quickLinks.list.useQuery();
  const displayLinks = (links && links.length > 0) ? links : staticLinks;

  // Group by category
  const byCategory: Record<string, typeof displayLinks> = {};
  displayLinks.forEach((l) => {
    const cat = l.category || "General";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(l);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Quick Links & Resources", href: "/carer-hub/quick-links", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-lime-600 to-lime-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-lime-200" />
            </div>
            <div>
              <p className="text-lime-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Links & Resources
              </h1>
            </div>
          </div>
          <p className="text-lime-100 text-lg max-w-2xl leading-relaxed mt-4">
            Everything you need in one place — from contact numbers and office codes to benefits, training
            apps, and useful reminders.
          </p>
        </div>
      </section>

      {/* Links by Category */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || BookOpen;
                const colourClass = categoryColours[category] || "bg-gray-50 border-gray-200 text-gray-700";
                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-[#2C5F7F]" />
                      <h3 className="text-lg font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {category}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {byCategory[category].map((link) => (
                        <Card key={link.id} className={`border-2 ${colourClass.split(" ")[1]} bg-white hover:shadow-md transition-shadow`}>
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-[#2C2C2C] mb-1">{link.title}</h4>
                                {link.description && (
                                  <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
                                )}
                              </div>
                              {link.url && link.url !== "#" && (
                                <a
                                  href={link.url}
                                  target={link.url.startsWith("http") ? "_blank" : undefined}
                                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="flex-shrink-0 flex items-center gap-1 text-sm font-medium text-[#2C5F7F] hover:text-[#1a3d52] transition-colors mt-0.5"
                                >
                                  {link.url.startsWith("tel:") ? (
                                    <>
                                      <Phone className="w-4 h-4" />
                                      Call
                                    </>
                                  ) : (
                                    <>
                                      <ExternalLink className="w-4 h-4" />
                                      Visit
                                    </>
                                  )}
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
