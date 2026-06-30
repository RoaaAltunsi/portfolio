import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { typedValues } from '../data/content'
import { fadeUp, staggerContainer, useMotionConfig, VIEWPORT } from '../lib/motion'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [valueIndex, setValueIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const { reduced, t } = useMotionConfig()

  useEffect(() => {
    const currentValue = typedValues[valueIndex]
    const isComplete = typedText === currentValue
    const isEmpty = typedText === ''
    const delay = isComplete && !isDeleting ? 1200 : isDeleting ? 45 : 85

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false)
        setValueIndex((index) => (index + 1) % typedValues.length)
        return
      }

      setTypedText((value) =>
        isDeleting ? currentValue.slice(0, value.length - 1) : currentValue.slice(0, value.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [isDeleting, typedText, valueIndex])

  return (
    <section
      id="home"
      data-section
      className="relative flex flex-wrap gap-10 justify-between min-h-screen items-center overflow-hidden px-[clamp(24px,8vw,112px)] pt-[clamp(92px,13vh,150px)] pb-[clamp(58px,8vh,96px)]"
    >
      {/* --------------------- Left side: Intro --------------------- */}
      <motion.div
        className="z-2 mb-10 w-full max-w-[380px] flex-none pl-[clamp(0px,4vw,44px)] md:mb-0"
        variants={staggerContainer(0.11, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.div
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.48em] max-[760px]:tracking-[0.32em]"
          variants={fadeUp}
          transition={t(0.8)}
        >
          <span>Hi, I'm</span>
          <span className="inline-flex min-w-[18ch] text-mid items-center normal-case">
            {typedText}
            <span className="ml-1 h-4 w-px animate-pulse bg-current" aria-hidden="true" />
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-[clamp(76px,9vw,132px)] leading-[0.82] font-medium tracking-normal max-[760px]:text-[clamp(64px,21vw,96px)]"
          variants={fadeUp}
          transition={t(0.9, 0.05)}
        >
          Roaa
          <br />
          Altunsi
        </motion.h1>

        <motion.p
          className="mt-[30px] text-[13px] tracking-[0.62em] uppercase max-[760px]:tracking-[0.32em]"
          variants={fadeUp}
          transition={t(0.75, 0.1)}
        >
          Software Engineer
        </motion.p>

        <motion.span
          className="my-7 block h-px w-[18px] bg-mid"
          variants={fadeUp}
          transition={t(0.6, 0.15)}
        />

        <motion.p
          className="text-sm leading-[1.85] text-mid tracking-widest"
          variants={fadeUp}
          transition={t(0.75, 0.2)}
        >
          I build elegant, scalable and impactful software solutions with a focus on clean code and thoughtful design.
        </motion.p>

        <motion.a
          className="mt-[34px] inline-flex items-center gap-[18px] rounded-full bg-ink px-6 py-[15px] text-[13px] text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-[transform,box-shadow] duration-180 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
          href="#projects"
          variants={fadeUp}
          transition={t(0.75, 0.28)}
          whileHover={reduced ? undefined : { y: -2, boxShadow: '0 18px 42px rgba(0,0,0,0.24)' }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          View My Work <ArrowRight size={14} />
        </motion.a>
      </motion.div>

      {/* --------------------- Right side: Logo SVG --------------------- */}
      <motion.div
        className="ml-auto flex min-w-60 flex-1 items-end justify-end"
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={t(1.1, 0.35)}
      >
        <motion.img
          className="block w-[min(100%,760px)] max-h-[min(76vh,780px)] object-contain"
          src="/hero.svg"
          alt="Roaa Altunsi abstract line logo"
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>
    </section>
  )
}
