// ── Word reveal: antraščių žodžiai pakyla su clip-path, staggered ───────────
// [data-words] elementuose tekstas suskaidomas į žodžius. Hero — iškart,
// kitos antraštės — kai įeina į ekraną (ScrollTrigger).
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Suskaido tekstinį turinį į <span class="word"> išsaugant <br> ir .accent.
function splitWords(el) {
  const nodes = Array.from(el.childNodes)
  const frag = document.createDocumentFragment()

  const wrapText = (text, target) => {
    text.split(/(\s+)/).forEach((part) => {
      if (part.trim() === '') {
        target.appendChild(document.createTextNode(part))
      } else {
        const outer = document.createElement('span')
        outer.className = 'word'
        const inner = document.createElement('span')
        inner.className = 'word__in'
        inner.textContent = part
        outer.appendChild(inner)
        target.appendChild(outer)
      }
    })
  }

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapText(node.textContent, frag)
    } else if (node.nodeName === 'BR') {
      frag.appendChild(node.cloneNode())
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // pvz. .accent span — paliekam wrapper'į, žodžius viduje irgi skaidom
      const clone = node.cloneNode(false)
      wrapText(node.textContent, clone)
      frag.appendChild(clone)
    }
  })

  el.textContent = ''
  el.appendChild(frag)
  return Array.from(el.querySelectorAll('.word__in'))
}

export function initWordReveal({ reduced }) {
  const els = Array.from(document.querySelectorAll('[data-words]'))
  const triggers = []

  els.forEach((el) => {
    const words = splitWords(el)
    // Kai animacija baigta — atstatom overflow:visible, kad diakritikai (ų, š, ž)
    // ir uodegėlės (g, j, p) nebūtų apkarpyti maskuojančio .word konteinerio.
    const reveal = () => el.querySelectorAll('.word').forEach((w) => (w.style.overflow = 'visible'))

    if (reduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 })
      reveal()
      return
    }

    gsap.set(words, { yPercent: 115 })
    const isHero = el.classList.contains('hero__headline')

    const anim = () =>
      gsap.to(words, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.06,
        onComplete: reveal,
      })

    if (isHero) {
      // Hero — su nedidele delsa (po loaderio jausmo).
      gsap.to(words, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: 0.15, onComplete: reveal })
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: anim,
      })
      triggers.push(st)
    }
  })

  return { destroy: () => triggers.forEach((t) => t.kill()) }
}
