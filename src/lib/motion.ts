import { useReducedMotion, type Transition, type Variants } from 'framer-motion'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]

export const VIEWPORT = { once: false, amount: 0.25 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
}

export function staggerContainer(stagger = 0.1, delayChildren = 0.06): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

export function motionTransition(reduced: boolean | null, duration = 0.75, delay = 0): Transition {
  if (reduced) return { duration: 0, delay: 0 }
  return { duration, delay, ease: EASE_OUT }
}

export function useMotionConfig() {
  const reduced = useReducedMotion()
  return {
    reduced,
    t: (duration = 0.75, delay = 0) => motionTransition(reduced, duration, delay),
  }
}

/** @deprecated Use useMotionConfig().t instead */
export function useMotionTransition(duration = 0.75, delay = 0): Transition {
  const reduced = useReducedMotion()
  return motionTransition(reduced, duration, delay)
}
