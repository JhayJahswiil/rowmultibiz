import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Upload, LogOut } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { listPortfolio, uploadPortfolio, deletePortfolio, type PortfolioImage } from "@/lib/portfolio";
import { PORTFOLIO_CATEGORIES, PHOTOGRAPHY_SUBCATEGORIES } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ROW Multi-Biz Prod." },
      { name: "description", content: "Portfolio admin panel." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  ssr: false,
  component: Admin,
});

type Status = "loading" | "unauthed" | "not-admin" | "ok";

function Admin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState<string>("");

  async function check() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setStatus("unauthed"); return; }
    setEmail(userData.user.email ?? "");
    const { data: roles, error } = await (supabase as any)
      .from("user_roles").select("role").eq("user_id", userData.user.id);
    if (error) { setStatus("not-admin"); return; }
    const isAdmin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
    setStatus(isAdmin ? "ok" : "not-admin");
  }

  useEffect(() => {
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") check();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (status === "unauthed") navigate({ to: "/auth", replace: true });
  }, [status, navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (status === "loading" || status === "unauthed") {
    return (
      <>
        <PageHero eyebrow="Admin" title="Checking access…" />
      </>
    );
  }

  if (status === "not-admin") {
    return (
      <>
        <PageHero eyebrow="Restricted" title="Not authorised" subtitle={`Signed in as ${email}. This account doesn't have the admin role yet.`} />
        <section className="py-16 bg-background">
          <div className="max-w-lg mx-auto px-5 sm:px-8 text-center space-y-4">
            <p className="text-muted-foreground">Ask the site owner to grant your account the admin role in the backend, then reload this page.</p>
            <button onClick={signOut} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/70 font-semibold">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </section>
      </>
    );
  }

  return <AdminPanel email={email} onSignOut={signOut} />;
}

function AdminPanel({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [items, setItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<string>("");

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
    const subcategory = String(fd.get("subcategory") ?? "");
    if (!file || !file.size) { toast.error("Pick a file"); return; }
    if (!title) { toast.error("Add a title"); return; }
    if (!category) { toast.error("Pick a category"); return; }
    if (category === "Photography" && !subcategory) { toast.error("Pick a photography subcategory"); return; }
    setUploading(true);
    try {
      await uploadPortfolio(file, title, category, category === "Photography" ? subcategory : null);
      toast.success("Uploaded!");
      (e.target as HTMLFormElement).reset();
      setCategory("");
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
      <PageHero eyebrow="Admin" title="Portfolio Manager" subtitle={`Signed in as ${email}`} />
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-end mb-6">
            <button onClick={onSignOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/70 font-semibold text-sm">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            <form onSubmit={onSubmit} className="lg:col-span-1 space-y-4 p-6 rounded-2xl bg-card border border-border h-fit sticky top-24">
              <h3 className="text-lg font-bold flex items-center gap-2"><Upload className="w-5 h-5 text-[var(--brand)]" /> New upload</h3>
              <label className="block">
                <span className="text-sm font-semibold mb-2 block">Title</span>
                <input name="title" required className="w-full px-3 py-2 rounded-lg bg-secondary border border-border" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold mb-2 block">Category</span>
                <select name="category" required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-secondary border border-border">
                  <option value="">Choose…</option>
                  {PORTFOLIO_CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
              {category === "Photography" && (
                <label className="block">
                  <span className="text-sm font-semibold mb-2 block">Photography Subcategory</span>
                  <select name="subcategory" required className="w-full px-3 py-2 rounded-lg bg-secondary border border-border">
                    <option value="">Choose…</option>
                    {PHOTOGRAPHY_SUBCATEGORIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </label>
              )}
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
                          <p className="text-xs text-[var(--brand)] uppercase tracking-wider">{it.category}{it.subcategory ? ` · ${it.subcategory}` : ""}</p>
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
        </div>
      </section>
    </>
  );
}
