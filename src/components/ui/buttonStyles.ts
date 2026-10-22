export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Sharp corners and a single fill. The accent is reserved for the one
 * action that matters on a given view — everything else is ink on paper.
 */
const base =
  'group relative inline-flex items-center justify-center gap-2 font-medium tracking-[-0.005em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'sheen bg-accent text-on-accent hover:bg-accent-soft',
  secondary:
    'border border-ink/20 text-ink hover:border-ink/45 hover:bg-surface-muted',
  ghost:
    'border border-transparent bg-transparent text-ink-muted hover:border-line hover:bg-surface-muted hover:text-ink',
  quiet: 'bg-transparent text-ink-muted hover:text-ink',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
}

/**
 * Shared class builder so buttons and links stay visually identical.
 */
export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
}
