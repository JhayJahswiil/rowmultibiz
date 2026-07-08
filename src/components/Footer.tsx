import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, X, MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SERVICES, COMPANY } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-10" />
          <p className="mt-5 text-sm text-white/60 leading-relaxed">
            Full-service multimedia production company in Ado-Ekiti. Capturing moments,
            building brands, creating impact.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Facebook, label: "Facebook", href: "https://web.facebook.com/Rowphotographyng" },
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/rowphotographyng/" },
              { Icon: X, label: "X", href: "https://x.com/olabodewilson" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/olabode-rawa-4a256376" },
            ].map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer noopener" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center hover:bg-[var(--brand)] hover:border-[var(--brand)] transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[var(--brand-soft)] transition">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/booking" className="hover:text-[var(--brand-soft)] transition">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-[var(--brand-soft)] transition">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-[var(--brand)]" /> {COMPANY.location}</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-[var(--brand)]" /> <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--brand-soft)] transition break-all">{COMPANY.email}</a></li>
            <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-[var(--brand)]" /> {COMPANY.phone}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Incorporated {COMPANY.incorporated} · Status: {COMPANY.status}</p>
        </div>
      </div>
    </footer>
  );
}
