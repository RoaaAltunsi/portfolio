import { Download, GraduationCap } from 'lucide-react'

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 text-xs font-medium tracking-[0.48em] uppercase max-[760px]:tracking-[0.32em]">
      <span className="h-5 w-px bg-current" />
      {children}
    </div>
  )
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full border border-light bg-white/55 text-ink shadow-[0_10px_26px_rgba(0,0,0,0.025)]">
      {children}
    </span>
  )
}

// ------------------------------ Background Linework ------------------------------
function BackgroundLinework() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-1 h-full w-full text-ink/58 max-[1180px]:hidden"
      viewBox="0 0 2048 860"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M984 421 C1060 459 1117 417 1161 341 C1216 244 1362 249 1447 333" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
      <path d="M1015 276 C1114 314 1125 161 1246 155 C1377 149 1405 276 1518 220" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
      <path d="M1568 227 C1679 109 1765 124 1853 184 C1931 237 1986 226 2048 170" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
      <path d="M1548 641 C1646 535 1739 510 1820 560 C1896 607 1956 646 2048 510" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
      <path d="M1586 700 C1688 620 1764 633 1836 694 C1917 763 1980 744 2048 718" stroke="currentColor" strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}


// ------------------------------ Education Card ------------------------------
function EducationCard() {
  return (
    <article className="absolute right-[6.4%] top-[54%] z-4 w-[300px] rotate-[6deg] rounded-2xl border border-light bg-white px-9 pt-11 pb-7 shadow-[0_24px_54px_rgba(0,0,0,0.10)] max-[1180px]:static max-[1180px]:w-full max-[1180px]:rotate-0">
      <IconBadge>
        <GraduationCap size={24} strokeWidth={1.45} />
      </IconBadge>

      <h3 className="mt-8 font-serif text-[31px] leading-none font-medium">Education</h3>
      <p className="mt-7 font-serif text-[18px] leading-[1.15]">BSc. in Computer Science</p>
      <p className="mt-3 text-sm leading-normal text-ink/70">King Abdulaziz University</p>
      <p className="mt-3 text-sm leading-normal text-ink/70">2020 - 2024</p>
      <p className="mt-3 text-sm leading-normal text-ink/70">GPA: 4.98/5.0</p>
    </article>
  )
}


// ------------------------------ CV Card ------------------------------
function CvCard() {
  return (
    <div className="absolute left-[60%] top-[4.5%] z-5 h-[650px] w-[430px] -translate-x-1/2 rotate-[7deg] max-[1180px]:static max-[1180px]:h-auto max-[1180px]:w-full max-[1180px]:translate-x-0 max-[1180px]:rotate-0">
      <div className="absolute inset-0 translate-x-8 translate-y-4 rotate-2 rounded-2xl border border-light bg-paper-dark/55 shadow-[0_20px_56px_rgba(0,0,0,0.06)] max-[1180px]:hidden" />

      <article className="relative min-h-[650px] rounded-2xl border border-light bg-white px-[62px] pt-[74px] pb-[46px] shadow-[0_30px_78px_rgba(0,0,0,0.12)] max-[1180px]:min-h-[560px] max-[1180px]:px-10 max-[760px]:min-h-[500px] max-[760px]:px-7 max-[760px]:pt-12">
        <span className="absolute -top-7 left-[70px] h-[91px] w-[30px] -rotate-12 rounded-full border-[3px] border-ink bg-transparent max-[1180px]:hidden" />

        <p className="mb-7 text-center text-[11px] tracking-[0.66em] uppercase text-ink/55 max-[760px]:tracking-[0.36em]">
          Curriculum Vitae
        </p>
        <h3 className="font-serif text-[clamp(58px,4.4vw,72px)] leading-[0.88] font-medium tracking-normal">
          Roaa
          <br />
          Altunsi
        </h3>
        <p className="mt-7 text-center text-[10px] tracking-[0.72em] uppercase text-ink/55 max-[760px]:tracking-[0.38em]">
          Software Engineer
        </p>

        <img
          className="mx-auto mt-8 block h-[226px] w-[300px] object-contain opacity-95 max-[760px]:h-[190px] max-[760px]:w-full"
          src="/card-art.svg"
          alt=""
          aria-hidden="true"
        />

        <a
          className="mx-auto mt-6 flex h-[62px] w-[294px] max-w-full items-center justify-center gap-8 rounded-full bg-ink px-8 text-[16px] text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
          target="_blank"
          href="/cv.pdf"
        >
          Download CV <Download size={22} strokeWidth={1.7} />
        </a>
      </article>
    </div>
  )
}


// ------------------------------ Main Component ------------------------------
export default function Background() {
  return (
    <section
      id="background"
      data-section
      className="relative min-h-[860px] overflow-hidden rounded-br-[6vw] bg-paper px-[clamp(24px,5.7vw,118px)] pt-[clamp(82px,7vh,96px)] pb-[70px] text-ink max-[1180px]:min-h-auto max-[760px]:px-[22px] max-[760px]:pt-[118px] max-[760px]:pb-14"
    >
      <BackgroundLinework />

      <div className="relative z-3 max-w-[440px] pt-2 max-[1180px]:max-w-[620px]">
        <SectionLabel>Background</SectionLabel>

        <h2 className="font-serif text-[clamp(58px,5.9vw,94px)] leading-[0.96] font-medium max-[760px]:text-[clamp(46px,14vw,66px)]">
          The foundation
          <br />
          behind the work.
        </h2>

        <span className="mt-[-12px] block h-[18px] w-[380px] max-w-[62vw] -rotate-3 rounded-[50%] border-b border-current opacity-65 max-[760px]:ml-14 max-[760px]:mt-0" />

        <p className="mt-[58px] max-w-[330px] text-[17px] leading-[1.75] text-mid tracking-wider max-[760px]:mt-8 max-[760px]:text-[15px]">
          Education, curiosity, and a mindset of continuous growth shape the way I build and collaborate.
        </p>
      </div>

      <img
        className="pointer-events-none absolute bottom-[5%] left-[30.5%] z-2 h-[290px] w-[290px] object-contain opacity-78 max-[1180px]:hidden"
        src="/left-bottom.svg"
        alt=""
        aria-hidden="true"
      />

      <img
        className="pointer-events-none absolute right-[4.2%] top-[5.8%] z-2 h-[190px] w-[150px] rotate-10 object-contain opacity-72 max-[1180px]:hidden"
        src="/leaves.svg"
        alt=""
        aria-hidden="true"
      />

      <img
        className="pointer-events-none absolute right-[0.8%] top-[28%] z-2 h-[270px] w-[235px] object-contain opacity-76 max-[1180px]:hidden"
        src="/most-right.svg"
        alt=""
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-3 max-[1180px]:relative max-[1180px]:inset-auto max-[1180px]:mt-12 max-[1180px]:grid max-[1180px]:grid-cols-2 max-[1180px]:gap-5 max-[760px]:grid-cols-1">
        <EducationCard />
        <CvCard />
      </div>
    </section>
  )
}
