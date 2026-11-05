"use client";

import { useEffect, useState } from "react";
import { CAMP_START } from "@/components/mancamp/brand";

function remaining() {
  const ms = Math.max(0, new Date(CAMP_START).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setT(remaining());
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: t?.days },
    { label: "Hours", value: t?.hours },
    { label: "Minutes", value: t?.minutes },
    { label: "Seconds", value: t?.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5" aria-label="Countdown to Man Camp 10">
      {units.map((u) => (
        <div
          key={u.label}
          className="w-20 sm:w-28 bg-pine/80 border-2 border-parchment/25 rounded-sm py-3 sm:py-4 text-center shadow-lg"
        >
          <div className="font-display text-4xl sm:text-5xl font-bold text-parchment tabular-nums">
            {u.value === undefined ? "--" : String(u.value).padStart(u.label === "Days" ? 1 : 2, "0")}
          </div>
          <div className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-ember-light mt-1">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
