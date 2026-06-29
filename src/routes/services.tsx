import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ROW Multi-Biz Prod." },
      { name: "description", content: "Photography, branding, graphic design, animations, website design, training, printing and lamination — under one roof." },
      { property: "og:title", content: "Our Services — ROW Multi-Biz Prod." },
      { property: "og:description", content: "Full-service multimedia production: from frames to brand systems, motion, and code." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="What We Do" title="Our Services" subtitle="Eight disciplines under one roof — built to handle your project end-to-end." />

      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-card border border-border hover:border-[var(--brand)] hover:shadow-brand transition-all"
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-2">
                    <div className="w-16 h-16 rounded-2xl bg-brand-gradient grid place-items-center text-white">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                      {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="text-3xl sm:text-4xl font-bold leading-tight">{s.title}</h3>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{s.long}</p>
                    <Link to="/booking" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:gap-3 transition-all">
                      Book this service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">Need a custom package?</h2>
          <p className="mt-5 text-white/70 text-lg">Mix and match services or scope something completely custom — let's talk.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-brand-gradient text-white font-bold rounded-full shadow-brand hover:scale-[1.03] transition">
            Contact us today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
