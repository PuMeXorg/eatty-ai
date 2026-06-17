export const supportEmail = "support@eattyai.com";

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/subscription-terms", label: "Subscription Terms" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$19.34",
    cadence: "/mo",
    cta: "Get Monthly",
    href: "/checkout?plan=monthly",
    featured: false,
    save: "",
    features: [
      "Personalized meal plans",
      "Full recipe library",
      "Calorie & macro tracking",
      "Grocery lists & challenges",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$89.53",
    cadence: "/yr",
    cta: "Start Free Trial",
    href: "/checkout?plan=yearly",
    featured: true,
    save: "Save 51%",
    note: "7 days free, then $89.53/year",
    features: [
      "Everything in Monthly",
      "Best price per month",
      "Priority new features",
      "7-day free trial",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$41.21",
    cadence: "/qtr",
    cta: "Get Quarterly",
    href: "/checkout?plan=quarterly",
    featured: false,
    save: "Save 30%",
    features: [
      "Personalized meal plans",
      "Full recipe library",
      "Calorie & macro tracking",
      "Grocery lists & challenges",
    ],
  },
];

export const testimonials = [
  {
    name: "Emma R.",
    initial: "E",
    color: "#e4a057",
    text: "The meal plans actually fit what I like to eat. I lost 6 lb in a month without feeling like I was on a diet.",
  },
  {
    name: "Laura Mitchell",
    initial: "L",
    color: "#5aa06d",
    text: "Planning my week used to take ages. Now I open Eatty, tweak a couple of meals, and I’m done.",
  },
  {
    name: "Sofia K.",
    initial: "S",
    color: "#dd9141",
    text: "The photo calorie estimate is so handy. It’s not perfect, but it gets me close and I just adjust.",
  },
  {
    name: "Daniel P.",
    initial: "D",
    color: "#397f5d",
    text: "So much recipe variety. I’ve cooked things I never would have tried and most of them are quick.",
  },
  {
    name: "Megan W.",
    initial: "M",
    color: "#e8aa5f",
    text: "Building my grocery list inside the app means I never forget an ingredient at the store anymore.",
  },
  {
    name: "Chris L.",
    initial: "C",
    color: "#4a956f",
    text: "The challenges keep me motivated. The high-protein one finally got me into a real routine.",
  },
];
