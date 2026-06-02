// ============================================================================
//  ⭐ VISI KLIENTO DUOMENYS ČIA — vienintelis failas, kurį keiti naujam klientui ⭐
// ----------------------------------------------------------------------------
//  GREITAS STARTAS (naujam klientui):
//   1) brand    — pavadinimas, telefonas (+ phoneRaw be tarpų), el. paštas, miestas
//   2) seo      — title, description (svarbu Google'ui)
//   3) theme    — preset pagal nišą: forest | steel | clay | fresh | volt | noir
//   4) hero     — antraštė, paantraštė (fono nuotraukos KEISTI NEREIKIA — žr. žemiau)
//   5) services / gallery / reviews / faq — turinys
//   6) Nuotraukas dėk į public/images/ ir nurodyk "/images/failas.jpg"
//
//  HERO NUOTRAUKA: pagal nutylėjimą paliekama esama aukštos kokybės miško nuotrauka.
//  Keisk `hero.bgImage` tik jei klientas turi savo gerą plačią nuotrauką.
//
//  PASTABA: bet kurią sekciją galima IŠJUNGTI — tiesiog palik tuščią masyvą [],
//  pvz. `gallery: []` arba `reviews: []`, ir ta sekcija nebus rodoma.
// ============================================================================

export const CLIENT = {
  // ── Pagrindinė info ──────────────────────────────────────────────────────
  brand: {
    name: "Aukštaitijos Arboristai",
    owner: "Tomas Vaitkevičius",
    tagline: "Medžių pjovimas ir aplinkos tvarkymas",
    phone: "+370 600 12345",
    phoneRaw: "+37060012345",
    email: "info@aukstaitijosarboristai.lt",
    city: "Vilnius",
    serviceArea: "Vilnius ir +150 km aplink",
    workingHours: "Pr–Š 7:00–20:00",
    yearFounded: 2016,
    emergency: true,                          // skubi pagalba 24/7?
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    // Svetainės kūrėjo kreditas footeryje (tuščia = nerodoma).
    credit: { label: "jarvisweb.lt", url: "https://jarvisweb.lt" },
    // Tiesioginė Google „rašyti atsiliepimą" nuoroda. Tuščia = atsiliepimų „gate" nerodomas.
    // KEISTI: Google → tavo verslo profilis → „Get more reviews" → nukopijuok nuorodą.
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=PLACEHOLDER",
  },

  // ── SEO ──────────────────────────────────────────────────────────────────
  seo: {
    title: "Arboristo paslaugos Vilniuje | Aukštaitijos Arboristai",
    description:
      "Avarinis medžių pjovimas, genėjimas ir aplinkos tvarkymas Vilniuje ir aplink. Sertifikuoti arboristai, draudimas, profesionali įranga, atvykstam per 24 val.",
    keywords:
      "arboristas, medžių pjovimas, medžių genėjimas, avarinis pjovimas, aplinkos tvarkymas, Vilnius",
    url: "https://www.aukstaitijosarboristai.lt",
    // Trumpas raktažodis vietovių puslapių antraštėms, pvz. „Medžių pjovimas Vilnius".
    localTerm: "Medžių pjovimas ir arboristo paslaugos",
  },

  // ── Tema ──────────────────────────────────────────────────────────────────
  // preset: forest | steel | clay | fresh | volt | noir (žr. src/style.css presetus)
  // Custom: { bg, ink, accent, muted, surface }
  theme: {
    preset: "forest",
    // custom: { bg: "#0E1711", ink: "#EFF3EA", accent: "#84B26A", muted: "#889A80", surface: "#17231A" },
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Sertifikuoti arboristai · nuo 2016",
    headline: "Pavojingas medis\nšalia namo?",      // \n = eilutės lūžis
    headlineAccent: "Pašaliname saugiai.",          // akcentuota dalis (kita spalva)
    sub: "Avarinis medžių pjovimas, genėjimas ir aplinkos tvarkymas. Su draudimu, profesionalia įranga ir alpinistine technika — atvykstam per 24 valandas.",
    ctaPrimary: "Gauti pasiūlymą",
    ctaSecondary: "Žiūrėti darbus",
    bgImage: "/images/hero.jpg", // kliento hero nuotrauka (optimizuota)
    // Hero „glass" pasitikėjimo kortelės (po CTA). Tuščias masyvas = nerodoma.
    badges: [
      { icon: "certificate", title: "Sertifikuota įmonė", desc: "Profesionalus ir atsakingas požiūris" },
      { icon: "shield", title: "Apdrausta veikla", desc: "Jūsų turtas apsaugotas viso darbo metu" },
      { icon: "thumb", title: "9+ metų patirtis", desc: "Šimtai sėkmingai atliktų darbų" },
    ],
    // Pasiūlymo forma hero sekcijoje (lead-capture virš lankstymo linijos).
    // enabled:true -> hero tampa split (antraštė + forma). false -> kinematografinis hero su CTA mygtukais.
    quoteForm: {
      enabled: true,
      title: "Gaukite nemokamą pasiūlymą",
      note: "Atsakome per 1 darbo dieną. Jokių įsipareigojimų.",
      button: "Gauti pasiūlymą",
    },
  },

  // ── Pasitikėjimo ženklai (juosta po hero) ─────────────────────────────────
  trustBadges: [
    { icon: "shield", text: "Apdrausta veikla" },
    { icon: "certificate", text: "Sertifikuoti arboristai" },
    { icon: "clock", text: "Atvykstam per 24 val." },
    { icon: "thumb", text: "Nemokamas įvertinimas" },
    { icon: "leaf", text: "Tvarkinga aplinka po darbų" },
  ],

  // ── Statistikos (animuoti count-up) ───────────────────────────────────────
  stats: [
    { value: 850, suffix: "+", label: "Atliktų darbų" },
    { value: 4.9, suffix: "★", label: "Vidutinis įvertinimas", decimals: 1 },
    { value: 9, suffix: " m.", label: "Patirties" },
    { value: 100, suffix: "%", label: "Sutvarkyta po darbų" },
  ],

  // ── Paslaugos ─────────────────────────────────────────────────────────────
  services: [
    {
      title: "Avarinis medžių pjovimas",
      desc: "Pavojingų, nudžiūvusių ar nuvirtusių medžių šalinimas sudėtingomis sąlygomis — net tarp pastatų ir laidų.",
      price: "nuo 45€",
      unit: "už val.",
      image: "/images/avarinis-medziu-pjovimas.jpg",
    },
    {
      title: "Vaismedžių genėjimas",
      desc: "Obelų, kriaušių ir kitų vaismedžių formavimas bei genėjimas — sveikatai, derliui ir gražiai formai.",
      price: "nuo 35€",
      unit: "už val.",
      image: "/images/vaismedziu-pjovimas.jpg",
    },
    {
      title: "Tujų ir gyvatvorių trumpinimas",
      desc: "Tujų, gyvatvorių ir dekoratyvinių krūmų lyginimas bei trumpinimas — tvarkinga ir vienoda forma.",
      price: "nuo 30€",
      unit: "už val.",
      image: "/images/tuju-gyvatvoriu-trumpinimas.jpg",
    },
    {
      title: "Kelmų frezavimas",
      desc: "Kelmų pašalinimas frezavimo būdu — sklypas paruošiamas naujiems sodinukams ar vejai.",
      price: "nuo 25€",
      unit: "už kelmą",
      image: "/images/kelmu-frezavimas.jpg",
    },
    {
      title: "Apleistų sklypų tvarkymas",
      desc: "Krūmynų, savaiminukų ir užaugusių sklypų išvalymas. Paliekame paruoštą, švarią teritoriją.",
      price: "pagal sutartį",
      unit: "",
      image: "/images/apleistu-sklypu-tvarkymas.jpg",
    },
    {
      title: "Vejos pjovimas",
      desc: "Vejos trumpinimas ir priežiūra — reguliariai arba vienkartinai, didelėms ir mažoms teritorijoms.",
      price: "nuo 15€",
      unit: "už val.",
      image: "/images/vejos-trumpinimas.jpg",
    },
    {
      title: "Malkų skaldymas",
      desc: "Malkų pjovimas ir skaldymas jūsų kieme — paruošiame kūrenimui patogaus dydžio malkas.",
      price: "nuo 20€",
      unit: "už m³",
      image: "/images/malku-skaldymas.jpg",
    },
    {
      title: "Malkų pardavimas",
      desc: "Sausos, paruoštos kūrenti malkos su pristatymu. Įvairios medienos rūšys pagal poreikį.",
      price: "pagal kiekį",
      unit: "",
      image: "/images/malku-pardavimas.jpg",
    },
  ],

  // ── Apie mus (nuotraukų karuselė + vertybės) ──────────────────────────────
  about: {
    heading: "Kokybiškas ir saugus darbas — mūsų prioritetas",
    text: "Aukštaitijos Arboristai — patikima medžių pjovimo ir priežiūros komanda, dirbanti Vilniuje ir aplinkiniuose rajonuose. Su daugiau nei devynerių metų patirtimi ir profesionalia įranga garantuojame saugumą bei tvarką.",
    text2: "Kiekvieną darbą vykdome atsakingai: įvertiname riziką, dirbame su draudimu ir po savęs paliekame sutvarkytą aplinką.",
    images: [
      "/images/avarinis-medziu-pjovimas.jpg",
      "/images/kelmu-frezavimas.jpg",
      "/images/vaismedziu-pjovimas.jpg",
    ],
    values: [
      "Avarinis medžių pjovimas",
      "Vaismedžių ir gyvatvorių priežiūra",
      "Kelmų frezavimas",
      "Apleistų sklypų tvarkymas",
      "Malkų skaldymas ir pardavimas",
      "Greitoji pagalba 24/7",
    ],
    ctaPrimary: "Susisiekti su komanda",
    ctaSecondary: "Mūsų paslaugos",
  },

  // ── Procesas (kaip dirbame) ───────────────────────────────────────────────
  process: [
    { step: "01", title: "Skambinate", desc: "Aptariame poreikį telefonu, atsakome į klausimus." },
    { step: "02", title: "Atvykstame", desc: "Įvertiname situaciją vietoje, visiškai nemokamai." },
    { step: "03", title: "Atliekame", desc: "Dirbame saugiai, tvarkingai ir laiku." },
    { step: "04", title: "Sutvarkome", desc: "Išvežame šakas, paliekame tvarkingą aplinką." },
  ],

  // ── Galerija (atlikti darbai su kategorijomis) ────────────────────────────
  gallery: [
    {
      category: "Avarinis pjovimas",
      title: "Pavojingo medžio šalinimas",
      desc: "Grėsmingo medžio šalinimas su profesionalia įranga ir griežtais saugos standartais.",
      image: "/images/avarinis-medziu-pjovimas.jpg",
    },
    {
      category: "Genėjimas",
      title: "Vaismedžių formavimas",
      desc: "Obelų ir kriaušių genėjimas — sveikatai, derliui ir gražiai formai.",
      image: "/images/vaismedziu-pjovimas.jpg",
    },
    {
      category: "Gyvatvorės",
      title: "Tujų ir gyvatvorių lyginimas",
      desc: "Tvarkinga, vienoda gyvatvorių forma — kruopščiai ir tolygiai.",
      image: "/images/tuju-gyvatvoriu-trumpinimas.jpg",
    },
    {
      category: "Kelmų frezavimas",
      title: "Kelmų šalinimas frezavimu",
      desc: "Sklypas paruoštas naujiems sodinukams ar vejai — be kelmų likučių.",
      image: "/images/kelmu-frezavimas.jpg",
    },
    {
      category: "Aplinkos tvarkymas",
      title: "Apleisto sklypo išvalymas",
      desc: "Krūmynų ir savaiminukų šalinimas — sklypas paruoštas naudojimui.",
      image: "/images/apleistu-sklypu-tvarkymas.jpg",
    },
    {
      category: "Malkos",
      title: "Malkų pjovimas ir skaldymas",
      desc: "Paruošiame kūrenimui patogaus dydžio malkas jūsų kieme.",
      image: "/images/malku-skaldymas.jpg",
    },
  ],

  // ── Aptarnaujamos vietovės (vietos SEO + aprėptis) ────────────────────────
  // Išvardink miestus/rajonus. Tuščias masyvas [] = sekcija nerodoma.
  serviceAreas: [
    "Vilnius", "Trakai", "Elektrėnai", "Vievis", "Lentvaris", "Grigiškės",
    "Nemenčinė", "Maišiagala", "Rūdiškės", "Paberžė", "Šalčininkai", "Aukštadvaris",
  ],

  // ── Prieš / Po galerija ───────────────────────────────────────────────────
  // Vėliau pakeisk realia kliento „prieš" ir „po" nuotraukų pora (vienodų matmenų).
  beforeAfter: [
    {
      before: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1600&q=70&sat=-100", // KEISTI: „prieš" (nespalvota)
      after: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1600&q=70",          // KEISTI: „po" (spalvota)
      label: "Apleisto sklypo tvarkymas",
    },
  ],

  // ── Recenzijos ────────────────────────────────────────────────────────────
  reviews: [
    {
      name: "Genovaitė",
      city: "Vilnius",
      rating: 5,
      service: "Avarinis medžių pjovimas",
      text: "Po audros ant tvoros nuvirto didelis medis. Atvyko tą pačią dieną, viską sutvarkė saugiai ir paliko švarų kiemą. Labai dėkinga.",
      date: "2025-04",
    },
    {
      name: "Mindaugas",
      city: "Trakai",
      rating: 5,
      service: "Tujų ir gyvatvorių trumpinimas",
      text: "Sutvarkė ilgą tujų gyvatvorę — dabar lygi ir tvarkinga. Greitai, švariai, ir po savęs viską susitvarkė.",
      date: "2025-03",
    },
    {
      name: "Rasa",
      city: "Vilnius",
      rating: 5,
      service: "Vaismedžių genėjimas",
      text: "Sutvarkė visą sodą — obelis, kriaušes ir vyšnias. Konsultavo, ką ir kada geriausia genėti. Rekomenduoju.",
      date: "2025-02",
    },
    {
      name: "Darius",
      city: "Elektrėnai",
      rating: 5,
      service: "Apleistų sklypų tvarkymas",
      text: "Naujai pirktas sklypas buvo visiškai apaugęs. Per dvi dienas paruošė statyboms. Kaina aiški iš anksto, jokių staigmenų.",
      date: "2025-01",
    },
    {
      name: "Ingrida",
      city: "Vilnius",
      rating: 5,
      service: "Kelmų frezavimas",
      text: "Pašalino keturis senus kelmus iš pievos. Greitai, švariai, dabar galime sėti veją. Ačiū už profesionalumą.",
      date: "2024-11",
    },
  ],

  // ── DUK ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "Ar išvežate šakas po darbų?",
      a: "Taip, visada paliekame švarią aplinką. Visos šakos ir atliekos surenkamos ir išvežamos — kainą galime įtraukti į bendrą pasiūlymą.",
    },
    {
      q: "Kaip apskaičiuojate kainą?",
      a: "Atvykstame, įvertiname darbą vietoje nemokamai ir pateikiame fiksuotą kainą iš anksto. Jūs žinote tikslią sumą prieš pradedant.",
    },
    {
      q: "Ar dirbate avarinėmis situacijomis savaitgaliais?",
      a: "Taip. Avarinė pagalba veikia 24/7, įskaitant savaitgalius ir šventes. Po audros stengiamės atvykti tą pačią dieną.",
    },
    {
      q: "Ar turite draudimą?",
      a: "Taip, mūsų veikla apdrausta civilinės atsakomybės draudimu. Jūsų turtas ir aplinka yra apsaugoti viso darbo metu.",
    },
    {
      q: "Ar galite pjauti medžius prie elektros laidų?",
      a: "Taip, tokius darbus atliekame alpinistine technika ir, esant reikalui, derindami su elektros tinklų operatoriumi. Saugumas — prioritetas.",
    },
  ],

  // ── CTA juosta (kontrastinga, prieš kontaktus) ────────────────────────────
  ctaBand: {
    title: "Turite klausimų ar pavojingą medį?",
    text: "Nemokamai įvertiname darbus vietoje ir pateikiame aiškią kainą. Susisiekite — atsakome greitai.",
    primary: "Gauti pasiūlymą",
    secondary: "Peržiūrėti darbus",
  },

  // ── Kontaktai ─────────────────────────────────────────────────────────────
  contact: {
    heading: "Susisiekite su mūsų komanda",
    subtitle: "Atsakome greitai. Nemokamas įvertinimas ir konsultacija — tiesiog susisiekite.",
    // Formos siuntimas: jei nurodytas endpoint (pvz. Formspree URL) — siunčiama POST'u.
    // Jei tuščia — atidaroma el. pašto programa (mailto fallback).
    formEndpoint: "",
    // Google Maps įterpimas „Aptarnaujamos vietovės" sekcijai.
    // FILLER: dabar rodo Vilnių. Vėliau įdėk realų kliento adresą:
    // Google Maps → Share → Embed a map → nukopijuok TIK src="..." URL.
    mapEmbed: "https://maps.google.com/maps?q=Vilnius,Lithuania&z=10&output=embed",
    infoCards: [
      { icon: "phone", title: "Skambinkite mums", value: "+370 600 12345", note: "Atsakome greitai" },
      { icon: "message", title: "Parašykite užklausą", value: "Užpildykite formą", note: "Atsakysime per parą" },
      { icon: "truck", title: "Atvykstame pas jus", value: "Vilnius ir +150 km", note: "Visi rajonai aplink" },
      { icon: "clipboard", title: "Nemokamas įvertinimas", value: "Apžiūra vietoje", note: "Aiški kaina iš anksto" },
    ],
    urgent: {
      title: "Skubu?",
      text: "Avarinė situacija ar darbai ne darbo metu? Skambinkite — atsiliepiame ir savaitgaliais bei vakarais.",
    },
  },
}
