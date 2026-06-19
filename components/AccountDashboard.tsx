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
type TestAccountId = "trial" | "active" | "canceled" | "expired";
type Account = {
  id: TestAccountId;
  label: string;
  status: AccountStatus;
  plan: "Yearly" | "Quarterly" | "Monthly";
  trialEnds?: string;
  nextBillingDate?: string;
  renewalPrice: string;
  email: string;
  card: {
    brand: string;
    last4: string;
    expires: string;
  };
};
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

const testAccounts: Record<TestAccountId, Account> = {
  trial: {
    id: "trial",
    label: "Trial",
    status: "Trial",
    plan: "Yearly",
    trialEnds: "July 25, 2026",
    nextBillingDate: "July 25, 2026",
    renewalPrice: "$89.53/year",
    email: "trial@eattyai.com",
    card: {
      brand: "Visa",
      last4: "4242",
      expires: "08/28",
    },
  },
  active: {
    id: "active",
    label: "Active",
    status: "Active",
    plan: "Quarterly",
    nextBillingDate: "October 25, 2026",
    renewalPrice: "$31.76/quarter",
    email: "active@eattyai.com",
    card: {
      brand: "Visa",
      last4: "4242",
      expires: "08/28",
    },
  },
  canceled: {
    id: "canceled",
    label: "Canceled",
    status: "Canceled",
    plan: "Monthly",
    renewalPrice: "$11.99/month",
    email: "canceled@eattyai.com",
    card: {
      brand: "Visa",
      last4: "4242",
      expires: "08/28",
    },
  },
  expired: {
    id: "expired",
    label: "Expired",
    status: "Expired",
    plan: "Yearly",
    renewalPrice: "$89.53/year",
    email: "expired@eattyai.com",
    card: {
      brand: "Visa",
      last4: "4242",
      expires: "08/28",
    },
  },
};

const defaultAccount = testAccounts.trial;

function accountForEmail(email: string): Account {
  const normalizedEmail = email.trim().toLowerCase();
  const account = Object.values(testAccounts).find((item) => item.email === normalizedEmail);

  if (account) {
    return account;
  }

  return {
    ...testAccounts.active,
    email: normalizedEmail || testAccounts.active.email,
  };
}

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

function statusCopy(account: Account) {
  if (account.status === "Trial") {
    return {
      title: `Your 7-day trial period ends on ${account.trialEnds}.`,
      body: `After the trial, your ${account.plan} Plan renews at ${account.renewalPrice} unless canceled before the trial ends.`,
      action: null,
    };
  }

  if (account.status === "Expired" || account.status === "Canceled") {
    return {
      title: `Your subscription has ${account.status === "Expired" ? "expired" : "been canceled"}.`,
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
    <section className="rounded-[18px] border border-[var(--line)] bg-white/72 p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e4f0e7] text-[var(--green-deep)]">
          <LifeBuoy size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-extrabold">Have a question or need help?</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            You can contact us anytime at{" "}
            <a className="font-extrabold text-[var(--green-deep)] underline underline-offset-4" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function AccountLoginBackdrop() {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--cream)]">
      <header className="border-b border-[rgba(230,220,205,.82)] bg-[rgba(251,246,238,.86)] backdrop-blur-xl">
        <div className="container-page flex h-[76px] items-center justify-between">
          <Brand />
          <div className="hidden items-center gap-8 text-sm font-bold text-[var(--muted)] md:flex">
            <span>Features</span>
            <span>How it works</span>
            <span>Reviews</span>
            <span>Pricing</span>
            <span>FAQ</span>
          </div>
        </div>
      </header>
      <section className="container-page grid min-h-[calc(100vh-76px)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="eyebrow">Healthy cooking, made simple</span>
          <h1 className="mt-7 max-w-[620px] text-5xl font-extrabold leading-[.98] tracking-tight md:text-7xl">
            Reach your goals <span className="text-[var(--green-deep)]">without</span> boring diets
          </h1>
          <p className="mt-6 max-w-[540px] text-lg leading-8 text-[var(--muted)]">
            Personalized meal plans, healthy recipes, and effortless calorie tracking in one friendly app.
          </p>
        </div>
        <div className="relative hidden min-h-[520px] place-items-center lg:grid">
          <div className="absolute left-6 top-20 rounded-2xl border border-[var(--line)] bg-white px-5 py-4 shadow-[0_18px_55px_-35px_rgba(23,19,15,.45)]">
            <p className="text-sm font-extrabold">612 kcal</p>
            <p className="text-xs text-[var(--muted)]">logged today</p>
          </div>
          <div className="grid h-[520px] w-[260px] place-items-center rounded-[48px] border-[12px] border-[#111] bg-white shadow-[0_28px_90px_-40px_rgba(23,19,15,.55)]">
            <img src="/assets/eatty-icon.png" alt="" className="h-40 w-40 rounded-[34px]" />
          </div>
          <div className="absolute bottom-20 right-4 rounded-2xl border border-[var(--line)] bg-white px-5 py-4 shadow-[0_18px_55px_-35px_rgba(23,19,15,.45)]">
            <p className="text-sm font-extrabold">7 items</p>
            <p className="text-xs text-[var(--muted)]">grocery list</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DirectSupportCard() {
  return (
    <section className="rounded-[18px] border border-[#c9dfd0] bg-[#e4f0e7]/72 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/70 text-[var(--green-deep)]">
          <LifeBuoy size={18} />
        </span>
        <div>
          <h3 className="text-base font-extrabold">Email us directly</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            You can also contact us at{" "}
            <a className="font-extrabold text-[var(--green-deep)] underline underline-offset-4" href={`mailto:${supportEmail}`}>
            {supportEmail}
            </a>
          </p>
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

function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: (email: string) => void }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const emailReady = /\S+@\S+\.\S+/.test(email);
  const codeReady = code.every(Boolean);
  const validTestCode = "123456";

  useEffect(() => {
    if (step === "code") {
      window.setTimeout(() => codeRefs.current[0]?.focus(), 80);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#17130f]/45 px-4 py-8 backdrop-blur-md">
      <div className="relative w-full max-w-[420px] rounded-[30px] border border-white/70 bg-[var(--paper)] p-6 shadow-[0_34px_100px_-46px_rgba(23,19,15,.75)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--muted)] hover:text-[var(--ink)]"
          aria-label="Close login"
        >
          <X size={17} />
        </button>
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
              Enter the email connected to your Eatty AI account.
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
              if (!codeReady) return;

              if (code.join("") !== validTestCode) {
                setCodeError("Invalid code. Please check the 6-digit code and try again.");
                return;
              }

              onLogin(email);
            }}
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <Mail size={22} />
            </span>
            <h2 className="mt-6 text-center text-[25px] font-extrabold tracking-[-.02em]">Enter the code</h2>
            <p className="mx-auto mt-3 max-w-[300px] text-center text-xs font-medium leading-5 text-[var(--muted)]">
              We sent a login code to {email || "example@gmail.com"}. Check your inbox including Spam folder.
            </p>
            <div className="mt-8 grid grid-cols-6 gap-2 sm:gap-3">
              {code.map((value, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    codeRefs.current[index] = node;
                  }}
                  className="h-13 min-w-0 rounded-[11px] border border-[#ececec] bg-white text-center text-xl font-extrabold shadow-[0_8px_24px_-18px_rgba(23,19,15,.55)] outline-none focus:border-[var(--green)] sm:h-14"
                  value={value}
                  onChange={(event) => {
                    const digit = event.target.value.replace(/\D/g, "").slice(-1);
                    const next = [...code];
                    next[index] = digit;
                    setCode(next);
                    if (codeError) setCodeError("");
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
                    if (codeError) setCodeError("");
                    codeRefs.current[Math.min(index + pasted.length, code.length - 1)]?.focus();
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Code digit ${index + 1}`}
                />
              ))}
            </div>
            {codeError ? (
              <p className="mt-4 rounded-2xl border border-[#ead0c7] bg-[#f8ebe7] px-4 py-3 text-center text-xs font-extrabold leading-5 text-[#9b3f2e]">
                {codeError}
              </p>
            ) : (
              <p className="mt-4 text-center text-xs font-semibold leading-5 text-[var(--faint)]">Use test code 123456 to preview the account.</p>
            )}
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

function Overview({ account, onGoAccess }: { account: Account; onGoAccess: () => void }) {
  const copy = statusCopy(account);
  const nextBillingDate = account.nextBillingDate || "Not scheduled";

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Account overview</span>
        <h1 className="mt-4 max-w-2xl text-2xl font-extrabold tracking-tight md:text-4xl">Welcome to your account</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">Manage your subscription, payment method, app access, and support options in one place.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Metric label="Account status" value={account.status} icon={CheckCircle2} />
          <Metric label="Current plan" value={account.plan} icon={Sparkles} />
          <Metric label="Next billing date" value={nextBillingDate} icon={CalendarDays} />
        </div>
      </section>

      <section className="px-1">
        <div className="flex gap-3">
          <span className={`mt-1 inline-flex h-7 shrink-0 items-center rounded-full px-3 text-xs font-extrabold ${statusStyles[account.status]}`}>
            {account.status}
          </span>
          <div>
            <h2 className="text-xl font-extrabold">{copy.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{copy.body}</p>
            {copy.action ? (
              <Link href="/checkout?plan=yearly" className="btn btn-primary mt-5 w-fit">
                {copy.action}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[20px] border border-[var(--line)] bg-white/76 p-4 shadow-[0_18px_60px_-52px_rgba(23,19,15,.55)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
            <Download size={20} />
          </span>
          <div>
            <h2 className="text-lg font-extrabold">Open App Access</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Go to App Access to download Eatty AI.</p>
          </div>
        </div>
        <button type="button" onClick={onGoAccess} className="btn btn-secondary min-h-[44px] w-full shrink-0 text-sm sm:w-fit">
            Go to App Access
        </button>
      </section>
    </div>
  );
}

function Billing({ account, onAction }: { account: Account; onAction: (data: ActionModalData) => void }) {
  const copy = statusCopy(account);
  const canCancel = account.status === "Active" || account.status === "Trial";

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Subscription & Billing</span>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Metric label="Current plan" value={account.plan} icon={Sparkles} />
          <Metric label="Account status" value={account.status} icon={CheckCircle2} />
        </div>
        <div className="mt-5 flex gap-3 px-1">
          <span className={`mt-1 inline-flex h-7 shrink-0 items-center rounded-full px-3 text-xs font-extrabold ${statusStyles[account.status]}`}>
            {account.status}
          </span>
          <div>
            <h2 className="text-base font-extrabold">{copy.title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">{copy.body}</p>
          </div>
        </div>
        {canCancel ? (
          <div className="mt-6 rounded-[18px] border border-[var(--line)] bg-[var(--paper)] p-4">
            <button
              type="button"
              onClick={() =>
                onAction({
                  type: "cancel",
                  title: "Cancel subscription?",
                  body: "Your premium access will remain available until the end of the current billing period. You can renew your plan anytime from this account page.",
                })
              }
              className="btn btn-secondary w-fit"
            >
              Cancel Subscription
            </button>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Cancel at least 1 day before the next billing date to avoid renewal.</p>
          </div>
        ) : (
          <div className="mt-6 rounded-[18px] border border-[var(--line)] bg-[var(--paper)] p-4">
            <Link href="/checkout?plan=yearly" className="btn btn-secondary w-fit">
              Renew your plan
            </Link>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Choose a new plan to restore Eatty AI premium access.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Payment({ account, onAction }: { account: Account; onAction: (data: ActionModalData) => void }) {
  return (
    <div className="space-y-4">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Payment Method</span>
        <div className="mt-6 rounded-[20px] border border-[var(--line)] bg-[var(--paper)] p-5">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
              <CreditCard size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold">Current Payment Method</h2>
              <p className="mt-3 font-extrabold">
                {account.card.brand} ending in {account.card.last4}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">Expires {account.card.expires}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">This payment method is used for your Eatty subscription renewals.</p>
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
          </div>
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
        <div className="rounded-[22px] border border-[#c9dfd0] bg-[#e4f0e7]/78 p-5 text-center md:p-8">
            <AppWindow className="mx-auto text-[var(--green-deep)]" size={30} />
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight">Access Your Account</h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-6 text-[var(--muted)]">
              😎 We’re thrilled to have you! To get access to Eatty App, please follow these instructions:
            </p>
            <p className="mt-8 text-sm font-extrabold">Log it automatically</p>
            <a href="https://apps.apple.com/us/app/eatty-healthy-cooking-recipes/id6756583556" className="btn btn-primary mx-auto mt-3 w-full sm:w-[280px]">
              Download Eatty
            </a>
            <p className="mx-auto mt-4 max-w-[620px] text-sm leading-6 text-[var(--muted)]">
              Tap the button above to access Eatty App, and you will be logged in to your account automatically.
            </p>
            <p className="mx-auto mt-1 max-w-[620px] text-xs leading-5 text-[var(--muted)]">
              Automatic sign-in may depend on your device, browser, and app installation status.
            </p>
        </div>
        <div className="mt-6 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[.16em] text-[var(--faint)]">
          <span className="h-px flex-1 bg-[var(--line)]" />
          or
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <div className="pt-6">
            <h2 className="text-xl font-extrabold">Log it manually</h2>
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

function Support({ userEmail }: { userEmail: string }) {
  const [sent, setSent] = useState(false);
  const [contactEmail, setContactEmail] = useState(userEmail);

  useEffect(() => {
    setContactEmail(userEmail);
  }, [userEmail]);

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[0_22px_70px_-58px_rgba(23,19,15,.55)] md:p-6">
        <span className="eyebrow">Support</span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">How can we help?</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">Send a message to the Eatty AI support team. We will reply to your account email.</p>
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
              className="mt-2 h-12 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 font-extrabold underline underline-offset-4 outline-none focus:border-[var(--green)]"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
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
      </section>
      <div className="flex items-center gap-4 text-xs font-extrabold uppercase tracking-[.16em] text-[var(--faint)]">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
      <div>
        <DirectSupportCard />
      </div>
    </div>
  );
}

export default function AccountDashboard() {
  const [active, setActive] = useState<SectionId>("overview");
  const [loginOpen, setLoginOpen] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account>(defaultAccount);
  const [userEmail, setUserEmail] = useState(defaultAccount.email);
  const [actionModal, setActionModal] = useState<ActionModalData | null>(null);
  const [toast, setToast] = useState("");
  const ActiveIcon = useMemo(() => sections.find((item) => item.id === active)?.icon || Sparkles, [active]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  if (loginOpen) {
    return (
      <>
        <AccountLoginBackdrop />
        <LoginModal
          onClose={() => {
            window.location.href = "/";
          }}
          onLogin={(email) => {
            const account = accountForEmail(email);
            setSelectedAccount(account);
            setUserEmail(account.email);
            setLoginOpen(false);
          }}
        />
      </>
    );
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
              <p className="break-all text-sm font-extrabold">{userEmail}</p>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-between px-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-[var(--faint)] lg:hidden">
            <span>Account sections</span>
            <span className="normal-case tracking-normal text-[var(--green-deep)]">Tap to open</span>
          </div>
          <nav className="grid gap-1">
            {sections.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex min-h-12 items-center justify-between rounded-2xl border px-3 text-left text-sm font-extrabold transition ${
                    selected
                      ? "border-[#17130f] bg-[#17130f] text-white"
                      : "border-[var(--line)] bg-white/55 text-[var(--muted)] hover:border-[#cfc4b5] hover:bg-white hover:text-[var(--ink)]"
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
          {active === "overview" ? <Overview account={selectedAccount} onGoAccess={() => setActive("access")} /> : null}
          {active === "billing" ? <Billing account={selectedAccount} onAction={setActionModal} /> : null}
          {active === "payment" ? <Payment account={selectedAccount} onAction={setActionModal} /> : null}
          {active === "access" ? <Access /> : null}
          {active === "support" ? <Support userEmail={userEmail} /> : null}
          {active !== "support" ? <SupportCard /> : null}
        </section>
      </div>

      {actionModal ? <ActionModal data={actionModal} onClose={() => setActionModal(null)} onDone={showToast} /> : null}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[#17130f] px-5 py-4 text-sm font-extrabold text-white shadow-[0_24px_80px_-36px_rgba(23,19,15,.8)]">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
