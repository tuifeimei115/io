import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

type Props = {
  density?: number
  color?: string
  fullPage?: boolean
}

export default function Particles({ density = 0.00012, color = 'rgba(255,255,255,0.85)', fullPage = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles: Particle[] = []

    function resize() {
      width = fullPage ? window.innerWidth : canvas.clientWidth
      height = fullPage ? window.innerHeight : canvas.clientHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const targetCount = Math.max(20, Math.floor(width * height * density))
      particles = new Array(targetCount).fill(0).map(() => createParticle())
    }

    function createParticle(): Particle {
      const speed = 0.4 + Math.random() * 0.9
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 1.6,
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      // dots
      ctx.fillStyle = color
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < -5) p.x = width + 5
        if (p.x > width + 5) p.x = -5
        if (p.y < -5) p.y = height + 5
        if (p.y > height + 5) p.y = -5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // links
      const max = 140
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < max) {
            const opacity = 1 - dist / max
            ctx.strokeStyle = `rgba(255,255,255,${0.18 * opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    step()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [density, color, fullPage])

  const cls = fullPage
    ? 'fixed inset-0 h-full w-full pointer-events-none'
    : 'absolute inset-0 h-full w-full pointer-events-none'

  return <canvas ref={canvasRef} className={cls} aria-hidden="true" />
}
