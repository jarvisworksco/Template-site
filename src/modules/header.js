// ── Sticky header: skaidrus virš hero, po scroll → fonas + susitraukia ──────
export function initHeader() {
  const header = document.querySelector('[data-header]')
  if (!header) return { destroy: () => {} }

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  return { destroy: () => window.removeEventListener('scroll', onScroll) }
}
