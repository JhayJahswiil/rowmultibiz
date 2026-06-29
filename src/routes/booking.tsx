import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — ROW Multi-Biz Prod." },
      { name: "description", content: "Book a photography, branding, design, animation, web design, training, printing or lamination appointment with ROW Multi-Biz Prod." },
      { property: "og:title", content: "Book an Appointment — ROW Multi-Biz Prod." },
      { property: "og:description", content: "Pick your service, pick a date, and let's create." },
    ],
  }),
  component: Booking,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1, "Phone is required").max(40),
  service: z.string().min(1, "Select a service"),
  preferred_date: z.string().min(1, "Pick a date"),
  notes: z.string().trim().max(2000).optional(),
});

function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await (supabase as any).from("bookings").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit booking. Please try again.");
      return;
    }
    toast.success("Booking received! We'll confirm by email.");
    setConfirmed(true);
  }

  return (
    <>
      <PageHero eyebrow="Appointments" title="Book an Appointment" subtitle="Pick a service and a date — we'll confirm by email within one business day." />

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {confirmed ? (
            <div className="text-center p-12 rounded-3xl bg-card border border-border">
              <CheckCircle2 className="w-16 h-16 text-[var(--brand)] mx-auto" />
              <h2 className="mt-6 text-3xl font-bold">Booking confirmed!</h2>
              <p className="mt-3 text-muted-foreground">We've received your request and will be in touch shortly to lock in the details.</p>
              <button onClick={() => setConfirmed(false)} className="mt-6 px-6 py-3 border border-border rounded-full font-semibold hover:bg-secondary transition">
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 p-8 sm:p-10 rounded-3xl bg-card border border-border">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone Number" name="phone" type="tel" required />
                <SelectField label="Service" name="service" required>
                  <option value="">Choose a service…</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                </SelectField>
              </div>
              <Field label="Preferred Date" name="preferred_date" type="date" required />
              <Field label="Additional Notes" name="notes" textarea />
              <button disabled={submitting} className="w-full px-7 py-4 bg-brand-gradient text-white font-bold rounded-full shadow-brand hover:scale-[1.01] transition disabled:opacity-60">
                {submitting ? "Submitting…" : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, textarea }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 transition";
  return (
    <label className="block">
      <span className="text-sm font-semibold mb-2 block">{label}{required && <span className="text-[var(--brand)]"> *</span>}</span>
      {textarea ? <textarea name={name} rows={4} required={required} className={cls} /> : <input name={name} type={type} required={required} className={cls} />}
    </label>
  );
}

function SelectField({ label, name, required, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) {
  const cls = "w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 transition";
  return (
    <label className="block">
      <span className="text-sm font-semibold mb-2 block">{label}{required && <span className="text-[var(--brand)]"> *</span>}</span>
      <select name={name} required={required} className={cls}>{children}</select>
    </label>
  );
}
