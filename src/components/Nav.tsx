import { useEffect, useState } from 'react'
import { nav } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle scroll event
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({
      behavior: 'smooth',
    })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={[
          'fixed inset-x-0 top-0 z-100 flex items-center justify-between border-b border-light',
          'px-5 py-4 transition-[background,backdrop-filter] duration-300 md:px-12',
          scrolled ? 'bg-paper/95 backdrop-blur-sm' : 'bg-transparent',
        ].join(' ')}
      >
        {/* ---------------------Left Side of the Navbar--------------------- */}
        <span className="inline-flex items-center font-mono text-xl tracking-wider uppercase leading-none">
          <span className="relative -top-0.5 z-10">R</span>
          <span className="relative top-0.5 -ml-0.5">A</span>
        </span>

        {/* ---------------------Right Side of the Navbar--------------------- */}
        <ul className="hidden list-none gap-10 md:flex">
          {nav.map((item) => (
            <li key={item}>
              <button
                className="border-0 bg-transparent p-0 font-mono text-xs tracking-wider text-mid uppercase transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
                onClick={() => scrollTo(item)}
                type="button"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* ---------------------Hamburger Button--------------------- */}
        <button
          className="flex flex-col gap-[5px] border-0 bg-transparent p-1 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className="h-px w-[22px] bg-ink transition-transform duration-300" />
          <span className="h-px w-[22px] bg-ink transition-transform duration-300" />
        </button>
      </nav>

      {/* ---------------------Mobile Menu--------------------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-99 flex flex-col items-center justify-center gap-10 bg-paper">
          {nav.map((item) => (
            <button
              className="border-0 bg-transparent font-serif text-[2.5rem] text-ink italic focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
              key={item}
              onClick={() => scrollTo(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
