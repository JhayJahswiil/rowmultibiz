import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PORTFOLIO_CATEGORIES, PHOTOGRAPHY_SUBCATEGORIES } from "@/lib/site";
import { listPortfolio, type PortfolioImage } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — ROW Multi-Biz Prod." },
      { name: "description", content: "A gallery of selected work from ROW Multi-Biz Prod. — photography, branding, design, motion, web, and print." },
      { property: "og:title", content: "Our Work — ROW Multi-Biz Prod." },
      { property: "og:description", content: "Selected work across photography, branding, design, animation, web, and print." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [items, setItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<PortfolioImage | null>(null);

  useEffect(() => {
    listPortfolio()
      .then(setItems)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => category === "All" ? items : items.filter((i) => i.category === category),
    [items, category]
  );

  return (
    <>
      <PageHero eyebrow="Selected Work" title="Our Work" subtitle="A curated look at recent projects across every discipline." />

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition",
                  category === c
                    ? "bg-[var(--brand)] text-white"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading portfolio…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-semibold">No work yet in this category.</p>
              <p className="text-muted-foreground mt-2 text-sm">Upload images via the <code className="bg-secondary px-2 py-0.5 rounded">/admin</code> panel.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  onClick={() => setLightbox(item)}
                  className="block break-inside-avoid w-full rounded-xl overflow-hidden group relative"
                >
                  <img src={item.displayUrl ?? item.url} alt={item.title} loading="lazy" className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-5 text-left">
                    <div>
                      <p className="text-white font-bold">{item.title}</p>
                      <p className="text-[var(--brand-soft)] text-xs uppercase tracking-wider mt-1">{item.category}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 text-white/80 hover:text-white" onClick={() => setLightbox(null)}><X className="w-8 h-8" /></button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox.displayUrl ?? lightbox.url}
              alt={lightbox.title}
              className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
              <p className="font-bold text-lg">{lightbox.title}</p>
              <p className="text-[var(--brand-soft)] text-sm uppercase tracking-wider">{lightbox.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
