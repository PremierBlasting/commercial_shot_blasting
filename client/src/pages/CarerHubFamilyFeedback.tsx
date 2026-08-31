import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { trpc } from "@/lib/trpc";
import { Heart, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Static fallback data from the May 2026 newsletter
const staticFeedback = [
  {
    id: 1,
    senderName: "Sue and Roger Periam",
    clientName: "Jean Young",
    month: "May 2026",
    isActive: true,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: `Jean Young's Easter Visit

Many of you will have met my mum, Jean, on her recent visit to see us over Easter. She normally gets morning and evening care from the Right at Home Newport & Cardiff branch, based mainly on our recommendation. So it seemed appropriate to transfer her care to you for the duration of her stay. We are glad we did and are very grateful for the care you gave her.

Jean, who is normally quite happy to speak her mind, didn't have a negative thing to say about any of you. Amongst other things she appreciated your help to make her look smart and "glam" when she came down each morning – not in a rush and hearing aids having been found successfully. At night, she appreciated your tussles with TV remotes as you sought to find the right Netflix programme for her.

Mum sends particular thanks to Lucy, who did so much to settle her in during the initial calls. All in all the visit was a success. Jean felt well cared for and was able to enjoy her time with the family over Easter (even the noisy great-grandchildren). She is already looking forward to her next visit.`,
  },
  {
    id: 2,
    senderName: "Fiona (Jane S.'s daughter)",
    clientName: "Jane S.",
    month: "May 2026",
    isActive: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: "I would like to thank Jill for contacting me regarding the pain and whether mum could have paracetamol. Thank you all for looking after mum.",
  },
  {
    id: 3,
    senderName: "Vivienne (Bill R.'s wife)",
    clientName: "Bill R.",
    month: "May 2026",
    isActive: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: "Vivienne said that she didn't realise how tired she had been and now comes downstairs feeling energised, this is thanks to the care and support Bill receives not only from our office but the Loughborough team as well.",
  },
];

export default function CarerHubFamilyFeedback() {
  const { data: feedback, isLoading } = trpc.carerHub.familyFeedback.list.useQuery();
  const displayFeedback = (feedback && feedback.length > 0) ? feedback : staticFeedback;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "CarerHub", href: "/carer-hub" },
          { label: "Family Feedback", href: "/carer-hub/family-feedback", isCurrentPage: true },
        ]}
        className="container mt-6"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-200" />
            </div>
            <div>
              <p className="text-rose-200 text-sm font-medium uppercase tracking-wide">CarerHub</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Family Feedback
              </h1>
            </div>
          </div>
          <p className="text-rose-100 text-lg max-w-2xl leading-relaxed mt-4">
            The most meaningful recognition comes from the families of those we care for. These are their
            words — messages of gratitude, appreciation, and trust that remind us why this work matters so much.
          </p>
        </div>
      </section>

      {/* Feedback Cards */}
      <section className="py-16 flex-grow bg-[#F5F1E8]">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-4/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {displayFeedback.map((item) => (
                <Card key={item.id} className="border-l-4 border-rose-400 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-rose-300 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        {item.clientName && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                              Regarding: {item.clientName}
                            </span>
                            {item.month && (
                              <span className="text-xs text-gray-400">{item.month}</span>
                            )}
                          </div>
                        )}
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                          {item.message}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="font-semibold text-[#2C5F7F]">— {item.senderName}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {displayFeedback.length === 0 && !isLoading && (
            <div className="text-center py-16 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No feedback messages yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
