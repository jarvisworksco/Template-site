// ── Atsiliepimų „gate" ──────────────────────────────────────────────────────
// 4–5★ -> nukreipia į Google atsiliepimą. 1–3★ -> kviečia susisiekti privačiai
// (kad neigiamas grįžtų tiesiai pas verslą, o ne į viešą profilį).
export function initReviewGate() {
  const root = document.querySelector('[data-rgate]')
  if (!root) return { destroy: () => {} }

  const url = root.dataset.url || ''
  const hint = root.querySelector('[data-rgate-hint]')
  const stars = Array.from(root.querySelectorAll('.rgate__star'))

  const paint = (upto) => stars.forEach((s, i) => s.classList.toggle('is-on', i < upto))

  const onEnter = (e) => paint(Number(e.currentTarget.dataset.star))
  const onLeave = () => paint(root._selected || 0)
  const onClick = (e) => {
    const n = Number(e.currentTarget.dataset.star)
    root._selected = n
    paint(n)
    if (n >= 4) {
      if (hint) hint.textContent = 'Ačiū! Nukreipiame į Google atsiliepimą…'
      if (url) window.location.href = url
    } else if (hint) {
      hint.textContent = 'Ačiū už atsiliepimą!'
    }
  }

  stars.forEach((s) => {
    s.addEventListener('mouseenter', onEnter)
    s.addEventListener('focus', onEnter)
    s.addEventListener('click', onClick)
  })
  root.addEventListener('mouseleave', onLeave)

  return {
    destroy() {
      stars.forEach((s) => {
        s.removeEventListener('mouseenter', onEnter)
        s.removeEventListener('focus', onEnter)
        s.removeEventListener('click', onClick)
      })
      root.removeEventListener('mouseleave', onLeave)
    },
  }
}
