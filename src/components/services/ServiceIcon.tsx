import { Globe, Layers, Sparkles, User } from 'lucide-react'
import type { ServiceIconName } from '../../config/services'

const icons = {
  globe: Globe,
  user: User,
  layers: Layers,
  sparkles: Sparkles,
} satisfies Record<ServiceIconName, typeof Globe>

/**
 * Maps a service icon name from the configuration to a Lucide icon.
 */
export function ServiceIcon({
  name,
  className = 'size-5',
}: {
  name: ServiceIconName
  className?: string
}) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={className} />
}
