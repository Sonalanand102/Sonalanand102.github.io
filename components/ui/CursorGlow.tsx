"use client";

import { useEffect, useRef } from "react";

/**
 * A fixed, full-viewport radial glow that follows the pointer — a sense of
 * depth around the cursor, not a glowing-mouse effect. Renders nothing on
 * touch devices or with reduced motion (checked once on mount; this is a
 * decorative enhancement, not something that needs to react to a live
 * media-query change mid-session). Position updates go straight to the
 * element's own style via a ref, never through React state, so a fast
 * mousemove never triggers a re-render.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return;

    const el = ref.current;
    if (!el) return;
    el.style.display = "block";

    let raf = 0;
    let pending = false;

    function handleMove(e: MouseEvent) {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        el!.style.setProperty("--cx", `${e.clientX}px`);
        el!.style.setProperty("--cy", `${e.clientY}px`);
      });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hidden by default (inline style) so there's no flash of an off-position
  // spotlight before the capability check above decides to show it.
  return <div ref={ref} className="cursor-glow" style={{ display: "none" }} aria-hidden="true" />;
}
