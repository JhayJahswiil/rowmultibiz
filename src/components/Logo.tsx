import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <img src="/logo.png" alt="ROW Multi-Biz Prod. Global Company" className={className} />
    </Link>
  );
}

