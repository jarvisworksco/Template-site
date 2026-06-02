// ============================================================================
//  CLIENT ENTRY — tik judesio modulių inicializacija.
//  HTML ir SEO generuojami build metu (Astro), ne čia.
// ============================================================================
import { initScroll } from '../modules/scroll.js'
import { initHeader } from '../modules/header.js'
import { initNav } from '../modules/nav.js'
import { initToTop } from '../modules/toTop.js'
import { initCursor } from '../modules/cursor.js'
import { initMagnetic } from '../modules/magnetic.js'
import { initWordReveal } from '../modules/wordReveal.js'
import { initScrollReveal } from '../modules/scrollReveal.js'
import { initCounters } from '../modules/counters.js'
import { initBeforeAfter } from '../modules/beforeAfter.js'
import { initAccordion } from '../modules/accordion.js'
import { initCarousel } from '../modules/carousel.js'
import { initForm } from '../modules/form.js'
import { initReviewsMore } from '../modules/reviewsMore.js'
import { initReviewGate } from '../modules/reviewGate.js'
import { initGrain } from '../modules/grain.js'
import { initProgress } from '../modules/progress.js'
import { initEffects } from '../modules/effects.js'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const modules = []

// Loaderis (tik kartą per sesiją; praleidžiamas su reduced-motion).
function runLoader() {
  const loader = document.querySelector('.loader')
  const seen = sessionStorage.getItem('intro-seen')
  if (!loader || reduced || seen) { loader?.remove(); return }
  sessionStorage.setItem('intro-seen', '1')
  loader.classList.add('is-active')
  window.setTimeout(() => {
    loader.classList.add('is-done')
    window.setTimeout(() => loader.remove(), 700)
  }, 900)
}

function boot() {
  // Eilės tvarka: scroll (Lenis) pirma, tada vizualiniai moduliai.
  const scroll = initScroll({ reduced })
  modules.push(scroll)
  modules.push(initHeader())
  modules.push(initNav())
  modules.push(initToTop({ reduced, lenis: scroll.lenis }))
  modules.push(initGrain())
  modules.push(initProgress())
  modules.push(initCursor({ reduced }))
  modules.push(initMagnetic({ reduced }))
  modules.push(initWordReveal({ reduced }))
  modules.push(initScrollReveal({ reduced }))
  modules.push(initCounters({ reduced }))
  modules.push(initBeforeAfter())
  modules.push(initAccordion())
  modules.push(initCarousel({ reduced }))
  modules.push(initForm())
  modules.push(initReviewsMore())
  modules.push(initReviewGate())
  modules.push(initEffects({ reduced }))
  runLoader()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
