import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const CAROUSEL_REVIEWS = [
  {
    id: 1,
    name: "Jordan King",
    tag: "Factory Owner",
    text: "Really happy with this team. Our factory cladding had original plastisol and multiple layers of paint. It turned out to be a much more difficult job than expected but Graham didn't let us down and put in extra hours to make sure we stayed in budget. The surfaces were left flawless.",
    project: "Factory Cladding Blasting",
  },
  {
    id: 2,
    name: "Joshua Ball",
    tag: "Commercial Retail Fit-Out",
    text: "Really pleased with how the team worked with us whilst refurbishing and fitting out a new commercial retail premises. Dave, Nick, Ben and Alfie worked tirelessly to ensure we achieved the outcome we needed on the internal brickwork and oak beams. Fantastic work!",
    project: "Commercial Retail Premises",
  },
  {
    id: 3,
    name: "jaydon amin",
    tag: "Commercial Unit Owner",
    text: "We used this service for our commercial unit. After the first day I was worried they wouldn't be able to finish the job in the 2 days we had booked, but they stayed an extra 5 hours past finishing time to complete our job. Absolutely outstanding commitment.",
    project: "Commercial Unit Blasting",
  },
  {
    id: 4,
    name: "mike slough",
    tag: "Workshop Owner",
    text: "Charlie, James and Sam came to site today to strip some horrible paint from our workshop walls. It was a delight to have them on site. They turned up exactly on time, were very polite and knowledgeable and worked incredibly hard.",
    project: "Workshop Wall Stripping",
  },
  {
    id: 5,
    name: "Kathleen Harris Powell",
    tag: "Verified Customer",
    text: "Fantastic service. The team on site worked really hard and left it spotless. The communication from the company was also excellent. I would highly recommend this company.",
    project: "Commercial Shot Blasting",
  },
  {
    id: 6,
    name: "christina henry",
    tag: "Listed Building Project",
    text: "Amazing service — Nick worked incredibly hard and left after a super clean up. Chris supported our listed application, supplied additional docs and went way beyond. Fantastic, considerate and professional company. Highly recommend.",
    project: "Heritage Surface Preparation",
  },
  {
    id: 7,
    name: "Richard Gray",
    tag: "Verified Customer",
    text: "Andrew was excellent. The work was completed to the highest standard and the site was left clean and tidy. Communication throughout was first class. Would not hesitate to recommend to anyone.",
    project: "Industrial Surface Blasting",
  },
];

export function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const prev = useCallback(() => {
    goTo((current - 1 + CAROUSEL_REVIEWS.length) % CAROUSEL_REVIEWS.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % CAROUSEL_REVIEWS.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % CAROUSEL_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const review = CAROUSEL_REVIEWS[current];

  return (
    <section className="py-20 bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] text-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-[#7EC8E3] font-medium mb-2 uppercase tracking-widest text-sm">Verified Google Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted by Commercial Clients Across the UK
          </h2>
          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5 border border-white/20">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold">5.0</span>
            <span className="text-white/60 text-sm">·</span>
            <span className="text-white/80 text-sm">14 commercial reviews</span>
            <a
              href="https://g.co/kgs/commercialshotblasting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="View on Google"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Review card */}
          <div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 min-h-[220px] transition-opacity duration-200"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            <Quote className="w-10 h-10 text-yellow-400/30 mb-4" />
            <p className="text-white/90 text-lg md:text-xl leading-relaxed italic mb-6">
              "{review.text}"
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-white">{review.name}</p>
                <p className="text-white/60 text-sm">{review.tag}</p>
              </div>
              <span className="text-xs bg-white/10 text-white/70 px-3 py-1.5 rounded-full border border-white/20">
                {review.project}
              </span>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {CAROUSEL_REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-yellow-400"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/reviews">
            <span className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors cursor-pointer underline underline-offset-4">
              Read all commercial reviews <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
