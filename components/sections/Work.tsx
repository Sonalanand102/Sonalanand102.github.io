import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import KiaGallery from "@/components/sections/KiaGallery";

type Accent = "signal" | "warm" | "coral";

type SecondaryProject = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  accent: Accent;
};

const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    number: "02",
    title: "AI Document Processing",
    description: "Extracts and structures information from documents — invoices, forms and more.",
    tech: ["Python", "OCR", "LLM", "Structured extraction"],
    accent: "warm",
  },
  {
    number: "03",
    title: "AI-Powered Application",
    description: "AI features integrated end-to-end into a complete web or mobile application.",
    tech: ["Next.js", "React Native", "LLM", "API integration"],
    accent: "coral",
  },
];

const FLAGSHIP_TECH = [
  "Python",
  "FastAPI",
  "Gemini",
  "Whisper",
  "Qdrant hybrid search",
  "Reranking",
  "PostgreSQL",
  "Redis",
  "Next.js",
  "Docker",
];

const FLAGSHIP_LINKS = [
  {
    label: "Backend on GitHub",
    href: "https://github.com/Sonalanand102/knowledge-intelligence-assistant-backend",
  },
  {
    label: "Frontend on GitHub",
    href: "https://github.com/Sonalanand102/knowledge-intelligence-assistant-frontend",
  },
];

// Each project carries one accent from the brand palette — a visual
// fingerprint so the three are distinguishable before you've read a word.
const ACCENT_CLASSES: Record<
  Accent,
  { wash: string; border: string; bar: string; ring: string; numHover: string }
> = {
  signal: {
    wash: "bg-signal-wash",
    border: "border-signal/30",
    bar: "bg-signal",
    ring: "hover:border-signal/35",
    numHover: "group-hover:text-signal",
  },
  warm: {
    wash: "bg-accent-warm-wash",
    border: "border-accent-warm/45",
    bar: "bg-accent-warm",
    ring: "hover:border-accent-warm/45",
    numHover: "group-hover:text-accent-warm",
  },
  coral: {
    wash: "bg-accent-coral-wash",
    border: "border-accent-coral/45",
    bar: "bg-accent-coral",
    ring: "hover:border-accent-coral/45",
    numHover: "group-hover:text-accent-coral",
  },
};

function PlaceholderVisual({ accent }: { accent: Accent }) {
  const a = ACCENT_CLASSES[accent];
  return (
    <div
      className={`relative flex h-40 items-center justify-center overflow-hidden rounded-md border border-dashed ${a.border} ${a.wash} transition-transform duration-500 ease-signal [transform:perspective(1000px)_rotateX(0deg)] group-hover:[transform:perspective(1000px)_rotateX(2deg)_scale(1.02)] sm:h-48`}
    >
      <span aria-hidden="true" className={`absolute left-4 top-4 h-2 w-2 rounded-full ${a.bar}`} />
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
        Case study in progress
      </span>
    </div>
  );
}

/** Small status pill — used consistently wherever a project needs a status. */
function StatusPill({ tone = "neutral" }: { tone?: "neutral" | "signal" }) {
  const isSignal = tone === "signal";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
        isSignal
          ? "border-signal/40 bg-signal-wash text-signal"
          : "border-line-strong text-ink-faint"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${isSignal ? "bg-signal" : "bg-ink-faint"}`}
      />
      {isSignal ? "Flagship" : "In progress"}
    </span>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative bg-paper">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-signal" aria-hidden="true">&#9642;</span> Work
          </p>
          <h2 className="mt-5 max-w-[16ch] text-balance font-display text-[clamp(1.9rem,1.2rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-ink">
            Selected Work
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-muted">
            AI systems built around real-world problems.
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            AI Systems
          </p>

          {/* 01 — flagship */}
          <Reveal className="mt-6">
            <TiltCard
              maxTilt={1.5}
              className="group overflow-hidden rounded-lg border border-transparent bg-paper shadow-md transition-colors duration-300 hover:border-signal/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
                <KiaGallery />

                <div className="flex min-w-0 flex-col justify-center p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-signal">01</span>
                    <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[30px]">
                      KIA &mdash; Knowledge Intelligence Assistant
                    </h3>
                    <StatusPill tone="signal" />
                  </div>
                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-muted">
                    Ask questions across documents, audio, video and web sources, with
                    every answer linked to its exact source.
                  </p>

                  <dl className="mt-8 space-y-6 border-t border-line pt-6">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                        Problem
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                        Team knowledge lives in PDFs, slide decks, spreadsheets, meeting
                        recordings, videos and web links. Finding one decision means
                        remembering which file it was in, and the right wording. Generic AI
                        chatbots answer confidently but can&rsquo;t show where an answer came
                        from, so nobody can verify it before acting on it.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                        Solution
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                        Multimodal ingestion plus hybrid search and reranking, producing
                        answers with verified citations.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                        Tech
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                        {FLAGSHIP_TECH.map((item, index) => (
                          <span key={item}>
                            {item}
                            {index < FLAGSHIP_TECH.length - 1 && (
                              <span className="text-ink-faint" aria-hidden="true">
                                {" · "}
                              </span>
                            )}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    {FLAGSHIP_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-ink transition-colors duration-150 hover:text-signal"
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-150 group-hover/link:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* 02 / 03 — secondary */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SECONDARY_PROJECTS.map((project) => {
              const a = ACCENT_CLASSES[project.accent];
              return (
                <Reveal key={project.number}>
                  <TiltCard
                    lift={4}
                    className={`group flex h-full flex-col rounded-lg border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8 ${a.ring}`}
                  >
                    <PlaceholderVisual accent={project.accent} />

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className={`font-mono text-sm text-ink-faint transition-colors duration-200 ${a.numHover}`}>
                        {project.number}
                      </span>
                      <h3 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.005em] text-ink">
                        {project.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[13px] leading-relaxed text-ink-faint">
                        {project.tech.map((item, index) => (
                          <span key={item} className="font-mono">
                            {item}
                            {index < project.tech.length - 1 && (
                              <span aria-hidden="true">{" · "}</span>
                            )}
                          </span>
                        ))}
                      </p>
                      <StatusPill />
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
