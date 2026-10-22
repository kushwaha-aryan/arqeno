import { ArrowRight } from 'lucide-react'
import { featuredProjects } from '../../config/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { Section } from '../ui/Section'
import { Link } from 'react-router-dom'

export function FeaturedProjects() {
  return (
    <Section
      id="featured-projects"
      eyebrow="01 — Selected work"
      title="Products, prototypes and research."
      description="Everything here is public and verifiable. Open the repository to read the code, or open the live demo to use the thing."
      aside={
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-accent-soft"
        >
          All projects
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
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
