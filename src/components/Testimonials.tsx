import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Adaeze Okoro",
    role: "Bride, Lagos",
    rating: 5,
    quote:
      "ROW captured our wedding with a cinematic touch we didn't know was possible. Every frame feels like a memory reborn — the team was warm, professional, and unbelievably fast with delivery.",
  },
  {
    name: "Femi Balogun",
    role: "Founder, Kraft & Co.",
    rating: 5,
    quote:
      "Our entire brand system — logo, deck, socials, print — came alive under their direction. We now walk into rooms with a visual identity that speaks before we do.",
  },
  {
    name: "Chinaza Umeh",
    role: "Marketing Lead, Belrose",
    rating: 5,
    quote:
      "The animation reel they produced for our product launch outperformed every ad we've ever run. Craft, timing, storytelling — top tier.",
  },
  {
    name: "Pastor Segun A.",
    role: "Event Convener",
    rating: 5,
    quote:
      "From coverage to prints, ROW handled our anniversary end-to-end. Sharp images, beautiful lamination, on-time delivery. This is what excellence looks like.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--brand)] rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--brand)] rounded-full opacity-10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-soft)] font-semibold mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Loved by clients across Nigeria.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Real words from the people we've had the privilege to create for.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[var(--brand)] hover:bg-white/[0.06] transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[var(--brand)] opacity-70" />
              <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-[var(--brand)] text-[var(--brand)]" />
                ))}
              </div>
              <blockquote className="mt-4 text-white/80 leading-relaxed text-[15px]">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-white/50">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
