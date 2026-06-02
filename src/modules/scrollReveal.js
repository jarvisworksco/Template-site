// ── Scroll reveal: .reveal elementai fade + translateY kai įeina į ekraną ───
// IntersectionObserver (lengvas, GPU friendly). Pamatytas elementas iškart
// nustojamas stebėti (unobserve) — observer'is neauga, jokio leak'o.
export function initScrollReveal({ reduced }) {
  const els = Array.from(document.querySelectorAll('.reveal'))
  if (!els.length) return { destroy: () => {} }

  if (reduced) {
    els.forEach((el) => el.classList.add('is-in'))
    return { destroy: () => {} }
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          obs.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  )

  els.forEach((el) => io.observe(el))

  return { destroy: () => io.disconnect() }
}
