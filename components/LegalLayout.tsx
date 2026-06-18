import Link from "next/link";
import Brand from "./Brand";
import { legalLinks, supportEmail } from "@/lib/site";

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-8 text-lg leading-8 text-[var(--muted)]">{children}</p>;
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold tracking-tight">{heading}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 text-[var(--muted)]">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 leading-7 text-[var(--muted)] before:absolute before:left-0 before:top-[11px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--green)]">
      {children}
    </li>
  );
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[rgba(251,246,238,.84)] backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <Brand compact />
          <Link href="/" className="text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]">
            Back home
          </Link>
        </div>
      </header>
      <main className="container-page max-w-[840px] py-14">
        <h1 className="heading-lg">{title}</h1>
        <p className="mt-3 text-sm font-semibold text-[var(--faint)]">Last updated: {lastUpdated}</p>
        {children}
        <div className="mt-12 rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-[0_24px_70px_-50px_rgba(23,19,15,.45)]">
          <h2 className="text-xl font-extrabold">Company details</h2>
          <p className="mt-3 text-[var(--muted)]"><b className="text-[var(--ink)]">Veltrix Alliance Inc</b></p>
          <p className="text-[var(--muted)]">10316 Sepulveda Blvd №104, Mission Hills, CA 91345</p>
          <p className="text-[var(--muted)]">Phone: <a className="font-bold text-[var(--green-deep)]" href="tel:+15513240497">+1 551 324 0497</a></p>
          <p className="text-[var(--muted)]">Support: <a className="font-bold text-[var(--green-deep)]" href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
        </div>
        <p className="mt-6 text-sm leading-6 text-[var(--faint)]">
          Eatty AI provides nutrition and meal-planning tools for informational purposes only and is not medical advice.
        </p>
      </main>
      <nav className="container-page flex max-w-[840px] flex-wrap justify-center gap-x-6 gap-y-3 border-t border-[var(--line)] py-7 text-center text-sm font-semibold text-[var(--muted)]">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-[var(--ink)]">
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
