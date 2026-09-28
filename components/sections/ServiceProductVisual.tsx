"use client";

import { useEffect, useRef } from "react";

/**
 * Service 03's visual — a small app window with a phone tucked behind it,
 * both drifting a couple of px in response to the cursor (the phone more
 * than the app, since it's the "back" layer) so the composition reads as
 * physically layered rather than a flat screenshot. Isolated in its own
 * client component so the rest of Services.tsx can stay a server
 * component, same pattern as TiltCard/AICore elsewhere in this codebase.
 * Disabled for touch and reduced-motion, same as every other pointer
 * effect on this site — those visitors just get the static composition.
 */
export default function ServiceProductVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabledRef.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (appRef.current) {
      appRef.current.style.transform = `translate(${(px * 4).toFixed(2)}px, ${(py * 4).toFixed(2)}px)`;
    }
    if (phoneRef.current) {
      phoneRef.current.style.transform = `translate(${(px * 10).toFixed(2)}px, ${(py * 10).toFixed(2)}px)`;
    }
  }

  function handleLeave() {
    if (appRef.current) appRef.current.style.transform = "";
    if (phoneRef.current) phoneRef.current.style.transform = "";
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex h-[76px] w-[176px] flex-none items-center justify-center sm:h-[84px] sm:w-[200px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div
        ref={phoneRef}
        className="absolute right-0 top-0 h-11 w-6 flex-none rounded-[6px] border border-[rgba(24,32,36,0.14)] bg-white shadow-sm"
        style={{ transition: "transform 200ms ease-out" }}
      >
        <div className="mx-auto mt-1 h-0.5 w-2 rounded-full bg-[#182024]/25" />
        <div className="mt-1.5 flex flex-col gap-0.5 px-1">
          <span className="h-0.5 w-full rounded-full bg-[#182024]/15" />
          <span className="h-0.5 w-3/5 rounded-full bg-[#182024]/15" />
        </div>
      </div>
      <div
        ref={appRef}
        className="relative flex w-[80%] max-w-[176px] flex-col overflow-hidden rounded-md border border-[rgba(24,32,36,0.12)] bg-white shadow-sm"
        style={{ transition: "transform 200ms ease-out" }}
      >
        <div className="flex items-center gap-1 border-b border-[rgba(24,32,36,0.10)] px-2 py-1.5">
          <span className="h-1 w-1 rounded-full bg-[#33507A]" />
          <span className="h-1 w-1 rounded-full bg-[#182024]/20" />
          <span className="h-1 w-1 rounded-full bg-[#182024]/20" />
        </div>
        <div className="flex flex-1 gap-1.5 p-2">
          <div className="w-1/3 rounded-sm bg-[#182024]/8" />
          <div className="flex flex-1 flex-col gap-1">
            <span className="h-1 w-3/5 rounded-full bg-[#182024]/20" />
            <span className="h-1 w-full rounded-full bg-[#182024]/12" />
            <span className="mt-auto h-2.5 w-1/2 rounded-sm bg-[#33507A]" />
          </div>
        </div>
      </div>
    </div>
  );
}
