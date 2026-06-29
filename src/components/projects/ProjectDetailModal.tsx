import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../../lib/types'
import ProjectLinks from './ProjectLinks'
import ProjectMediaGallery from './ProjectMediaGallery'
import ProjectMetadata from './ProjectMetadata'

interface ProjectDetailModalProps {
  project: Project
  projects: Project[]
  onClose: () => void
  onSelectProject: (project: Project) => void
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable || tag === 'video'
}

// ------------------------- Face line-art -------------------------
function FaceLineArt({ className }: { className?: string }) {
  return (
    <svg
      className={['pointer-events-none', className].join(' ')}
      viewBox="0 0 160.734828 397.920967"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(-0.015123,399.000000) scale(0.100000,-0.100000)">
        <path d="M1605 2110 c0 -1163 1 -1639 2 -1057 2 581 2 1533 0 2115 -1 581 -2 105 -2 -1058z" />
        <path d="M1000 3985 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" />
        <path d="M972 3933 c-42 -83 -55 -142 -50 -232 6 -107 26 -160 135 -343 45 -75 92 -160 104 -188 12 -28 24 -49 26 -46 8 7 -62 148 -119 241 -71 115 -102 177 -122 244 -29 100 -16 223 35 324 11 20 17 37 14 37 -2 0 -13 -17 -23 -37z" />
        <path d="M1190 3095 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" />
        <path d="M970 3071 c-90 -28 -179 -106 -236 -207 -41 -74 -43 -92 -6 -100 62 -13 106 -40 148 -91 45 -56 64 -114 47 -142 -18 -28 -29 -21 -41 25 -16 58 -56 97 -119 114 -26 7 -53 19 -59 27 -10 11 -13 11 -18 -2 -3 -8 -18 -15 -34 -15 -40 0 -114 -50 -162 -111 -50 -63 -114 -196 -166 -339 -32 -90 -37 -118 -38 -195 -1 -79 2 -97 26 -145 30 -62 155 -203 199 -225 36 -19 64 -19 83 1 37 36 8 115 -60 164 -32 22 -44 37 -40 49 5 14 4 13 -8 -1 -7 -10 -21 -18 -30 -18 -20 0 -58 -19 -67 -33 -10 -15 -27 0 -51 46 -32 62 -46 141 -36 206 23 145 139 414 219 504 40 46 109 87 146 87 16 0 25 -10 33 -35 17 -53 68 -99 134 -124 53 -20 60 -20 76 -6 24 22 31 19 24 -12 -19 -77 -80 -157 -168 -220 -89 -63 -94 -82 -44 -144 25 -31 38 -39 56 -36 18 3 26 -1 32 -19 21 -54 70 -10 81 71 5 39 20 75 54 130 66 106 116 136 128 78 13 -65 103 -153 155 -153 19 0 22 -4 17 -22 -12 -40 -45 -102 -70 -133 -24 -30 -24 -30 -10 19 8 27 15 56 14 65 0 9 -6 -3 -13 -26 -19 -60 -89 -186 -242 -436 -268 -438 -330 -559 -360 -709 -16 -75 -17 -96 -6 -159 22 -130 58 -187 213 -343 77 -76 139 -142 139 -147 0 -4 -35 -30 -77 -58 -43 -28 -74 -51 -70 -51 5 0 41 21 80 47 40 27 75 49 79 51 10 5 68 -85 84 -132 8 -24 19 -72 23 -107 8 -64 8 -64 10 -2 1 72 -20 137 -68 206 -32 47 -32 47 6 79 156 132 258 290 319 493 23 78 27 109 28 225 1 153 -12 209 -72 325 -40 75 -122 165 -174 190 -33 16 -33 16 -3 -6 98 -73 185 -197 215 -307 56 -210 15 -456 -114 -676 -43 -73 -226 -271 -245 -265 -6 2 -69 62 -140 132 -181 180 -229 276 -219 440 10 143 67 274 250 577 55 91 135 221 176 290 42 69 107 167 144 218 68 92 118 177 118 204 0 7 9 19 20 26 11 7 20 22 19 35 0 22 0 22 -9 0 -11 -28 -30 -30 -30 -4 0 11 -11 33 -25 49 -30 36 -31 60 -5 112 27 52 49 63 114 55 50 -6 54 -5 75 20 27 35 28 95 2 172 -10 32 -29 94 -41 138 -29 105 -63 167 -122 220 -26 24 -48 49 -48 57 0 10 -2 10 -8 1 -6 -9 -17 -9 -47 2 -43 15 -144 18 -185 6z m149 -12 c71 -15 91 -34 106 -104 7 -33 13 -49 14 -35 1 14 -3 40 -8 58 -13 42 -1 40 42 -7 46 -51 60 -79 87 -171 12 -41 33 -112 47 -158 27 -87 26 -131 -3 -164 -14 -14 -27 -16 -73 -12 -70 8 -102 -14 -126 -85 -16 -49 -16 -49 -43 -35 -15 8 -39 14 -54 14 -17 0 -28 5 -28 14 0 24 -31 27 -64 7 -37 -23 -124 -162 -136 -218 -5 -21 -11 -50 -15 -65 -7 -34 -40 -38 -48 -7 -5 17 -11 20 -30 15 -19 -4 -30 2 -55 34 -18 21 -32 45 -32 53 0 8 17 27 38 43 150 112 212 198 212 293 0 71 -20 112 -84 176 -40 40 -66 57 -100 66 -25 6 -46 16 -46 21 0 6 14 36 31 68 53 100 147 178 243 201 46 10 69 10 125 -2z m-298 -429 c24 -18 66 -106 55 -118 -3 -2 -29 7 -59 21 -55 25 -91 63 -102 109 -7 26 -7 26 36 17 23 -5 54 -19 70 -29z m336 -297 c33 -15 34 -18 28 -52 -8 -45 -11 -47 -31 -30 -16 13 -64 83 -64 94 0 10 33 5 67 -12z m76 -62 c23 -40 21 -51 -8 -51 -22 0 -25 4 -25 40 0 47 9 51 33 11z m-83 -266 c0 -3 -2 -5 -5 -5 -3 0 -5 2 -5 5 0 3 2 5 5 5 3 0 5 -2 5 -5z m-630 -182 c48 -34 73 -78 68 -118 -4 -40 -36 -44 -93 -11 -45 27 -105 91 -105 113 0 17 40 43 68 43 13 0 41 -12 62 -27z" />
        <path d="M1290 2300 c0 -7 3 -10 7 -7 3 4 3 10 0 14 -4 3 -7 0 -7 -7z" />
        <path d="M1182 2180 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
        <path d="M498 2055 c-12 -12 10 -116 31 -147 46 -67 114 -96 197 -83 46 7 46 7 40 46 -11 68 -36 119 -62 125 -14 4 -30 14 -37 23 -6 10 -19 21 -27 26 -15 9 -134 18 -142 10z m154 -38 c13 -13 35 -31 50 -40 16 -10 31 -32 37 -54 17 -62 14 -67 -22 -37 -19 16 -68 56 -110 88 -43 33 -77 61 -77 63 0 2 22 3 50 3 38 0 54 -5 72 -23z m-77 -37 c28 -22 66 -50 85 -64 19 -13 46 -35 59 -50 24 -26 24 -26 -31 -26 -45 0 -62 5 -97 30 -23 17 -50 45 -61 63 -20 31 -27 87 -12 87 4 0 30 -18 57 -40z" />
        <path d="M1030 1595 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" />
        <path d="M0 642 c0 -46 4 -71 10 -67 13 8 13 105 0 125 -7 10 -10 -7 -10 -58z" />
        <path d="M734 188 c-4 -7 -3 -8 4 -4 7 4 12 9 12 12 0 8 -9 4 -16 -8z" />
        <path d="M694 164 c-18 -14 -18 -15 4 -4 12 6 22 13 22 15 0 8 -5 6 -26 -11z" />
        <path d="M660 145 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" />
        <path d="M600 105 c0 -3 2 -5 5 -5 3 0 5 2 5 5 0 3 -2 5 -5 5 -3 0 -5 -2 -5 -5z" />
        <path d="M574 88 c-4 -7 -3 -8 4 -4 7 4 12 9 12 12 0 8 -9 4 -16 -8z" />
        <path d="M534 58 c-4 -7 -3 -8 4 -4 12 7 16 16 8 16 -3 0 -8 -5 -12 -12z" />
      </g>
    </svg>
  )
}


// ------------------------- Main Component -------------------------
export default function ProjectDetailModal({
  project,
  projects,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const titleId = `project-detail-title-${project.id}`
  const descriptionId = `project-detail-description-${project.id}`

  const projectIndex = projects.findIndex((p) => p.id === project.id)
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  // Lock body scroll and auto-focus first interactive element
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus()
    return () => { document.body.style.overflow = prev }
  }, [])

  // Reset scroll + pause video when project changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    dialogRef.current?.querySelector<HTMLVideoElement>('video')?.pause()
  }, [project.id])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        return
      }

      if (isEditableTarget(e.target)) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); onSelectProject(previousProject) }
      if (e.key === 'ArrowRight') { e.preventDefault(); onSelectProject(nextProject) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextProject, onClose, onSelectProject, previousProject])


  return (
    <div
      className="fixed inset-0 z-1000 grid place-items-center bg-ink/58 p-[clamp(12px,3vw,34px)] backdrop-blur-[3px] motion-safe:animate-[project-backdrop-in_180ms_ease-out] max-[760px]:p-0"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={dialogRef}
        className="relative flex h-[90vh] w-[92vw] max-w-[1400px] overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_40px_120px_rgba(0,0,0,0.35)] motion-safe:animate-[project-dialog-in_220ms_ease-out] max-[900px]:h-dvh max-[900px]:w-full max-[900px]:rounded-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        {/* ── Close button ── */}
        <button
          className="absolute top-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-ink/80 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink max-[760px]:top-4 max-[760px]:right-4"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={18} />
        </button>

        {/* ── Two-column scroll container ── */}
        <div
          ref={scrollRef}
          className="grid h-full w-full grid-cols-[minmax(300px,0.38fr)_minmax(480px,0.62fr)] overflow-y-auto max-[1000px]:grid-cols-1"
        >

          {/* ════════════ LEFT PANEL ════════════ */}
          <aside className="relative flex flex-col border-r border-zinc-100 px-[clamp(28px,4vw,52px)] pt-[clamp(44px,6vh,68px)] pb-[clamp(28px,5vh,48px)] max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:border-zinc-100">

            {/* Content sits above the decoration */}
            <div className="relative z-10 flex grow flex-col">

              {/* Project index label */}
              <p className="mb-7 font-mono text-[11px] tracking-[0.44em] text-ink/50 uppercase">
                Project <span className="mx-2">•</span> {project.index}
              </p>

              {/* Title */}
              <h2
                id={titleId}
                className="font-serif text-[clamp(48px,5.5vw,88px)] leading-[0.95] font-medium tracking-[-0.01em]"
              >
                {project.title}
              </h2>

              {/* Short description */}
              <p
                id={descriptionId}
                className="mt-5 max-w-[380px] text-[14px] leading-[1.75] text-ink/60"
              >
                {project.shortDescription}
              </p>

              {/* Tech pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-[11px] text-ink/65"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="my-8 h-px w-10 bg-zinc-200" />

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <section className="mt-8">
                  <h3 className="mb-3 font-mono text-[10px] tracking-[0.38em] text-ink/45 uppercase">
                    Key Features
                  </h3>
                  <ul className="grid gap-2 text-[13px] leading-[1.75] text-ink/65">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-ink/40" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Contribution */}
              {project.contribution && (
                <section className="mt-8">
                  <h3 className="mb-3 font-mono text-[10px] tracking-[0.38em] text-ink/45 uppercase">
                    Contribution
                  </h3>
                  <p className="max-w-[440px] text-[13px] leading-[1.8] text-ink/60">
                    {project.contribution}
                  </p>
                </section>
              )}

              {/* Links pushed to bottom */}
              <div className="mt-10">
                <ProjectLinks project={project} />
              </div>
            </div>
          </aside>

          {/* ════════════ RIGHT PANEL ════════════ */}
          <main className="flex flex-col px-[clamp(24px,4vw,56px)] pt-[clamp(44px,6vh,68px)] pb-[clamp(28px,5vh,48px)]">

            {/* Media gallery — takes available vertical space */}
            <ProjectMediaGallery
              project={project}
              key={project.id}
            />

            {/* Face line-art decoration — bottom */}
            <FaceLineArt className="max-[1050px]:hidden absolute bottom-0 left-[32%] h-[340px] w-auto text-zinc-200 max-[760px]:h-[260px]" />

            {/* Metadata strip */}
            <ProjectMetadata project={project} />
          </main>
        </div>
      </div>
    </div>
  )
}
