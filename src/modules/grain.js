// ── Grain overlay: subtili SVG triukšmo tekstūra, mix-blend-mode: overlay ───
// Generuojam SVG feTurbulence data-URI ir nustatom kaip .noise foną.
// Statiška (jokios animacijos) — saugu reduced-motion atveju, neeikvoja CPU.
export function initGrain() {
  const el = document.querySelector('.noise')
  if (!el) return { destroy: () => {} }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`
  const uri = `data:image/svg+xml;base64,${btoa(svg)}`
  el.style.backgroundImage = `url("${uri}")`

  return { destroy: () => {} }
}
