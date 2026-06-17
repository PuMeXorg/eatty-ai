import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Eatty AI",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[var(--cream)]">
          <p className="text-sm text-[var(--muted)]">Loading checkout…</p>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
