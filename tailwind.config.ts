import type { Config } from "tailwindcss";

// Design tokens from the "Ink & Signal" system. Every value here is backed
// by a CSS custom property defined in app/globals.css, so light/dark/system
// theming works automatically — components never branch on theme, they just
// use these color names.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-subtle": "var(--paper-subtle)",
        "paper-inset": "var(--paper-inset)",
        // per-section background "chapters" — subtle, theme-independent tints
        "surface-cool": "var(--surface-cool)",
        "surface-warm": "var(--surface-warm)",
        "surface-lavender": "var(--surface-lavender)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        // signal, accent-warm, accent-coral & accent-peach are expressed via
        // their RGB-triplet custom properties (not the hex vars) specifically
        // so Tailwind's opacity modifiers (e.g. border-signal/30) work.
        signal: "rgb(var(--signal-rgb) / <alpha-value>)",
        "signal-ink": "var(--signal-ink)",
        "signal-wash": "var(--signal-wash)",
        "accent-warm": "rgb(var(--accent-warm-rgb) / <alpha-value>)",
        "accent-warm-ink": "var(--accent-warm-ink)",
        "accent-coral": "rgb(var(--accent-coral-rgb) / <alpha-value>)",
        "accent-coral-ink": "var(--accent-coral-ink)",
        "accent-peach": "rgb(var(--accent-peach-rgb) / <alpha-value>)",
        "accent-peach-ink": "var(--accent-peach-ink)",
        "accent-warm-wash": "var(--accent-warm-wash)",
        "accent-coral-wash": "var(--accent-coral-wash)",
        "accent-peach-wash": "var(--color-peach-soft)",
        // literal decorative-only hues — backgrounds, washes, borders, dots.
        // No contrast obligation, so these are never used as text color.
        "color-blue": "rgb(var(--color-blue-rgb) / <alpha-value>)",
        "color-blue-soft": "var(--color-blue-soft)",
        "color-sage": "rgb(var(--color-sage-rgb) / <alpha-value>)",
        "color-sage-soft": "var(--color-sage-soft)",
        "color-lavender": "rgb(var(--color-lavender-rgb) / <alpha-value>)",
        "color-lavender-soft": "var(--color-lavender-soft)",
        "color-peach": "rgb(var(--accent-peach-rgb) / <alpha-value>)",
        "color-peach-soft": "var(--color-peach-soft)",
        // the one strong full-bleed color moment — Contact
        "contact-bg": "var(--contact-bg)",
        "contact-ink": "var(--contact-ink)",
        "contact-ink-muted": "var(--contact-ink-muted)",
        "contact-cta-bg": "var(--contact-cta-bg)",
        "contact-cta-ink": "var(--contact-cta-ink)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-plex-condensed)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        glow: "var(--shadow-glow)",
      },
      maxWidth: {
        content: "1120px",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.2, 0.7, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
