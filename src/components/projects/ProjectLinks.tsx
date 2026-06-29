import { Globe, Link } from 'lucide-react'
import type { Project } from '../../lib/types'


export default function ProjectLinks({ project }: { project: Project }) {
  const additionalLinks = project.additionalLinks ?? []

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary CTA — black pill */}
      {project.liveUrl && (
        <a
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 bg-ink text-white transition-colors duration-200 hover:border-ink focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          title="View Live"
        >
          <Globe size={16} />
        </a>
      )}

      {/* GitHub — circle icon button */}
      {project.githubUrl && (
        <a
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 bg-white text-ink transition-colors duration-200 hover:border-ink focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
          href={project.githubUrl}
          target="_blank"
          title="GitHub"
          rel="noreferrer noopener"
          aria-label={`View ${project.title} on GitHub`}
        >
          <img src="/github.svg" alt="" aria-hidden="true" className="h-[17px] w-[17px]" />
        </a>
      )}

      {/* Additional links — circle icon buttons */}
      {additionalLinks.map((link) => (
        <a
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 bg-white text-ink transition-colors duration-200 hover:border-ink focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          key={link.href}
          aria-label={link.label}
          title={link.label}
        >
          <Link size={17} />
        </a>
      ))}
    </div>
  )
}
