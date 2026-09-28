import Reveal from "@/components/ui/Reveal";
import AboutPortrait from "@/components/sections/AboutPortrait";

const TOOL_GROUPS = [
  { label: "AI", items: ["LLMs", "RAG", "AI Agents", "LLM Integrations"] },
  { label: "Backend", items: ["Python", "FastAPI", "Node.js", "SQL"] },
  { label: "Product", items: ["React", "React Native", "APIs", "Git"] },
];

export default function About() {
  return (
    <section id="about" className="bg-surface-lavender">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-signal" aria-hidden="true">&#9642;</span> About
          </p>
          <h2 className="mt-5 max-w-[16ch] text-balance font-display text-[clamp(1.9rem,1.2rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-ink">
            A Little About Me
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <AboutPortrait />

          <div className="min-w-0">
            <div className="max-w-[62ch] space-y-5 text-[17px] leading-relaxed text-ink-muted sm:text-lg">
              <p>
                I&rsquo;m an AI &amp; Full-Stack Developer who enjoys turning complex
                ideas into products people can actually use.
              </p>
              <p>
                I work across AI, backend, web and mobile &mdash; building
                everything from RAG-powered assistants and automation workflows
                to complete applications.
              </p>
            </div>

            {/* Personal philosophy — a statement, not a third paragraph:
                left rule + brighter ink set it apart without shouting. */}
            <p className="mt-6 max-w-[52ch] border-l-2 border-signal/40 pl-4 text-[15.5px] italic leading-relaxed text-ink transition-colors duration-300 hover:border-signal/80">
              &ldquo;I like building things that are useful first &mdash; and
              intelligent where it actually adds value.&rdquo;
            </p>

            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                Tools &amp; technologies
              </p>
              <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
                {TOOL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                      {group.label}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                      {group.items.map((item, index) => (
                        <span key={item} className="font-mono">
                          {item}
                          {index < group.items.length - 1 && (
                            <span className="text-ink-faint" aria-hidden="true">
                              {" · "}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
