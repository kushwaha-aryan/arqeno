import { useRef, useState, type FormEvent } from 'react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { siteConfig } from '../../config/site'

type FormValues = {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const emptyValues: FormValues = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
}

/** Project types mirror the services offered, plus an open option. */
const projectTypes = [
  'Business website or landing page',
  'Portfolio or personal website',
  'Full-stack web application',
  'AI integration or AI-powered feature',
  'Something else',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.projectType.trim().length === 0) {
    errors.projectType = 'Please choose a project type.'
  }

  if (values.message.trim().length < 20) {
    errors.message =
      'Please describe the project in a sentence or two — at least 20 characters.'
  }

  return errors
}

/**
 * Inquiry form.
 *
 * There is no server behind this form, so it does not pretend to submit one.
 * Instead it validates the fields and hands a fully formatted message to the
 * visitor's own email client through `mailto:`. The address it sends to lives
 * in `src/config/site.ts` and nowhere else.
 */
export function InquiryForm() {
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'ready'>('idle')
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function update(field: keyof FormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!previous[field]) return previous
      const next = { ...previous }
      delete next[field]
      return next
    })
    setStatus('idle')
  }

  function buildMailto() {
    const subject = `Project inquiry — ${values.projectType}`
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Project type: ${values.projectType}`,
      `Budget: ${values.budget.trim() || 'Not specified'}`,
      '',
      'Project details:',
      values.message.trim(),
    ].join('\n')

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0] as keyof FormValues | undefined

    if (firstInvalid) {
      setStatus('idle')
      const field = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstInvalid}"]`,
      )
      field?.focus()
      return
    }

    setStatus('ready')
    window.location.href = buildMailto()
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard access can be blocked; the address is visible on screen anyway.
      setCopied(false)
    }
  }

  const fieldClass =
    'w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-subtle transition-colors duration-200 hover:border-line-strong focus:border-accent focus:outline-none focus-visible:outline-none'

  const errorClass = 'border-[#b3261e]/60'

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[0.8125rem] font-medium text-ink"
            >
              Name <span className="text-ink-subtle">(required)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`${fieldClass} ${errors.name ? errorClass : ''}`}
            />
            {errors.name ? (
              <p id="name-error" className="mt-2 text-xs text-[#b3261e]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[0.8125rem] font-medium text-ink"
            >
              Email <span className="text-ink-subtle">(required)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${fieldClass} ${errors.email ? errorClass : ''}`}
            />
            {errors.email ? (
              <p id="email-error" className="mt-2 text-xs text-[#b3261e]">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="projectType"
              className="mb-2 block text-[0.8125rem] font-medium text-ink"
            >
              Project type <span className="text-ink-subtle">(required)</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={values.projectType}
              onChange={(event) => update('projectType', event.target.value)}
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={errors.projectType ? 'projectType-error' : undefined}
              className={`${fieldClass} ${errors.projectType ? errorClass : ''} ${
                values.projectType ? '' : 'text-ink-subtle'
              }`}
            >
              <option value="">Choose one…</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="text-ink">
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType ? (
              <p id="projectType-error" className="mt-2 text-xs text-[#b3261e]">
                {errors.projectType}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-[0.8125rem] font-medium text-ink"
            >
              Budget <span className="text-ink-subtle">(optional)</span>
            </label>
            <input
              id="budget"
              name="budget"
              type="text"
              value={values.budget}
              onChange={(event) => update('budget', event.target.value)}
              aria-describedby="budget-hint"
              className={fieldClass}
              placeholder="A rough range is fine — or leave it blank"
            />
            <p id="budget-hint" className="mt-2 text-xs text-ink-subtle">
              Used only to judge scope. It is not binding.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[0.8125rem] font-medium text-ink"
          >
            Message <span className="text-ink-subtle">(required)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? 'message-error message-hint' : 'message-hint'
            }
            className={`${fieldClass} resize-y ${errors.message ? errorClass : ''}`}
            placeholder="What are you trying to build, who is it for, and what is in the way?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-xs text-[#b3261e]">
              {errors.message}
            </p>
          ) : (
            <p id="message-hint" className="mt-2 text-xs text-ink-subtle">
              Include a timeline and any links to existing material if you have
              them.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <button
            type="submit"
            className="sheen inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-[0.9375rem] font-medium text-on-accent transition-colors duration-200 hover:bg-accent-soft"
          >
            <Send aria-hidden="true" className="size-4" />
            Send via email
          </button>

          {status === 'ready' ? (
            <p
              role="status"
              className="rounded-[4px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-ink"
            >
              Your email app should now be open with the message pre-filled. If
              nothing happened, email{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent underline underline-offset-4"
              >
                {siteConfig.email}
              </a>{' '}
              directly and paste the details in.
            </p>
          ) : null}

          <p className="text-xs leading-relaxed text-ink-subtle">
            This form does not send anything on its own &mdash; there is no
            server behind it. It checks your details, then opens your own mail
            app with everything filled in, so nothing is stored anywhere.
          </p>
        </div>
      </form>

      <div className="mt-10 border border-line bg-paper p-6">
        <p className="label-mono text-ink-subtle">Prefer to write directly?</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            <Mail aria-hidden="true" className="size-4" />
            {siteConfig.email}
          </a>
          <button
            type="button"
            onClick={copyAddress}
            className="inline-flex h-8 items-center gap-1.5 border border-line px-2.5 text-xs text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            {copied ? (
              <Check aria-hidden="true" className="size-3.5 text-accent" />
            ) : (
              <Copy aria-hidden="true" className="size-3.5" />
            )}
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>
      </div>
    </div>
  )
}
