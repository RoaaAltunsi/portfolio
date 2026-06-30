import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups, skills } from '../data/content'
import AnimatedPath from './AnimatedPath'
import {
  fadeUp,
  slideFromLeft,
  staggerContainer,
  VIEWPORT,
  useMotionConfig,
} from '../lib/motion'

type Skill = (typeof skills)[number]

const filterMap = {
  'All Skills': skills.map((skill) => skill.name),
  Engineering: skills.filter((skill) => skill.category === 'Engineering').map((skill) => skill.name),
  AI: skills.filter((skill) => skill.category === 'AI').map((skill) => skill.name),
  Design: skills.filter((skill) => skill.category === 'Design').map((skill) => skill.name),
  Tools: skills.filter((skill) => skill.category === 'Tools').map((skill) => skill.name),
}

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      className="mb-24 flex items-center gap-4 text-xs font-medium tracking-[0.48em] uppercase max-[1050px]:mb-8 max-[760px]:tracking-[0.32em]"
      variants={slideFromLeft}
    >
      <span className="h-5 w-px bg-current" />
      {children}
    </motion.div>
  )
}

const skillCardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: (active: boolean) => ({
    opacity: active ? 1 : 0.18,
    scale: active ? 1 : 0.94,
    y: 0,
    filter: active ? 'blur(0px)' : 'blur(2px)',
  }),
}

// ------------------------- Skill Card -------------------------
function SkillCard({ index, isVisible, skill }: { index: number; isVisible: boolean; skill: Skill }) {
  const { reduced, t } = useMotionConfig()

  return (
    <motion.article
      className={[
        'group absolute z-3 flex flex-col items-center justify-center border border-ink bg-paper/85 px-5 py-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-[2px]',
        'max-[1050px]:static max-[1050px]:h-auto max-[1050px]:min-h-[112px] max-[1050px]:w-full max-[1050px]:rotate-0 max-[1050px]:rounded-2xl',
        skill.shape,
        skill.position,
      ].join(' ')}
      custom={isVisible}
      variants={skillCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={t(0.55, index * 0.04)}
      whileHover={reduced ? undefined : { y: -6, scale: isVisible ? 1.03 : 0.94 }}
    >
      <span className="mb-2 font-mono text-[11px] tracking-[0.28em] text-ink/45">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="max-w-[140px] font-serif text-lg leading-[1.08]">{skill.name}</h3>
    </motion.article>
  )
}

// ------------------------- Connection Lines -------------------------
function ConnectionLines() {
  const paths = [
    { d: 'M184 74 C286 104 363 126 429 186', delay: 0 },
    { d: 'M188 164 C292 164 355 176 427 246', delay: 0.1 },
    { d: 'M318 372 C370 370 401 405 440 461', delay: 0.2 },
    { d: 'M176 394 C272 397 354 428 440 461', delay: 0.25 },
    { d: 'M224 506 C310 475 373 481 459 507', dash: '2 5', delay: 0.35 },
    { d: 'M199 584 C299 542 378 543 459 507', dash: '2 5', delay: 0.4 },
    { d: 'M555 184 C618 103 707 70 799 75', delay: 0.15 },
    { d: 'M566 270 C630 214 711 222 793 286', delay: 0.22 },
    { d: 'M557 490 C651 557 742 520 904 500', dash: '2 5', delay: 0.45 },
    { d: 'M526 523 C551 606 625 635 704 568', delay: 0.3 },
    { d: 'M540 560 C625 650 762 648 865 596', delay: 0.38 },
    { d: 'M429 186 C380 253 385 369 440 461 C478 524 520 535 557 490', width: 1.35, delay: 0.5 },
    { d: 'M555 184 C613 252 601 321 570 362 C525 419 482 387 427 314', width: 1.35, delay: 0.55 },
  ]

  return (
    <svg className="pointer-events-none absolute inset-0 z-1 h-full w-full text-ink/45 max-[1050px]:hidden" viewBox="0 0 980 680" aria-hidden="true">
      {paths.map((path) => (
        <AnimatedPath
          key={path.d}
          d={path.d}
          className="fill-none stroke-current"
          strokeWidth={path.width ?? 1.1}
          strokeDasharray={path.dash}
          delay={path.delay}
        />
      ))}
    </svg>
  )
}

// ------------------------- Filter Bar -------------------------
function FilterBar({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (filter: string) => void }) {
  const { t } = useMotionConfig()

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-3 flex -translate-x-1/2 items-center gap-5 rounded-full border border-light bg-paper/90 px-2 py-1 text-xs backdrop-blur max-[1050px]:static max-[1050px]:mt-10 max-[1050px]:translate-x-0 max-[1050px]:flex-wrap max-[1050px]:justify-center max-[760px]:rounded-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={t(0.7, 0.3)}
    >
      {skillGroups.map((group) => (
        <button
          className={[
            'relative rounded-full px-5 py-2 transition-colors duration-200',
            activeFilter === group ? 'text-paper' : 'text-ink/70 hover:text-ink',
          ].join(' ')}
          type="button"
          onClick={() => onFilterChange(group)}
          key={group}
        >
          {activeFilter === group && (
            <motion.span
              className="absolute inset-0 rounded-full bg-ink"
              layoutId="skills-filter-pill"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-1">{group}</span>
        </button>
      ))}
    </motion.div>
  )
}


// ------------------------- Main Component -------------------------
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All Skills')
  const { t } = useMotionConfig()
  const visibleSkills = new Set(filterMap[activeFilter as keyof typeof filterMap] ?? filterMap['All Skills'])

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden rounded-b-[5vw] bg-paper px-[clamp(24px,6vw,90px)] pt-[clamp(110px,12vh,150px)] pb-[118px] text-ink max-[760px]:px-[22px] max-[760px]:pt-[118px] max-[760px]:pb-16"
    >
      {/* --------------------- Left side --------------------- */}
      <div className="grid min-h-[720px] grid-cols-[290px_1fr] gap-[clamp(36px,5vw,72px)] max-[1050px]:min-h-0 max-[1050px]:grid-cols-1">
        <motion.div
          className="relative z-3 max-w-[320px] max-[1050px]:max-w-[560px]"
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <SectionLabel>Skills</SectionLabel>

          <motion.h2
            className="font-serif text-[clamp(52px,5.6vw,78px)] leading-[0.96] font-medium"
            variants={fadeUp}
            transition={t(0.85)}
          >
            A connected
            <br />
            set of
            <br />
            capabilities.
          </motion.h2>

          <motion.span
            className="mt-4 mb-8 block h-4 w-[250px] -rotate-3 rounded-[50%] border-b border-ink"
            variants={fadeUp}
            transition={t(0.7, 0.12)}
          />

          <motion.p
            className="max-w-[275px] text-[15px] leading-[1.8] text-mid tracking-widest"
            variants={fadeUp}
            transition={t(0.75, 0.22)}
          >
            The technologies, frameworks and practices I use to build elegant, scalable and impactful solutions.
          </motion.p>
        </motion.div>


        {/* --------------------- Right side --------------------- */}
        <div className="relative min-h-[680px] max-[1050px]:grid max-[1050px]:min-h-0 max-[1050px]:grid-cols-2 max-[1050px]:gap-4 max-[640px]:grid-cols-1">
          <ConnectionLines />

          <motion.img
            className="pointer-events-none absolute left-1/2 top-[20%] z-2 h-[430px] w-[292px] -translate-x-1/2 object-contain max-[1050px]:hidden"
            src="/skills.svg"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={t(1, 0.2)}
          />

          {skills.map((skill, index) => (
            <SkillCard key={skill.name} index={index} skill={skill} isVisible={visibleSkills.has(skill.name)} />
          ))}
        </div>
      </div>

      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
    </section>
  )
}
