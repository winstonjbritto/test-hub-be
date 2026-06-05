import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react"

const CrossIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
    <circle cx="16" cy="16" r="15" fill="rgba(167,139,250,0.15)" />
    <rect x="14" y="6" width="4" height="20" rx="1" fill="#a78bfa" />
    <rect x="8" y="12" width="16" height="4" rx="1" fill="#a78bfa" />
  </svg>
)

export function CommonFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Top CTA Band */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Stay updated with your parish</h3>
              <p className="text-slate-400 text-sm">Get notified about Mass times, events and spiritual content.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-64 transition-colors duration-200"
              />
              <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-xl transition-colors duration-200 flex items-center gap-2 flex-shrink-0">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <CrossIcon />
              <div>
                <div className="font-bold text-lg text-white leading-tight">Catholic Portal</div>
                <div className="text-xs text-purple-400 leading-tight">Connecting the Faithful</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Connecting Catholic communities worldwide through faith, fellowship, and service. Find your parish, join events and grow in faith.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 rounded-xl px-4 py-3 w-fit border border-white/10">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span>Chat Support Available</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: "Find Churches", href: "/churches" },
                { label: "Mass Timings", href: "/masses" },
                { label: "Saints", href: "/saints" },
                { label: "Blogs", href: "/blogs" },
                { label: "Events", href: "/events" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-4">
              <a href="mailto:info@catholicportal.com" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-white/10 group-hover:bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm pt-1.5">info@catholicportal.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-white/10 group-hover:bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm pt-1.5">+1 (555) 123-4567</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm pt-1.5">123 Faith Street, Holy City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Catholic Portal. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with faith for the global Catholic community
          </p>
        </div>
      </div>
    </footer>
  )
}
