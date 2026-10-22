/**
 * Project data — the single source of truth for everything shown on the
 * Projects page and in the home page project highlights.
 *
 * Ground rules for this file:
 *  - `repoUrl` must be the real GitHub repository.
 *  - `demoUrl` is only set when the live URL was verified against the
 *    repository README / repository metadata.
 *  - Descriptions and technology lists are taken from the repositories
 *    themselves. No invented metrics, no invented feature lists.
 *  - `status` distinguishes independent products, prototypes, research work
 *    and experiments so nothing is over-claimed.
 */

export type ProjectCategory = 'product' | 'prototype' | 'research' | 'experiment'

export type ProjectStatus = 'live' | 'active' | 'prototype' | 'research'

/**
 * The abstract diagram used to illustrate a project.
 *
 * These are deliberately schematic compositions drawn in SVG — grids,
 * rings, waveforms and matrices. They are not screenshots of the
 * applications and are never presented as such.
 */
export type ProjectVisual =
  | 'aperture'
  | 'filmstrip'
  | 'agents'
  | 'spectrogram'
  | 'clusters'
  | 'document'
  | 'catalogue'
  | 'tiles'

export type Project = {
  slug: string
  name: string
  /** One-line hook used on cards and in listings. */
  summary: string
  /** Two or three sentences of grounded detail. */
  description: string
  category: ProjectCategory
  status: ProjectStatus
  /** Human-readable status label, e.g. "Live product". */
  statusLabel: string
  /** Which abstract diagram illustrates the project. */
  visual: ProjectVisual
  /** Caption shown under the diagram, e.g. "Aperture study". */
  figure: string
  /** GitHub repository. */
  repoUrl: string
  /** Live demo — only present when the URL was verified. */
  demoUrl?: string
  /** Technology actually used in the repository. */
  tech: string[]
  /** Notable, verifiable characteristics of the build. */
  highlights: string[]
  /** Year the project was created, based on the repository metadata. */
  year: number
  /** Whether the project appears in the home page highlights. */
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'portraitlab-ai',
    name: 'PortraitLab AI',
    summary:
      'Turns a selfie into a professional headshot using generative image AI.',
    description:
      'Upload a photo, pick a style — professional portrait, passport-style, LinkedIn, CV or casual — then tune background, clothing, lighting and framing before generating an edited portrait you can download as a PNG. Generation runs on Cloudflare Workers AI, with Sharp handling upload validation, orientation and cropping and Zod validating settings on the server.',
    category: 'product',
    status: 'live',
    statusLabel: 'Live product',
    visual: 'aperture',
    figure: 'Aperture study',
    repoUrl: 'https://github.com/kushwaha-aryan/portraitlab-ai',
    demoUrl: 'https://portraitlab-ai.onrender.com/',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Cloudflare Workers AI',
      'Sharp',
      'Zod',
      'Vitest',
      'ESLint',
    ],
    highlights: [
      'Five preset styles with editable background, clothing, lighting and framing',
      'Server-side upload validation with Sharp and settings validation with Zod',
      'Photos are processed in memory and never written to disk or stored',
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: 'moviev3',
    name: 'MovieV3',
    summary:
      'A full-stack movie discovery and review app with accounts, watchlists and recommendations.',
    description:
      'An Express 5 and MongoDB backend sitting behind a static front end, split into route modules for movies, reviews, saved movies, users and recommendations. Authentication uses JWT with bcrypt password hashing, and the API is wrapped with CORS handling and rate limiting. The front end provides browsing, search, watchlist, favourites and watched views.',
    category: 'product',
    status: 'live',
    statusLabel: 'Live product',
    visual: 'filmstrip',
    figure: 'Frame index',
    repoUrl: 'https://github.com/kushwaha-aryan/movieV3',
    demoUrl: 'https://kushwaha-aryan.github.io/movieV3/',
    tech: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'MongoDB',
      'JWT',
      'bcrypt',
      'Rate Limiting',
      'CORS',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    highlights: [
      'Route modules for movies, reviews, saved movies, users and recommendations',
      'JWT authentication with bcrypt hashing, CORS and rate limiting on the API',
      'Static front end with browsing, watchlist, favourites and watched views',
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: 'agentic-ai',
    name: 'AgenticAI',
    summary:
      'A multi-agent portfolio advisor that keeps computed facts separate from generated advice.',
    description:
      'Turns a raw CSV of holdings into verified facts, a risk-only fact sheet and grounded advice, then enters an interactive Q&A loop that remembers the conversation. The Analyst and Risk agents emit structured JSON facts computed in Python; only the Advisor writes prose. It ships as a Python CLI and as a static browser build that talks to the Groq API directly from the page.',
    category: 'product',
    status: 'active',
    statusLabel: 'Independent project',
    visual: 'agents',
    figure: 'Agent topology',
    repoUrl: 'https://github.com/kushwaha-aryan/AgenticAI',
    demoUrl: 'https://kushwaha-aryan.github.io/AgenticAI/',
    tech: [
      'Python',
      'Groq',
      'LLM APIs',
      'Agentic AI',
      'pandas',
      'matplotlib',
      'JavaScript',
    ],
    highlights: [
      'Analyst, Risk and Advisor agents plus a multi-turn Q&A loop',
      'Tool-calling with a zero-argument schema so the model never supplies its own numbers',
      'Two builds from one design: a Python CLI and a static browser version',
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: 'edge-ai-acoustic-supervisor',
    name: 'Edge AI Acoustic Supervisor',
    summary:
      'A locally-running acoustic AI prototype that decides when a sound should change what you hear.',
    description:
      'Samples audio from a microphone, converts short windows into 2D mel-spectrogram grids and runs a compact convolutional network to detect environmental sound events. The classifier is only the first stage: perception, context and policy, decision and verification, and response are kept deliberately separate, so a verified trigger can drive a coordinated action such as an audio-mode change or a notification.',
    category: 'prototype',
    status: 'prototype',
    statusLabel: 'Research prototype',
    visual: 'spectrogram',
    figure: 'Mel-spectrogram grid',
    repoUrl:
      'https://github.com/kushwaha-aryan/edge-ai-acoustic-supervisor',
    tech: [
      'Python',
      'TensorFlow',
      'CNN',
      'librosa',
      'scikit-learn',
      'NumPy',
      'matplotlib',
      'sounddevice',
    ],
    highlights: [
      'Runs entirely on a laptop — no cloud service and no hardware control',
      'Per-class trigger policy with confidence thresholds, cooldowns and presets',
      'Explicitly a software simulation: no live-microphone path, no ANC hardware integration',
    ],
    year: 2026,
    featured: true,
  },
  {
    slug: 'business-entity-resolution',
    name: 'Business Entity Resolution',
    summary:
      'Grouping noisy business records from three independent sources into the same real-world entity.',
    description:
      'For every reference record the pipeline decides which records from the other two sources describe the same business. It is built as a cascade: normalisation, retrieval, a deterministic pruning rule, a learned ranker, a semantic slot, a stacker and a per-country decision threshold — with recall secured first and precision pursued afterwards.',
    category: 'research',
    status: 'research',
    statusLabel: 'Research project',
    visual: 'clusters',
    figure: 'Blocking &amp; ranking',
    repoUrl:
      'https://github.com/kushwaha-aryan/business-entity-resolution',
    tech: ['Python', 'NumPy', 'scikit-learn', 'SciPy', 'pytest'],
    highlights: [
      'Macro F0.5 of 0.7710 measured on a 20k-record validation split',
      'Blocking recall of 0.8412, with a 0.9318 ceiling for a perfect ranker on the same candidates',
      'Resumable six-stage orchestration, 24 pair features and nine automated tests',
    ],
    year: 2026,
    featured: false,
  },
  {
    slug: 'resume-website',
    name: 'Personal Resume Website',
    summary:
      'A clean, responsive personal resume site built with plain HTML and CSS.',
    description:
      'A dependency-free static resume website covering experience, skills and projects, deployed to GitHub Pages through a GitHub Actions workflow. The repository also carries a PDF version of the same resume, so the site and the printable version stay in step.',
    category: 'product',
    status: 'live',
    statusLabel: 'Live product',
    visual: 'document',
    figure: 'Page structure',
    repoUrl: 'https://github.com/kushwaha-aryan/resume',
    demoUrl: 'https://kushwaha-aryan.github.io/resume/',
    tech: ['HTML', 'CSS', 'GitHub Actions'],
    highlights: [
      'No framework, no build step — plain HTML and CSS',
      'Automated deployment to GitHub Pages via a GitHub Actions workflow',
      'A PDF version of the same resume lives alongside the site',
    ],
    year: 2026,
    featured: false,
  },
  {
    slug: 'moviev2',
    name: 'MovieV2',
    summary:
      'The earlier full-stack movie app that MovieV3 grew out of.',
    description:
      'A Node.js and Express backend with a plain HTML, CSS and JavaScript front end. It supports movie search, filtering by genre, sorting options, infinite scrolling and a clean responsive interface, and it established the API and data shapes that the later version rebuilt on.',
    category: 'experiment',
    status: 'active',
    statusLabel: 'Earlier iteration',
    visual: 'catalogue',
    figure: 'Catalogue grid',
    repoUrl: 'https://github.com/kushwaha-aryan/MovieV2',
    demoUrl: 'https://kushwaha-aryan.github.io/MovieV2/',
    tech: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Search, genre filtering and sorting across the catalogue',
      'Infinite scrolling with a responsive front end',
      'The API and data model that the next iteration was rebuilt on',
    ],
    year: 2026,
    featured: false,
  },
  {
    slug: 'rpg',
    name: 'RPG',
    summary:
      'A text-driven browser RPG with turn-based combat, a shop and an inventory.',
    description:
      'A single-page vanilla JavaScript game: wander a town square, buy health and weapons in a store, then push into a cave where monsters wait. Combat is turn-based with attack, dodge and run options, and winning a fight yields gold and experience along with items for the inventory.',
    category: 'experiment',
    status: 'active',
    statusLabel: 'Experiment',
    visual: 'tiles',
    figure: 'Tile map',
    repoUrl: 'https://github.com/kushwaha-aryan/rpg',
    demoUrl: 'https://kushwaha-aryan.github.io/rpg/',
    tech: ['JavaScript', 'HTML', 'CSS'],
    highlights: [
      'Branching locations: town square, store, cave and combat',
      'Weapon, health, gold and experience systems driven by plain state',
      'Deployed as a static site through a GitHub Actions workflow',
    ],
    year: 2026,
    featured: false,
  },
]

/** Projects highlighted on the home page. */
export const featuredProjects = projects.filter((project) => project.featured)

/** Look up a project by its slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
