import AICore from "@/components/ui/AICore";
import Magnetic from "@/components/ui/Magnetic";

const CAPABILITIES = ["AI", "RAG", "LLMs", "AI Agents", "Python", "FastAPI", "Node.js", "React", "React Native"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-32">
      {/* Texture layer: faint dot grid + a single soft light source behind
          the headline. Both are near-invisible at a glance, in both themes. */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Text content is untouched — same classes, same copy, same spacing.
          The only structural change is this grid, which gives the AI Core
          visual the empty space to the right on large screens; below lg it
          collapses back to the original single column. */}
      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
        <p
          className="animate-fade-up font-mono text-[13px] uppercase tracking-[0.14em] text-ink-muted"
          style={{ animationDelay: "0ms" }}
        >
          <span className="text-signal" aria-hidden="true">&#9642;</span> AI &amp; Full-Stack Developer
        </p>

        <h1
          className="animate-fade-up mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.4rem,1.05rem+4.4vw,5.1rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-ink"
          style={{ animationDelay: "70ms" }}
        >
          I build <span className="mark-signal text-signal">AI-powered</span> products
          that solve real business problems.
        </h1>

        <p
          className="animate-fade-up mt-7 max-w-[52ch] text-[17px] leading-relaxed text-ink-muted sm:text-lg"
          style={{ animationDelay: "140ms" }}
        >
          I build intelligent applications, document workflows and AI-powered
          experiences — from idea to working product.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{ animationDelay: "210ms" }}
        >
          <Magnetic
            href="#work"
            className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper transition-all duration-150 hover:-translate-y-0.5 hover:bg-signal hover:text-signal-ink hover:shadow-glow"
          >
            View my work
          </Magnetic>
          <Magnetic
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-6 py-3.5 text-[15px] font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-signal hover:text-signal"
          >
            Let&rsquo;s work together
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Magnetic>
        </div>

        <div
          className="animate-fade-up mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 sm:mt-20"
          style={{ animationDelay: "280ms" }}
        >
          {CAPABILITIES.map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              <span className="font-mono text-[12px] tracking-wide text-ink-faint">
                {item}
              </span>
              {index < CAPABILITIES.length - 1 && (
                <span aria-hidden="true" className="text-accent-warm">
                  &middot;
                </span>
              )}
            </span>
          ))}
        </div>
        </div>

        <AICore />
      </div>
    </section>
  );
}
