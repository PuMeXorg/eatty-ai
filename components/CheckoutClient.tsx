"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { plans } from "@/lib/site";

export default function CheckoutClient() {
  const params = useSearchParams();
  const planId = params.get("plan") || "yearly";
  const plan = plans.find((item) => item.id === planId) || plans[1];

  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <div className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]">
        <aside className="border-r border-[var(--line)] bg-[var(--cream)] p-6 md:p-10">
          <Link href="/" className="inline-flex items-center gap-3 font-extrabold">
            <Image src="/assets/eatty-icon.png" alt="" width={38} height={38} className="rounded-xl" />
            Eatty AI
          </Link>
          <div className="mt-12 max-w-md">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-[var(--green-deep)]">Checkout preview</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Subscribe to {plan.name}</h1>
            <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-[var(--shadow)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <b className="text-lg">{plan.name}</b>
                  <p className="mt-1 text-sm text-[var(--muted)]">Eatty AI Healthy Cooking Recipes</p>
                </div>
                <div className="text-right">
                  <b className="text-2xl">{plan.price}</b>
                  <p className="text-sm text-[var(--muted)]">{plan.cadence}</p>
                </div>
              </div>
              {plan.note ? <p className="mt-5 rounded-2xl bg-[#e4f0e7] p-4 text-sm font-bold text-[var(--green-deep)]">{plan.note}</p> : null}
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl border border-[var(--line)] bg-white/70 p-4 text-sm text-[var(--muted)]">
              <ShieldCheck className="shrink-0 text-[var(--green)]" size={22} />
              This is a checkout placeholder for testing. No payment can be submitted.
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center p-6 md:p-10">
          <form className="w-full max-w-[520px] rounded-[32px] border border-[var(--line)] bg-white p-6 shadow-[var(--shadow)] md:p-8">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">Payment details</h2>
              <LockKeyhole size={22} className="text-[var(--green)]" />
            </div>
            <label className="block text-sm font-bold">
              Email
              <input className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] px-4 outline-none focus:border-[var(--green)]" placeholder="you@example.com" type="email" />
            </label>
            <label className="mt-5 block text-sm font-bold">
              Card information
              <input className="mt-2 h-12 w-full rounded-t-xl border border-[var(--line)] px-4 outline-none focus:border-[var(--green)]" placeholder="1234 1234 1234 1234" inputMode="numeric" />
              <div className="grid grid-cols-2">
                <input className="-mt-px h-12 rounded-bl-xl border border-[var(--line)] px-4 outline-none focus:border-[var(--green)]" placeholder="MM / YY" inputMode="numeric" />
                <input className="-ml-px -mt-px h-12 rounded-br-xl border border-[var(--line)] px-4 outline-none focus:border-[var(--green)]" placeholder="CVC" inputMode="numeric" />
              </div>
            </label>
            <label className="mt-5 block text-sm font-bold">
              Cardholder name
              <input className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] px-4 outline-none focus:border-[var(--green)]" placeholder="Full name on card" />
            </label>
            <label className="mt-5 block text-sm font-bold">
              Country or region
              <select className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-white px-4 outline-none focus:border-[var(--green)]" defaultValue="US">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
              </select>
            </label>
            <button disabled className="mt-7 h-13 w-full cursor-not-allowed rounded-2xl bg-[#d8d1c5] font-extrabold text-white">
              Pay {plan.price}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-[var(--faint)]">
              Payment is disabled in this preview. This page only demonstrates checkout layout and plan routing.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
