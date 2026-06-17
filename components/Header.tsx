import Link from "next/link";
import Brand from "./Brand";

const nav = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(230,220,205,.82)] bg-[rgba(251,246,238,.82)] backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between gap-5">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm font-bold text-[var(--muted)] lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--ink)]">
              {item.label}
            </a>
          ))}
        </nav>
        <Link href="#pricing" className="btn btn-primary desktop-cta min-h-[44px] px-5 text-sm">
          View Pricing
        </Link>
      </div>
    </header>
  );
}
