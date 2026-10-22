import { ContactCta } from '../components/home/ContactCta'
import { FeaturedProjects } from '../components/home/FeaturedProjects'
import { Hero } from '../components/home/Hero'
import { ServicesOverview } from '../components/home/ServicesOverview'
import { StudioIntro } from '../components/home/StudioIntro'
import { useSeo } from '../hooks/useSeo'

export function HomePage() {
  useSeo({
    title: 'Arqeno — an independent software studio',
    description:
      'Arqeno is a founder-led software studio building digital products, web applications and AI-powered tools, and helping clients turn ideas into working software.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesOverview />
      <StudioIntro />
      <ContactCta />
    </>
  )
}
