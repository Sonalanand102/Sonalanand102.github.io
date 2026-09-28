import { SOCIAL_LINKS, linkProps } from "@/components/layout/socialLinks";
import SocialIcon from "@/components/ui/SocialIcon";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
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

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-muted">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-150 hover:text-signal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-1" aria-label="Social links">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...linkProps(link)}
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-paper-subtle hover:text-signal"
                >
                  {link.icon ? <SocialIcon name={link.icon} className="h-[18px] w-[18px]" /> : link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
