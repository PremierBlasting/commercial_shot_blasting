import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import { trackPhoneCall, trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="bg-[#1a3d52] text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                <span className="font-bold">CSB</span>
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Commercial Shot Blasting
              </span>
            </div>
            <p className="text-white/70 text-sm mb-4">Professional shot blasting services across the UK.</p>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="tel:07970566409" className="hover:text-white flex items-center gap-2" onClick={() => trackPhoneCall('07970566409', 'Footer')}>
                  <Phone className="w-4 h-4" />
                  07970 566409
                </a>
              </li>
              <li>
                <a href="mailto:info@commercialshotblasting.co.uk" className="hover:text-white flex items-center gap-2" onClick={() => trackEvent('email_click', { event_category: 'Contact', event_label: 'Footer Email', email: 'info@commercialshotblasting.co.uk' })}>
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column 1 */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/services" className="hover:text-white">All Services</Link></li>
              <li><Link href="/services/structural-steel-frames" className="hover:text-white">Structural Steel Frames</Link></li>
              <li><Link href="/services/steel-containers" className="hover:text-white">Steel Containers</Link></li>
              <li><Link href="/services/factory-cladding" className="hover:text-white">Factory & Warehouse Cladding</Link></li>
              <li><Link href="/services/fire-escapes" className="hover:text-white">Fire Escapes & Stair Towers</Link></li>
              <li><Link href="/services/staircases" className="hover:text-white">Internal Staircases</Link></li>
              <li><Link href="/services/bridge-steelwork" className="hover:text-white">Bridge Steelwork</Link></li>
              <li><Link href="/services/ladders" className="hover:text-white">Fixed Ladders</Link></li>
              <li><Link href="/services/warehouse-racking" className="hover:text-white">Warehouse Racking</Link></li>
            </ul>
          </div>

          {/* Services Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">&nbsp;</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/services/pipework" className="hover:text-white">Process Pipework</Link></li>
              <li><Link href="/services/telecom-towers" className="hover:text-white">Telecom Masts & Towers</Link></li>
              <li><Link href="/services/floor-preparation" className="hover:text-white">Floor Preparation</Link></li>
              <li><Link href="/services/powder-coating" className="hover:text-white">Shot Blasting & Powder Coating</Link></li>
              <li><Link href="/services/commercial-radiators" className="hover:text-white">Commercial Radiators</Link></li>
              <li><Link href="/services/commercial-vehicles" className="hover:text-white">Commercial Vehicles</Link></li>
              <li><Link href="/services/steel-doors" className="hover:text-white">Steel Doors & Roller Shutters</Link></li>
              <li><Link href="/services/steel-sheeting" className="hover:text-white">Steel Sheeting</Link></li>
              <li><Link href="/services/steel-gates" className="hover:text-white">Steel Gates & Railings</Link></li>
              <li><Link href="/services/plant-machinery" className="hover:text-white">Plant & Machinery</Link></li>
            </ul>
          </div>

          {/* Industries & Company */}
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/industries/construction" className="hover:text-white">Construction</Link></li>
              <li><Link href="/industries/manufacturing" className="hover:text-white">Manufacturing</Link></li>
              <li><Link href="/industries/retail" className="hover:text-white">Retail</Link></li>
              <li><Link href="/industries/aerospace" className="hover:text-white">Aerospace</Link></li>
              <li><Link href="/industries/marine" className="hover:text-white">Marine</Link></li>
              <li><Link href="/industries/agriculture" className="hover:text-white">Agriculture</Link></li>
              <li><Link href="/industries/transport-logistics" className="hover:text-white">Transport & Logistics</Link></li>
              <li><Link href="/industries/heritage-restoration" className="hover:text-white">Heritage & Restoration</Link></li>
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Company</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/our-work" className="hover:text-white">Our Work</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/service-areas" className="hover:text-white">All Service Areas</Link></li>
              <li><Link href="/service-areas/birmingham" className="hover:text-white">Birmingham</Link></li>
              <li><Link href="/service-areas/nottingham" className="hover:text-white">Nottingham</Link></li>
              <li><Link href="/service-areas/leicester" className="hover:text-white">Leicester</Link></li>
              <li><Link href="/service-areas/derby" className="hover:text-white">Derby</Link></li>
              <li><Link href="/service-areas/coventry" className="hover:text-white">Coventry</Link></li>
              <li><Link href="/service-areas/wolverhampton" className="hover:text-white">Wolverhampton</Link></li>
              <li><Link href="/service-areas/manchester" className="hover:text-white">Manchester</Link></li>
              <li><Link href="/service-areas/liverpool" className="hover:text-white">Liverpool</Link></li>
              <li><Link href="/service-areas/sheffield" className="hover:text-white">Sheffield</Link></li>
              <li><Link href="/service-areas/leeds" className="hover:text-white">Leeds</Link></li>
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Legal</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/70 text-sm">
            © 2024 Commercial Shot Blasting. All rights reserved. | Serving the UK
          </p>
        </div>
      </div>
    </footer>
  );
}
