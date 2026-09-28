"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a section's inner content and fades/lifts it in once it enters the
 * viewport. Pure opt-in visual polish — if JS fails to run for any reason,
 * .reveal's base state would leave content invisible, so we default the
 * class list to "already visible" and only add the animated entrance once
 * the observer confirms it's mounted and watching.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={`${ready ? "reveal" : ""} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
