import { Mail } from 'lucide-react'
import LogoMark from './LogoMark'

export default function Footer() {
  return (
    <footer className="relative z-0 grid min-h-[92px] grid-cols-[1fr_auto_1fr] items-center gap-8 bg-ink px-[clamp(24px,6vw,90px)] py-5 text-white max-[760px]:grid-cols-1 max-[760px]:justify-items-start max-[760px]:gap-5">
      <a href="#home" className="inline-flex items-center text-white" aria-label="Back to top">
        <LogoMark className="text-[38px]" />
      </a>

      <p className="text-center text-sm tracking-wider text-white/85 max-[760px]:text-left">
        &copy; Roaa Altunsi. All rights reserved.
      </p>

      <div className="flex items-center justify-end gap-9 max-[760px]:justify-start">
        <a
          href="https://www.linkedin.com/in/roaa-altunsi/"
          target="_blank"
          aria-label="LinkedIn"
          className="font-sans text-[25px] font-bold leading-none transition-opacity duration-200 hover:opacity-70"
        >
          in
        </a>

        <a
          href="https://github.com/RoaaAltunsi"
          target="_blank"
          aria-label="GitHub"
          className="transition-opacity duration-200 hover:opacity-70">
          <img className="h-[25px] w-[25px] invert" src="/github.svg" alt="" aria-hidden="true" />
        </a>

        <a
          href="mailto:roaaaltunsi@gmail.com"
          aria-label="Email"
          className="transition-opacity duration-200 hover:opacity-70"
        >
          <Mail size={25} strokeWidth={1.65} />
        </a>
      </div>
    </footer>
  )
}
