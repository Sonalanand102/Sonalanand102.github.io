"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The About portrait: no card, no frame, no circle — the figure sits
 * directly in the composition with a very faint technical atmosphere
 * behind it (a soft glow, a hint of grid, one orbital arc). Looks for a
 * background-removed cutout at /public/images/profile.png; until that file
 * exists it falls back to an abstract placeholder silhouette that keeps the
 * same body-frame proportions, so dropping the real PNG in later is a
 * zero-code swap (onError just stops firing once the file 404s no more).
 *
 * Portrait and atmosphere drift a few px opposite each other on pointer
 * move — the same restrained parallax pattern as ServiceProductVisual,
 * disabled for touch/reduced-motion.
 */
export default function AboutPortrait() {
  const [imgFailed, setImgFailed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    enabledRef.current =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  // Portrait sits at a slight base scale (1.04) so it reads as "standing in"
  // the composition rather than fitted exactly to its box — the parallax
  // translate below is composed on top of that same base scale each time.
  const PORTRAIT_BASE = "scale(1.04)";

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabledRef.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (portraitRef.current) {
      portraitRef.current.style.transform = `${PORTRAIT_BASE} translate(${(px * 6).toFixed(2)}px, ${(py * 6).toFixed(2)}px)`;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.style.transform = `translate(${(px * -10).toFixed(2)}px, ${(py * -10).toFixed(2)}px)`;
    }
  }

  function handleLeave() {
    if (portraitRef.current) portraitRef.current.style.transform = PORTRAIT_BASE;
    if (atmosphereRef.current) atmosphereRef.current.style.transform = "";
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto flex h-[440px] w-full max-w-[340px] items-end justify-center sm:h-[520px] sm:max-w-[400px] lg:mx-0 lg:h-[600px] lg:max-w-none"
    >
      {/* Atmosphere — sits behind the portrait, very low opacity. A soft
          glow, a whisper of grid, one thin orbital arc. Nothing here should
          be noticeable at a glance. */}
      <div
        ref={atmosphereRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ transition: "transform 300ms ease-out" }}
      >
        <div
          className="absolute left-1/2 top-[12%] h-[260px] w-[260px] -translate-x-1/2 rounded-full sm:h-[320px] sm:w-[320px]"
          style={{
            background:
              "radial-gradient(circle, rgba(143,175,245,0.10) 0%, rgba(181,167,229,0.05) 55%, transparent 75%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 320 460"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
        >
          <line x1="40" y1="0" x2="40" y2="460" stroke="#a9ada3" strokeWidth="1" />
          <line x1="160" y1="0" x2="160" y2="460" stroke="#a9ada3" strokeWidth="1" />
          <line x1="280" y1="0" x2="280" y2="460" stroke="#a9ada3" strokeWidth="1" />
          <line x1="0" y1="100" x2="320" y2="100" stroke="#a9ada3" strokeWidth="1" />
          <line x1="0" y1="220" x2="320" y2="220" stroke="#a9ada3" strokeWidth="1" />
          <line x1="0" y1="340" x2="320" y2="340" stroke="#a9ada3" strokeWidth="1" />
        </svg>
        <svg
          className="absolute -right-6 top-6 h-[180px] w-[180px] opacity-[0.14] sm:h-[220px] sm:w-[220px]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M10 140 A 130 130 0 0 1 150 8"
            stroke="#b5a7e5"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Portrait — no border, no background, no shadow: the transparent
          cutout (or its placeholder) simply stands in the composition. */}
      <div
        ref={portraitRef}
        className="relative h-full w-full"
        style={{ transition: "transform 300ms ease-out", transform: PORTRAIT_BASE }}
      >
        {!imgFailed ? (
          <Image
            src="/images/profile.png"
            alt="Sonal Anand — AI &amp; Full-Stack Developer"
            fill
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 400px, 340px"
            className="object-contain object-bottom"
            priority
            onError={() => setImgFailed(true)}
          />
        ) : (
          <PlaceholderSilhouette />
        )}
      </div>
    </div>
  );
}

/** Abstract waist-up silhouette placeholder — deliberately not a rendering
    of a person, just a shape that reserves the same body-frame composition
    until /public/images/profile.png (a real, background-removed portrait)
    is dropped in. Fades out at the very bottom rather than ending on a
    hard edge, so it reads as a cutout rather than a cropped box. */
function PlaceholderSilhouette() {
  return (
    <svg
      viewBox="0 0 320 460"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silhouette-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3634" />
          <stop offset="100%" stopColor="#202d2e" />
        </linearGradient>
        <linearGradient id="silhouette-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="82%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="silhouette-mask">
          <rect x="0" y="0" width="320" height="460" fill="url(#silhouette-fade)" />
        </mask>
      </defs>
      <g mask="url(#silhouette-mask)">
        {/* head */}
        <circle cx="160" cy="88" r="46" fill="url(#silhouette-fill)" />
        {/* neck + shoulders + torso, waist-up */}
        <path
          d="M118 140
             Q118 118 160 118
             Q202 118 202 140
             L226 210
             Q256 250 260 330
             L260 460
             L60 460
             L60 330
             Q64 250 94 210
             Z"
          fill="url(#silhouette-fill)"
        />
      </g>
      <g mask="url(#silhouette-mask)" opacity="0.5">
        <circle cx="160" cy="88" r="46" fill="none" stroke="#414d49" strokeWidth="1" />
      </g>
    </svg>
  );
}
