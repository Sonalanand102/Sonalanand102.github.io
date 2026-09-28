"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a project/product card and tilts it a couple of degrees toward the
 * cursor on hover — "interacting with a physical product card," not a
 * flashy 3D flip. Inner elements (mockup windows, placeholder visuals) keep
 * their own independent hover transforms; because those live on separate
 * DOM nodes, the two transforms compose visually instead of conflicting.
 * Disabled on touch devices and with reduced motion — the card then falls
 * back to whatever plain hover styling its own className already provides.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 2.5,
  lift = 0,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  /** px to lift on hover, baked into the same JS transform as the tilt (see
      handleMouseMove) — kept in sync with any hover:-translate-y-* utility
      already in className, which stays as the touch/reduced-motion fallback. */
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(!reduceMotion && canHover);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 2 * maxTilt;
    const rotX = -(py - 0.5) * 2 * maxTilt;
    const liftPart = lift ? ` translateY(${-lift}px)` : "";
    ref.current.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)${liftPart}`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
      style={{
        // A single inline `transition` would otherwise silently replace
        // whatever transition-* utility classes the caller's className
        // already has (inline style always wins) — so this lists the
        // properties those cards actually animate, not just `transform`.
        transition: "transform 150ms ease-out, border-color 300ms ease, box-shadow 300ms ease, background-color 300ms ease",
      }}
    >
      {children}
    </div>
  );
}
