// ── Custom cursor: taškas + apvalkalas, plečiasi ant interaktyvių elementų ──
// Tik desktop (pointer: fine). Mobiliajame ir reduced-motion — neaktyvus.
import { gsap } from 'gsap'

export function initCursor({ reduced }) {
  const el = document.querySelector('.cursor')
  // Tik tikram pelės įvedimui: turi būti hover IR tikslus žymeklis.
  // Touch įrenginiuose (telefonai, planšetės) — neaktyvus.
  const mouseLike = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!el || reduced || !mouseLike) {
    if (el) el.remove()
    document.documentElement.classList.remove('has-cursor')
    return { destroy: () => {} }
  }

  // Jei įvyksta lietimas (hibridiniai įrenginiai) — pašalinam kursorių visam laikui.
  const onTouch = () => { el.remove(); document.documentElement.classList.remove('has-cursor'); destroyed = true }
  window.addEventListener('touchstart', onTouch, { once: true, passive: true })
  let destroyed = false

  document.documentElement.classList.add('has-cursor')
  const dot = el.querySelector('.cursor__dot')
  const ring = el.querySelector('.cursor__ring')

  // Centruojam per gsap (xPercent/yPercent -50) — kad nesikirstų su CSS transform.
  // Be to taškas/žiedas visada tiksliai ant pelės, nepriklausomai nuo dydžio.
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

  // Taškas — beveik momentinis (tikslus). Žiedas — labai lengvas atsilikimas.
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power3' })
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power3' })
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power2' })
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power2' })

  let visible = false
  const onMove = (e) => {
    if (destroyed) return
    // Ant naršyklės slankiklio (dešinė/apačia) — paslepiam, kad nepakibtų.
    const onScrollbar =
      e.clientX >= document.documentElement.clientWidth ||
      e.clientY >= document.documentElement.clientHeight
    if (onScrollbar) {
      if (visible) { visible = false; el.classList.remove('is-visible') }
      return
    }
    if (!visible) {
      visible = true
      el.classList.add('is-visible')
    }
    dotX(e.clientX); dotY(e.clientY)
    ringX(e.clientX); ringY(e.clientY)
  }

  const interactive = 'a, button, [data-magnetic], [data-ba], input, .acc__trigger'
  const onOver = (e) => {
    if (e.target.closest(interactive)) el.classList.add('is-hover')
  }
  const onOut = (e) => {
    if (e.target.closest(interactive) && !e.relatedTarget?.closest?.(interactive))
      el.classList.remove('is-hover')
  }
  const onLeave = () => {
    visible = false
    el.classList.remove('is-visible')
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
  document.addEventListener('mouseleave', onLeave)

  return {
    destroy() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
    },
  }
}
