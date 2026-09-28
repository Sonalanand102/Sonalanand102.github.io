const EMAIL = "sonalanand102@gmail.com";

// TODO: replace with your real LinkedIn profile URL
const LINKEDIN_URL = "#";
// TODO: replace with your real GitHub profile URL
const GITHUB_URL = "#";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "Email", href: `mailto:${EMAIL}` },
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
