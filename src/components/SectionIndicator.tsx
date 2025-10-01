import { useEffect, useMemo, useRef, useState } from 'react'

type Item = { id: string; label: string }

function getHashParts(): { base: string; anchor?: string } {
  // location.hash example: "#/about#about-2" or "#/"
  const raw = (window.location.hash || '#/').replace(/^#/, '')
  const [base, anchor] = raw.split('#')
  return { base: `#${base || '/'}`, anchor }
}

function setHash(base: string, anchor?: string) {
  const next = anchor ? `${base}#${anchor}` : base
  history.replaceState(null, '', next)
}

export default function SectionIndicator({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id || '')

  const idxMap = useMemo(() => new Map(items.map((it, i) => [it.id, i])), [items])
  const cooldown = useRef(false)

  useEffect(() => {
    // Jump to anchor on first mount if exists
    const { base, anchor } = getHashParts()
    if (anchor && document.getElementById(anchor)) {
      document.getElementById(anchor)!.scrollIntoView({ behavior: 'instant', block: 'start' as ScrollLogicalPosition })
      setActive(anchor)
      setHash(base, anchor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let ticking = false

    function updateActive() {
      const center = window.innerHeight * 0.4
      let current = items[0]?.id || ''
      for (const i of items) {
        const el = document.getElementById(i.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= center && rect.bottom >= center) {
          current = i.id
          break
        }
        if (rect.top < center) current = i.id
      }
      if (current && current !== active) {
        setActive(current)
        const { base } = getHashParts()
        setHash(base, current)
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive()
          ticking = false
        })
        ticking = true
      }
    }

    const { base } = getHashParts()
    if (active) setHash(base, active)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items, active])

  function scrollToId(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    const { base } = getHashParts()
    setHash(base, id)
  }

  function scrollByStep(delta: -1 | 1) {
    if (cooldown.current) return
    cooldown.current = true
    const i = idxMap.get(active) ?? 0
    let next = i + delta
    if (next < 0) next = 0
    if (next >= items.length) next = items.length - 1
    const target = items[next]
    if (target) scrollToId(target.id)
    window.setTimeout(() => { cooldown.current = false }, 700)
  }

  // Wheel and keyboard navigation
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const dy = e.deltaY
      if (Math.abs(dy) < 10) return
      scrollByStep(dy > 0 ? 1 : -1)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollByStep(1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollByStep(-1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      {/* Dots - right center (show on mobile too) */}
      <aside className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex">
        <ul className="flex flex-col gap-2 sm:gap-3">
          {items.map((i) => (
            <li key={i.id}>
              <button
                aria-label={i.label}
                title={i.label}
                onClick={() => scrollToId(i.id)}
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${active === i.id ? 'bg-white ring-2 ring-white/70 scale-110' : 'bg-white/40 hover:bg-white/70'}`}
              />
            </li>
          ))}
        </ul>
      </aside>

      {/* Arrows - bottom right, larger click area, visible on mobile */}
      <div className="fixed bottom-4 right-4 z-20 flex flex-col items-center gap-2 sm:gap-3">
        <button
          aria-label="向上滚动"
          title="上一分区"
          onClick={() => scrollByStep(-1)}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/40 text-white/90 hover:text-white hover:border-white bg-black/30 hover:bg-black/40 backdrop-blur flex items-center justify-center shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path fillRule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.81l-4.72 4.72a.75.75 0 11-1.06-1.06l6-6a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06L12.75 6.81V19.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          aria-label="向下滚动"
          title="下一分区"
          onClick={() => scrollByStep(1)}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/40 text-white/90 hover:text-white hover:border-white bg-black/30 hover:bg-black/40 backdrop-blur flex items-center justify-center shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v12.69l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V4.5A.75.75 0 0112 3.75z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </>
  )
}
