import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ROW Multi-Biz Prod." },
      { name: "description", content: "Sign in to manage ROW Multi-Biz Prod." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin", replace: true });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) { toast.error(result.error.message ?? "Google sign-in failed"); return; }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <>
      <PageHero eyebrow="Restricted" title={mode === "signup" ? "Create account" : "Sign in"} subtitle="Sign in to manage portfolio, bookings, and messages." />
      <section className="py-16 bg-background">
        <div className="max-w-md mx-auto px-5 sm:px-8">
          <form onSubmit={onSubmit} className="space-y-5 p-8 rounded-3xl bg-card border border-border">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient grid place-items-center text-white mx-auto"><Lock className="w-6 h-6" /></div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-[var(--brand)] focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-[var(--brand)] focus:outline-none" />
            </div>
            <button disabled={busy} className="w-full px-6 py-3 bg-brand-gradient text-white font-bold rounded-full shadow-brand disabled:opacity-60">
              {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">or</span></div>
            </div>
            <button type="button" onClick={onGoogle} className="w-full px-6 py-3 rounded-full border border-border bg-secondary hover:bg-secondary/70 font-semibold transition">
              Continue with Google
            </button>
            <p className="text-sm text-center text-muted-foreground">
              {mode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
              <button type="button" onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="text-[var(--brand)] font-semibold">
                {mode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
