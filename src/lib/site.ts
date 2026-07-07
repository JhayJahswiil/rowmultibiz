import {
  Camera, Palette, PenTool, Film, Globe, GraduationCap, Printer, Layers,
} from "lucide-react";

export const SERVICES = [
  {
    slug: "photography",
    title: "Photography",
    icon: Camera,
    short:
      "Portraits, weddings, family sessions, corporate shoots and events — captured with cinematic clarity, honest emotion, and a colour language that makes each frame feel timeless.",
    long: "From intimate portraits and full-scale weddings to family reunions, burials, product shoots and corporate conferences, our photographers work with modern full-frame kits and studio-grade lighting to capture story-first images. Every shoot is planned around your narrative — pre-shoot consultation, curated shot list, professional retouching, cloud gallery delivery, and archival prints available on request.",
  },
  {
    slug: "branding",
    title: "Branding",
    icon: Palette,
    short:
      "Strategy, identity systems, and brand guidelines that make your business unmistakable across every marketing touchpoint — from packaging to digital.",
    long: "We design cohesive brand systems that live beyond the logo: positioning workshops, verbal identity, logo suites, colour and typography systems, iconography, brand guidelines, social templates, packaging, and campaign toolkits. Whether you're launching from scratch or repositioning, we build a brand that shows up consistently and confidently across print, digital, and environment.",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    icon: PenTool,
    short:
      "Advertisements, brochures, magazines, pitch decks and annual reports — visual systems that translate complex ideas into work people actually want to read.",
    long: "Editorial layouts, marketing collateral, annual reports, magazines, pitch decks, event backdrops, roll-up banners, flyers, invitations and infographics — we craft print-ready and screen-ready artwork with typographic care and grid discipline. Every deliverable is designed for its context, prepared with correct bleeds, colour profiles, and export standards for flawless production.",
  },
  {
    slug: "animations",
    title: "Animations",
    icon: Film,
    short:
      "2D motion graphics, explainer videos and product animations that transform static ideas into scroll-stopping stories.",
    long: "We produce 2D motion graphics, animated logo stings, explainer videos, kinetic typography, social reels, and 3D product animations. From storyboard and script to sound design and final delivery in every aspect ratio you need (16:9, 9:16, 1:1, 4:5), our motion team turns still concepts into memorable moving stories.",
  },
  {
    slug: "website-design",
    title: "Website Design",
    icon: Globe,
    short:
      "Modern, fast, mobile-first websites — from portfolio sites and landing pages to full e-commerce and booking platforms.",
    long: "We deliver full-cycle web experiences: UX research, wireframes, high-fidelity design, responsive development, CMS integration, e-commerce, booking systems, and SEO-ready implementation. Built on modern stacks (React, TanStack Start, Supabase), your site is fast, secure, accessible, and ready to convert visitors into customers on any device.",
  },
  {
    slug: "training",
    title: "Training",
    icon: GraduationCap,
    short:
      "Hands-on training in Photography, Graphic Design, Animation and Web Design — small classes, real projects, career-ready portfolios.",
    long: "Structured programmes in Photography, Graphic Design, Animations, and Website Design taught by working professionals. Cohorts are small, project-based, and portfolio-focused so you graduate with real work, real feedback, and real employability. Weekend and weekday tracks available, with internship placements for top students.",
  },
  {
    slug: "printing",
    title: "Printing",
    icon: Printer,
    short:
      "Professional printing — flyers, banners, business cards, books, ID cards and large-format — with consistent colour and premium finishes.",
    long: "Digital and offset printing for business cards, flyers, brochures, catalogues, magazines, roll-up banners, backdrops, ID cards, invitations, and books. We colour-match against your brand palette, offer premium stocks and finishes (matte, gloss, spot UV, foil), and can turn around rush jobs when deadlines are tight.",
  },
  {
    slug: "lamination",
    title: "Lamination",
    icon: Layers,
    short:
      "Professional lamination for documents, IDs, certificates and menus — durable, water-resistant, and beautifully finished.",
    long: "Matte and glossy lamination for IDs, certificates, menus, tags, licences, business cards, and important documents. We offer standard pouch lamination and heavy-duty roll lamination — protecting your prints from water, tear, and fading so they stay looking new for years.",
  },
] as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export const COMPANY = {
  name: "ROW Multi-Biz Prod. Global Company",
  short: "ROW",
  address: "Obafemi Awolowo Civic Centre, Fajuyi, Ado-Ekiti",
  location: "Ado-Ekiti, Ekiti State, Nigeria",
  email: "olabodewilson@gmail.com",
  phone: "+234 806 229 8842",
  phoneShort: "08062298842",
  whatsapp: "https://wa.me/2348062298842",
  incorporated: "October 9, 2018",
  status: "ACTIVE",
};

export const TEAM = [
  { name: "Rawa Olabode Wilson", role: "C.E.O / Founder" },
  { name: "Ayodeji Michael Olajide", role: "Supervisor" },
  { name: "Kemisola Ajayi", role: "Accountant" },
  { name: "Johnson Abioye", role: "Receptionist" },
  { name: "Joshua Isedowo", role: "Dispatcher" },
  { name: "Oluwatoyin Akinlua", role: "Web Developer" },
  { name: "Emmanuel Oluwatosin Dada", role: "Studio Photographer" },
] as const;

export const STATS = [
  { value: "100+", label: "Satisfied Clients" },
  { value: "100+", label: "Projects Completed" },
  { value: "10", label: "Accolades Earned" },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "All", "Photography", "Branding", "Graphic Design", "Animations", "Web Design", "Print",
] as const;

export const PHOTOGRAPHY_SUBCATEGORIES = [
  "Portraits",
  "Men at Work",
  "Candid Shot",
  "Landscape",
  "Wedding Events",
  "Burial Events",
] as const;
