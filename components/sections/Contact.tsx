import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const EMAIL = "sonalanand102@gmail.com";

// TODO: replace with your real LinkedIn profile URL
const LINKEDIN_URL = "#";
// TODO: replace with your real GitHub profile URL
const GITHUB_URL = "#";

const SECONDARY_LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-contact-bg">
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />

      <Reveal
        as="div"
        className="relative mx-auto max-w-content px-6 py-24 text-center sm:px-8 sm:py-32 lg:py-40"
      >
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-contact-ink-muted">
          <span
            className="inline-block h-[7px] w-[7px] rounded-full bg-[rgb(var(--contact-accent-rgb))] align-middle"
            aria-hidden="true"
          />{" "}
          Contact
        </p>

        <h2 className="mx-auto mt-6 max-w-[18ch] text-balance font-display text-[clamp(2rem,1.1rem+3.4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-contact-ink">
          Have an idea <span className="mark-peach">worth building?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-contact-ink-muted sm:text-lg">
          Tell me what you&rsquo;re currently doing manually, or what you&rsquo;d
          like to build. Let&rsquo;s figure out whether AI or automation can make
          it simpler.
        </p>

        <div className="mt-10 flex justify-center">
          <Magnetic
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-md bg-contact-cta-bg px-8 py-4 text-[15px] font-semibold text-contact-cta-ink transition-all duration-150 hover:-translate-y-0.5 hover:bg-color-peach"
          >
            Let&rsquo;s talk
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Magnetic>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SECONDARY_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-contact-ink-muted underline decoration-contact-ink-muted underline-offset-4 transition-colors duration-150 hover:text-contact-ink hover:decoration-[rgb(var(--contact-accent-rgb))]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
