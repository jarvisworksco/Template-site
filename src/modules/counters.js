// ── Count-up: skaičiai animuojami kai matomi (IntersectionObserver) ─────────
// Reduced motion: rodoma galutinė reikšmė be animacijos.
import { gsap } from 'gsap'

function format(value, decimals) {
  const n = Number(value).toFixed(decimals)
  // Lietuviškas dešimtainis kablelis.
  return decimals > 0 ? n.replace('.', ',') : n
}

export function initCounters({ reduced }) {
  const els = Array.from(document.querySelectorAll('[data-count]'))
  if (!els.length) return { destroy: () => {} }

  const render = (el, value) => {
    const decimals = Number(el.dataset.decimals || 0)
    const suffix = el.dataset.suffix || ''
    el.textContent = format(value, decimals) + suffix
  }

  if (reduced) {
    els.forEach((el) => render(el, Number(el.dataset.count)))
    return { destroy: () => {} }
  }

  const tweens = []
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const target = Number(el.dataset.count)
        const obj = { v: 0 }
        const tween = gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => render(el, obj.v),
        })
        tweens.push(tween)
        obs.unobserve(el)
      })
    },
    { threshold: 0.4 }
  )

  els.forEach((el) => io.observe(el))

  return {
    destroy() {
      io.disconnect()
      tweens.forEach((t) => t.kill())
    },
  }
}
