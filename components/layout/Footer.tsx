import { SOCIAL_LINKS, linkProps, type SocialLink } from "@/components/layout/socialLinks";

const LINKS: SocialLink[] = [
  { label: "Work", href: "#work", external: false },
  { label: "Services", href: "#services", external: false },
  { label: "About", href: "#about", external: false },
  ...SOCIAL_LINKS,
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
            Sonal Anand
          </p>
          <p className="mt-0.5 text-[13px] text-ink-muted">AI &amp; Full-Stack Developer</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-muted">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...linkProps(link)}
                  className="transition-colors duration-150 hover:text-signal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-5 sm:px-8">
          <p className="font-mono text-[12px] text-ink-faint">
            &copy; {year} Sonal Anand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
