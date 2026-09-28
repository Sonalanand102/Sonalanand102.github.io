/**
 * One place for every contact / social link on the site.
 * Contact and Footer both read from here. A link with an empty `href`
 * is hidden automatically, so unfinished ones never show as broken.
 */
import type { SocialIconName } from "@/components/ui/SocialIcon";

export const EMAIL = "sonalanand102@gmail.com";

export type SocialLink = { label: string; href: string; external: boolean; icon?: SocialIconName };

const ALL_LINKS: SocialLink[] = [
  { label: "Email", href: `mailto:${EMAIL}`, external: false, icon: "email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sonal-anand-34b31037b/", external: true, icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/Sonalanand102", external: true, icon: "github" },
  { label: "LeetCode", href: "https://leetcode.com/u/sonalanand102/", external: true, icon: "leetcode" },
  { label: "YouTube", href: "https://www.youtube.com/@technicallarki1324", external: true, icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/buildwithsonal/reels/", external: true, icon: "instagram" },
];

export const SOCIAL_LINKS = ALL_LINKS.filter((link) => link.href !== "");

/** Props for an <a> so external links open in a new tab safely. */
export function linkProps(link: SocialLink) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
