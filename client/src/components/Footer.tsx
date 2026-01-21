import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a3d52] text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                <span className="font-bold">CSB</span>
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Commercial Shot Blasting
              </span>
            </div>
            <p className="text-white/70 text-sm">Professional shot blasting services across the UK.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/services/steel-shot-blasting" className="hover:text-white">Steel Shot Blasting</Link></li>
              <li><Link href="/services/concrete-preparation" className="hover:text-white">Concrete Preparation</Link></li>
              <li><Link href="/services/automotive-restoration" className="hover:text-white">Automotive Restoration</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link href="/service-areas" className="hover:text-white">Service Areas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="tel:07970566409" className="hover:text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  07970 566409
                </a>
              </li>
              <li>
                <a href="mailto:info@commercialshotblasting.co.uk" className="hover:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
              </li>
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
