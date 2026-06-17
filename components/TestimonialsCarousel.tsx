"use client";

import { useEffect, useMemo, useState } from "react";
import { testimonials } from "@/lib/site";

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const visible = useMemo(() => {
    return [0, 1, 2].map((offset) => testimonials[(active + offset) % testimonials.length]);
  }, [active]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div>
      <div className="relative mt-10 overflow-hidden px-1 py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--cream)] to-transparent blur-[1px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--cream)] to-transparent blur-[1px]" />
        <div className="grid gap-5 transition-all duration-500 md:grid-cols-3">
          {visible.map((item) => (
            <article key={`${active}-${item.name}`} className="min-h-[212px] rounded-[28px] border border-[var(--line)] bg-white p-7 shadow-[0_20px_55px_-45px_rgba(23,19,15,.45)]">
              <div className="text-[20px] tracking-[.1em] text-[#dd9141]">★★★★★</div>
              <p className="mt-5 min-h-[76px] text-[16px] leading-7 text-[var(--ink)]">“{item.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.initial}
                </span>
                <b>{item.name}</b>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {testimonials.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show review ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-[var(--green)]" : "w-2.5 bg-[#d9cebf]"}`}
          />
        ))}
      </div>
    </div>
  );
}
