"use client";

import { forwardRef, useEffect, useRef } from "react";
import type { AnchorHTMLAttributes } from "react";

/**
 * Wraps a primary CTA `<a>` with a subtle magnetic pull — as the cursor
 * approaches, the button drifts a few pixels toward it, then eases back on
 * mouseleave via the CSS transition already on the element (set inline
 * below so this works even for callers that don't add one themselves).
 * Disabled outright on touch devices and with reduced motion; nothing is
 * attached in either case; the element behaves like a plain `<a>`.
 */
const Magnetic = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function Magnetic({ style, ...props }, forwardedRef) {
    const innerRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (reduceMotion || !canHover) return;

      const REACH = 70; // px beyond the button's own edges where the pull starts
      const MAX = 6; // px — the brief's "approximately 4–6px" ceiling
      let raf = 0;
      let pending = false;

      function handleMove(e: MouseEvent) {
        if (pending) return;
        pending = true;
        raf = requestAnimationFrame(() => {
          pending = false;
          const rect = el!.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const reach = Math.max(rect.width, rect.height) / 2 + REACH;
          if (dist < reach) {
            const pull = 1 - dist / reach;
            const mx = Math.max(-MAX, Math.min(MAX, dx * 0.25)) * pull;
            const my = Math.max(-MAX, Math.min(MAX, dy * 0.25)) * pull;
            // The pull is inline style, which would otherwise silently beat
            // any CSS hover:-translate-y utility on the same element (inline
            // style always outranks a class, hovered or not) — so the small
            // "lift" the brief also asks for is folded into this same
            // transform rather than left to CSS to fight over.
            const lift = -2 * pull;
            el!.style.transform = `translate(${mx.toFixed(2)}px, ${(my + lift).toFixed(2)}px)`;
          } else {
            el!.style.transform = "";
          }
        });
      }

      window.addEventListener("mousemove", handleMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMove);
        cancelAnimationFrame(raf);
      };
    }, []);

    return (
      <a
        {...props}
        ref={(node) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        style={{ transition: "transform 200ms cubic-bezier(0.2, 0.7, 0.3, 1)", ...style }}
      />
    );
  }
);

export default Magnetic;
