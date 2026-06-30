import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, motionTransition, VIEWPORT } from '../lib/motion'

type AnimatedPathProps = {
  d: string
  className?: string
  stroke?: string
  strokeWidth?: number | string
  strokeDasharray?: string
  opacity?: number
  vectorEffect?: string
  delay?: number
}

export default function AnimatedPath({
  d,
  className,
  stroke = 'currentColor',
  strokeWidth = 1,
  strokeDasharray,
  opacity = 1,
  vectorEffect,
  delay = 0,
}: AnimatedPathProps) {
  const reduced = useReducedMotion()
  const transition = motionTransition(reduced, 1.6, delay)

  if (reduced) {
    return (
      <path
        d={d}
        className={className}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        opacity={opacity}
        vectorEffect={vectorEffect}
      />
    )
  }

  return (
    <motion.path
      d={d}
      className={className}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={opacity}
      vectorEffect={vectorEffect}
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity }}
      viewport={{ ...VIEWPORT, amount: 0.15 }}
      transition={{ ...transition, ease: EASE_OUT }}
    />
  )
}
