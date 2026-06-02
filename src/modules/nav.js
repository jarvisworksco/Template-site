// ── Mobilus navigacijos meniu (hamburger dropdown) ─────────────────────────
// Atidaro/uždaro meniu, uždaro paspaudus nuorodą ar Esc, blokuoja fono scroll'ą.
// Visi listeneriai sutvarkomi destroy() metu.
export function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]')
  const menu = document.querySelector('[data-mobile-menu]')
  if (!toggle || !menu) return { destroy: () => {} }

  const links = Array.from(menu.querySelectorAll('[data-nav-link]'))
  menu.hidden = false // matomumą toliau valdo CSS (.is-open) — saugu prieinamumui
  let open = false

  const setOpen = (state) => {
    open = state
    toggle.setAttribute('aria-expanded', String(state))
    toggle.classList.toggle('is-open', state)
    menu.classList.toggle('is-open', state)
    toggle.setAttribute('aria-label', state ? 'Uždaryti meniu' : 'Atidaryti meniu')
    document.body.classList.toggle('nav-locked', state)
  }

  const onToggle = () => setOpen(!open)
  const onLink = () => setOpen(false)
  const onKey = (e) => { if (e.key === 'Escape' && open) setOpen(false) }
  // Uždarom, jei išsiplečia langas iki desktop (kad nepasiliktų „pakibęs" meniu).
  const mq = window.matchMedia('(min-width: 992px)')
  const onMq = () => { if (mq.matches && open) setOpen(false) }

  toggle.addEventListener('click', onToggle)
  links.forEach((a) => a.addEventListener('click', onLink))
  document.addEventListener('keydown', onKey)
  mq.addEventListener('change', onMq)

  return {
    destroy() {
      toggle.removeEventListener('click', onToggle)
      links.forEach((a) => a.removeEventListener('click', onLink))
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      document.body.classList.remove('nav-locked')
    },
  }
}
