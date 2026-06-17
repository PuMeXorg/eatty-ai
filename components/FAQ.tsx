"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { supportEmail } from "@/lib/site";

const faqs = [
  {
    q: "Is Eatty AI free to download?",
    a: "Yes. Eatty AI is free to download and includes core features. A subscription unlocks personalized meal plans, the full recipe library, and unlimited tracking.",
  },
  {
    q: "What’s included in the subscription?",
    a: "Personalized meal plans, 2,500+ recipes with full nutrition, calorie and macro tracking, grocery lists, and guided challenges.",
  },
  {
    q: "How does the photo calorie tracking work?",
    a: "You take a photo of your meal and Eatty AI estimates the calories and macros for you. Estimates are a helpful starting point, and you can always edit them before saving.",
  },
  {
    q: "How does the free trial work?",
    a: "The yearly plan includes a 7-day free trial. You won’t be charged until the trial ends, and you can cancel anytime before then.",
  },
  {
    q: "Can I cancel anytime?",
    a: `Yes. You can cancel your subscription anytime by contacting our support team at ${supportEmail}. We’ll help you with the cancellation request.`,
  },
  {
    q: "Do meal plans account for foods I avoid?",
    a: "They do. You can set preferred ingredients and ones to avoid, plus dietary tags, and your plan is built around those choices.",
  },
  {
    q: "Is the grocery list automatic?",
    a: "The grocery list is yours to build. You add the ingredients you want and check them off at the store, so you stay in control of exactly what you buy.",
  },
  {
    q: "How do I get support?",
    a: `Email us at ${supportEmail} and our team will be happy to help.`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(4);

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,248,.74)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left font-extrabold"
            >
              {item.q}
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f0e7] text-[var(--green-deep)]">
                {isOpen ? <X size={18} /> : <Plus size={18} />}
              </span>
            </button>
            {isOpen ? <p className="px-6 pb-6 leading-7 text-[var(--muted)]">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
