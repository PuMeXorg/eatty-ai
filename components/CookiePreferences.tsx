"use client";

import { useEffect, useState } from "react";

type CookieState = "hidden" | "summary" | "customize";

export default function CookiePreferences() {
  const [state, setState] = useState<CookieState>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("eatty-cookie-choice")) {
      const id = window.setTimeout(() => setState("summary"), 700);
      return () => window.clearTimeout(id);
    }
  }, []);

  function save(choice: string) {
    window.localStorage.setItem(
      "eatty-cookie-choice",
      JSON.stringify({ choice, analytics, marketing, savedAt: new Date().toISOString() }),
    );
    setState("hidden");
  }

  if (state === "hidden") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/24 p-4 sm:items-center">
      <div className="w-full max-w-[430px] rounded-[24px] border border-[#d8dc48] bg-[#101016] p-6 text-white shadow-[0_0_30px_rgba(235,232,90,.35)]">
        <h2 className="text-xl font-extrabold">Cookie preferences</h2>
        {state === "summary" ? (
          <p className="mt-4 text-sm leading-6 text-white/55">
            We use essential cookies to keep Eatty AI working. Optional cookies help us understand product usage and improve marketing.
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            <label className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <span>
                <b className="block">Analytics cookies</b>
                <span className="text-sm text-white/52">Help improve page performance and product decisions.</span>
              </span>
              <input checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} type="checkbox" className="h-5 w-5 accent-[#ebe85a]" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <span>
                <b className="block">Marketing cookies</b>
                <span className="text-sm text-white/52">Help measure campaigns and attribution.</span>
              </span>
              <input checked={marketing} onChange={(e) => setMarketing(e.target.checked)} type="checkbox" className="h-5 w-5 accent-[#ebe85a]" />
            </label>
          </div>
        )}
        <div className="mt-6 grid gap-3">
          <button type="button" onClick={() => save("reject-optional")} className="btn min-h-[44px] border border-white/10 bg-transparent text-white">
            Reject optional
          </button>
          <button type="button" onClick={() => setState("customize")} className="btn min-h-[44px] border border-white/10 bg-transparent text-white">
            Customize
          </button>
          <button type="button" onClick={() => { setAnalytics(true); setMarketing(true); save("accept-all"); }} className="btn min-h-[44px] bg-[#ebe85a] text-[#15120f]">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
