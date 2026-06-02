// ── Atsiliepimų „Žiūrėti daugiau" / „Rodyti mažiau" perjungimas ─────────────
// Atskleidžia paslėptas korteles (.review--extra) ir atnaujina mygtuko tekstą.
export function initReviewsMore() {
  const btn = document.querySelector('[data-reviews-more]')
  const grid = document.querySelector('[data-reviews-grid]')
  if (!btn || !grid) return { destroy: () => {} }

  const label = btn.querySelector('[data-more-label]')
  const extras = grid.querySelectorAll('.review--extra')
  const count = extras.length
  let open = false

  const onClick = () => {
    open = !open
    grid.classList.toggle('is-expanded', open)
    btn.setAttribute('aria-expanded', String(open))
    if (label) label.textContent = open ? 'Rodyti mažiau' : `Žiūrėti daugiau (${count})`
    // Naujai atskleistos kortelės pasirodo su reveal animacija.
    if (open) extras.forEach((el) => el.classList.add('is-in'))
  }

  btn.addEventListener('click', onClick)
  return { destroy: () => btn.removeEventListener('click', onClick) }
}
