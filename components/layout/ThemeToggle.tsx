"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "system" | "light" | "dark";

const OPTIONS: { value: ThemeChoice; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const STORAGE_KEY = "theme";

function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", choice);
  }
}

export default function ThemeToggle() {
  // Starts "system" on the server and during the first client render so
  // markup matches; the real saved choice (if any) is read after mount.
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setChoice(stored);
      }
    } catch {
      // localStorage unavailable — fall back to system, already applied.
    }
  }, []);

  function select(next: ThemeChoice) {
    setChoice(next);
    applyTheme(next);
    try {
      if (next === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // Persistence is a nice-to-have; theme still applies for this visit.
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-line bg-paper-subtle p-[3px]"
    >
      {OPTIONS.map((option) => {
        const active = mounted && choice === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => select(option.value)}
            className={[
              "rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150",
              active
                ? "bg-ink text-paper"
                : "text-ink-muted hover:text-ink",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
