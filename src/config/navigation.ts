export type NavLink = {
  label: string
  to: string
  /** Short description used by the mobile navigation panel. */
  description: string
}

/** Primary navigation, shared by the header and the footer. */
export const navLinks: NavLink[] = [
  { label: 'Home', to: '/', description: 'What Arqeno builds and why' },
  { label: 'Projects', to: '/projects', description: 'Products, prototypes and research' },
  { label: 'Services', to: '/services', description: 'How we can work together' },
  { label: 'About', to: '/about', description: 'The studio and the founder' },
  { label: 'Contact', to: '/contact', description: 'Start a conversation' },
]
