import Link from "next/link";
import Brand from "./Brand";
import { legalLinks, supportEmail } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#17130f] text-white">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Brand compact />
            <p className="mt-4 text-sm leading-6 text-white/62">
              Eatty AI provides nutrition and meal-planning tools for informational purposes only and is not medical advice.
            </p>
            <a className="mt-4 inline-flex text-sm font-semibold text-white/75 hover:text-white" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/64">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 text-xs text-white/42">© 2026 Veltrix Alliance Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
