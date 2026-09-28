import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { EMAIL, SOCIAL_LINKS, linkProps } from "@/components/layout/socialLinks";
import SocialIcon from "@/components/ui/SocialIcon";

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

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3" aria-label="Find me online">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...linkProps(link)}
                aria-label={link.label}
                title={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-contact-ink-muted transition-all duration-150 hover:-translate-y-0.5 hover:border-[rgb(var(--contact-accent-rgb))] hover:text-contact-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--contact-accent-rgb))]"
              >
                {link.icon ? <SocialIcon name={link.icon} /> : link.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
