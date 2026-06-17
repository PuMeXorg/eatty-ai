import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  ChefHat,
  Clock3,
  ListChecks,
  Sparkles,
  Trophy,
  Utensils,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQ from "@/components/FAQ";
import CookiePreferences from "@/components/CookiePreferences";
import { plans } from "@/lib/site";

const features = [
  {
    icon: ChefHat,
    title: "Personalized meal plans",
    text: "Tell Eatty AI your goals, preferences, avoided foods, and schedule. Get a plan that feels realistic from the first week.",
  },
  {
    icon: Camera,
    title: "AI calorie tracking",
    text: "Take a photo of a meal, review the calorie and macro estimate, adjust anything that looks off, and save it to your day.",
  },
  {
    icon: ListChecks,
    title: "Grocery lists",
    text: "Move ingredients from recipes into a simple shopping list and check them off when you are in the store.",
  },
  {
    icon: Trophy,
    title: "Guided challenges",
    text: "Build habits with short nutrition challenges for protein, home cooking, meal prep, hydration, and consistency.",
  },
];

const history = [
  { meal: "Greek yogurt bowl", kcal: "410 kcal", macros: "31g protein · 44g carbs · 12g fat", time: "08:20" },
  { meal: "Chicken avocado wrap", kcal: "560 kcal", macros: "42g protein · 48g carbs · 21g fat", time: "13:05" },
  { meal: "Salmon rice plate", kcal: "690 kcal", macros: "46g protein · 62g carbs · 25g fat", time: "19:10" },
];

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-lg mt-5">{title}</h2>
      {text ? <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{text}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="overflow-hidden pb-20 pt-14 md:pt-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
            <div>
              <span className="eyebrow">Healthy cooking recipes</span>
              <h1 className="heading-xl mt-6 max-w-4xl">
                Meal planning that thinks with you.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[var(--muted)]">
                Eatty AI creates personalized meal plans, helps you cook healthier recipes, estimates calories from photos, and keeps your grocery list in one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#pricing" className="btn btn-primary">
                  Start planning <ArrowRight size={18} />
                </Link>
                <Link href="#how-it-works" className="btn btn-secondary">
                  How it works
                </Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm font-bold text-[var(--muted)]">
                <div className="rounded-2xl border border-[var(--line)] bg-white/62 p-4">
                  <b className="block text-2xl text-[var(--ink)]">2,500+</b>
                  recipes
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/62 p-4">
                  <b className="block text-2xl text-[var(--ink)]">7-day</b>
                  free trial
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/62 p-4">
                  <b className="block text-2xl text-[var(--ink)]">AI</b>
                  tracking
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-[var(--apricot)]/18 blur-3xl" />
              <div className="glass relative overflow-hidden rounded-[36px] p-4">
                <Image
                  src="/assets/meal-plan.png"
                  alt="Healthy food prepared with Eatty AI"
                  width={1536}
                  height={1024}
                  priority
                  className="aspect-[4/3] rounded-[28px] object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 rounded-[26px] border border-white/45 bg-white/78 p-5 shadow-[0_24px_70px_-30px_rgba(23,19,15,.55)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[.14em] text-[var(--green-deep)]">Today’s plan</p>
                      <h2 className="mt-1 text-2xl font-extrabold">1,870 kcal balanced</h2>
                    </div>
                    <Sparkles className="text-[var(--green)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-pad">
          <div className="container-page">
            <SectionIntro
              eyebrow="Features"
              title="Everything you need to plan, cook, and track"
              text="A calm food app for people who want structure without turning every meal into a spreadsheet."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-[28px] border border-[var(--line)] bg-white/72 p-6 shadow-[0_24px_60px_-48px_rgba(23,19,15,.45)]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f0e7] text-[var(--green-deep)]">
                      <Icon size={23} />
                    </span>
                    <h3 className="mt-6 text-xl font-extrabold">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-[var(--muted)]">{feature.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[rgba(240,230,216,.55)]">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Meal plans</span>
              <h2 className="heading-lg mt-5">A week of food that matches your goals.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                Eatty AI builds a practical weekly rhythm with healthy breakfasts, lunches, dinners, and snacks. Swap meals, keep favorites, and avoid ingredients you do not want.
              </p>
              <ul className="mt-7 space-y-3 text-[var(--muted)]">
                {["Weight goals and dietary tags", "Ingredient preferences and avoided foods", "Recipe variety with full nutrition"].map((item) => (
                  <li key={item} className="flex gap-3"><Check className="mt-0.5 text-[var(--green)]" size={20} />{item}</li>
                ))}
              </ul>
            </div>
            <Image src="/assets/recipes.png" alt="Meal plan recipes" width={1672} height={941} className="rounded-[34px] object-cover shadow-[var(--shadow)]" />
          </div>
        </section>

        <section className="section-pad">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="order-2 lg:order-1">
              <Image src="/assets/tracking.png" alt="Eatty AI calorie tracking screen" width={1125} height={2583} className="mx-auto max-h-[760px] w-auto rounded-[34px] object-contain shadow-[var(--shadow)]" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="eyebrow">AI tracking</span>
              <h2 className="heading-lg mt-5">Take a photo. Get a fast nutrition estimate.</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                Capture your plate and Eatty AI estimates calories, protein, carbs, and fat. You stay in control by editing before saving.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[var(--line)] bg-white p-5"><Camera className="text-[var(--green)]" /><b className="mt-4 block">Photo-first logging</b></div>
                <div className="rounded-[24px] border border-[var(--line)] bg-white p-5"><Clock3 className="text-[var(--green)]" /><b className="mt-4 block">Quick daily history</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#17130f] text-white">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow border-white/10 bg-white/10 text-white">History</span>
              <h2 className="heading-lg mt-5">A working meal history for daily progress.</h2>
              <p className="mt-5 text-lg leading-8 text-white/64">
                The history view keeps every logged meal visible with calories, macros, and time. It is built as an interactive section that can later connect to real account data.
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/[.06] p-5">
              <div className="mb-5 flex items-center justify-between">
                <b className="text-xl">Today</b>
                <span className="rounded-full bg-[#ebe85a] px-3 py-1 text-xs font-extrabold text-[#15120f]">1,660 kcal</span>
              </div>
              <div className="space-y-3">
                {history.map((item) => (
                  <div key={item.meal} className="grid grid-cols-[1fr_auto] gap-4 rounded-[22px] border border-white/10 bg-white/[.08] p-4">
                    <div>
                      <b>{item.meal}</b>
                      <p className="mt-1 text-sm text-white/56">{item.macros}</p>
                    </div>
                    <div className="text-right">
                      <b>{item.kcal}</b>
                      <p className="mt-1 text-sm text-white/46">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section-pad">
          <div className="container-page">
            <SectionIntro eyebrow="How it works" title="Four steps from intention to routine" />
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {["Set your goal", "Get your plan", "Cook & track", "See your progress"].map((step, index) => (
                <article key={step} className="rounded-[28px] border border-[var(--line)] bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--ink)] text-lg font-extrabold text-white">{index + 1}</span>
                  <h3 className="mt-6 text-xl font-extrabold">{step}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {index === 0 && "Tell Eatty AI what you want to achieve and how you like to eat."}
                    {index === 1 && "Receive a personalized meal plan with recipes matched to your tastes."}
                    {index === 2 && "Follow recipes, log meals, and keep your grocery list updated."}
                    {index === 3 && "Review your history, adjust your plan, and keep improving."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="section-pad">
          <div className="container-page">
            <SectionIntro eyebrow="Reviews" title="People love cooking with Eatty AI" />
            <TestimonialsCarousel />
          </div>
        </section>

        <section id="pricing" className="section-pad bg-[rgba(240,230,216,.7)]">
          <div className="container-page">
            <SectionIntro eyebrow="Pricing" title="Choose the plan that fits you" text="Start with a 7-day free trial on the yearly plan. Cancel anytime." />
            <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article key={plan.id} className={`relative flex min-h-[432px] flex-col rounded-[30px] border bg-white p-7 ${plan.featured ? "border-[var(--green)] shadow-[0_0_0_1px_var(--green),var(--shadow)]" : "border-[var(--line)]"}`}>
                  {plan.featured ? <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--green)] px-4 py-2 text-xs font-extrabold text-white">Best Value</span> : null}
                  <p className="text-sm font-extrabold uppercase tracking-[.16em] text-[var(--muted)]">{plan.name}</p>
                  <div className="mt-6 text-[42px] font-extrabold tracking-tight">{plan.price}<span className="text-base text-[var(--muted)]">{plan.cadence}</span></div>
                  <div className="mt-3 h-7 rounded-full bg-[#e4f0e7] px-4 py-1 text-sm font-extrabold text-[var(--green-deep)]">{plan.save || "\u00a0"}</div>
                  <ul className="mt-7 space-y-3 text-[var(--muted)]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3"><Check className="mt-0.5 text-[var(--green)]" size={19} />{feature}</li>
                    ))}
                  </ul>
                  <Link href={plan.href} className={`btn mt-auto ${plan.featured ? "btn-primary" : plan.id === "monthly" ? "btn-blue" : "btn-secondary"}`}>
                    {plan.cta}
                  </Link>
                  {plan.note ? <p className="mt-3 text-center text-sm text-[var(--faint)]">{plan.note}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad">
          <div className="container-page">
            <SectionIntro eyebrow="FAQ" title="Questions, answered" />
            <FAQ />
          </div>
        </section>

        <section className="section-pad pt-2">
          <div className="container-page">
            <div className="rounded-[36px] bg-[var(--ink)] p-8 text-white md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="heading-lg">Start your healthier week with Eatty AI.</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-white/62">Plan meals, track calories, build grocery lists, and keep a real food history without the manual work.</p>
                </div>
                <Link href="#pricing" className="btn bg-white text-[var(--ink)]">
                  Choose plan <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookiePreferences />
    </>
  );
}
