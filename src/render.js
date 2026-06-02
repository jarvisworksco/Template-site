// ============================================================================
//  RENDER — sugeneruoja visą svetainės HTML iš CLIENT duomenų.
//  Čia jokios verslo logikos keisti nereikia — turinys ateina iš client.js.
// ============================================================================

import { icon } from './icons.js'

// Saugus teksto įterpimas (apsauga nuo HTML injekcijos iš duomenų).
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// Tekstas su \n -> <br>
const nl2br = (s = '') => esc(s).replace(/\n/g, '<br>')

const stars = (n = 5) => Array.from({ length: n }, () => icon('star')).join('')

// Lietuviškas-saugus slug'as URL'ams (ąčęėįšųūž -> aceeisuuz).
const LT_MAP = { ą: 'a', č: 'c', ę: 'e', ė: 'e', į: 'i', š: 's', ų: 'u', ū: 'u', ž: 'z' }
export const slugify = (s = '') =>
  String(s)
    .toLowerCase()
    .replace(/[ąčęėįšųūž]/g, (ch) => LT_MAP[ch] || ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Pagalbinė: paslaugos/vietovės slug'ai (vienoda logika visur).
export const serviceSlug = (s) => s.slug || slugify(s.title)
export const areaSlug = (a) => slugify(a)

// ── Header + navigacija ───────────────────────────────────────────────────────
// Absoliučios ankoros (/#...) — veikia ir iš sub-puslapių (paslaugos/, vietoves/).
const NAV_LINKS = [
  { href: '/#paslaugos', label: 'Paslaugos' },
  { href: '/#apie', label: 'Apie mus' },
  { href: '/#galerija', label: 'Galerija' },
  { href: '/#atsiliepimai', label: 'Atsiliepimai' },
  { href: '/#duk', label: 'DUK' },
  { href: '/#kontaktai', label: 'Kontaktai' },
]

function header(c) {
  const links = NAV_LINKS.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')
  return `
  <header class="header" data-header>
    <div class="container header__inner">
      <a class="brand" href="/#top" aria-label="${esc(c.brand.name)} — į viršų">
        <span class="brand__name">${esc(c.brand.name)}</span>
        <span class="brand__tag">${esc(c.brand.tagline)}</span>
      </a>

      <nav class="nav" aria-label="Pagrindinė navigacija">
        <ul class="nav__list">${links}</ul>
      </nav>

      <a class="header__phone" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">
        ${icon('phone')}<span>${esc(c.brand.phone)}</span>
      </a>

      <button class="nav__toggle" data-nav-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Atidaryti meniu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobilus dropdown meniu -->
    <div class="mnav" id="mobile-menu" data-mobile-menu hidden>
      <ul class="mnav__list">
        ${NAV_LINKS.map((l) => `<li><a href="${l.href}" data-nav-link>${esc(l.label)}</a></li>`).join('')}
      </ul>
      <a class="mnav__phone" href="tel:${esc(c.brand.phoneRaw)}">${icon('phone')} ${esc(c.brand.phone)}</a>
    </div>
  </header>`
}

// ── Quote forma (lead-capture) — naudojama hero'je ir kaip atskira ───────────
function quoteForm(c, { variant = 'hero' } = {}) {
  const q = c.hero.quoteForm || {}
  return `
  <form class="qform qform--${variant} reveal" data-form ${c.contact?.formEndpoint ? `data-endpoint="${esc(c.contact.formEndpoint)}"` : ''} novalidate>
    <div class="qform__head">
      <p class="qform__title">${esc(q.title || 'Gaukite nemokamą pasiūlymą')}</p>
      ${q.note ? `<p class="qform__note">${esc(q.note)}</p>` : ''}
    </div>
    <label class="cfield"><span class="sr-only">Vardas</span>
      <input type="text" name="vardas" required autocomplete="name" placeholder="Vardas *" />
    </label>
    <label class="cfield"><span class="sr-only">Telefonas</span>
      <input type="tel" name="telefonas" required autocomplete="tel" placeholder="Telefonas *" />
    </label>
    <label class="cfield"><span class="sr-only">Žinutė</span>
      <textarea name="zinute" rows="2" required placeholder="Trumpai: koks darbas, kur, kada *"></textarea>
    </label>
    <button type="submit" class="btn btn--primary qform__submit" data-magnetic>
      <span class="cform__label">${esc(q.button || 'Gauti pasiūlymą')}</span> ${icon('arrow')}
    </button>
    <p class="cform__status" data-form-status role="status" aria-live="polite"></p>
  </form>`
}

// ── Hero ────────────────────────────────────────────────────────────────────
function hero(c) {
  const emergency = c.brand.emergency
    ? `<div class="hero__emergency" role="note"><span class="pulse"></span> Avarinė pagalba 24/7</div>`
    : ''
  const withForm = !!c.hero.quoteForm?.enabled

  // CTA blokas: jei rodoma forma — telefonas + „darbai"; jei ne — du pagrindiniai CTA.
  const cta = withForm
    ? `<div class="hero__cta reveal">
         <a class="btn btn--primary" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${icon('phone')} ${esc(c.brand.phone)}</a>
         <a class="btn btn--ghost" data-magnetic href="/#darbai">${esc(c.hero.ctaSecondary)}</a>
       </div>`
    : `<div class="hero__cta reveal">
         <a class="btn btn--primary" data-magnetic href="/#kontaktai">${esc(c.hero.ctaPrimary)} ${icon('arrow')}</a>
         <a class="btn btn--ghost" data-magnetic href="/#darbai">${esc(c.hero.ctaSecondary)}</a>
       </div>`

  return `
  <section class="hero ${withForm ? 'hero--split' : ''}" id="top">
    <div class="hero__bg" data-parallax aria-hidden="true">
      <img src="${esc(c.hero.bgImage)}" alt="" width="1600" height="1000" fetchpriority="high" />
      <div class="hero__scrim"></div>
    </div>
    <div class="container hero__inner">
      <div class="hero__main">
        <p class="hero__eyebrow reveal">${esc(c.hero.eyebrow)}</p>
        <h1 class="hero__headline" data-words>
          ${nl2br(c.hero.headline)}
          <span class="accent">${esc(c.hero.headlineAccent)}</span>
        </h1>
        <p class="hero__sub reveal">${esc(c.hero.sub)}</p>
        ${cta}
        ${emergency}
      </div>
      ${withForm ? `<div class="hero__aside">${quoteForm(c, { variant: 'hero' })}</div>` : ''}
      ${heroBadges(c)}
    </div>
    <div class="hero__scroll" aria-hidden="true"><span></span></div>
  </section>`
}

// ── Hero glass badges ─────────────────────────────────────────────────────────
function heroBadges(c) {
  const list = c.hero.badges || []
  if (!list.length) return ''
  const items = list
    .map(
      (b, i) => `
      <div class="hbadge reveal" style="--d:${i * 0.08}s">
        <span class="hbadge__icon">${icon(b.icon)}</span>
        <div><p class="hbadge__title">${esc(b.title)}</p><p class="hbadge__desc">${esc(b.desc)}</p></div>
      </div>`
    )
    .join('')
  return `<div class="hero__badges">${items}</div>`
}

// ── Trust bar ───────────────────────────────────────────────────────────────
function trust(c) {
  if (!c.trustBadges?.length) return ''
  const items = c.trustBadges
    .map((b) => `<li class="trust__item">${icon(b.icon)}<span>${esc(b.text)}</span></li>`)
    .join('')
  // Daug ženklų -> begalinis sklandus marquee; mažai -> statiška centruota juosta.
  const isMarquee = c.trustBadges.length > 4
  if (isMarquee) {
    // Dvi vienodos grupės, kiekviena min-width:100% — sklandus loop bet kokiame plotyje.
    const group = (hidden) => `<ul class="trust__group"${hidden ? ' aria-hidden="true"' : ''}>${items}</ul>`
    return `
    <section class="trust trust--marquee" aria-label="Pasitikėjimo ženklai">
      <div class="trust__marquee">${group(false)}${group(true)}</div>
    </section>`
  }
  return `
  <section class="trust" aria-label="Pasitikėjimo ženklai">
    <ul class="container trust__list">${items}</ul>
  </section>`
}

// ── Stats ───────────────────────────────────────────────────────────────────
function stats(c) {
  if (!c.stats?.length) return ''
  const items = c.stats
    .map(
      (s) => `
      <div class="stat reveal">
        <div class="stat__value" data-count="${s.value}" data-suffix="${esc(s.suffix || '')}" data-decimals="${s.decimals || 0}">0</div>
        <div class="stat__label">${esc(s.label)}</div>
      </div>`
    )
    .join('<div class="stat__divider" aria-hidden="true"></div>')
  return `
  <section class="stats section" aria-label="Skaičiai">
    <div class="container stats__grid">${items}</div>
  </section>`
}

// ── Services ────────────────────────────────────────────────────────────────
function services(c) {
  if (!c.services?.length) return ''
  const cards = c.services
    .map(
      (s) => `
      <article class="service reveal ${s.featured ? 'service--featured' : ''}">
        <div class="service__media">
          <img src="${esc(s.image)}" alt="${esc(s.title)}" loading="lazy" width="1200" height="900" />
        </div>
        <div class="service__body">
          <h3 class="service__title">
            <a class="service__more" href="/paslaugos/${serviceSlug(s)}/">${esc(s.title)}</a>
          </h3>
          <p class="service__desc">${esc(s.desc)}</p>
          <span class="service__link">Plačiau ${icon('arrow')}</span>
        </div>
        ${s.price ? `<div class="service__price">${esc(s.price)}${s.unit ? `<span> ${esc(s.unit)}</span>` : ''}</div>` : ''}
      </article>`
    )
    .join('')
  return `
  <section class="services section" id="paslaugos" aria-labelledby="services-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Ką darome</p>
        <h2 class="section__title" id="services-title" data-words>Paslaugos, kuriomis pasitikima</h2>
      </header>
      <div class="services__grid">${cards}</div>
    </div>
  </section>`
}

// ── About (karuselė + vertybės) ──────────────────────────────────────────────
function about(c) {
  const a = c.about
  if (!a) return ''
  const slides = a.images
    .map(
      (src, i) => `<img class="about__img ${i === 0 ? 'is-active' : ''}" src="${esc(src)}" alt="${esc(c.brand.name)} — darbų akimirka ${i + 1}" loading="lazy" width="1000" height="750" data-slide="${i}" />`
    )
    .join('')
  const dots = a.images
    .map((_, i) => `<button class="about__dot ${i === 0 ? 'is-active' : ''}" data-dot="${i}" aria-label="Nuotrauka ${i + 1}"></button>`)
    .join('')
  const values = a.values
    .map((v) => `<li class="about__value">${icon('check')}<span>${esc(v)}</span></li>`)
    .join('')
  return `
  <section class="about section" id="apie" aria-labelledby="about-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Apie mus</p>
        <h2 class="section__title" id="about-title" data-words>Patirtis, atsakomybė ir tvarka</h2>
      </header>
      <div class="about__grid">
        <div class="about__media reveal" data-carousel>
          <div class="about__frame">${slides}</div>
          <button class="about__nav about__nav--prev" data-carousel-prev aria-label="Ankstesnė nuotrauka">${icon('arrow')}</button>
          <button class="about__nav about__nav--next" data-carousel-next aria-label="Kita nuotrauka">${icon('arrow')}</button>
          <div class="about__dots">${dots}</div>
        </div>
        <div class="about__body reveal">
          <h3 class="about__heading">${esc(a.heading)}</h3>
          <p class="about__text">${esc(a.text)}</p>
          ${a.text2 ? `<p class="about__text">${esc(a.text2)}</p>` : ''}
          <ul class="about__values">${values}</ul>
          <div class="about__cta">
            <a class="btn btn--primary" data-magnetic href="/#kontaktai">${esc(a.ctaPrimary)} ${icon('arrow')}</a>
            <a class="btn btn--ghost" data-magnetic href="/#paslaugos">${esc(a.ctaSecondary)}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

// ── Gallery (atlikti darbai su kategorijomis) ────────────────────────────────
function gallery(c) {
  if (!c.gallery || !c.gallery.length) return ''
  const cards = c.gallery
    .map(
      (g, i) => `
      <article class="gcard reveal" style="--d:${(i % 3) * 0.08}s">
        <div class="gcard__media">
          <img src="${esc(g.image)}" alt="${esc(g.title)}" loading="lazy" width="1000" height="750" />
          <span class="gcard__cat">${esc(g.category)}</span>
        </div>
        <div class="gcard__body">
          <h3 class="gcard__title">${esc(g.title)}</h3>
          <p class="gcard__desc">${esc(g.desc)}</p>
        </div>
      </article>`
    )
    .join('')
  return `
  <section class="gallery section" id="galerija" aria-labelledby="gallery-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Galerija</p>
        <h2 class="section__title" id="gallery-title" data-words>Mūsų atlikti darbai</h2>
      </header>
      <div class="gallery__grid">${cards}</div>
    </div>
  </section>`
}

// ── Process ─────────────────────────────────────────────────────────────────
function process(c) {
  if (!c.process?.length) return ''
  const steps = c.process
    .map(
      (p) => `
      <li class="process__step reveal">
        <span class="process__num">${esc(p.step)}</span>
        <h3 class="process__title">${esc(p.title)}</h3>
        <p class="process__desc">${esc(p.desc)}</p>
      </li>`
    )
    .join('')
  return `
  <section class="process section" id="procesas" aria-labelledby="process-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Kaip dirbame</p>
        <h2 class="section__title" id="process-title" data-words>Keturi žingsniai iki švaraus kiemo</h2>
      </header>
      <div class="process__wrap">
        <svg class="process__line" data-process-line viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="1" x2="100" y2="1" />
        </svg>
        <ol class="process__list">${steps}</ol>
      </div>
    </div>
  </section>`
}

// ── Before / After ──────────────────────────────────────────────────────────
function beforeAfter(c) {
  if (!c.beforeAfter || !c.beforeAfter.length) return ''
  const ba = c.beforeAfter[0]
  return `
  <section class="ba section" id="darbai" aria-labelledby="ba-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Prieš ir po</p>
        <h2 class="section__title" id="ba-title" data-words>${esc(ba.label)}</h2>
      </header>
      <div class="ba__slider reveal" data-ba tabindex="0" role="slider" aria-label="Prieš ir po palyginimas" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
        <img class="ba__img ba__img--after" src="${esc(ba.after)}" alt="Po darbų: ${esc(ba.label)}" loading="lazy" width="1600" height="1000" />
        <div class="ba__before" data-ba-before>
          <img class="ba__img" src="${esc(ba.before)}" alt="Prieš darbus: ${esc(ba.label)}" loading="lazy" width="1600" height="1000" />
        </div>
        <div class="ba__handle" data-ba-handle aria-hidden="true">
          <span class="ba__line"></span><span class="ba__grip">${icon('arrow')}${icon('arrow')}</span>
        </div>
        <span class="ba__tag ba__tag--before">Prieš</span>
        <span class="ba__tag ba__tag--after">Po</span>
      </div>
    </div>
  </section>`
}

// ── Reviews (tinklelis + „Žiūrėti daugiau") ──────────────────────────────────
const REVIEWS_INITIAL = 3 // kiek rodoma iš karto; likę slepiami po mygtuku
function reviews(c) {
  if (!c.reviews?.length) return ''
  const cards = c.reviews
    .map(
      (r, i) => `
      <article class="review reveal ${i >= REVIEWS_INITIAL ? 'review--extra' : ''}" style="--d:${(i % 3) * 0.06}s">
        <div class="review__head">
          <span class="review__rating">${String(r.rating).replace('.', ',')}</span>
          <div class="review__stars" aria-label="Įvertinimas ${r.rating} iš 5">${stars(r.rating)}</div>
        </div>
        <blockquote class="review__text">${esc(r.text)}</blockquote>
        <footer class="review__meta">
          <div>
            <span class="review__name">${esc(r.name)}</span>
            <span class="review__sub">${esc(r.city)} · ${esc(r.service)}</span>
          </div>
          <span class="review__g" aria-label="Google atsiliepimas">${icon('google')}</span>
        </footer>
      </article>`
    )
    .join('')
  const moreBtn =
    c.reviews.length > REVIEWS_INITIAL
      ? `<div class="reviews__more"><button class="btn btn--ghost" data-reviews-more aria-expanded="false">
          <span data-more-label>Žiūrėti daugiau (${c.reviews.length - REVIEWS_INITIAL})</span>
        </button></div>`
      : ''
  // „Palikite atsiliepimą" blokas su gate: 4–5★ -> Google; 1–3★ -> „Ačiū".
  const gate = c.brand.googleReviewUrl
    ? `<div class="rgate reveal" data-rgate data-url="${esc(c.brand.googleReviewUrl)}">
        <span class="rgate__g">${icon('google')}</span>
        <p class="rgate__title">Palikite mums atsiliepimą Google</p>
        <div class="rgate__stars" role="group" aria-label="Įvertinimas žvaigždutėmis">
          ${[1, 2, 3, 4, 5]
            .map((n) => `<button type="button" class="rgate__star" data-star="${n}" aria-label="${n} iš 5">${icon('star')}</button>`)
            .join('')}
        </div>
        <p class="rgate__hint" data-rgate-hint>Pasirinkite žvaigždučių skaičių</p>
      </div>`
    : ''
  return `
  <section class="reviews section" id="atsiliepimai" aria-labelledby="reviews-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Klientų balsai</p>
        <h2 class="section__title" id="reviews-title" data-words>Ką sako mūsų klientai</h2>
      </header>
      <div class="reviews__grid" data-reviews-grid>${cards}</div>
      ${moreBtn}
      ${gate}
    </div>
  </section>`
}

// ── Aptarnaujamos vietovės (žemėlapis + nuorodos į vietovių puslapius) ────────
function serviceAreasSection(c) {
  const map = c.contact?.mapEmbed
  if (!map && !c.serviceAreas?.length) return ''
  const links = (c.serviceAreas || [])
    .map((a) => `<a class="area__pill" href="/vietoves/${areaSlug(a)}/">${icon('pin')} ${esc(a)}</a>`)
    .join('')
  const mapBlock = map
    ? `<div class="areas__map reveal">
        <iframe src="${esc(map)}" title="Aptarnaujama teritorija žemėlapyje" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>`
    : ''
  return `
  <section class="areas section" id="vietoves" aria-labelledby="areas-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Kur dirbame</p>
        <h2 class="section__title" id="areas-title" data-words>Aptarnaujamos vietovės</h2>
        <p class="section__sub reveal">Atvykstame ${esc(c.brand.serviceArea)}. Nematote savo vietovės? Paskambinkite — greičiausiai aptarnaujame ir ją.</p>
      </header>
      <div class="areas__layout">
        ${mapBlock}
        ${links ? `<div class="areas__list reveal"><p class="areas__list-label">Dažniausiai aptarnaujame:</p><div class="areas__pills">${links}</div></div>` : ''}
      </div>
    </div>
  </section>`
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
function faq(c) {
  if (!c.faq?.length) return ''
  const items = c.faq
    .map(
      (f, i) => `
      <div class="acc__item reveal" data-acc>
        <button class="acc__trigger" aria-expanded="false" aria-controls="acc-panel-${i}" id="acc-btn-${i}">
          <span>${esc(f.q)}</span>
          <span class="acc__icon" aria-hidden="true"></span>
        </button>
        <div class="acc__panel" id="acc-panel-${i}" role="region" aria-labelledby="acc-btn-${i}">
          <div class="acc__inner"><p>${esc(f.a)}</p></div>
        </div>
      </div>`
    )
    .join('')
  return `
  <section class="faq section" id="duk" aria-labelledby="faq-title">
    <div class="container container--narrow">
      <header class="section__head">
        <p class="section__eyebrow reveal">Dažni klausimai</p>
        <h2 class="section__title" id="faq-title" data-words>Tai, ko dažniausiai klausia</h2>
      </header>
      <div class="acc">${items}</div>
    </div>
  </section>`
}

// ── CTA juosta (kontrastinga, su milžinišku telefonu) ────────────────────────
function ctaBand(c) {
  const b = c.ctaBand || {}
  return `
  <section class="cta section" aria-labelledby="cta-title">
    <div class="cta__glow" aria-hidden="true"></div>
    <div class="container cta__inner">
      <p class="cta__eyebrow reveal">Nemokamas įvertinimas vietoje</p>
      <h2 class="cta__title" id="cta-title" data-words>${esc(b.title || 'Turite pavojingą medį? Paskambinkite dabar.')}</h2>
      <a class="cta__phone" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${esc(c.brand.phone)}</a>
      <ul class="cta__meta reveal">
        <li>${icon('clock')} ${esc(c.brand.workingHours)}</li>
        <li>${icon('pin')} ${esc(c.brand.serviceArea)}</li>
        ${c.brand.emergency ? `<li><span class="pulse"></span> Avarinė pagalba 24/7</li>` : ''}
      </ul>
    </div>
  </section>`
}

// ── Contact (info kortelės + forma + sidebar) ────────────────────────────────
function contact(c) {
  const k = c.contact || {}
  const cards = (k.infoCards || [])
    .map(
      (card) => `
      <div class="cinfo reveal">
        <span class="cinfo__icon">${icon(card.icon)}</span>
        <div>
          <p class="cinfo__title">${esc(card.title)}</p>
          <p class="cinfo__value">${esc(card.value)}</p>
          <p class="cinfo__note">${esc(card.note)}</p>
        </div>
      </div>`
    )
    .join('')

  const socials = [
    c.brand.socials?.facebook ? `<a class="csocial" href="${esc(c.brand.socials.facebook)}" target="_blank" rel="noopener" data-magnetic>${icon('facebook')} Facebook</a>` : '',
    c.brand.socials?.instagram ? `<a class="csocial" href="${esc(c.brand.socials.instagram)}" target="_blank" rel="noopener" data-magnetic>${icon('instagram')} Instagram</a>` : '',
  ].join('')

  return `
  <section class="contact section" id="kontaktai" aria-labelledby="contact-title">
    <div class="container">
      <header class="section__head">
        <p class="section__eyebrow reveal">Kontaktai</p>
        <h2 class="section__title" id="contact-title" data-words>${esc(k.heading || 'Susisiekite su mūsų komanda')}</h2>
        <p class="section__sub reveal">${esc(k.subtitle || '')}</p>
      </header>

      <div class="contact__cards">${cards}</div>

      <div class="contact__details">
        <div class="caside__card">
          <h3 class="caside__title">${icon('pin')} Kontaktinė informacija</h3>
          <ul class="caside__list">
            <li><span class="caside__label">Telefonas</span><a href="tel:${esc(c.brand.phoneRaw)}">${esc(c.brand.phone)}</a></li>
            <li><span class="caside__label">El. paštas</span><a href="mailto:${esc(c.brand.email)}">${esc(c.brand.email)}</a></li>
            <li><span class="caside__label">Aptarnaujame</span><span>${esc(c.brand.serviceArea)}</span></li>
            <li><span class="caside__label">Darbo laikas</span><span>${esc(c.brand.workingHours)}</span></li>
          </ul>
          ${socials ? `<div class="caside__socials">${socials}</div>` : ''}
        </div>
        ${
          k.urgent
            ? `<div class="caside__urgent">
                <p class="caside__urgent-title"><span class="pulse"></span> ${esc(k.urgent.title)}</p>
                <p class="caside__urgent-text">${esc(k.urgent.text)}</p>
                <a class="btn btn--primary" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${icon('phone')} ${esc(c.brand.phone)}</a>
              </div>`
            : ''
        }
        <div class="caside__quote">
          <p class="caside__quote-title">Norite gauti pasiūlymą?</p>
          <p class="caside__quote-text">Užpildykite trumpą formą puslapio viršuje arba tiesiog paskambinkite.</p>
          <a class="btn btn--ghost" data-magnetic href="/#top">${icon('arrow')} Į užklausos formą</a>
        </div>
      </div>
    </div>
  </section>`
}

// ── Footer (kelių kolonų) ─────────────────────────────────────────────────────
function footer(c) {
  const year = new Date().getFullYear()
  const socials = [
    c.brand.socials?.facebook ? `<a href="${esc(c.brand.socials.facebook)}" aria-label="Facebook" target="_blank" rel="noopener" data-magnetic>${icon('facebook')}</a>` : '',
    c.brand.socials?.instagram ? `<a href="${esc(c.brand.socials.instagram)}" aria-label="Instagram" target="_blank" rel="noopener" data-magnetic>${icon('instagram')}</a>` : '',
  ].join('')

  // Paslaugų stulpelis (iš services) — nuorodos į detalius puslapius (vidinis linkinimas SEO)
  const serviceLinks = (c.services || [])
    .slice(0, 6)
    .map((s) => `<li><a href="/paslaugos/${serviceSlug(s)}/">${esc(s.title)}</a></li>`)
    .join('')

  // Nuorodų stulpelis (iš navigacijos)
  const navLinks = [{ href: '/#top', label: 'Pagrindinis' }, ...NAV_LINKS]
    .map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`)
    .join('')

  // Aptarnaujamų vietovių nuorodos (į vietovių puslapius — vietos SEO).
  const areaLinks = (c.serviceAreas || [])
    .map((a) => `<a href="/vietoves/${areaSlug(a)}/">${esc(a)}</a>`)
    .join('')

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col footer__about">
          <a class="footer__brand" href="/#top">${icon('leaf')}<span>${esc(c.brand.name)}</span></a>
          <p class="footer__desc">${esc(c.brand.tagline)}. Aptarnaujame ${esc(c.brand.serviceArea)}.</p>
          ${socials ? `<div class="footer__socials">${socials}</div>` : ''}
        </div>

        ${serviceLinks ? `<div class="footer__col">
          <h3 class="footer__h">Paslaugos</h3>
          <ul class="footer__links">${serviceLinks}</ul>
        </div>` : ''}

        <div class="footer__col">
          <h3 class="footer__h">Nuorodos</h3>
          <ul class="footer__links">${navLinks}</ul>
        </div>

        <div class="footer__col footer__contact">
          <h3 class="footer__h">Kontaktai</h3>
          <ul class="footer__contacts">
            <li>${icon('phone')}<a href="tel:${esc(c.brand.phoneRaw)}">${esc(c.brand.phone)}</a></li>
            <li>${icon('mail')}<a href="mailto:${esc(c.brand.email)}">${esc(c.brand.email)}</a></li>
            <li>${icon('pin')}<span>${esc(c.brand.serviceArea)}</span></li>
            <li>${icon('clock')}<span>${esc(c.brand.workingHours)}</span></li>
          </ul>
          <a class="btn btn--primary footer__cta" data-magnetic href="/#kontaktai">Susisiekite dabar ${icon('arrow')}</a>
        </div>
      </div>

      ${areaLinks ? `<div class="footer__areas"><span class="footer__areas-label">Aptarnaujamos vietovės:</span> ${areaLinks}</div>` : ''}

      <div class="footer__bottom">
        <span>© ${year} ${esc(c.brand.name)}. Visos teisės saugomos.</span>
        ${
          c.brand.credit?.label
            ? `<span class="footer__credit">Programavimas — <a href="${esc(c.brand.credit.url || '#')}" target="_blank" rel="noopener">${esc(c.brand.credit.label)}</a></span>`
            : ''
        }
      </div>
    </div>
  </footer>`
}

// ── Mobile call bar (tamsus „glass" su žaliu akcentu) ────────────────────────
function callBar(c) {
  return `
  <a class="callbar" href="tel:${esc(c.brand.phoneRaw)}" aria-label="Skambinti ${esc(c.brand.phone)}">
    <span class="callbar__icon">${icon('phone')}</span>
    <span class="callbar__text">Skambinti dabar<strong>${esc(c.brand.phone)}</strong></span>
  </a>`
}

// ── Chrome eksportai (naudoja Astro Base layout'as visuose puslapiuose) ──────
export { header, footer, callBar }

// ── HOME puslapio turinys (be header/footer — juos prideda layout'as) ────────
export function renderHome(c) {
  return [
    `<main id="main">`,
    hero(c),
    trust(c),
    stats(c),
    services(c),
    about(c),
    process(c),
    gallery(c),
    serviceAreasSection(c),
    beforeAfter(c),
    reviews(c),
    faq(c),
    ctaBand(c),
    contact(c),
    `</main>`,
  ].join('\n')
}

// ── Bendra: kompaktiška kontaktų juosta sub-puslapiams (CTA + telefonas) ─────
function pageCta(c, title, sub) {
  return `
  <section class="cta section" aria-labelledby="pagecta-title">
    <div class="cta__glow" aria-hidden="true"></div>
    <div class="container cta__inner">
      <p class="cta__eyebrow reveal">Nemokamas įvertinimas vietoje</p>
      <h2 class="cta__title" id="pagecta-title" data-words>${esc(title)}</h2>
      <a class="cta__phone" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${esc(c.brand.phone)}</a>
      <ul class="cta__meta reveal">
        <li>${icon('clock')} ${esc(c.brand.workingHours)}</li>
        <li>${icon('pin')} ${esc(c.brand.serviceArea)}</li>
        ${c.brand.emergency ? `<li><span class="pulse"></span> Avarinė pagalba 24/7</li>` : ''}
      </ul>
    </div>
  </section>`
}

function breadcrumb(items) {
  const parts = items
    .map((it, i) =>
      it.href
        ? `<a href="${it.href}">${esc(it.label)}</a>${i < items.length - 1 ? '<span aria-hidden="true">/</span>' : ''}`
        : `<span aria-current="page">${esc(it.label)}</span>`
    )
    .join('')
  return `<nav class="crumbs container" aria-label="Naršymo kelias">${parts}</nav>`
}

// ── PASLAUGOS detalus puslapis ───────────────────────────────────────────────
export function renderServicePage(c, service) {
  const others = (c.services || []).filter((s) => serviceSlug(s) !== serviceSlug(service)).slice(0, 4)
  const otherLinks = others
    .map((s) => `<li><a href="/paslaugos/${serviceSlug(s)}/">${icon('arrow')} ${esc(s.title)}</a></li>`)
    .join('')
  const areaLinks = (c.serviceAreas || [])
    .slice(0, 12)
    .map((a) => `<a class="area__pill" href="/vietoves/${areaSlug(a)}/">${icon('pin')} ${esc(a)}</a>`)
    .join('')
  const points = (service.points || [])
    .map((p) => `<li class="about__value">${icon('check')}<span>${esc(p)}</span></li>`)
    .join('')

  return `
  <main id="main" class="subpage">
    ${breadcrumb([
      { label: 'Pagrindinis', href: '/' },
      { label: 'Paslaugos', href: '/paslaugos/' },
      { label: service.title },
    ])}
    <section class="subhero section">
      <div class="container subhero__grid">
        <div class="subhero__body">
          <p class="section__eyebrow">${esc(c.brand.tagline)}</p>
          <h1 class="subhero__title">${esc(service.title)} ${esc(c.brand.city)}</h1>
          <p class="subhero__lead">${esc(service.desc)}</p>
          ${service.price ? `<p class="subhero__price">${esc(service.price)}${service.unit ? ` <span>${esc(service.unit)}</span>` : ''}</p>` : ''}
          ${points ? `<ul class="about__values">${points}</ul>` : ''}
          <div class="hero__cta">
            <a class="btn btn--primary" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${icon('phone')} ${esc(c.brand.phone)}</a>
            <a class="btn btn--ghost" data-magnetic href="/#kontaktai">Gauti pasiūlymą</a>
          </div>
        </div>
        <div class="subhero__media">
          <img src="${esc(service.image)}" alt="${esc(service.title)} — ${esc(c.brand.name)}" width="1200" height="900" fetchpriority="high" />
        </div>
      </div>
    </section>

    ${
      otherLinks
        ? `<section class="section"><div class="container">
            <h2 class="section__title" style="margin-bottom:1.5rem">Kitos paslaugos</h2>
            <ul class="footer__links sub__others">${otherLinks}</ul>
          </div></section>`
        : ''
    }

    ${
      areaLinks
        ? `<section class="areas section"><div class="container">
            <header class="section__head"><p class="section__eyebrow">Kur dirbame</p>
            <h2 class="section__title">${esc(service.title)} — aptarnaujamos vietovės</h2></header>
            <div class="areas__grid">${areaLinks}</div>
          </div></section>`
        : ''
    }

    ${pageCta(c, `Reikia: ${service.title.toLowerCase()}? Skambinkite.`)}
  </main>`
}

// ── PASLAUGŲ sąrašo puslapis (/paslaugos/) ───────────────────────────────────
export function renderServicesIndex(c) {
  const cards = (c.services || [])
    .map(
      (s) => `
      <article class="service ${s.featured ? 'service--featured' : ''}">
        <div class="service__media"><img src="${esc(s.image)}" alt="${esc(s.title)}" loading="lazy" width="1200" height="900" /></div>
        <div class="service__body">
          <h2 class="service__title"><a class="service__more" href="/paslaugos/${serviceSlug(s)}/">${esc(s.title)}</a></h2>
          <p class="service__desc">${esc(s.desc)}</p>
          <span class="service__link">Plačiau ${icon('arrow')}</span>
        </div>
        ${s.price ? `<div class="service__price">${esc(s.price)}${s.unit ? `<span> ${esc(s.unit)}</span>` : ''}</div>` : ''}
      </article>`
    )
    .join('')
  return `
  <main id="main" class="subpage">
    ${breadcrumb([{ label: 'Pagrindinis', href: '/' }, { label: 'Paslaugos' }])}
    <section class="section"><div class="container">
      <header class="section__head"><p class="section__eyebrow">Paslaugos</p>
      <h1 class="section__title">Mūsų paslaugos</h1></header>
      <div class="services__grid">${cards}</div>
    </div></section>
    ${pageCta(c, 'Turite klausimų? Paskambinkite dabar.')}
  </main>`
}

// ── VIETOVIŲ sąrašo puslapis (/vietoves/) ────────────────────────────────────
export function renderAreasIndex(c) {
  const pills = (c.serviceAreas || [])
    .map((a) => `<a class="area__pill" href="/vietoves/${areaSlug(a)}/">${icon('pin')} ${esc(a)}</a>`)
    .join('')
  return `
  <main id="main" class="subpage">
    ${breadcrumb([{ label: 'Pagrindinis', href: '/' }, { label: 'Vietovės' }])}
    <section class="areas section"><div class="container">
      <header class="section__head"><p class="section__eyebrow">Kur dirbame</p>
      <h1 class="section__title">Aptarnaujamos vietovės</h1>
      <p class="section__sub">Atvykstame ${esc(c.brand.serviceArea)}. Pasirinkite vietovę arba tiesiog paskambinkite.</p></header>
      <div class="areas__grid">${pills}</div>
    </div></section>
    ${pageCta(c, 'Reikia pagalbos jūsų vietovėje? Skambinkite.')}
  </main>`
}

// ── VIETOVĖS puslapis (vietos SEO) ───────────────────────────────────────────
export function renderAreaPage(c, area) {
  const term = c.seo?.localTerm || c.brand.tagline
  const serviceLinks = (c.services || [])
    .map((s) => `<li><a href="/paslaugos/${serviceSlug(s)}/">${icon('arrow')} ${esc(s.title)}</a></li>`)
    .join('')
  const otherAreas = (c.serviceAreas || [])
    .filter((a) => areaSlug(a) !== areaSlug(area))
    .map((a) => `<a class="area__pill" href="/vietoves/${areaSlug(a)}/">${icon('pin')} ${esc(a)}</a>`)
    .join('')

  return `
  <main id="main" class="subpage">
    ${breadcrumb([
      { label: 'Pagrindinis', href: '/' },
      { label: 'Vietovės', href: '/vietoves/' },
      { label: area },
    ])}
    <section class="subhero section">
      <div class="container subhero__grid">
        <div class="subhero__body">
          <p class="section__eyebrow">Aptarnaujama vietovė</p>
          <h1 class="subhero__title">${esc(term)} — ${esc(area)}</h1>
          <p class="subhero__lead">${esc(c.brand.name)} teikia paslaugas ${esc(area)} ir aplinkiniuose rajonuose. Atvykstame greitai, dirbame saugiai ir tvarkingai. Skambinkite dėl nemokamo įvertinimo.</p>
          <div class="hero__cta">
            <a class="btn btn--primary" data-magnetic href="tel:${esc(c.brand.phoneRaw)}">${icon('phone')} ${esc(c.brand.phone)}</a>
            <a class="btn btn--ghost" data-magnetic href="/#kontaktai">Gauti pasiūlymą</a>
          </div>
        </div>
        <div class="subhero__media">
          <img src="${esc(c.hero.bgImage)}" alt="${esc(term)} ${esc(area)}" width="1200" height="900" fetchpriority="high" />
        </div>
      </div>
    </section>

    ${
      serviceLinks
        ? `<section class="section"><div class="container">
            <header class="section__head"><p class="section__eyebrow">Paslaugos</p>
            <h2 class="section__title">Ką atliekame ${esc(area)} vietovėje</h2></header>
            <ul class="footer__links sub__others">${serviceLinks}</ul>
          </div></section>`
        : ''
    }

    ${
      otherAreas
        ? `<section class="areas section"><div class="container">
            <header class="section__head"><h2 class="section__title">Kitos aptarnaujamos vietovės</h2></header>
            <div class="areas__grid">${otherAreas}</div>
          </div></section>`
        : ''
    }

    ${pageCta(c, `Reikia pagalbos ${esc(area)}? Skambinkite dabar.`)}
  </main>`
}
