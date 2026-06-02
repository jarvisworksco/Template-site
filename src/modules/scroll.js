// ── Lenis smooth scroll + GSAP ScrollTrigger sinchronizacija ────────────────
// Reduced motion: Lenis nejungiamas, lieka natyvus scroll'as.
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScroll({ reduced }) {
  if (reduced) {
    // Be smooth scroll — bet ScrollTrigger vis tiek atnaujinamas natyviai.
    return { lenis: null, destroy: () => {} }
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  })

  lenis.on('scroll', ScrollTrigger.update)

  // Naudojam GSAP ticker'į vietoj atskiro requestAnimationFrame loop'o —
  // vienas rAF visam puslapiui, lengva sustabdyti (jokio leak'o).
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Vidinės nuorodos — sklandus nuvedimas per Lenis.
  // Palaiko „#sekcija" ir „/#sekcija" (pastaroji veikia ir iš kitų puslapių).
  const onClick = (e) => {
    const a = e.target.closest('a[href*="#"]')
    if (!a) return
    const url = new URL(a.href, window.location.href)
    // Tik jei nuoroda į TĄ PATĮ puslapį ir turi #hash — kitaip leidžiam natyvią navigaciją.
    if (url.pathname !== window.location.pathname || !url.hash || url.hash.length < 2) return
    const el = document.querySelector(url.hash)
    if (!el) return
    e.preventDefault()
    lenis.scrollTo(el, { offset: -80 })
    history.pushState(null, '', url.hash)
  }
  document.addEventListener('click', onClick)

  return {
    lenis,
    destroy() {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    },
  }
}
