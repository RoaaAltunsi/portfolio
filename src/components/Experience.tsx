import { motion } from 'framer-motion'
import { experiences } from '../data/content'
import AnimatedPath from './AnimatedPath'
import {
  fadeUp,
  fadeUpScale,
  slideFromLeft,
  staggerContainer,
  VIEWPORT,
  useMotionConfig,
} from '../lib/motion'

const experiencePlacements = [
  'min-[1181px]:top-[108px]',
  'min-[1181px]:top-[408px]',
  'min-[1181px]:top-[688px]',
]

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      className="mb-12 flex items-center gap-5 text-xs font-medium tracking-[0.58em] uppercase max-[760px]:mb-7 max-[760px]:tracking-[0.32em]"
      variants={slideFromLeft}
    >
      <span className="h-8 w-px bg-current" />
      {children}
    </motion.div>
  )
}

// ------------------------------ Experience Linework ------------------------------
function ExperienceLinework() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-1 h-full w-full text-ink/70 max-[1180px]:hidden"
      viewBox="0 0 1840 1000"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <AnimatedPath
        d="M620 -20 C705 36 838 54 873 126 C924 232 812 290 766 368 C719 449 760 514 848 520 C913 524 927 552 898 604 C866 663 747 671 734 762 C722 848 845 820 850 914 C853 982 792 1007 776 1040"
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />
      <AnimatedPath
        d="M886 182 C912 182 936 182 958 183"
        strokeWidth={1.05}
        strokeDasharray="2 5"
        vectorEffect="non-scaling-stroke"
        delay={0.3}
      />
      <AnimatedPath
        d="M859 517 C884 488 901 482 960 482"
        strokeWidth={1.05}
        strokeDasharray="2 5"
        vectorEffect="non-scaling-stroke"
        delay={0.45}
      />
      <AnimatedPath
        d="M780 764 C853 732 868 727 960 727"
        strokeWidth={1.05}
        strokeDasharray="2 5"
        vectorEffect="non-scaling-stroke"
        delay={0.6}
      />
      <AnimatedPath
        d="M0 868 C70 908 144 942 245 925 C357 906 432 884 598 970"
        strokeWidth={0.95}
        opacity={0.22}
        vectorEffect="non-scaling-stroke"
        delay={0.75}
      />
      <AnimatedPath
        d="M894 960 C1034 950 1117 911 1304 930 C1432 943 1534 930 1660 870 C1742 832 1789 828 1840 833"
        strokeWidth={1}
        opacity={0.5}
        vectorEffect="non-scaling-stroke"
        delay={0.9}
      />
    </svg>
  )
}

// ------------------------------ Timeline Node ------------------------------
function TimelineNode({ index, className }: { index: number; className: string }) {
  const { t } = useMotionConfig()

  return (
    <motion.div
      className={['absolute z-4 flex items-center gap-7 max-[1180px]:hidden', className].join(' ')}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={t(0.6, index * 0.15)}
    >
      <span className="font-serif text-[38px] leading-none tracking-normal">{String(index + 1).padStart(2, '0')}</span>
      <motion.span
        className="grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={t(0.5, 0.2 + index * 0.15)}
      >
        <span className="h-3 w-3 rounded-full bg-ink" />
      </motion.span>
    </motion.div>
  )
}

// ------------------------------ Experience Entry ------------------------------
function ExperienceEntry({ index, item }: { index: number; item: (typeof experiences)[number] }) {
  const { t } = useMotionConfig()

  return (
    <motion.article
      className={[
        'relative z-3 max-w-[590px] max-[1180px]:rounded-lg max-[1180px]:border max-[1180px]:border-light max-[1180px]:bg-white/70 max-[1180px]:p-6 max-[1180px]:shadow-[0_18px_42px_rgba(0,0,0,0.05)]',
        'min-[1181px]:absolute min-[1181px]:left-[52.5%]',
        experiencePlacements[index],
      ].join(' ')}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpScale}
      transition={t(0.75, index * 0.12)}
      whileHover={{ y: -4 }}
    >
      <div className="mb-3 flex items-baseline gap-4 min-[1181px]:hidden">
        <span className="font-serif text-3xl leading-none">{String(index + 1).padStart(2, '0')}</span>
        <span className="h-px flex-1 bg-light" />
      </div>

      <h3 className="font-serif text-[clamp(30px,2.15vw,42px)] leading-[1.02] font-medium">{item.role}</h3>

      <p className="mt-4 flex flex-wrap items-center gap-4 text-[17px] leading-none text-ink max-[760px]:text-[15px]">
        <span>{item.company}</span>
        <span aria-hidden="true">•</span>
        <span>{item.period}</span>
      </p>

      <p className="mt-7 max-w-[560px] text-[15px] leading-[1.8] tracking-wider text-mid max-[760px]:text-sm">
        {item.summary}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] leading-none text-mid">
        {item.tools.map((tool, toolIndex) => (
          <span className="inline-flex items-center gap-4" key={tool}>
            {toolIndex > 0 && <span className="h-5 w-px bg-light" aria-hidden="true" />}
            <span>{tool}</span>
          </span>
        ))}
      </div>
    </motion.article>
  )
}

// ------------------------------ Main Component ------------------------------
export default function Experience() {
  const { t } = useMotionConfig()

  return (
    <section
      id="experience"
      data-section
      className="relative min-h-[1000px] overflow-hidden bg-paper px-[clamp(24px,6vw,112px)] pt-[clamp(92px,10vh,126px)] pb-[clamp(70px,8vh,98px)] text-ink max-[1180px]:min-h-auto max-[760px]:px-[22px] max-[760px]:pt-[118px] max-[760px]:pb-16"
    >
      <ExperienceLinework />

      <motion.div
        className="relative z-3 max-w-[430px] max-[1180px]:max-w-[620px]"
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <SectionLabel>Experience</SectionLabel>

        <motion.h2
          className="font-serif text-[clamp(64px,6.25vw,106px)] leading-[0.92] font-medium tracking-normal max-[760px]:text-[clamp(48px,15vw,72px)]"
          variants={fadeUp}
          transition={t(0.85)}
        >
          Building
          <br />
          solutions.
          <br />
          Growing
          <br />
          impact.
        </motion.h2>

        <motion.span
          className="mt-4 mb-10 block h-[18px] w-[340px] max-w-full rotate-[-4deg] rounded-[50%] border-b border-current opacity-60 max-[760px]:mb-7"
          variants={fadeUp}
          transition={t(0.7, 0.15)}
        />

        <motion.p
          className="max-w-[390px] text-[15px] leading-[1.8] tracking-widest text-mid max-[760px]:text-[15px]"
          variants={fadeUp}
          transition={t(0.75, 0.25)}
        >
          A journey of turning ideas into reliable software and collaborating with diverse teams.
        </motion.p>
      </motion.div>

      <motion.img
        className="pointer-events-none absolute left-[-1.5%] bottom-[-1.5%] z-2 w-[min(31vw,430px)] opacity-75 max-[1180px]:hidden"
        src="/botanical-vine.svg"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: -30, y: 20 }}
        whileInView={{ opacity: 0.75, x: 0, y: 0 }}
        viewport={VIEWPORT}
        transition={t(1.2, 0.2)}
      />
      <motion.img
        className="pointer-events-none absolute right-[10.4%] top-0 z-2 w-[min(14vw,205px)] opacity-66 max-[1180px]:hidden"
        src="/botanical-sprout.svg"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, y: -20, rotate: -8 }}
        whileInView={{ opacity: 0.66, y: 0, rotate: 0 }}
        viewport={VIEWPORT}
        transition={t(1, 0.35)}
      />
      <motion.img
        className="pointer-events-none absolute right-[-10.6%] bottom-0 z-2 w-[min(25vw,385px)] opacity-78 max-[1180px]:hidden"
        src="/climbing.svg"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.78, x: 0 }}
        viewport={VIEWPORT}
        transition={t(1.1, 0.45)}
      />

      <TimelineNode index={0} className="left-[39%] top-[178px]" />
      <TimelineNode index={1} className="left-[35.4%] top-[489px]" />
      <TimelineNode index={2} className="left-[35.4%] top-[754px]" />

      <div className="relative z-3 mt-14 grid gap-6 min-[1181px]:contents">
        {experiences.map((item, index) => (
          <ExperienceEntry item={item} index={index} key={item.role} />
        ))}
      </div>
    </section>
  )
}
