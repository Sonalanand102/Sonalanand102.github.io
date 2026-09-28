"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Real screenshots of KIA running locally against its FastAPI backend.
 * One large "active" shot in a browser frame, with thumbnails to switch
 * between screens. The flagship's blue wash stays as the backdrop.
 */
const SHOTS = [
  {
    src: "/images/kia/home.jpg",
    label: "Home",
    width: 1456,
    height: 831,
    caption: "Docs, slides, sheets, images, audio, video, web and YouTube flow into one knowledge layer.",
    alt: "KIA home page: documents, slides, sheets, images, audio, video, web and YouTube sources flowing into one knowledge layer",
  },
  {
    src: "/images/kia/chat.jpg",
    label: "Chat",
    width: 1456,
    height: 831,
    caption: "A knowledge chat grounded in a video, an image and an audio file.",
    alt: "KIA chat answering a question over a video, an image and an audio file, with the evidence panel open",
  },
  {
    src: "/images/kia/evidence.jpg",
    label: "Evidence",
    width: 1512,
    height: 787,
    caption: "Every answer cites its sources: here a video and an audio interview, down to the exact timestamp.",
    alt: "KIA answer backed by three cited sources (a product walkthrough video and two clips from an audio interview), with the evidence panel showing the selected clip at 3:05 to 3:15",
  },
  {
    src: "/images/kia/search.jpg",
    label: "Search",
    width: 1456,
    height: 831,
    caption: "Search across every source, with audio timestamps and PDF page numbers.",
    alt: "KIA search returning passages from an audio interview with its timestamp and from a PDF with its page number",
  },
  {
    src: "/images/kia/documents.jpg",
    label: "Library",
    width: 1456,
    height: 831,
    caption: "The knowledge library: every indexed source, grouped by chat, with processing status.",
    alt: "KIA knowledge library listing indexed documents grouped by chat, with type and processing status",
  },
] as const;

export default function KiaGallery() {
  const [active, setActive] = useState(0);
  const shot = SHOTS[active] ?? SHOTS[0];

  return (
    <div className="relative flex h-full min-h-[320px] min-w-0 flex-col justify-center gap-4 overflow-hidden bg-signal-wash p-5 sm:p-8 lg:min-h-full">
      <div className="overflow-hidden rounded-lg border border-line-strong bg-paper shadow-md transition-all duration-500 ease-signal group-hover:shadow-lg">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-2 truncate font-mono text-[10px] text-ink-faint">
            KIA · {shot.label}
          </span>
        </div>
        <a
          href={shot.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${shot.label} screenshot full size`}
          className="group/shot relative block w-full cursor-zoom-in bg-[#0d0e11] transition-[aspect-ratio] duration-300"
          style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        >
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
            priority={active === 0}
          />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
            View full size
          </span>
        </a>
      </div>

      <p className="-mt-1 min-h-[2.5em] text-[13px] leading-snug text-ink-muted" aria-live="polite">
        {shot.caption}
      </p>

      <div className="grid grid-cols-5 gap-2 sm:gap-3" role="tablist" aria-label="KIA screenshots">
        {SHOTS.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show ${s.label} screenshot`}
              onClick={() => setActive(i)}
              className={`group/thumb flex min-w-0 flex-col gap-1.5 text-left focus-visible:outline-none`}
            >
              <span
                className={`relative block aspect-[16/9] w-full overflow-hidden rounded-md border transition-all duration-200 ${
                  selected
                    ? "border-signal ring-2 ring-signal/30"
                    : "border-line-strong opacity-70 group-hover/thumb:opacity-100 group-focus-visible/thumb:ring-2 group-focus-visible/thumb:ring-signal/40"
                }`}
              >
                <Image src={s.src} alt="" fill sizes="160px" className="object-cover object-top" />
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                  selected ? "text-signal" : "text-ink-faint"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
