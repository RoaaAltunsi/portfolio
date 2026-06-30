type LogoMarkProps = {
  className?: string
}

export default function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <span
      className={[
        'relative inline-block h-[1em] w-[1.58em] shrink-0 font-serif text-[40px] leading-none tracking-normal text-current',
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      <span className="absolute left-[0.12em] top-0 z-2 font-medium leading-none">R</span>
      <span className="absolute left-[0.68em] top-[0.31em] z-3 font-medium leading-none">A</span>
      <svg
        className="absolute left-[0.5em] top-[0.42em] z-1 h-[0.92em] w-[0.58em] text-current/30"
        viewBox="0 0 40 72"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M35 4 L5 68"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
