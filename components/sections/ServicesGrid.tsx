"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import ServiceProductVisual from "@/components/sections/ServiceProductVisual";

type ServiceItem = {
  number: string;
  category: string;
  title: string;
  description: string;
  /** The tiny "DOCUMENTS → RAG → ANSWER" caption under the card visual. */
  microFlow: string[];
  visual: "rag" | "automation" | "product" | "debug";
  modal: {
    buildLabel: string;
    buildItems: string[];
    flowLabel?: string;
    flowSteps?: string[];
    tech?: string;
    ctaLabel: string;
  };
};

// Content approved in earlier passes — reorganized here, not rewritten.
// The card only ever shows the overview fields below; everything under
// `modal` is detail that used to live on the main screen and now lives one
// click away instead.
const SERVICES: ServiceItem[] = [
  {
    number: "01",
    category: "AI Specialization",
    title: "RAG-Powered AI Assistants",
    description:
      "Turn your documents and business knowledge into an AI assistant that can answer questions with grounded information.",
    microFlow: ["Documents", "RAG", "Answer"],
    visual: "rag",
    modal: {
      buildLabel: "What I can build",
      buildItems: [
        "PDF & document Q&A",
        "Company knowledge assistants",
        "Website AI assistants",
        "Internal knowledge search",
      ],
      flowLabel: "How it works",
      flowSteps: ["Documents", "Retrieve", "Generate", "Grounded answer"],
      tech: "Python · FastAPI · LLMs · RAG · Vector Databases",
      ctaLabel: "Let's build this →",
    },
  },
  {
    number: "02",
    category: "AI Specialization",
    title: "AI Automation & Integrations",
    description:
      "Automate repetitive tasks and connect AI to the tools and workflows your business already uses.",
    microFlow: ["Invoice", "AI processing", "Structured data"],
    visual: "automation",
    modal: {
      buildLabel: "What I can build",
      buildItems: [
        "Invoice & document extraction",
        "Document classification",
        "Information extraction",
        "LLM integrations",
        "AI agents",
        "AI-powered workflows",
        "API & third-party integrations",
      ],
      flowLabel: "How it works",
      flowSteps: ["Messy input", "AI processing", "Structured output"],
      tech: "Python · LLMs · AI Agents · APIs · Automation Workflows",
      ctaLabel: "Let's build this →",
    },
  },
  {
    number: "03",
    category: "Full-Stack Development",
    title: "Web & Mobile App Development",
    description: "Turn an idea into a complete, production-ready web or mobile application.",
    microFlow: ["Idea", "Build", "Deploy"],
    visual: "product",
    modal: {
      buildLabel: "What I can build",
      buildItems: [
        "Business applications",
        "MVPs & SaaS products",
        "Admin dashboards",
        "Backend APIs",
        "Database-backed applications",
        "AI-integrated applications",
        "React web applications",
        "React Native mobile applications",
      ],
      tech: "React · React Native · Node.js · Python · FastAPI · SQL",
      ctaLabel: "Let's build this →",
    },
  },
  {
    number: "04",
    category: "Engineering Support",
    title: "Debugging, Optimization & Maintenance",
    description: "Fix issues, improve performance and keep your application reliable as it evolves.",
    microFlow: ["API error", "Diagnosing", "Resolved"],
    visual: "debug",
    modal: {
      buildLabel: "What I can help with",
      buildItems: [
        "Frontend & backend bugs",
        "Backend & API issues",
        "Integration problems",
        "Performance optimization",
        "Feature improvements",
        "Dependency updates",
        "Ongoing maintenance & support",
      ],
      flowLabel: "Approach",
      flowSteps: ["Issue", "Diagnose", "Fix", "Improve"],
      ctaLabel: "Let's fix this →",
    },
  },
];

// Color still encodes the hierarchy (the two AI services get the primary
// blue and structural sage, product development gets lavender, support
// gets the most restrained peach). Used by the modal, which stays on the
// site's dark surface and is unchanged by the card recolor below.
const ACCENT: Record<string, string> = {
  "01": "text-signal",
  "02": "text-accent-warm",
  "03": "text-accent-coral",
  "04": "text-accent-peach",
};

// Card-only palette — light, muted, editorial, one hue per service, all
// drawn from the same restrained family. Scoped to the cards themselves;
// everything else in Services (section background, modal) stays on the
// site's existing dark tokens. Values are complete class strings (not
// interpolated) so Tailwind's JIT scanner picks them up from this file.
const CARD_BG: Record<string, string> = {
  "01": "bg-[#E8E7DC]", // warm ivory / soft cream
  "02": "bg-[#DCE4D4]", // pale sage
  "03": "bg-[#DCE5F3]", // pale muted blue
  "04": "bg-[#E4E0ED]", // pale lavender-gray
};
// A darker, muted version of each card's tone for the category label —
// dark enough to read as text on the light card.
const CARD_CATEGORY: Record<string, string> = {
  "01": "text-[#3F5573]", // muted slate blue
  "02": "text-[#3F5C46]", // muted deep sage
  "03": "text-[#33507A]", // muted deep blue
  "04": "text-[#544B72]", // muted deep plum
};
// Same tones, applied to the CTA on hover so it ties back to the card.
const CARD_CTA_HOVER: Record<string, string> = {
  "01": "hover:text-[#3F5573]",
  "02": "hover:text-[#3F5C46]",
  "03": "hover:text-[#33507A]",
  "04": "hover:text-[#544B72]",
};

/** 01 — a real knowledge-assistant exchange with the document it's
    grounded in tucked behind it. Hover: the document lifts and the
    grounded answer arrives. */
function ChatVisual() {
  return (
    <div className="relative flex min-h-[76px] w-[176px] flex-none items-center justify-center sm:min-h-[84px] sm:w-[200px]">
      <div
        className="absolute left-0 top-0 h-9 w-6 flex-none rotate-[-7deg] rounded-sm border border-[rgba(24,32,36,0.14)] bg-white/80 p-1 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-11deg]"
        aria-hidden="true"
      >
        <span className="block h-0.5 w-full rounded-full bg-[#182024]/25" />
        <span className="mt-1 block h-0.5 w-4/5 rounded-full bg-[#182024]/25" />
        <span className="mt-1 block h-0.5 w-full rounded-full bg-[#182024]/15" />
      </div>
      <div className="relative ml-5 flex w-[82%] max-w-[176px] flex-col gap-1.5 rounded-md border border-[rgba(24,32,36,0.10)] bg-white p-2.5 shadow-sm">
        <div className="max-w-[90%] rounded-md rounded-bl-sm bg-[#EDEBDF] px-2 py-1.5 text-[9.5px] leading-snug text-[#59615F]">
          What&rsquo;s our refund policy?
        </div>
        <div className="ml-auto max-w-[90%] rounded-md rounded-br-sm bg-[#3F5573] px-2 py-1.5 text-[9.5px] leading-snug text-white opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          Customers can request a refund&hellip;
        </div>
        <div
          className="flex items-center gap-1 pl-0.5 transition-opacity duration-300 group-hover:opacity-0"
          aria-hidden="true"
        >
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#3F5573]/50" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#3F5573]/50 [animation-delay:150ms]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-[#3F5573]/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

/** 02 — invoice becomes structured fields. The "Processed" badge is the
    hover payoff. */
function InvoiceVisual() {
  return (
    <div className="flex h-[76px] w-[176px] flex-none flex-col items-center justify-center gap-1 text-center sm:h-[84px] sm:w-[200px]">
      <span className="rounded-sm border border-[rgba(24,32,36,0.14)] bg-white px-2 py-0.5 font-mono text-[8px] text-[#59615F] transition-transform duration-300 group-hover:-translate-y-0.5">
        INVOICE.pdf
      </span>
      <span className="font-mono text-[10px] text-[#3F5C46]" aria-hidden="true">
        &darr;
      </span>
      <div className="flex flex-col items-start gap-0.5 rounded-sm border border-[rgba(24,32,36,0.10)] bg-white/70 px-2.5 py-1 font-mono text-[7.5px] leading-relaxed text-[#59615F]">
        <span>
          Vendor <span className="text-[#182024]">ABC Ltd.</span>
        </span>
        <span>
          Amount <span className="text-[#182024]">&#8377;42,500</span>
        </span>
        <span>
          Status{" "}
          <span className="text-[#182024] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Matched
          </span>
        </span>
      </div>
      <span className="translate-y-1 rounded-full border border-[#3F5C46]/40 bg-[#3F5C46]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#3F5C46] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        &#10003; Processed
      </span>
    </div>
  );
}

/** 04 — API error, diagnosing, resolved. Idle it's honest about being
    mid-diagnosis; hover is the payoff where it resolves. */
function DebugVisual() {
  return (
    <div className="flex h-[76px] w-[176px] flex-none flex-col items-center justify-center gap-1 text-center sm:h-[84px] sm:w-[200px]">
      <span className="rounded-sm border border-[#8C5A46]/40 bg-white px-2 py-0.5 font-mono text-[8px] font-semibold text-[#8C5A46]">
        API Error
      </span>
      <span className="text-[#59615F]" aria-hidden="true">
        &darr;
      </span>
      <span className="flex items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.06em] text-[#59615F]">
        Diagnosing
        <span className="flex gap-0.5" aria-hidden="true">
          <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-[#59615F]" />
          <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-[#59615F] [animation-delay:150ms]" />
          <span className="h-0.5 w-0.5 animate-pulse rounded-full bg-[#59615F] [animation-delay:300ms]" />
        </span>
      </span>
      <span className="relative flex h-5 w-20 flex-none items-center justify-center" aria-hidden="true">
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#59615F] transition-opacity duration-300 group-hover:opacity-0">
          &darr;
        </span>
        <span className="absolute inset-0 flex items-center justify-center gap-1 rounded-full border border-[#3F5C46]/40 bg-[#3F5C46]/10 font-mono text-[8px] font-semibold text-[#3F5C46] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          &#10003; Resolved
        </span>
      </span>
    </div>
  );
}

const VISUALS: Record<ServiceItem["visual"], () => JSX.Element> = {
  rag: ChatVisual,
  automation: InvoiceVisual,
  product: ServiceProductVisual,
  debug: DebugVisual,
};

function MicroFlow({ steps }: { steps: string[] }) {
  return (
    <p className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-center font-mono text-[9.5px] uppercase tracking-[0.08em] text-[#59615F]">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          {step}
          {i < steps.length - 1 && <span aria-hidden="true">&rarr;</span>}
        </span>
      ))}
    </p>
  );
}

function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-sm border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-muted">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-ink-faint" aria-hidden="true">
              &rarr;
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function ServicesGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = openIndex !== null;
  const active = isOpen ? SERVICES[openIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
        {SERVICES.map((service, index) => {
          const Visual = VISUALS[service.visual];
          return (
            <div
              key={service.number}
              className={`group flex h-full flex-col rounded-md border border-[rgba(24,32,36,0.10)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:brightness-[1.02] sm:p-7 ${CARD_BG[service.number]}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[13px] font-semibold leading-none text-[#182024]/35">
                  {service.number}
                </span>
                <p className={`font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${CARD_CATEGORY[service.number]}`}>
                  {service.category}
                </p>
              </div>
              <h3 className="mt-2.5 font-display text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#182024] sm:text-[20px]">
                {service.title}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-[13.5px] leading-relaxed text-[#59615F]">
                {service.description}
              </p>

              <div className="mt-5 flex flex-1 flex-col items-center justify-center" aria-hidden="true">
                <Visual />
                <MicroFlow steps={service.microFlow} />
              </div>

              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className={`group/cta mt-6 flex items-center gap-1.5 self-start border-t border-[rgba(24,32,36,0.12)] pt-4 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#182024] transition-colors duration-300 ${CARD_CTA_HOVER[service.number]}`}
              >
                Explore service
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  &rarr;
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal — always mounted so open/close can transition smoothly;
          hidden via opacity + pointer-events when closed rather than
          unmounted, which is also what keeps the exit animation smooth. */}
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="presentation"
      >
        <div
          aria-hidden="true"
          onClick={() => setOpenIndex(null)}
          className={`absolute inset-0 bg-[#0a1013] transition-opacity duration-300 ${
            isOpen ? "opacity-70" : "opacity-0"
          }`}
          style={{ backdropFilter: isOpen ? "blur(3px)" : "none" }}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={active ? `service-modal-title-${active.number}` : undefined}
          className={`relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-lg border border-line-strong bg-paper shadow-md transition-all duration-300 ease-signal sm:max-h-[80vh] sm:w-[700px] sm:rounded-lg ${
            isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0 sm:translate-y-2"
          }`}
        >
          {active && (
            <>
              <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-8 sm:py-6">
                <div>
                  <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${ACCENT[active.number]}`}>
                    {active.number} &middot; {active.category.toUpperCase()}
                  </p>
                  <h3
                    id={`service-modal-title-${active.number}`}
                    className="mt-2 font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[26px]"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
                >
                  <span aria-hidden="true" className="text-[16px] leading-none">
                    &#10005;
                  </span>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                <p className="max-w-[56ch] text-[15px] leading-relaxed text-ink-muted">
                  {active.description}
                </p>

                <div className="mt-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                    {active.modal.buildLabel}
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {active.modal.buildItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-muted">
                        <span className={`mt-2 h-1 w-1 flex-none rounded-full ${ACCENT[active.number]} bg-current`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {active.modal.flowLabel && active.modal.flowSteps && (
                  <div className="mt-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                      {active.modal.flowLabel}
                    </p>
                    <div className="mt-3">
                      <FlowSteps steps={active.modal.flowSteps} />
                    </div>
                  </div>
                )}

                {active.modal.tech && (
                  <div className="mt-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">Technology</p>
                    <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink-muted">{active.modal.tech}</p>
                  </div>
                )}

                <a
                  href="#contact"
                  onClick={() => setOpenIndex(null)}
                  className="mt-8 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-signal transition-colors duration-200 hover:text-ink"
                >
                  {active.modal.ctaLabel}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
