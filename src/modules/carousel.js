// ── About nuotraukų karuselė: prev/next + taškai + autoplay ────────────────
// Autoplay sustoja ant hover ir kai skirtukas nematomas. Reduced motion: be autoplay.
// Visi listeneriai ir intervalas sutvarkomi destroy() metu (jokio leak'o).
export function initCarousel({ reduced }) {
  const root = document.querySelector('[data-carousel]')
  if (!root) return { destroy: () => {} }

  const slides = Array.from(root.querySelectorAll('.about__img'))
  const dots = Array.from(root.querySelectorAll('[data-dot]'))
  const prev = root.querySelector('[data-carousel-prev]')
  const next = root.querySelector('[data-carousel-next]')
  if (slides.length < 2) {
    prev?.remove(); next?.remove()
    root.querySelector('.about__dots')?.remove()
    return { destroy: () => {} }
  }

  let i = 0
  let timer = null

  const show = (n) => {
    i = (n + slides.length) % slides.length
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i))
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i))
  }

  const start = () => {
    if (reduced || timer) return
    timer = window.setInterval(() => show(i + 1), 5000)
  }
  const stop = () => { if (timer) { clearInterval(timer); timer = null } }
  const restart = () => { stop(); start() }

  const onPrev = () => { show(i - 1); restart() }
  const onNext = () => { show(i + 1); restart() }
  const onDot = (e) => { show(Number(e.currentTarget.dataset.dot)); restart() }
  const onVisibility = () => (document.hidden ? stop() : start())

  prev?.addEventListener('click', onPrev)
  next?.addEventListener('click', onNext)
  dots.forEach((d) => d.addEventListener('click', onDot))
  root.addEventListener('mouseenter', stop)
  root.addEventListener('mouseleave', start)
  document.addEventListener('visibilitychange', onVisibility)

  start()

  return {
    destroy() {
      stop()
      prev?.removeEventListener('click', onPrev)
      next?.removeEventListener('click', onNext)
      dots.forEach((d) => d.removeEventListener('click', onDot))
      root.removeEventListener('mouseenter', stop)
      root.removeEventListener('mouseleave', start)
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}
