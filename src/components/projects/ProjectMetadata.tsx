import type { Project } from '../../lib/types'


export default function ProjectMetadata({ project }: { project: Project }) {
  const metadata = [
    ['Role', project.role],
    ['Duration', project.duration],
    ['Team', project.team],
    ['Category', project.category],
    ['Status', project.status || project.year],
  ].filter((item): item is [string, string] => Boolean(item[1]))

  if (metadata.length === 0) return null

  return (
    <dl className="mt-6 grid grid-cols-4 gap-6 border-t border-zinc-100 pt-6 max-[1180px]:grid-cols-3 max-[760px]:grid-cols-2">
      {metadata.map(([label, value]) => (
        <div key={label}>
          <dt className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-ink/40 uppercase">{label}</dt>
          <dd className="text-[13px] leading-6 text-ink/70">{value}</dd>
        </div>
      ))}
    </dl>
  )
}