// ── Before / After slankiklis: drag + touch + klaviatūra ────────────────────
// Pointer Events (vienodai veikia pelei ir lietimui). Klaviatūra: rodyklės.
export function initBeforeAfter() {
  const root = document.querySelector('[data-ba]')
  if (!root) return { destroy: () => {} }

  const before = root.querySelector('[data-ba-before]')
  const handle = root.querySelector('[data-ba-handle]')
  let dragging = false

  const set = (pct) => {
    const v = Math.max(0, Math.min(100, pct))
    before.style.width = v + '%'
    handle.style.left = v + '%'
    root.setAttribute('aria-valuenow', Math.round(v))
  }

  const pctFromEvent = (clientX) => {
    const r = root.getBoundingClientRect()
    return ((clientX - r.left) / r.width) * 100
  }

  const onDown = (e) => {
    dragging = true
    root.classList.add('is-dragging')
    root.setPointerCapture?.(e.pointerId)
    set(pctFromEvent(e.clientX))
  }
  const onMove = (e) => {
    if (!dragging) return
    set(pctFromEvent(e.clientX))
  }
  const onUp = (e) => {
    dragging = false
    root.classList.remove('is-dragging')
    root.releasePointerCapture?.(e.pointerId)
  }
  const onKey = (e) => {
    const now = Number(root.getAttribute('aria-valuenow')) || 50
    if (e.key === 'ArrowLeft') { set(now - 4); e.preventDefault() }
    if (e.key === 'ArrowRight') { set(now + 4); e.preventDefault() }
  }

  root.addEventListener('pointerdown', onDown)
  root.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  root.addEventListener('keydown', onKey)

  set(50)

  return {
    destroy() {
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('keydown', onKey)
    },
  }
}
