/**
 * Founder and team configuration.
 *
 * Arqeno is founder-led. The `team` array currently holds a single entry, so
 * the About page renders a founder spotlight only. When genuine team members
 * are added later, append them to the same array — the page automatically
 * switches to a multi-person team grid without any other change.
 *
 * Only verified URLs belong in here. Leaving a field empty simply hides the
 * corresponding button; nothing is ever invented to fill a gap.
 */

export type SocialLink = {
  label: string
  href: string
}

export type TeamMemberLinks = {
  github?: string
  linkedin?: string
  leetcode?: string
  /** Personal site or portfolio. */
  website?: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  /** Optional photo URL. Leave empty to render a monogram placeholder. */
  photo?: string
  /** Required for accessibility whenever `photo` is provided. */
  photoAlt?: string
  /** One or two sentences shown under the name. */
  shortBio: string
  /** Optional longer paragraphs for the founder spotlight. */
  bio?: string[]
  links?: TeamMemberLinks
}

export const team: TeamMember[] = [
  {
    id: 'aryan-kushwaha',
    name: 'Aryan Kushwaha',
    role: 'Founder',
    photo:
      'https://github.com/kushwaha-aryan/storage/blob/main/meboss.jpeg?raw=true',
    photoAlt: 'Portrait of Aryan Kushwaha, founder of Arqeno',
    shortBio:
      'B.Tech AI & ML student at Birla Institute of Technology, Mesra, working across full-stack web apps, backend APIs and practical AI systems.',
    bio: [
      'Aryan builds software end to end — interface, backend and the models behind it. The projects listed on this site are the result of that: AI photo tooling, acoustic event detection, entity-resolution research, a multi-agent advisor and a full-stack movie application.',
      'Before Arqeno existed, those projects were built for their own sake, mostly to find out whether an idea held up when it met a real user. Arqeno turned that into a studio: the same way of working, now applied to problems that belong to other people.',
      'He works directly with every client, which keeps the feedback loop short and the handover honest. When a project needs a different kind of expertise, he would rather say so than pretend.',
    ],
    links: {
      github: 'https://github.com/kushwaha-aryan',
      leetcode: 'https://leetcode.com/u/dartGoblin42/',
      // Add a verified LinkedIn profile URL here to show the button.
      linkedin: '',
    },
  },
]

/**
 * The single founder of the studio. Kept as a separate export so pages can
 * refer to "the founder" without reaching into the team list.
 */
export const founder = team[0]

/**
 * Builds the visible social links for a member, in a stable order.
 * Empty or missing URLs are skipped, so unverified profiles never appear.
 */
export function socialLinks(member: TeamMember): SocialLink[] {
  const links = member.links ?? {}
  const candidates: SocialLink[] = [
    { label: 'GitHub', href: links.github ?? '' },
    { label: 'LinkedIn', href: links.linkedin ?? '' },
    { label: 'LeetCode', href: links.leetcode ?? '' },
    { label: 'Website', href: links.website ?? '' },
  ]

  return candidates.filter((link) => link.href.trim().length > 0)
}
