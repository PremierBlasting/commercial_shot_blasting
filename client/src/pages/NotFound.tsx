/**
 * Custom 404 page for Commercial Shot Blasting.
 *
 * Provides:
 *  - Clear 404 messaging with brand styling
 *  - Quick-access links to popular service pages
 *  - Full county grid so users can find their nearest coverage area
 *  - Phone / WhatsApp CTAs
 */

import { Link } from "wouter";
import { Phone, MessageCircle, ArrowLeft, MapPin, Wrench, Building2 } from "lucide-react";

const PHONE = "01543 222 777";
const PHONE_RAW = "01543222777";
const WHATSAPP = "447970566409";
const WA_MSG = encodeURIComponent("Hi, I couldn't find what I was looking for. Could you help?");

// All 35 counties with their slugs
const COUNTIES = [
  { name: "Bedfordshire", slug: "bedfordshire" },
  { name: "Berkshire", slug: "berkshire" },
  { name: "Buckinghamshire", slug: "buckinghamshire" },
  { name: "Cambridgeshire", slug: "cambridgeshire" },
  { name: "Cheshire", slug: "cheshire" },
  { name: "County Durham", slug: "durham" },
  { name: "Cumbria", slug: "cumbria" },
  { name: "Derbyshire", slug: "derbyshire" },
  { name: "East Wales", slug: "east-wales" },
  { name: "Essex", slug: "essex" },
  { name: "Gloucestershire", slug: "gloucestershire" },
  { name: "Hampshire", slug: "hampshire" },
  { name: "Herefordshire", slug: "herefordshire" },
  { name: "Hertfordshire", slug: "hertfordshire" },
  { name: "Lancashire", slug: "lancashire" },
  { name: "Leicestershire", slug: "leicestershire" },
  { name: "Lincolnshire", slug: "lincolnshire" },
  { name: "Norfolk", slug: "norfolk" },
  { name: "North Devon", slug: "north-devon" },
  { name: "North Yorkshire", slug: "north-yorkshire" },
  { name: "Northamptonshire", slug: "northamptonshire" },
  { name: "Northumberland", slug: "northumberland" },
  { name: "Nottinghamshire", slug: "nottinghamshire" },
  { name: "Shropshire", slug: "shropshire" },
  { name: "Somerset", slug: "somerset" },
  { name: "South Yorkshire", slug: "south-yorkshire" },
  { name: "Staffordshire", slug: "staffordshire" },
  { name: "Suffolk", slug: "suffolk" },
  { name: "Tyne & Wear", slug: "tyne-and-wear" },
  { name: "Warwickshire", slug: "warwickshire" },
  { name: "West Midlands", slug: "west-midlands" },
  { name: "West Yorkshire", slug: "west-yorkshire" },
  { name: "Wiltshire", slug: "wiltshire" },
  { name: "Worcestershire", slug: "worcestershire" },
  { name: "Greater Manchester", slug: "greater-manchester" },
];

const POPULAR_SERVICES = [
  { name: "Structural Steel Blasting", slug: "structural-steel-shot-blasting" },
  { name: "Container Shot Blasting", slug: "container-shot-blasting" },
  { name: "Factory Cladding Blasting", slug: "factory-cladding-shot-blasting" },
  { name: "Floor Shot Blasting", slug: "floor-shot-blasting" },
  { name: "Rust Removal", slug: "rust-removal" },
  { name: "Mobile Shot Blasting", slug: "mobile-shot-blasting" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white">
      {/* Top nav strip */}
      <div className="border-b border-white/10 px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </Link>
        <span className="text-white/20">|</span>
        <span className="text-white/50 text-sm">Commercial Shot Blasting</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Hero section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-sm font-medium mb-6">
            <span>404 — Page Not Found</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            We couldn&apos;t find<br />
            <span className="text-orange-500">that page</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            The page you&apos;re looking for may have moved or no longer exists.
            Try one of the links below to find what you need.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Building2 className="w-4 h-4" />
              Go to Homepage
            </Link>
            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              {PHONE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-semibold px-6 py-3 rounded-lg transition-colors border border-[#25D366]/30"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Popular services */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Popular Services</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {POPULAR_SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 rounded-lg px-4 py-3 text-sm text-white/80 hover:text-white transition-all group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-orange-400 flex-shrink-0" />
                {svc.name}
              </Link>
            ))}
          </div>
        </div>

        {/* County coverage grid */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Find Shot Blasting Near You</h2>
          </div>
          <p className="text-white/50 text-sm mb-5">
            We cover all of England and Wales. Select your county to see local coverage.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {[...COUNTIES].sort((a, b) => a.name.localeCompare(b.name)).map((county) => (
              <Link
                key={county.slug}
                href={`/counties/${county.slug}`}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500/40 rounded-md px-3 py-2 text-xs text-white/70 hover:text-white transition-all"
              >
                <MapPin className="w-3 h-3 text-orange-500/70 flex-shrink-0" />
                {county.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom helpful links */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-center text-sm text-white/50">
          <Link href="/services" className="hover:text-white transition-colors">All Services</Link>
          <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/free-site-survey" className="hover:text-white transition-colors">Site Survey</Link>
        </div>
      </div>
    </div>
  );
}
