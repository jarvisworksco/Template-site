// ── GSAP ScrollTrigger efektai: hero parallax + proceso linijos piešimas ────
// Visi su scrub — skaičiuojami tik kai elementas matomas. Reduced motion: praleidžiama.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initEffects({ reduced }) {
  if (reduced) return { destroy: () => {} }

  const triggers = []

  // Hero parallax — fonas juda lėčiau (max ~15%).
  const bg = document.querySelector('[data-parallax]')
  if (bg) {
    const tw = gsap.to(bg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.closest('.hero'),
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    triggers.push(tw.scrollTrigger)
  }

  // Proceso linija „nupiešiama" scroll'inant (scaleX 0→1).
  const line = document.querySelector('[data-process-line]')
  if (line) {
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
    const tw = gsap.to(line, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: line.closest('.process__wrap'),
        start: 'top 75%',
        end: 'bottom 70%',
        scrub: true,
      },
    })
    triggers.push(tw.scrollTrigger)
  }

  return { destroy: () => triggers.forEach((t) => t && t.kill()) }
}
