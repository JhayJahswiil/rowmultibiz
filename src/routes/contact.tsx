import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ROW Multi-Biz Prod." },
      { name: "description", content: "Get in touch with ROW Multi-Biz Prod. Global Company in Ado-Ekiti — let's build something together." },
      { property: "og:title", content: "Get in Touch — ROW Multi-Biz Prod." },
      { property: "og:description", content: "Reach out to ROW Multi-Biz Prod. for photography, branding, design, motion, web, training and print." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await (supabase as any).from("contact_submissions").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Thanks — we'll be in touch shortly.");
    setDone(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Get In Touch" subtitle="Tell us about your project — we typically respond within 24 hours." />

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="space-y-5 p-8 sm:p-10 rounded-3xl bg-card border border-border">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" name="name" required />
                <Field label="Email Address" name="email" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Subject" name="subject" />
              </div>
              <Field label="Message" name="message" required textarea />
              <button
                disabled={submitting}
                className="w-full px-7 py-4 bg-brand-gradient text-white font-bold rounded-full shadow-brand hover:scale-[1.01] transition disabled:opacity-60"
              >
                {submitting ? "Sending…" : done ? "Sent ✓ Send another?" : "Send Message"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { Icon: MapPin, label: "Location", value: COMPANY.address },
              { Icon: Mail, label: "Email", value: COMPANY.email },
              { Icon: Phone, label: "Phone", value: COMPANY.phone },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="p-6 rounded-2xl bg-[var(--ink)] text-white">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient grid place-items-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--brand-soft)] font-semibold">{label}</p>
                <p className="mt-1 text-lg font-semibold">{value}</p>
              </div>
            ))}
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                title="Ado-Ekiti map"
                src="https://www.google.com/maps?q=Ado-Ekiti,Ekiti+State,Nigeria&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
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
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
