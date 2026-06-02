# Premium paslaugų verslo svetainė

Greita, „wow" lygio, **SEO-optimizuota** svetainė lietuviškam paslaugų verslui
(arboristai, santechnikai, statybininkai, valymas ir t. t.). Sukurta su **Astro**
(statinis HTML = tikras SEO). Animacijos — **GSAP**, sklandus scroll'as — **Lenis**.

Visą turinį keičiate **viename faile** — [`src/data/client.js`](src/data/client.js).

**Daugiapuslapė SEO:** iš `client.js` automatiškai sugeneruojami atskiri puslapiai:
- `/` — pagrindinis (visos sekcijos + lead-capture forma hero'je)
- `/paslaugos/[slug]` — atskiras puslapis kiekvienai paslaugai (pvz. „Avarinis medžių pjovimas Vilnius")
- `/vietoves/[miestas]` — atskiras puslapis kiekvienai vietovei (vietos SEO, pvz. „…Trakai")
- `/paslaugos/`, `/vietoves/` — sąrašų puslapiai; `+ sitemap.xml` ir `robots.txt`

Kiekvienas puslapis turi savo `<title>`, meta aprašymą, `canonical` ir `<h1>`.

---

## 🧩 Naudojimas kaip šablonas (naujam klientui)

Šis aplankas yra **daugkartinis šablonas**. Kiekvienam naujam klientui:

1. **Nukopijuokite visą aplanką** ir pervadinkite (pvz. `klientas-jonas`).
2. Atidarykite kopiją atskirai (pvz. VS Code).
3. Pakeiskite **tik** [`src/data/client.js`](src/data/client.js) — visą kitą kodą palikite.
4. Sudėkite kliento nuotraukas į [`public/images/`](public/images/).
5. `npm run dev` → svetainė paruošta. `npm run build` → atiduodama versija `/dist`.

> **Hero (pagrindinė) nuotrauka** pagal nutylėjimą paliekama esama — aukštos
> kokybės miško nuotrauka. `hero.bgImage` keiskite tik jei klientas turi savo gerą
> plačią (≥1600px) nuotrauką.

> **Greičiausias būdas:** kopijuokite aplanką **su** `node_modules` — tada `npm run dev`
> veikia iš karto, be `npm install`. Jei norite lengvesnių kopijų — ištrinkite
> `node_modules` (ir `dist`) prieš kopijuodami, o kiekvienoje kopijoje paleiskite
> `npm install` vieną kartą.

Jokio kodo liesti nereikia — visos sekcijos generuojamos iš `client.js`, o
**tuščią sekciją galima išjungti** paliekant tuščią masyvą (pvz. `gallery: []`).

---

## 🚀 Kaip paleisti

Reikalinga [Node.js](https://nodejs.org/) (18+).

```bash
npm install      # įdiegia priklausomybes (vienkartinis)
npm run dev      # paleidžia dev serverį → http://localhost:5173
```

Kitos komandos:

```bash
npm run build    # sukuria produkcinę versiją į /dist
npm run preview  # peržiūri sukurtą /dist versiją
```

---

## ✏️ Kaip pakeisti klientą

Atidarykite **[`src/data/client.js`](src/data/client.js)** — tai vienintelė vieta,
kurioje yra kliento turinys. Pakeiskite reikšmes ir išsaugokite, naršyklė
atsinaujins automatiškai.

Ką galite keisti:

| Sekcija `client.js` | Ką valdo |
|---|---|
| `brand` | Pavadinimas, savininkas, **telefonas**, el. paštas, miestas, darbo laikas, soc. tinklai, `credit` (kūrėjo kreditas footeryje) |
| `seo` | `<title>`, aprašymas, raktažodžiai, OG žymės, JSON-LD |
| `theme` | Spalvų paletė (žr. žemiau) |
| `hero` | Pagrindinė antraštė, paantraštė, mygtukai, fono nuotrauka, „glass" badge'ai |
| `trustBadges` | Pasitikėjimo ženklai po hero |
| `stats` | Animuoti skaičiai (count-up) |
| `services` | Paslaugų kortelės (`featured: true` — didesnė kortelė) |
| `about` | Apie mus: nuotraukų karuselė, vertybių sąrašas, CTA |
| `process` | Žingsniai „kaip dirbame" |
| `gallery` | Atlikti darbai su kategorijomis (hover zoom) |
| `beforeAfter` | „Prieš / po" slankiklio nuotraukos |
| `reviews` | Klientų atsiliepimai |
| `faq` | Dažni klausimai (DUK) |
| `ctaBand` | Kontrastinga juosta su milžinišku telefonu |
| `contact` | Info kortelės, kontaktų forma, „skubu" blokas |

> **Telefono numeris.** `phone` — kaip rodoma (`+370 600 12345`),
> `phoneRaw` — `tel:` nuorodai (`+37060012345`, be tarpų).

---

## 🎨 Kaip pakeisti spalvas

### Variantas A — paruoštas presetas (paprasčiausia)

`client.js` faile nustatykite `theme.preset`:

```js
theme: { preset: "forest" }
```

Galimi presetai (parinkti pagal nišą):

| Presetas | Nišai |
|---|---|
| `forest` | Arboristas, kraštovaizdis, sodininkystė |
| `steel`  | Santechnika, šildymas, vandentiekis |
| `clay`   | Statybos, remontas, stogai |
| `fresh`  | Valymas, švara |
| `volt`   | Elektrikai, saulės jėgainės |
| `noir`   | Prabanga: interjeras, baldai |

### Variantas B — savos spalvos

```js
theme: {
  custom: {
    bg: "#10150F",       // fonas
    ink: "#F2F0E6",      // tekstas
    accent: "#C9A227",   // akcentas (mygtukai, skaičiai)
    muted: "#76806C",    // pilkesnis tekstas
    surface: "#1A2117",  // kortelių fonas
  }
}
```

Presetų reikšmės surašytos [`src/style.css`](src/style.css) viršuje (`[data-theme='...']`).

---

## 🖼️ Kur dėti nuotraukas

Visas nuotraukas dėkite į **[`public/images/`](public/images/)**, o `client.js`
nurodykite kelią su `/images/...`, pvz.:

```js
hero: { bgImage: "/images/hero.jpg" }
services: [{ image: "/images/service-1.jpg", ... }]
```

Kol nėra realių nuotraukų, naudojamos laikinos iš
[picsum.photos](https://picsum.photos). Kiekviena pažymėta komentaru
`// KEISTI: kliento nuotrauka` — paieškokite jų `client.js` faile.

**Rekomenduojami dydžiai:**

| Vieta | Dydis |
|---|---|
| Hero fonas (`hero.bgImage`) | ~1600×1000 px |
| Paslaugų kortelės (`services[].image`) | ~1200×900 px |
| „Prieš / po" (`beforeAfter[]`) | ~1600×1000 px (vienodų matmenų) |
| Social share (`public/og-image.jpg`) | 1200×630 px |

> Optimizuokite nuotraukas (WebP/JPG, suspaustas) — tai labiausiai veikia greitį.

---

## 📨 Kontaktų forma

Pagal nutylėjimą forma veikia **be serverio** — paspaudus „Siųsti", atsidaro
naudotojo el. pašto programa su užpildyta žinute (`mailto`).

Jei norite, kad užklausos ateitų automatiškai, `client.js` faile
`contact.formEndpoint` įrašykite [Formspree](https://formspree.io/) (ar pan.)
URL — tada forma siunčiama `fetch` POST'u:

```js
contact: { formEndpoint: "https://formspree.io/f/JŪSŲ-ID", ... }
```

---

## 📁 Struktūra

```
├── astro.config.mjs        # Astro konfigūracija (site = client.seo.url)
├── public/
│   ├── images/             # ← kliento nuotraukos čia
│   └── og-image.jpg        # social share (pridėkite patys)
└── src/
    ├── data/
    │   └── client.js       # ⭐ VISAS kliento turinys ČIA ⭐
    ├── render.js           # sekcijų/puslapių HTML iš client.js (slug'ai, SEO turinys)
    ├── style.css           # visi stiliai + temos
    ├── icons.js            # SVG ikonos
    ├── layouts/
    │   └── Base.astro      # bendras karkasas: <head> SEO/meta/JSON-LD + chrome
    ├── pages/              # ← maršrutai (Astro generuoja HTML)
    │   ├── index.astro             # /  (pagrindinis)
    │   ├── paslaugos/[slug].astro  # /paslaugos/...  (auto iš services)
    │   ├── paslaugos/index.astro   # /paslaugos/
    │   ├── vietoves/[miestas].astro# /vietoves/...   (auto iš serviceAreas)
    │   ├── vietoves/index.astro     # /vietoves/
    │   ├── sitemap.xml.js           # sitemap iš client.js
    │   └── robots.txt.js
    ├── scripts/
    │   └── main.js         # client JS — tik judesio modulių init
    └── modules/            # judesio efektai (kiekvienas atskirai)
        ├── scroll.js       # Lenis smooth scroll
        ├── header.js       # sticky header
        ├── nav.js          # mobilus hamburger meniu
        ├── cursor.js       # custom cursor
        ├── magnetic.js     # magnetiniai mygtukai
        ├── wordReveal.js   # antraščių žodžių reveal
        ├── scrollReveal.js # sekcijų pasirodymas
        ├── counters.js     # animuoti skaičiai
        ├── beforeAfter.js  # prieš/po slankiklis
        ├── carousel.js     # „Apie mus" nuotraukų karuselė
        ├── form.js         # kontaktų formos validacija + siuntimas
        ├── accordion.js    # DUK
        ├── grain.js        # grain tekstūra
        ├── progress.js     # scroll progreso linija
        └── effects.js      # parallax + proceso linija
```

---

## ⚙️ Techninės detalės

- **Tipografija:** `Lora` (antraštės) + `Hanken Grotesk` (tekstas) iš Google Fonts.
  Abu pilnai palaiko lietuviškas raides (ąčęėįšųūž).
- **Performance:** animacijos tik per `transform`/`opacity`, ScrollTrigger ir
  IntersectionObserver paleidžia jas tik kai elementas matomas.
- **`prefers-reduced-motion`:** jei naudotojo sistemoje įjungta „mažiau judesio",
  visas judesys išjungiamas automatiškai.
- **Mobile-first:** veikia nuo 320px pločio, telefono „call bar" apačioje.
- **SEO:** statinis HTML (Astro), atskiri puslapiai paslaugoms ir vietovėms, kiekvienas
  su savo `<title>`, meta, `canonical` ir `<h1>`; `Schema.org LocalBusiness` JSON-LD,
  OG žymės, `sitemap.xml`, `robots.txt` — viskas generuojama iš `client.js`.

> **Puslapiai pridedami/dingsta savaime:** pridėjus paslaugą į `services` arba vietovę
> į `serviceAreas`, automatiškai atsiranda jos puslapis (build metu). Slug'ai generuojami
> iš pavadinimo (lietuviškos raidės tvarkomos). Norite fiksuoto slug'o paslaugai — pridėkite
> `slug: "..."` tame `services` įraše.

---

Sėkmės! Klausimai dėl pritaikymo — pradėkite nuo `src/data/client.js`.
