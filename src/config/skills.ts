/**
 * The studio's technical skill set.
 *
 * The groups are the areas the founder actually works in. Items that also
 * appear in a public repository listed on this site carry `verified: true`,
 * which is what lets the site point at something a visitor can open and
 * read rather than asking them to take a claim on trust.
 *
 * The evidence behind each flag:
 *  - Python, NumPy, Matplotlib, scikit-learn  -> edge-ai-acoustic-supervisor
 *  - TensorFlow, librosa, CNN                 -> edge-ai-acoustic-supervisor
 *  - scikit-learn, SciPy, NumPy, pytest       -> business-entity-resolution
 *  - Node.js, Express.js, REST APIs, JWT      -> movieV3 / MovieV2
 *  - Rate Limiting, MongoDB, bcrypt           -> movieV3 / MovieV2
 *  - JavaScript, HTML5, CSS3                  -> movieV3, MovieV2, rpg, resume
 *  - TypeScript, Next.js, Tailwind CSS        -> portraitlab-ai
 *  - Zod, Sharp, Vitest                       -> portraitlab-ai
 *  - LLM APIs, Agentic AI, Groq, pandas       -> AgenticAI
 *  - Git, GitHub                              -> every repository, and CI
 *  - Data Structures & Algorithms, Problem Solving -> the public LeetCode profile
 */

export type SkillItem = {
  label: string
  /**
   * True when the item can be checked against a public repository listed
   * on this site. Unverified items are still shown — they are part of the
   * founder's own account of their work — but they are never presented as
   * something a visitor can open and read.
   */
  verified?: boolean
}

export type SkillGroup = {
  id: string
  label: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { label: 'Python', verified: true },
      { label: 'JavaScript', verified: true },
      { label: 'TypeScript', verified: true },
      { label: 'HTML5', verified: true },
      { label: 'CSS3', verified: true },
      { label: 'C++' },
      { label: 'C' },
      { label: 'SQL' },
    ],
  },
  {
    id: 'core-cs',
    label: 'Core computer science',
    items: [
      { label: 'Data Structures & Algorithms', verified: true },
      { label: 'Object-Oriented Programming' },
      { label: 'Problem Solving', verified: true },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & databases',
    items: [
      { label: 'Node.js', verified: true },
      { label: 'Express.js', verified: true },
      { label: 'REST APIs', verified: true },
      { label: 'JWT Authentication', verified: true },
      { label: 'Rate Limiting', verified: true },
      { label: 'MongoDB', verified: true },
      { label: 'MySQL' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & machine learning',
    items: [
      { label: 'NumPy', verified: true },
      { label: 'Matplotlib', verified: true },
      { label: 'Supervised Learning', verified: true },
      { label: 'CNN', verified: true },
      { label: 'LLM APIs', verified: true },
      { label: 'Agentic AI', verified: true },
      { label: 'Unsupervised Learning' },
      { label: 'Recommender Systems' },
      { label: 'Reinforcement Learning' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { label: 'Git', verified: true },
      { label: 'GitHub', verified: true },
      { label: 'VS Code' },
    ],
  },
]

/**
 * The short labels in the hero ticker. These are the technologies that
 * appear most often in the studio's work, so the strip stays readable as
 * it moves.
 */
export const stackTicker: string[] = [
  'Python',
  'JavaScript',
  'TypeScript',
  'HTML5',
  'CSS3',
  'Node.js',
  'Express.js',
  'REST APIs',
  'JWT Auth',
  'Rate Limiting',
  'MongoDB',
  'NumPy',
  'Matplotlib',
  'TensorFlow',
  'scikit-learn',
  'pandas',
  'librosa',
  'CNN',
  'LLM APIs',
  'Agentic AI',
  'Next.js',
  'Tailwind CSS',
  'Cloudflare Workers AI',
  'Groq',
  'Zod',
  'Sharp',
  'Vitest',
  'pytest',
  'Git',
  'GitHub',
  'VS Code',
]
