import {
  Camera, Palette, PenTool, Film, Globe, GraduationCap, Printer, Layers,
} from "lucide-react";

export const SERVICES = [
  {
    slug: "photography",
    title: "Photography",
    icon: Camera,
    short: "Portrait, weddings, family, and event photography.",
    long: "From portraits and weddings to family reunions and corporate events, our team captures the moments that matter with cinematic clarity and intention.",
  },
  {
    slug: "branding",
    title: "Branding",
    icon: Palette,
    short: "Differentiate your business across every touchpoint.",
    long: "We build cohesive brands that show up consistently across marketing communications — email campaigns, social media, print collateral, and advertising.",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    icon: PenTool,
    short: "Visual concepts to inspire, inform, captivate.",
    long: "Advertisements, brochures, magazines, annual reports — we craft visual systems that move audiences and elevate ideas.",
  },
  {
    slug: "animations",
    title: "Animations",
    icon: Film,
    short: "Dynamic motion from static drawings and models.",
    long: "We transform still drawings, 3D models, and objects into dynamic motion using incremental sequences for explainers, ads, and brand stories.",
  },
  {
    slug: "website-design",
    title: "Website Design",
    icon: Globe,
    short: "Full-cycle websites built on the latest tech.",
    long: "Strategy, layout, visual design, and usability — we deliver modern websites end-to-end with performance and conversion in mind.",
  },
  {
    slug: "training",
    title: "Training",
    icon: GraduationCap,
    short: "Learn Photography, Design, Animation, or Web.",
    long: "Hands-on training in Photography, Graphic Design, Animations, and Website Design. Register today and turn your creative ambition into a career.",
  },
  {
    slug: "printing",
    title: "Printing",
    icon: Printer,
    short: "Professional document printing services.",
    long: "High-quality printing for documents, marketing materials, and personal projects — delivered with consistent color and crisp finishing.",
  },
  {
    slug: "lamination",
    title: "Lamination",
    icon: Layers,
    short: "Professional document lamination services.",
    long: "Protect important documents, IDs, and certificates with professional lamination — clean, durable, and built to last.",
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
