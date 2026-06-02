// ── Užklausų formos: validacija + siuntimas (palaiko kelias formas) ─────────
// Jei nurodytas data-endpoint (pvz. Formspree) — siunčiama fetch POST'u (JSON).
// Jei ne — atidaroma el. pašto programa (mailto fallback), kad veiktų be backend'o.
import { CLIENT } from '../data/client.js'

function wireForm(form) {
  const status = form.querySelector('[data-form-status]')
  const label = form.querySelector('.cform__label')
  const endpoint = form.dataset.endpoint || ''
  const defaultLabel = label?.textContent || 'Siųsti'

  const setStatus = (msg, ok) => {
    if (!status) return
    status.textContent = msg
    status.classList.toggle('is-ok', !!ok)
    status.classList.toggle('is-err', ok === false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())

    if (!data.vardas?.trim() || !data.telefonas?.trim() || !data.zinute?.trim()) {
      setStatus('Užpildykite privalomus laukus (vardas, telefonas, žinutė).', false)
      return
    }

    // Mailto fallback — veikia visada, be serverio.
    if (!endpoint) {
      const subject = encodeURIComponent(`Užklausa iš svetainės — ${data.vardas}`)
      const body = encodeURIComponent(
        `Vardas: ${data.vardas}\nTelefonas: ${data.telefonas}\nEl. paštas: ${data.elpastas || '—'}\n\nŽinutė:\n${data.zinute}`
      )
      window.location.href = `mailto:${CLIENT.brand.email}?subject=${subject}&body=${body}`
      setStatus('Atveriame jūsų el. pašto programą — paspauskite „Siųsti".', true)
      return
    }

    if (label) label.textContent = 'Siunčiama…'
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('bad response')
      form.reset()
      setStatus('Ačiū! Jūsų užklausa išsiųsta — susisieksime greitai.', true)
    } catch {
      setStatus('Nepavyko išsiųsti. Paskambinkite arba bandykite vėliau.', false)
    } finally {
      if (label) label.textContent = defaultLabel
    }
  }

  form.addEventListener('submit', onSubmit)
  return () => form.removeEventListener('submit', onSubmit)
}

export function initForm() {
  const forms = Array.from(document.querySelectorAll('[data-form]'))
  if (!forms.length) return { destroy: () => {} }
  const cleanups = forms.map(wireForm)
  return { destroy: () => cleanups.forEach((fn) => fn()) }
}
