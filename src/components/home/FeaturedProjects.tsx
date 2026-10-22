import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProjects } from '../../config/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Section } from '../ui/Section'

export function FeaturedProjects() {
  return (
    <Section
      id="featured-projects"
      eyebrow="01 — Selected work"
      title="Products, prototypes and research."
      description="Everything here is public and verifiable. Open the repository to read the code, or open the live demo to use the thing."
      tone="surface"
      aside={
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
        >
          All projects
          <ArrowRight aria-hidden="true" className="arrow-slide size-4" />
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant="compact"
            index={index + 1}
          />
        ))}
      </div>
    </Section>
  )
}
