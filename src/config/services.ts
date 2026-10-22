/**
 * Services offered by Arqeno.
 *
 * These are the engagements a single founder can realistically deliver and
 * take responsibility for. Keep the language specific: describe what is
 * built and how, not outcomes that cannot be guaranteed.
 */

export type ServiceIconName = 'globe' | 'user' | 'layers' | 'sparkles'

export type Service = {
  id: string
  title: string
  description: string
  /** Concrete pieces of work included in the engagement. */
  deliverables: string[]
  icon: ServiceIconName
}

export const services: Service[] = [
  {
    id: 'business-sites',
    title: 'Business websites & landing pages',
    description:
      'A focused marketing site that loads quickly, reads clearly, and gives a visitor one obvious next step. Built around your offer instead of a template.',
    deliverables: [
      'Page structure and content outline agreed up front',
      'Responsive build from an agreed design direction',
      'Contact and conversion sections with working email links',
      'Deployment on Cloudflare Pages with a custom domain',
    ],
    icon: 'globe',
  },
  {
    id: 'portfolio-sites',
    title: 'Portfolio & personal websites',
    description:
      'A single home for your work, writing and contact details — the kind of site you can keep updating yourself without touching code.',
    deliverables: [
      'Content structure and a copy pass on your existing material',
      'Responsive, accessible layout with keyboard support',
      'Project, experience and resume sections',
      'GitHub Pages or Cloudflare Pages deployment',
    ],
    icon: 'user',
  },
  {
    id: 'full-stack-apps',
    title: 'Full-stack web applications',
    description:
      'Web applications with a real backend behind the interface: authentication, persistence, and a documented API the front end talks to.',
    deliverables: [
      'Data model and API design before any UI work',
      'Node.js and Express backend with MongoDB persistence',
      'Authentication, input validation and rate limiting',
      'Front end wired to the API, with an agreed fallback for offline use',
    ],
    icon: 'layers',
  },
  {
    id: 'ai-integrations',
    title: 'AI integrations & AI-powered features',
    description:
      'Practical AI features built into a product — image generation, classification, multi-agent workflows and LLM-backed tools — with a deterministic path when a model is unavailable.',
    deliverables: [
      'Scoping the AI step against a straightforward non-AI baseline',
      'Server-side model calls with validation and rate limits',
      'Prompt and tool schemas that return structured, checkable output',
      'Graceful fallbacks and clear disclosure of what the model produced',
    ],
    icon: 'sparkles',
  },
]

/** The engagement process shown on the Services page. */
export const processSteps = [
  {
    step: '01',
    title: 'Conversation',
    description:
      'You describe the problem, who it is for, and what a good outcome looks like. If the fit is wrong, you will hear that here.',
  },
  {
    step: '02',
    title: 'Scope',
    description:
      'A written outline of what will be built, what is explicitly out of scope, the stack, and a rough timeline.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Regular working builds with short review cycles. You see progress on a live URL rather than waiting for a final reveal.',
  },
  {
    step: '04',
    title: 'Handover',
    description:
      'The repository, deployment instructions and a walkthrough of how the code is organised, so nothing is locked inside a black box.',
  },
]
