// ── DUK accordion: sklandus aukštis per grid-template-rows: 0fr → 1fr ───────
// Vienu metu atviras vienas (galima keisti). Pilnai prieinamas (aria-expanded).
export function initAccordion() {
  const items = Array.from(document.querySelectorAll('[data-acc]'))
  if (!items.length) return { destroy: () => {} }

  const triggers = items.map((item) => item.querySelector('.acc__trigger'))

  const toggle = (item, btn) => {
    const isOpen = item.classList.contains('is-open')
    // Uždarom kitus (vienu metu vienas atviras).
    items.forEach((other) => {
      if (other !== item) {
        other.classList.remove('is-open')
        other.querySelector('.acc__trigger')?.setAttribute('aria-expanded', 'false')
      }
    })
    item.classList.toggle('is-open', !isOpen)
    btn.setAttribute('aria-expanded', String(!isOpen))
  }

  const handlers = items.map((item) => {
    const btn = item.querySelector('.acc__trigger')
    const fn = () => toggle(item, btn)
    btn.addEventListener('click', fn)
    return { btn, fn }
  })

  return {
    destroy() {
      handlers.forEach(({ btn, fn }) => btn.removeEventListener('click', fn))
    },
  }
}
