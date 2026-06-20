
import { experiences } from '../data/content'

export default function Experience() {
  return (
    <section
      id="experience"
      data-section
      className="relative grid min-h-screen grid-cols-[minmax(230px,0.65fr)_minmax(420px,1fr)] items-center gap-[clamp(40px,7vw,112px)] overflow-hidden px-[clamp(24px,8vw,112px)] pt-[clamp(92px,13vh,150px)] pb-[clamp(58px,8vh,96px)] max-[1050px]:min-h-auto max-[1050px]:grid-cols-1 max-[760px]:px-[22px] max-[760px]:pt-[118px] max-[760px]:pb-16"
    >
      {/* --------------------- Left side --------------------- */}
      <div className="relative z-2 max-w-[360px]">
        <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.48em] uppercase max-[760px]:tracking-[0.32em]">
          <span className="h-5 w-px bg-current" />
          Experience
        </div>

        <h2 className="max-w-[420px] font-serif text-[clamp(42px,5vw,76px)] leading-none font-medium">
          Building solutions.
          <br />
          Growing impact.
        </h2>

        <span className="mt-3 mb-[34px] block h-[17px] w-[230px] rotate-[-5deg] rounded-[50%] border-b border-current opacity-70" />

        <p className="text-sm leading-[1.85] text-mid tracking-widest">
          A journey of turning ideas into reliable software and collaborating with diverse teams.
        </p>

        {/* <a
          href="#background"
          className="mt-[34px] inline-flex items-center gap-4 border-b border-current pb-[7px] text-sm focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          View All Experience <ArrowRight size={14} />
        </a> */}
      </div>

      {/* --------------------- Right side --------------------- */}
      <div className="relative z-2 grid gap-14 pl-[42px] before:absolute before:top-0 before:bottom-0 before:left-3 before:w-px before:bg-black max-[760px]:pl-6">
        {experiences.map((item) => (
          <article
            className="relative grid grid-cols-[minmax(210px,0.8fr)_minmax(220px,1fr)] gap-[42px] before:absolute before:top-1.5 before:left-[-36px] before:h-2.5 before:w-2.5 before:rounded-full before:border before:border-ink before:bg-paper max-[760px]:grid-cols-1 max-[760px]:gap-3 max-[760px]:before:left-[-18px]"
            key={item.role}
          >
            <div>
              <h3 className="font-serif text-[22px] leading-[1.1] font-medium">{item.role}</h3>
              <p className="mt-2 text-[13px] leading-[1.8] text-mid">{item.period}</p>
              <p className="mt-2 text-[13px] leading-[1.8] text-mid">{item.company}</p>
            </div>
            <p className="mt-2 text-[13px] leading-[1.8] text-mid tracking-widest">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
