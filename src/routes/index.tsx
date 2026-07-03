import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SERVICES, COMPANY } from "@/lib/site";
import { listPortfolio, type PortfolioImage } from "@/lib/portfolio";
import heroImg from "@/assets/hero-photographer.jpg";
import studioImg from "@/assets/about-studio.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROW Multi-Biz Prod. — Capturing Moments. Building Brands." },
      { name: "description", content: "Full-service multimedia production company in Ado-Ekiti, Nigeria. Photography, branding, design, animations, web design, training, printing & lamination." },
      { property: "og:title", content: "ROW Multi-Biz Prod. Global Company" },
      { property: "og:description", content: "Capturing moments. Building brands. Creating impact." },
    ],
  }),
  component: Home,
});

const ROTATING_WORDS = ["Brands.", "Businesses.", "Organizations."];

function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-55" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/80 to-[var(--ink)]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/30 to-[var(--ink)]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-32 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[var(--brand-soft)] mb-6 font-medium">
              {"\n"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight"
            >
              Capturing Moments.<br/>
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
                <span>Building</span>
                <span className="relative inline-block align-baseline overflow-hidden text-left" style={{ minWidth: "6ch" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIdx]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                      className="inline-block text-[var(--brand)] whitespace-nowrap"
                    >
                      {ROTATING_WORDS[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span><br/>
              Creating Impact.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mx-auto">
              Full-service multimedia production company in Ado-Ekiti, Nigeria — pairing
              emerging technology with creative craft to deliver work that moves people.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gradient text-white font-semibold rounded-full shadow-brand hover:scale-[1.02] transition">
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-[var(--ink)] transition">
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated red bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gradient origin-left"
        />
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand)] font-semibold mb-4">Who We Are</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">A creative studio built for the new media era.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                {COMPANY.name} was incorporated in Ado-Ekiti and registered on
                <span className="text-foreground font-semibold"> October 9, 2018</span>, with an
                <span className="text-foreground font-semibold"> ACTIVE</span> status.
              </p>
              <p>
                We're a full-service multimedia production company dedicated to leveraging
                emerging technologies to provide the highest level of quality products and services
                — from frames and brand systems to motion, code, and craft.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { k: "8", v: "Services" },
                { k: "2018", v: "Founded" },
                { k: "100%", v: "Active" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-3xl font-bold text-[var(--brand)]">{s.k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative flex justify-center items-center">
            <div className="absolute -inset-4 bg-brand-gradient rounded-2xl opacity-30 blur-2xl" />
            <img src={studioImg} alt="ROW studio workspace" className="relative rounded-2xl w-full max-w-md h-auto max-h-[380px] sm:max-h-[420px] lg:max-h-[480px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 sm:py-32 bg-[var(--ink)] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-soft)] font-semibold mb-4">What We Do</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-xl">Eight disciplines. One creative engine.</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-[var(--brand-soft)] hover:text-white flex items-center gap-2">
              Explore all services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[var(--brand)] hover:bg-[var(--brand)]/10 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-[var(--brand-soft)] group-hover:text-white transition" />
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.short}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <PortfolioTeaser />

      {/* CTA BANNER */}
      <section className="bg-brand-gradient py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-white text-center lg:text-left">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">Ready to work with us?</h2>
            <p className="mt-3 text-white/90 text-lg">Book your appointment today and let's create something unforgettable.</p>
          </div>
          <Link to="/booking" className="inline-flex shrink-0 items-center gap-2 px-8 py-4 bg-white text-[var(--brand)] font-bold rounded-full hover:scale-[1.03] transition">
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PortfolioTeaser() {
  const [items, setItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listPortfolio()
      .then((all) => {
        if (cancelled) return;
        // Pick one image from as many distinct buckets as possible
        // (photography subcategories first, then other categories) so the
        // teaser reflects the range of work rather than a single tab.
        const buckets = new Map<string, PortfolioImage[]>();
        for (const it of all) {
          const key =
            it.category === "Photography" && it.subcategory
              ? `Photography:${it.subcategory}`
              : it.category;
          if (!buckets.has(key)) buckets.set(key, []);
          buckets.get(key)!.push(it);
        }
        const picked: PortfolioImage[] = [];
        const used = new Set<string>();
        // Round-robin across buckets until we have 6 (or run out).
        let progress = true;
        while (picked.length < 6 && progress) {
          progress = false;
          for (const [key, list] of buckets) {
            if (picked.length >= 6) break;
            const next = list.find((i) => !used.has(i.id));
            if (next) {
              picked.push(next);
              used.add(next.id);
              progress = true;
            }
            void key;
          }
        }
        setItems(picked);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const ratios = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-square"];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand)] font-semibold mb-4">Selected Work</p>
            <h2 className="text-4xl sm:text-5xl font-bold">A glimpse of the craft.</h2>
          </div>
          <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-white font-semibold rounded-full hover:bg-[var(--brand)] transition">
            View All Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {!loading && items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No work uploaded yet. Add images via <Link to="/portfolio" className="text-[var(--brand)] font-semibold">the gallery</Link>.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
            {(loading ? Array.from({ length: 6 }) : items).map((it, i) => {
              const item = it as PortfolioImage | undefined;
              const ratio = ratios[i % ratios.length];
              return (
                <motion.div
                  key={item?.id ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className={`relative ${ratio} rounded-xl overflow-hidden group break-inside-avoid bg-[var(--ink)]/10`}
                >
                  {item && (
                    <>
                      <img
                        src={item.displayUrl ?? item.url}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/50 transition flex items-end p-5">
                        <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                          <p className="text-white font-semibold">{item.title}</p>
                          <p className="text-white/70 text-sm">{item.subcategory ?? item.category}</p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

