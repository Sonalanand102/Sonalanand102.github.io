"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-16 rounded-md bg-ink px-4 py-2 font-mono text-xs text-paper transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
          <a
            href="#"
            className="font-display text-[17px] font-semibold tracking-tight text-ink"
          >
            SONAL ANAND
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm text-ink-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#contact"
              className="rounded-md bg-ink px-4 py-2 text-[13px] font-semibold text-paper transition-all hover:bg-signal hover:text-signal-ink hover:shadow-glow"
            >
              Let&rsquo;s Talk
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile panel. Visibility is delayed on close (not open) so the
            collapse animation still plays, while closed links become
            genuinely untabbable once it finishes — not just visually hidden. */}
        <div
          id="mobile-nav"
          aria-hidden={!open}
          className={`grid overflow-hidden border-t border-line bg-paper md:hidden ${
            open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
          }`}
          style={{
            transitionProperty: "grid-template-rows, visibility",
            transitionDuration: "200ms, 0s",
            transitionDelay: open ? "0s, 0s" : "0s, 200ms",
            transitionTimingFunction: "cubic-bezier(0.2,0.7,0.3,1), linear",
          }}
        >
          <div className="overflow-hidden">
            <nav aria-label="Primary — mobile" className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-[15px] text-ink-muted transition-colors hover:bg-paper-subtle hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-md bg-ink px-4 py-3 text-center text-[14px] font-semibold text-paper"
              >
                Let&rsquo;s Talk
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
