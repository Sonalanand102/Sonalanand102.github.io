import Reveal from "@/components/ui/Reveal";
import ServicesGrid from "@/components/sections/ServicesGrid";

/**
 * Services — a 2x2 overview grid. Each card answers only "what does Sonal
 * offer" (number, category, title, one outcome sentence, a small product
 * visual, "Explore service →"); the full breakdown — what I can build, how
 * it works, technology — lives one click away in a modal, handled by
 * ServicesGrid (a client component, since it owns "which modal is open"
 * state). The section itself stays a server component, same split as
 * AboutPortrait/ServiceProductVisual elsewhere in this codebase.
 */
export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-y border-line bg-surface-cool">
      {/* A section-wide chapter change from the Hero's cool blue paper —
          warmer, quieter, almost imperceptible. Purely atmospheric: no
          shapes, no motion, nothing competing with content. */}
      <div className="svc-atmosphere" aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-signal" aria-hidden="true">&#9642;</span> Services
          </p>
          <h2 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] font-semibold leading-[1.14] tracking-[-0.015em] text-ink">
            How I can help
          </h2>
          <p className="mt-3 max-w-[54ch] text-[14.5px] leading-relaxed text-ink-muted sm:text-[15.5px]">
            From AI assistants and automation to complete applications and
            ongoing engineering support.
          </p>
        </Reveal>

        <ServicesGrid />
      </div>
    </section>
  );
}
