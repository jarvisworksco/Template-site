// ── „Į viršų" plaukiojantis bubble mygtukas ─────────────────────────────────
// Pasirodo paslinkus žemyn (>1 ekranas). Paspaudus — sklandžiai į viršų
// (per Lenis, jei yra; kitaip natyviai). Reduced motion: be sklandaus slinkimo.
export function initToTop({ reduced, lenis } = {}) {
  const btn = document.querySelector('[data-to-top]')
  if (!btn) return { destroy: () => {} }

  let ticking = false
  const update = () => {
    btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8)
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update) }
  }

  const onClick = () => {
    if (lenis && !reduced) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  btn.addEventListener('click', onClick)
  update()

  return {
    destroy() {
      window.removeEventListener('scroll', onScroll)
      btn.removeEventListener('click', onClick)
    },
  }
}
