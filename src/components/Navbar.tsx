import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300",
      scrolled || open ? "bg-[oklch(0.10_0.005_0)/95] backdrop-blur-md border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between py-3">
        <Logo className="h-9" />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors",
                  active ? "text-[var(--brand)]" : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/booking"
            className="inline-flex items-center px-5 py-2.5 bg-brand-gradient text-white text-sm font-semibold rounded-full shadow-brand hover:opacity-90 transition"
          >
            Book Now
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[oklch(0.10_0.005_0)]">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "py-3 text-base font-medium",
                    active ? "text-[var(--brand)]" : "text-white/90"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/booking"
              className="mt-3 inline-flex items-center justify-center px-5 py-3 bg-brand-gradient text-white font-semibold rounded-full"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
