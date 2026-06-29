import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Sparkles, Zap, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { COMPANY, TEAM, STATS } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ROW Multi-Biz Prod. Global Company" },
      { name: "description", content: "Incorporated in Ado-Ekiti on October 9, 2018, ROW is a full-service multimedia production company leveraging emerging tech for the highest quality work." },
      { property: "og:title", content: "About ROW Multi-Biz Prod." },
      { property: "og:description", content: "Our story, mission and team — a creative studio rooted in Ado-Ekiti." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Award, title: "Best Quality Designs", text: "We don't ship until it meets the bar — every frame, file, and pixel." },
  { icon: Sparkles, title: "Experienced Professionals", text: "A team trained across photography, design, motion, and web." },
  { icon: Zap, title: "Result-Oriented Projects", text: "We measure success by the outcomes we deliver for our clients." },
  { icon: Users, title: "24/7 Live Support", text: "Warmth, friendliness, and responsiveness in every interaction." },
];

// Deterministic accent hue per team member
const hueFor = (name: string) => (name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 30) + 0;


function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="A creative engine in Ado-Ekiti." subtitle="Frames, brands, motion, code — built by a team that treats craft as non-negotiable." />

      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 text-lg leading-relaxed">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand)] font-semibold">Our Story</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">Built in Ekiti. Crafted for the world.</h2>
            <p className="text-muted-foreground">
              {COMPANY.name} was incorporated in Ado-Ekiti. We were registered on
              <span className="text-foreground font-semibold"> October 9, 2018</span>, and our
              current status is <span className="text-foreground font-semibold">ACTIVE</span>.
            </p>
            <p className="text-muted-foreground">
              We are a full-service multimedia production company dedicated to leveraging
              emerging technologies to provide the highest level of quality products and services
              — across photography, branding, design, animation, web, training, and print.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="pb-20 sm:pb-28 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          {[
            { label: "Mission", title: "The highest quality of customer service.", body: "Dedication to the highest quality of customer service delivered with a sense of warmth and friendliness — to create the most compelling company of the 21st century." },
            { label: "Founder", title: "Rawa Olabode Wilson — C.E.O.", body: "A passionate photographer with a strong interest in journalism, trained at the Nigeria Institute of Journalism (NIJ), Lagos. He further sharpened his craft during industrial training at a reputable media organization in Accra, Ghana — gaining hands-on experience with modern equipment that shapes the studio's standard today." },
          ].map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-10 rounded-3xl bg-[var(--ink)] text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--brand)] rounded-full opacity-30 blur-3xl" />
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-soft)] font-semibold relative">{c.label}</p>
              <h3 className="mt-4 text-3xl font-bold leading-tight relative">{c.title}</h3>
              <p className="mt-4 text-white/70 leading-relaxed relative">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand)] font-semibold mb-4">Values</p>
            <h2 className="text-4xl sm:text-5xl font-bold">What we stand for.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-7 rounded-2xl bg-card border border-border hover:border-[var(--brand)] transition group">
                  <div className="w-12 h-12 rounded-xl bg-brand-gradient grid place-items-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand)] font-semibold mb-4">The Team</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Crafted by people who care.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(160deg, oklch(0.45 0.20 ${hueFor(m.name)}), oklch(0.16 0.005 0))` }}>
                  <div className="absolute inset-0 grid place-items-center text-white/40 text-6xl font-display font-bold">{m.name.split(" ").map(w=>w[0]).join("")}</div>
                </div>
                <h3 className="mt-5 text-xl font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
          {/* Stats */}
          <div className="mt-20 grid sm:grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="p-8 rounded-2xl bg-secondary/50 border border-border text-center">
                <div className="text-5xl font-display font-bold text-[var(--brand)]">{s.value}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
