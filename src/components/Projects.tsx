import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/content'
import type { Project } from '../lib/types'
import {
  fadeUp,
  fadeUpScale,
  slideFromLeft,
  staggerContainer,
  VIEWPORT,
  useMotionConfig,
} from '../lib/motion'
import AnimatedPath from './AnimatedPath'
import ProjectDetailModal from './projects/ProjectDetailModal'

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.48em] uppercase max-[760px]:tracking-[0.32em]"
      variants={slideFromLeft}
    >
      <span className="h-5 w-px bg-current" />
      {children}
    </motion.div>
  )
}

// ------------------------- Project Art -------------------------
function ProjectArt({ project }: { project: Project }) {
  return (
    <svg className="mb-[22px] aspect-300/190 w-full text-ink" viewBox="0 0 300 230" aria-hidden="true">
      {project.paths.map((path, index) => (
        <AnimatedPath
          key={path}
          d={path}
          className="fill-none stroke-current stroke-3 [stroke-linecap:round] [stroke-linejoin:round] [vector-effect:non-scaling-stroke]"
          strokeWidth={3}
          delay={index * 0.12}
        />
      ))}
    </svg>
  )
}

// ------------------------- Project Card -------------------------
function ProjectCard({
  project,
  className = '',
  artClassName = '',
  onSelect,
  cardRef,
}: {
  project: Project
  className?: string
  artClassName?: string
  onSelect: () => void
  cardRef?: (node: HTMLElement | null) => void
}) {
  const { reduced } = useMotionConfig()

  return (
    <motion.article
      ref={cardRef}
      className={[
        'grid min-h-[390px] w-[320px] max-[760px]:w-[min(78vw,320px)] flex-none cursor-pointer content-start rounded-lg border border-light bg-white px-[26px] pt-7 pb-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.11)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink',
        className,
      ].join(' ')}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Open ${project.title} project details`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      whileHover={
        reduced
          ? undefined
          : {
            y: -4,
            borderColor: 'rgba(10,10,10,0.35)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.16)',
          }
      }
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <div className={artClassName}>
        <ProjectArt project={project} />
      </div>

      <h3 className="mb-3 font-serif text-[22px] leading-[1.1] font-medium">{project.title}</h3>

      <p className="min-h-[74px] text-[13px] leading-[1.7] text-ink/65">{project.shortDescription}</p>

      <div className="flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span className="rounded-full border border-light px-3 py-1 font-mono text-[10px] text-ink/65" key={tool}>
            {tool}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

// Card placements for the scattered desktop layout
const cardPlacements = [
  // Card 0: largest, top-left area, slight left tilt
  'min-[1181px]:left-[14%] min-[1181px]:top-[3%] min-[1181px]:z-4 min-[1181px]:w-[min(25vw,390px)] min-[1181px]:min-h-[415px] min-[1181px]:rotate-[-5deg]',
  // Card 1: medium, top-right, slight right tilt
  'min-[1181px]:right-[12%] min-[1181px]:top-[10%] min-[1181px]:z-3 min-[1181px]:w-[min(21vw,335px)] min-[1181px]:min-h-[330px] min-[1181px]:rotate-[5deg]',
  // Card 2: medium, bottom-center, slight right tilt
  'min-[1181px]:left-[43%] min-[1181px]:bottom-[1%] min-[1181px]:z-5 min-[1181px]:w-[min(21vw,330px)] min-[1181px]:min-h-[290px] min-[1181px]:rotate-[3deg]',
  // Card 3: smallest, far right, more tilt
  'min-[1181px]:right-[0%] min-[1181px]:bottom-[15%] min-[1181px]:z-4 min-[1181px]:w-[min(15vw,245px)] min-[1181px]:min-h-[300px] min-[1181px]:rotate-[8deg]',
]

// ------------------------- Decorative linework -------------------------
function ProjectLinework() {
  const paths = [
    {
      d: 'M310 265 C360 200 435 182 505 205 C568 226 562 128 645 118 C710 110 718 168 768 174 C830 181 808 82 878 85 C964 88 972 170 1048 170 C1112 170 1102 104 1180 118',
      delay: 0,
    },
    {
      d: 'M900 375 C948 342 965 308 1032 320 C1088 330 1072 398 1132 424 C1155 434 1168 434 1180 431',
      delay: 0.25,
    },
    {
      d: 'M265 485 C298 443 365 463 378 407 C390 351 328 349 346 293 C368 225 434 219 468 207',
      delay: 0.5,
    },
  ]

  return (
    <svg
      className="max-[1050px]:hidden pointer-events-none absolute inset-0 z-1 h-full w-full text-ink/40 max-[1180px]:text-ink/20"
      viewBox="0 0 1180 720"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {paths.map((path) => (
        <AnimatedPath
          key={path.d}
          d={path.d}
          strokeWidth={path.d.includes('900') ? 1 : 0.9}
          vectorEffect="non-scaling-stroke"
          delay={path.delay}
        />
      ))}
    </svg>
  )
}


// ------------------------- Main Component -------------------------
export default function Projects() {
  const railRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef(new Map<string, HTMLElement>())
  const [scrollEdges, setScrollEdges] = useState({ canScrollLeft: false, canScrollRight: false })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectOffset, setProjectOffset] = useState(0)
  const [isCompactLayout, setIsCompactLayout] = useState(false)
  const activeTriggerRef = useRef<HTMLElement | null>(null)
  const { reduced, t } = useMotionConfig()
  const visibleProjectCount = Math.min(4, projects.length)
  const lastProjectPageOffset = Math.floor((projects.length - 1) / visibleProjectCount) * visibleProjectCount

  // On desktop we show one non-overlapping page of cards in the scattered layout.
  // On compact screens we show all projects in a horizontal scroll rail.
  const visibleProjects = projects.slice(projectOffset, projectOffset + visibleProjectCount)
  const renderedProjects = isCompactLayout ? projects : visibleProjects

  const updateScrollEdges = () => {
    const rail = railRef.current
    if (!rail) return
    const railBounds = rail.getBoundingClientRect()
    const firstCardBounds = rail.firstElementChild?.getBoundingClientRect()
    const lastCardBounds = rail.lastElementChild?.getBoundingClientRect()
    setScrollEdges({
      canScrollLeft: firstCardBounds ? firstCardBounds.left < railBounds.left - 1 : false,
      canScrollRight: lastCardBounds ? lastCardBounds.right > railBounds.right + 1 : false,
    })
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    updateScrollEdges()
    const resizeObserver = new ResizeObserver(updateScrollEdges)
    resizeObserver.observe(rail)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1180px)')
    const updateLayout = () => setIsCompactLayout(mediaQuery.matches)
    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  const scrollProjects = (direction: 'left' | 'right') => {
    if (!isCompactLayout) {
      // Desktop: page by the visible group size so views do not overlap.
      setProjectOffset((current) => {
        if (direction === 'left') {
          return current === 0 ? lastProjectPageOffset : Math.max(0, current - visibleProjectCount)
        }

        const nextOffset = current + visibleProjectCount
        return nextOffset >= projects.length ? 0 : nextOffset
      })
      return
    }

    // Compact: physically scroll the rail
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    })
  }

  const openProject = (project: Project) => {
    activeTriggerRef.current = triggerRefs.current.get(project.id) ?? null
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
    window.setTimeout(() => {
      activeTriggerRef.current?.focus()
    }, 0)
  }

  return (
    <>
      <section
        id="projects"
        data-section
        className="relative grid min-h-screen grid-cols-[minmax(230px,0.48fr)_minmax(680px,1.52fr)] items-center gap-[clamp(26px,4vw,70px)] overflow-hidden rounded-br-[9vw] bg-paper px-[clamp(24px,4.2vw,76px)] pt-[clamp(92px,11vh,126px)] pb-[clamp(58px,7vh,84px)] text-ink max-[1180px]:min-h-auto max-[1180px]:grid-cols-1 max-[760px]:gap-8 max-[760px]:px-[22px] max-[760px]:pt-[118px] max-[760px]:pb-12"
      >
        <ProjectLinework />

        {/* --------------------- Left side --------------------- */}
        <motion.div
          className="relative z-2 max-w-[360px] self-center max-[1180px]:max-w-[620px] max-[760px]:max-w-[330px]"
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <SectionLabel>Projects</SectionLabel>

          <motion.h2
            className="max-w-[420px] font-serif text-[clamp(52px,6.5vw,100px)] leading-[0.9] font-medium max-[1180px]:max-w-[560px] max-[760px]:text-[clamp(44px,14vw,66px)]"
            variants={fadeUp}
            transition={t(0.85)}
          >
            Ideas
            <br />
            into
            <br />
            real-
            <br />
            world
            <br />
            impact.
          </motion.h2>

          <motion.span
            className="mt-3 mb-[34px] block h-[17px] w-[230px] rotate-[-5deg] rounded-[50%] border-b border-current opacity-70 max-[760px]:mb-6 max-[760px]:w-[190px]"
            variants={fadeUp}
            transition={t(0.7, 0.12)}
          />

          <motion.p
            className="max-w-[275px] text-[15px] leading-[1.8] text-mid tracking-widest"
            variants={fadeUp}
            transition={t(0.75, 0.22)}
          >
            Selected works where design, engineering and user needs come together.
          </motion.p>
        </motion.div>

        {/* --------------------- Right side --------------------- */}
        <div className="relative z-2 min-h-[720px] min-w-0 max-[1180px]:min-h-0 max-[760px]:mt-1">

          {/* Navigation buttons: top-right on desktop, inline above cards on compact. */}
          <motion.div
            className="absolute top-0 right-[4%] z-10 flex gap-4 max-[1180px]:relative max-[1180px]:right-auto max-[1180px]:mb-5 max-[1180px]:justify-end max-[760px]:mb-3 max-[760px]:gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={t(0.6, 0.2)}
          >
            <motion.button
              className="grid h-[58px] w-[58px] place-items-center rounded-full border border-ink/45 bg-paper/80 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink max-[760px]:h-11 max-[760px]:w-11"
              type="button"
              onClick={() => scrollProjects('left')}
              aria-label="Previous projects"
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={reduced ? undefined : { scale: 0.94 }}
            >
              <ArrowLeft size={18} />
            </motion.button>

            <motion.button
              className="grid h-[58px] w-[58px] place-items-center rounded-full border border-ink/45 bg-paper/80 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink max-[760px]:h-11 max-[760px]:w-11"
              type="button"
              onClick={() => scrollProjects('right')}
              aria-label="Next projects"
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={reduced ? undefined : { scale: 0.94 }}
            >
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Leaves decoration at the top-right of the card area. */}
          <motion.img
            className="pointer-events-none absolute top-[13%] right-[0.5%] z-2 w-[min(11vw,155px)] opacity-55 text-ink max-[1180px]:hidden"
            src="/leaves.svg"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, y: -16, rotate: 4 }}
            whileInView={{ opacity: 0.55, y: 0, rotate: 0 }}
            viewport={VIEWPORT}
            transition={t(0.9, 0.25)}
          />

          <div className="relative h-[720px] max-[1180px]:mx-[-44px] max-[1180px]:h-auto max-[760px]:mx-[-22px]">
            <div
              ref={railRef}
              className="relative h-full overflow-visible max-[1180px]:flex max-[1180px]:snap-x max-[1180px]:snap-mandatory max-[1180px]:gap-[clamp(20px,3vw,42px)] max-[1180px]:overflow-x-scroll max-[1180px]:overflow-y-visible max-[1180px]:px-16 max-[1180px]:pt-10 max-[1180px]:pb-20 max-[1180px]:[-ms-overflow-style:none] max-[1180px]:[&::-webkit-scrollbar]:hidden max-[760px]:gap-4 max-[760px]:px-[22px] max-[760px]:pt-6 max-[760px]:pb-10"
              aria-label="Project list"
              onScroll={updateScrollEdges}
            >
              {renderedProjects.map((project, index) => (
                <motion.div
                  className={[
                    'max-[1180px]:snap-start',
                    index < cardPlacements.length ? 'min-[1181px]:absolute' : '',
                    cardPlacements[index] ?? 'min-[1181px]:hidden',
                  ].join(' ')}
                  key={project.id}
                  variants={fadeUpScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  transition={t(0.7, index * 0.1)}
                >
                  <ProjectCard
                    project={project}
                    className={[
                      'w-full max-[1180px]:w-[320px] max-[760px]:min-h-[360px] max-[760px]:w-[min(82vw,300px)] max-[760px]:px-5 max-[760px]:pt-6',
                      index === 0 ? 'min-[1181px]:px-8 min-[1181px]:pt-8' : '',
                      index === 1 ? 'min-[1181px]:px-6 min-[1181px]:pt-7' : '',
                      index === 2 ? 'min-[1181px]:px-6 min-[1181px]:pt-6' : '',
                      index === 3 ? 'min-[1181px]:px-5 min-[1181px]:pt-6' : '',
                    ].join(' ')}
                    artClassName={[
                      index === 0 ? 'min-[1181px]:mx-auto min-[1181px]:w-[78%]' : '',
                      index === 1 ? 'min-[1181px]:mx-auto min-[1181px]:w-[70%]' : '',
                      index === 2 ? 'min-[1181px]:mx-auto min-[1181px]:w-[52%]' : '',
                      index === 3 ? 'min-[1181px]:mx-auto min-[1181px]:w-[62%]' : '',
                    ].join(' ')}
                    onSelect={() => openProject(project)}
                    cardRef={(node) => {
                      if (node) {
                        triggerRefs.current.set(project.id, node)
                      } else {
                        triggerRefs.current.delete(project.id)
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {scrollEdges.canScrollLeft && (
              <div
                className="pointer-events-none absolute inset-y-4 left-0 z-3 w-20 bg-linear-to-r from-paper to-transparent max-[760px]:w-14"
                aria-hidden="true"
              />
            )}

            {scrollEdges.canScrollRight && (
              <div
                className="pointer-events-none absolute inset-y-4 right-0 z-3 w-20 bg-linear-to-l from-paper to-transparent max-[760px]:w-14"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projects={projects}
          onClose={closeProject}
          onSelectProject={setSelectedProject}
        />
      )}
    </>
  )
}
