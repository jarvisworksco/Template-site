// ── Magnetic buttons: elementas „seka" kursorių per ±8px ────────────────────
// Tik desktop / ne reduced-motion. Kiekvienam [data-magnetic] — savo listeneriai,
// visi sutvarkomi destroy() metu (jokio leak'o).
import { gsap } from 'gsap'

const STRENGTH = 0.3 // 0..1, kiek elementas pasislenka kursoriaus kryptimi
const MAX = 8        // px riba

export function initMagnetic({ reduced }) {
  const fine = window.matchMedia('(pointer: fine)').matches
  const els = Array.from(document.querySelectorAll('[data-magnetic]'))
  if (reduced || !fine || !els.length) return { destroy: () => {} }

  const cleanups = els.map((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      xTo(gsap.utils.clamp(-MAX, MAX, mx * STRENGTH))
      yTo(gsap.utils.clamp(-MAX, MAX, my * STRENGTH))
    }
    const onLeave = () => { xTo(0); yTo(0) }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  })

  return { destroy: () => cleanups.forEach((fn) => fn()) }
}
