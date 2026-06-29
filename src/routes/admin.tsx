import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Upload, Lock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { listPortfolio, uploadPortfolio, deletePortfolio, type PortfolioImage } from "@/lib/portfolio";
import { PORTFOLIO_CATEGORIES, PHOTOGRAPHY_SUBCATEGORIES } from "@/lib/site";

const ADMIN_PASSWORD = "rowadmin2024";
const STORAGE_KEY = "row_admin_auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ROW Multi-Biz Prod." },
      { name: "description", content: "Portfolio admin panel." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <>
        <PageHero eyebrow="Restricted" title="Admin Access" subtitle="Enter the admin password to manage portfolio images." />
        <section className="py-20 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pw === ADMIN_PASSWORD) {
                sessionStorage.setItem(STORAGE_KEY, "1");
                setAuthed(true);
              } else toast.error("Incorrect password");
            }}
            className="max-w-md mx-auto px-5 sm:px-8 space-y-5 p-8 rounded-3xl bg-card border border-border"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient grid place-items-center text-white mx-auto"><Lock className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-center">Admin Login</h2>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-[var(--brand)] focus:outline-none"
            />
            <button className="w-full px-6 py-3 bg-brand-gradient text-white font-bold rounded-full shadow-brand">Unlock</button>
          </form>
        </section>
      </>
    );
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const [items, setItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function reload() {
    setLoading(true);
    try { setItems(await listPortfolio()); }
    catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { reload(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("file") as File;
    const title = String(fd.get("title") ?? "").trim();
    const category = String(fd.get("category") ?? "");
    if (!file || !file.size) { toast.error("Pick a file"); return; }
    if (!title) { toast.error("Add a title"); return; }
    if (!category) { toast.error("Pick a category"); return; }
    setUploading(true);
    try {
      await uploadPortfolio(file, title, category);
      toast.success("Uploaded!");
      (e.target as HTMLFormElement).reset();
      reload();
    } catch (err: any) { toast.error(err.message); }
    finally { setUploading(false); }
  }

  async function onDelete(item: PortfolioImage) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try { await deletePortfolio(item); toast.success("Deleted"); reload(); }
    catch (e: any) { toast.error(e.message); }
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="Portfolio Manager" subtitle="Upload, organize, and delete portfolio images." />
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-3 gap-10">
          <form onSubmit={onSubmit} className="lg:col-span-1 space-y-4 p-6 rounded-2xl bg-card border border-border h-fit sticky top-24">
            <h3 className="text-lg font-bold flex items-center gap-2"><Upload className="w-5 h-5 text-[var(--brand)]" /> New upload</h3>
            <label className="block">
              <span className="text-sm font-semibold mb-2 block">Title</span>
              <input name="title" required className="w-full px-3 py-2 rounded-lg bg-secondary border border-border" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold mb-2 block">Category</span>
              <select name="category" required className="w-full px-3 py-2 rounded-lg bg-secondary border border-border">
                <option value="">Choose…</option>
                {PORTFOLIO_CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold mb-2 block">Image</span>
              <input name="file" type="file" accept="image/*" required className="w-full text-sm" />
            </label>
            <button disabled={uploading} className="w-full px-5 py-3 bg-brand-gradient text-white font-bold rounded-full shadow-brand disabled:opacity-60">
              {uploading ? "Uploading…" : "Upload Image"}
            </button>
          </form>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">All images ({items.length})</h3>
            {loading ? (
              <div className="text-muted-foreground">Loading…</div>
            ) : items.length === 0 ? (
              <div className="text-muted-foreground p-8 rounded-2xl bg-card border border-border text-center">No images yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((it) => (
                  <div key={it.id} className="rounded-xl overflow-hidden bg-card border border-border group">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img src={it.displayUrl ?? it.url} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{it.title}</p>
                        <p className="text-xs text-[var(--brand)] uppercase tracking-wider">{it.category}</p>
                      </div>
                      <button onClick={() => onDelete(it)} aria-label="Delete" className="p-2 rounded-lg text-muted-foreground hover:text-[var(--brand)] hover:bg-secondary transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
