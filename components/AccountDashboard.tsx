"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AppWindow,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  LifeBuoy,
  LogOut,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Brand from "./Brand";
import { supportEmail } from "@/lib/site";

type AccountStatus = "Active" | "Trial" | "Expired" | "Canceled";
type SectionId = "overview" | "billing" | "payment" | "access" | "support";
type ActionModalData =
  | {
      type: "cancel";
      title: string;
      body: string;
    }
  | {
      type: "payment";
      title: string;
      body: string;
    };

const account = {
  status: "Trial" as AccountStatus,
  plan: "Yearly",
  trialEnds: "July 25, 2026",
  nextBillingDate: "July 25, 2026",
  renewalPrice: "$89.53/year",
  email: "member@eattyai.com",
  card: {
    brand: "Visa",
    last4: "4242",
    expires: "08/28",
  },
};

const sections: Array<{ id: SectionId; label: string; icon: typeof Sparkles }> = [
  { id: "overview", label: "Account overview", icon: Sparkles },
  { id: "billing", label: "Subscription & Billing", icon: CalendarDays },
  { id: "payment", label: "Payment Method", icon: CreditCard },
  { id: "access", label: "App Access", icon: AppWindow },
  { id: "support", label: "Support", icon: LifeBuoy },
];

const statusStyles: Record<AccountStatus, string> = {
  Active: "bg-[#e4f1e8] text-[var(--green-deep)]",
  Trial: "bg-[#fff0dc] text-[#a8691d]",
  Expired: "bg-[#f4e6e1] text-[#9b3f2e]",
  Canceled: "bg-[#eee9e1] text-[var(--muted)]",
};

function statusCopy(status: AccountStatus) {
  if (status === "Trial") {
    return {
      title: `Your 7-day trial period ends on ${account.trialEnds}.`,
      body: `After the trial, your ${account.plan} Plan renews at ${account.renewalPrice} unless canceled before the trial ends.`,
      action: null,
    };
  }

  if (status === "Expired" || status === "Canceled") {
    return {
      title: `Your subscription has ${status === "Expired" ? "expired" : "been canceled"}.`,
      body: "Renew your plan to continue using Eatty premium features.",
      action: "Renew your plan",
    };
  }

  return {
    title: "Your subscription is active.",
    body: `Your ${account.plan} Plan renews on ${account.nextBillingDate}.`,
    action: null,
  };
}

function SupportCard() {
  return (
    <section className="rounded-[18px] border border-[var(--line)] bg-white/72 p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e4f0e7] text-[var(--green-deep)]">
          <LifeBuoy size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold">Need help?</h3>
          <a className="mt-1 inline-flex text-sm font-semibold text-[var(--green-deep)] underline underline-offset-4" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
        </div>
      </div>
    </section>
  );
}

function ActionModal({
  data,
  onClose,
  onDone,
}: {
  data: ActionModalData;
  onClose: () => void;
  onDone: (message: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#17130f]/50 px-4 py-8 backdrop-blur-md">
      <div className="w-full max-w-[520px] rounded-[30px] border border-white/60 bg-[var(--paper)] p-6 shadow-[0_34px_100px_-40px_rgba(23,19,15,.8)]">
        <div className="flex items-start justify-between gap-5">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              {data.type === "cancel" ? <CalendarDays size={23} /> : <CreditCard size={23} />}
            </span>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight">{data.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{data.body}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--muted)] hover:text-[var(--ink)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {data.type === "cancel" ? (
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Keep subscription
            </button>
            <button
              type="button"
              onClick={() => {
                onDone("Subscription cancellation request received.");
                onClose();
              }}
              className="btn btn-primary"
            >
              Confirm cancellation
            </button>
          </div>
        ) : (
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                onDone("Payment method update started.");
                onClose();
              }}
              className="btn btn-secondary"
            >
              Continue here
            </button>
            <Link href="/checkout?plan=yearly" className="btn btn-primary">
              Open billing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const emailReady = /\S+@\S+\.\S+/.test(email);
  const codeReady = code.every(Boolean);

  useEffect(() => {
    if (step === "code") {
      window.setTimeout(() => codeRefs.current[0]?.focus(), 80);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#17130f]/45 px-4 py-8 backdrop-blur-md">
      <div className="relative w-full max-w-[420px] rounded-[30px] border border-white/70 bg-[var(--paper)] p-6 shadow-[0_34px_100px_-46px_rgba(23,19,15,.75)]">
        {step === "email" ? (
          <form
            className="flex min-h-[420px] flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (emailReady) setStep("code");
            }}
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <Mail size={22} />
            </span>
            <h2 className="mt-6 text-center text-[25px] font-extrabold tracking-[-.02em]">Access Your Account</h2>
            <p className="mx-auto mt-3 max-w-[310px] text-center text-sm leading-6 text-[var(--muted)]">
              Enter the email connected to your Eatty AI subscription.
            </p>
            <label className="mt-7 block">
              <input
                className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm shadow-[0_10px_28px_-24px_rgba(23,19,15,.55)] outline-none placeholder:text-[#b8b0a6] focus:border-[var(--green)]"
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              disabled={!emailReady}
              className={`mt-auto h-13 w-full rounded-2xl text-sm font-extrabold text-white transition ${
                emailReady ? "bg-[#17130f]" : "cursor-not-allowed bg-[#aaa]"
              }`}
            >
              Continue
            </button>
          </form>
        ) : (
          <form
            className="flex min-h-[420px] flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (codeReady) onClose();
            }}
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <Mail size={22} />
            </span>
            <h2 className="mt-6 text-center text-[25px] font-extrabold tracking-[-.02em]">Enter the code</h2>
            <p className="mx-auto mt-3 max-w-[300px] text-center text-xs font-medium leading-5 text-[var(--muted)]">
              We sent a login code to {email || "example@gmail.com"}. Check your inbox including Spam folder.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-3 px-8">
              {code.map((value, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    codeRefs.current[index] = node;
                  }}
                  className="h-14 rounded-[11px] border border-[#ececec] bg-white text-center text-xl font-extrabold shadow-[0_8px_24px_-18px_rgba(23,19,15,.55)] outline-none focus:border-[var(--green)]"
                  value={value}
                  onChange={(event) => {
                    const digit = event.target.value.replace(/\D/g, "").slice(-1);
                    const next = [...code];
                    next[index] = digit;
                    setCode(next);
                    if (digit && index < code.length - 1) {
                      codeRefs.current[index + 1]?.focus();
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && !code[index] && index > 0) {
                      codeRefs.current[index - 1]?.focus();
                    }
                  }}
                  onPaste={(event) => {
                    event.preventDefault();
                    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, code.length).split("");
                    if (!pasted.length) return;
                    const next = [...code];
                    pasted.forEach((digit, pastedIndex) => {
                      if (index + pastedIndex < next.length) {
                        next[index + pastedIndex] = digit;
                      }
                    });
                    setCode(next);
                    codeRefs.current[Math.min(index + pasted.length, code.length - 1)]?.focus();
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Code digit ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={!codeReady}
              className={`mt-auto h-13 w-full rounded-2xl text-sm font-extrabold text-white transition ${
                codeReady ? "bg-[#17130f]" : "cursor-not-allowed bg-[#aaa]"
              }`}
            >
              Continue
            </button>
            <button type="button" onClick={() => setStep("email")} className="mt-4 w-full text-xs font-extrabold text-[#8a8a8a]">
              Change email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Sparkles }) {
  return (
    <div className="rounded-[18px] border border-[var(--line)] bg-white/80 p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)]">
        <Icon size={16} className="text-[var(--green)]" />
        {label}
      </div>
      <p className="mt-2 text-xl font-extrabold tracking-tight">{value}</p>
    </div>
  );
}

function Overview({ onGoAccess }: { onGoAccess: () => void }) {
  const copy = statusCopy(account.status);

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Account overview</span>
        <h1 className="mt-4 max-w-2xl text-2xl font-extrabold tracking-tight md:text-4xl">Welcome back.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">Manage your subscription, payment method, app access, and support options in one place.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Metric label="Account status" value={account.status} icon={CheckCircle2} />
          <Metric label="Current plan" value={account.plan} icon={Sparkles} />
          <Metric label="Next billing date" value={account.nextBillingDate} icon={CalendarDays} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.45fr_.55fr]">
        <div className="rounded-[20px] border border-[var(--line)] bg-[var(--paper)] p-5">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${statusStyles[account.status]}`}>{account.status}</span>
          <h2 className="mt-3 text-xl font-extrabold">{copy.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{copy.body}</p>
          {copy.action ? (
            <Link href="/checkout?plan=yearly" className="btn btn-primary mt-5 w-fit">
              {copy.action}
            </Link>
          ) : null}
        </div>
        <div className="rounded-[18px] border border-[var(--line)] bg-white/70 p-4">
          <Download className="text-[var(--green-deep)]" size={22} />
          <h2 className="mt-3 text-lg font-extrabold">Open App Access</h2>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Go to App Access to download Eatty AI.</p>
          <button type="button" onClick={onGoAccess} className="btn btn-secondary mt-4 min-h-[44px] w-full text-sm">
            Go to App Access
          </button>
        </div>
      </section>
    </div>
  );
}

function Billing({ onAction }: { onAction: (data: ActionModalData) => void }) {
  const copy = statusCopy(account.status);

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Subscription & Billing</span>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Metric label="Current plan" value={account.plan} icon={Sparkles} />
          <Metric label="Account status" value={account.status} icon={CheckCircle2} />
        </div>
        <div className="mt-4 rounded-[18px] border border-[var(--line)] bg-[var(--cream)]/70 p-4">
          <h2 className="text-lg font-extrabold">{copy.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy.body}</p>
        </div>
        <div className="mt-4 rounded-[18px] border border-[var(--line)] bg-white p-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[.14em] text-[var(--muted)]">Cancellation Deadline</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Cancel at least 1 day before the next billing date to avoid renewal.</p>
          <button
            type="button"
            onClick={() =>
              onAction({
                type: "cancel",
                title: "Cancel subscription?",
                body: "Your premium access will remain available until the end of the current billing period. You can renew your plan anytime from this account page.",
              })
            }
            className="btn btn-secondary mt-5 w-fit"
          >
            Cancel Subscription
          </button>
        </div>
      </section>
    </div>
  );
}

function Payment({ onAction }: { onAction: (data: ActionModalData) => void }) {
  return (
    <div className="space-y-4">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Payment Method</span>
        <div className="mt-6 rounded-[20px] border border-[var(--line)] bg-[var(--paper)] p-5">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <CreditCard size={24} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold">Current Payment Method</h2>
              <p className="mt-3 font-extrabold">
                {account.card.brand} ending in {account.card.last4}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">Expires {account.card.expires}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">This payment method is used for your Eatty subscription renewals.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              onAction({
                type: "payment",
                title: "Update payment method",
                body: "Continue to update the card used for Eatty AI subscription renewals.",
              })
            }
            className="btn btn-secondary mt-6 w-full md:w-fit"
          >
            Update Payment Method
          </button>
        </div>
      </section>
      <div className="flex gap-3 px-1 text-sm leading-6 text-[var(--muted)]">
        <ShieldCheck className="mt-1 shrink-0 text-[var(--green-deep)]" size={18} />
        <p>
          Your payment details are processed securely by Stripe. Our company does not store your full card number or CVC.
        </p>
      </div>
    </div>
  );
}

function Access() {
  const steps = [
    "Open the Eatty app and tap Log in.",
    "Enter the email used for your subscription.",
    "Check your email for a one-time password.",
    "Enter the code in the app to finish logging in.",
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <div className="rounded-[24px] bg-[#e4f0e7] p-5 md:p-6">
            <AppWindow className="text-[var(--green-deep)]" size={30} />
            <h2 className="mt-5 text-2xl font-extrabold">Access Your Account</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Use the secure app link below. When possible, Eatty will open the app and sign you in automatically.
            </p>
            <a href="https://apps.apple.com/us/app/eatty-healthy-cooking-recipes/id6756583556" className="btn btn-primary mt-5 w-full">
              Download Eatty AI
            </a>
            <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
              Automatic sign-in may depend on your device, browser, and app installation status.
            </p>
        </div>
        <div className="mt-6 border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-extrabold">Manual login</h2>
            <div className="mt-5 space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--green)] text-sm font-extrabold text-white">{index + 1}</span>
                  <p className="text-sm font-semibold leading-6">{step}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}

function Support() {
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
      <span className="eyebrow">Support</span>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight">How can we help?</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">Send a message to the Eatty AI support team. We will reply to your subscription email.</p>
      <form
        className="mt-6 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <label className="block text-sm font-extrabold">
          Email
          <input
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 outline-none focus:border-[var(--green)]"
            defaultValue={account.email}
            type="email"
          />
        </label>
        <label className="block text-sm font-extrabold">
          Message
          <textarea
            className="mt-2 min-h-[130px] w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--green)]"
            placeholder="Tell us what you need help with..."
          />
        </label>
        <button type="submit" className="btn btn-secondary w-fit">
          <Send size={17} />
          Send message
        </button>
        {sent ? <p className="text-sm font-semibold text-[var(--green-deep)]">Your message has been prepared for support.</p> : null}
      </form>
      <div className="mt-6 rounded-[18px] border border-[var(--line)] bg-[#e4f0e7]/55 p-4">
        <p className="text-sm font-extrabold">Prefer email?</p>
        <a className="mt-1 inline-flex text-sm font-semibold text-[var(--green-deep)] underline underline-offset-4" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>
      </div>
    </section>
  );
}

export default function AccountDashboard() {
  const [active, setActive] = useState<SectionId>("overview");
  const [loginOpen, setLoginOpen] = useState(true);
  const [actionModal, setActionModal] = useState<ActionModalData | null>(null);
  const [toast, setToast] = useState("");
  const ActiveIcon = useMemo(() => sections.find((item) => item.id === active)?.icon || Sparkles, [active]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <header className="sticky top-0 z-40 border-b border-[rgba(230,220,205,.82)] bg-[rgba(251,246,238,.86)] backdrop-blur-xl">
        <div className="container-page flex h-[76px] items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                showToast("You have been signed out.");
                setLoginOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-extrabold text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-6 py-7 lg:grid-cols-[280px_1fr] lg:py-10">
        <aside className="h-fit rounded-[30px] border border-[var(--line)] bg-[var(--paper)] p-3 shadow-[0_28px_80px_-58px_rgba(23,19,15,.55)] lg:sticky lg:top-[96px]">
          <div className="mb-3 flex items-center gap-3 px-3 py-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <ActiveIcon size={22} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[var(--faint)]">Dashboard</p>
              <p className="break-all text-sm font-extrabold">{account.email}</p>
            </div>
          </div>
          <nav className="grid gap-1">
            {sections.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex min-h-12 items-center justify-between rounded-2xl px-3 text-left text-sm font-extrabold transition ${
                    selected ? "bg-[#17130f] text-white" : "text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 space-y-5">
          {active === "overview" ? <Overview onGoAccess={() => setActive("access")} /> : null}
          {active === "billing" ? <Billing onAction={setActionModal} /> : null}
          {active === "payment" ? <Payment onAction={setActionModal} /> : null}
          {active === "access" ? <Access /> : null}
          {active === "support" ? <Support /> : null}
          <SupportCard />
        </section>
      </div>

      {loginOpen ? <LoginModal onClose={() => setLoginOpen(false)} /> : null}
      {actionModal ? <ActionModal data={actionModal} onClose={() => setActionModal(null)} onDone={showToast} /> : null}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[#17130f] px-5 py-4 text-sm font-extrabold text-white shadow-[0_24px_80px_-36px_rgba(23,19,15,.8)]">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
