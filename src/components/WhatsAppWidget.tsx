import { MessageCircle } from "lucide-react";

// Edit this phone number (E.164 format, no +) to update the WhatsApp target.
const WHATSAPP_PHONE = "2348062298842";
const WHATSAPP_MESSAGE = "Hi ROW Studio, I'd like to know more about your services.";

export function WhatsAppWidget() {
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" aria-hidden>
          <path d="M19.11 17.28c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM16.02 6.4c-5.31 0-9.62 4.31-9.62 9.62 0 1.7.45 3.36 1.29 4.82L6.4 25.6l4.9-1.28a9.6 9.6 0 0 0 4.72 1.22h.01c5.31 0 9.62-4.31 9.62-9.62 0-2.57-1-4.99-2.82-6.81a9.58 9.58 0 0 0-6.81-2.82zm0 17.62h-.01a8 8 0 0 1-4.07-1.11l-.29-.17-3.03.79.81-2.95-.19-.3a8 8 0 0 1-1.22-4.26c0-4.42 3.59-8.02 8.01-8.02a8 8 0 0 1 5.66 2.35 7.94 7.94 0 0 1 2.35 5.67c0 4.42-3.59 8.01-8.02 8.01z" />
        </svg>
      </span>
      <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--ink)] text-white text-sm px-3 py-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition">
        Chat on WhatsApp
      </span>
    </a>
  );
}
