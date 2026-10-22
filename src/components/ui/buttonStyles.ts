export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[4px] font-medium tracking-[-0.01em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-ink-950 hover:bg-accent-soft active:bg-accent shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]',
  secondary:
    'border border-line-strong bg-transparent text-fg hover:border-accent/60 hover:text-accent-soft',
  ghost:
    'border border-transparent bg-transparent text-fg-muted hover:text-fg hover:border-line-strong',
  quiet: 'bg-transparent text-fg-muted hover:text-fg',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[0.8125rem]',
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
