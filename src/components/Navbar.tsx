import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const location = useLocation()

  const [activeAnchor, setActiveAnchor] = useState<string>('hero')

  // Determine base route and whether we are on Home
  const raw = (location.hash || '#/').replace(/^#/, '')
  const [baseRaw, anchor] = raw.split('#')
  const base = `#${baseRaw || '/'}`
  const onHome = base === '#/'

  // On mount and when hash changes, if on Home with anchor, enforce active and ensure view is correct
  useEffect(() => {
    if (onHome && anchor) {
      const el = document.getElementById(anchor)
      if (el) {
        setActiveAnchor(anchor)
        // ensure anchor is actually in view after refresh
        setTimeout(() => { el.scrollIntoView({ behavior: 'auto', block: 'start' }) }, 0)
      } else {
        setActiveAnchor('hero')
      }
    }
  }, [onHome, anchor])

  // Scroll spy on Home to update activeAnchor
  useEffect(() => {
    if (!onHome) return
    let ticking = false

    const sectionIds = ['hero', 'about', 'notes', 'projects', 'contact']

    function updateActive() {
      const center = window.innerHeight * 0.4
      let current = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= center && rect.bottom >= center) { current = id; break }
        if (rect.top < center) current = id
      }
      setActiveAnchor(current)
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => { updateActive(); ticking = false })
        ticking = true
      }
    }

    // Delay initial calculation to let browser finish anchor jump and scroll-snap settle
    setTimeout(() => { updateActive() }, 200)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
    }
  }, [onHome])

  // Classes
  const activeCls = 'px-4 py-2 rounded-full bg-violet-600 text-white transition-colors'
  const idleCls = 'px-4 py-2 rounded-full text-slate-200/90 hover:text-white hover:bg-white/10 transition-colors'

  // Compute which item should be active
  const activeHome = onHome && (activeAnchor === 'hero')
  const activeAbout = (onHome && activeAnchor === 'about') || base === '#/about'
  const activeArticles = (onHome && activeAnchor === 'notes') || base === '#/articles'
  const activePortfolio = (onHome && activeAnchor === 'projects') || base === '#/portfolio'
  const activeContact = (onHome && activeAnchor === 'contact') || base === '#/contact'

  function smoothTo(id: string, fallback: string) {
    const isHome = onHome || location.pathname === '/'
    if (isHome) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const homeBase = '#/'
        history.replaceState(null, '', `${homeBase}#${id}`)
        setActiveAnchor(id)
        return
      }
    }
    window.location.hash = fallback
  }

  return (
    <header className="sticky top-0 z-20">
      <div className="h-18 md:h-20 w-full border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <nav className="container mx-auto px-4 h-full flex items-center justify-between text-white">
          <Link to="/" className="font-extrabold tracking-wide text-2xl">
            <span className="text-white">金源植</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className={activeHome ? activeCls : idleCls} onClick={(e) => { if (onHome) { e.preventDefault(); smoothTo('hero', '#/'); }}}>首页</Link>
            <Link to="/#about" className={activeAbout ? activeCls : idleCls} onClick={(e) => { e.preventDefault(); smoothTo('about', '#/#about') }}>关于</Link>
            <Link to="/#notes" className={activeArticles ? activeCls : idleCls} onClick={(e) => { e.preventDefault(); smoothTo('notes', '#/#notes') }}>AI文章</Link>
            <Link to="/#projects" className={activePortfolio ? activeCls : idleCls} onClick={(e) => { e.preventDefault(); smoothTo('projects', '#/#projects') }}>个人项目</Link>
            <Link to="/#contact" className={activeContact ? activeCls : idleCls} onClick={(e) => { e.preventDefault(); smoothTo('contact', '#/#contact') }}>联系</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
