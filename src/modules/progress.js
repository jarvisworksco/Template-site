// ── Scroll progreso linija po header'iu (scaleX 0→1) ────────────────────────
// Naudoja transform (GPU). Skaičiavimas rAF'e, kad scroll'as nestrigtų.
export function initProgress() {
  const bar = document.querySelector('.scroll-progress')
  if (!bar) return { destroy: () => {} }

  let ticking = false
  const update = () => {
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    const p = max > 0 ? h.scrollTop / max : 0
    bar.style.transform = `scaleX(${p})`
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()

  return {
    destroy() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    },
  }
}
