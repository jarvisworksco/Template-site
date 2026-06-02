# BRIEF: „Best of Both" — svetainės patobulinimas

> **Kaip naudoti:** Įdėk šį failą į savo projekto šakninį katalogą (ten, kur jau yra tavo esamas template). Tada pasakyk Claude Code: *„Perskaityk `best-of-both-brief.md`. Sujunk geriausias mano esamo template savybes su čia aprašytais principais. Pasiūlyk planą prieš keisdamas kodą."*
>
> **Tikslas:** Lietuviškoms paslaugų įmonėms (langų/durų remontas, stogai, santechnika, valymas, statyba ir pan.) skirta konversijai optimizuota svetainė. Visas turinys — **lietuvių kalba**.

---

## 1. Filosofija (svarbiausia)

Tai NE portfolio ir NE įmonės vizitinė. Tai **konversijos mašina** paslaugų verslui. Kiekvienas ekranas turi vesti lankytoją į vieną iš dviejų veiksmų:
1. **Palikti užklausą** (forma)
2. **Paskambinti** (telefono mygtukas)

Visi kiti elementai (atsiliepimai, galerija, „apie mus") egzistuoja tik tam, kad sumažintų kliento abejones prieš šį veiksmą.

---

## 2. Ką perimti iš referencinės svetainės (glassexpertsfl.org)

### 2.1. Konversijos inžinerija — PRIVALOMA
- **CTA mygtukas kartojasi visur:** header'yje, hero sekcijoje, maždaug kas antroje sekcijoje ir footer'yje. Tekstas pvz.: „Gauti nemokamą pasiūlymą" / „Gauti kainą".
- **Užklausos forma jau pirmame ekrane** (hero dešinėje pusėje arba po antrašte mobiliajame). Laukai: Vardas, Telefonas, Trumpa žinutė, sutikimo varnelė, ryškus „Siųsti" mygtukas. Laikyk trumpą — kuo mažiau laukų, tuo daugiau užpildymų.
- **Telefono numeris matomas nuolat** (lipnus header'is). Mobiliajame — `tel:` nuoroda, kad paspaudus iškart skambintų.

### 2.2. SEO masto strategija — REKOMENDUOJAMA
Referencinė svetainė turi **atskirą puslapį kiekvienai paslaugai IR kiekvienam miestui** (jų buvo 10). Tai leidžia rikiuotis Google pagal lokalias užklausas.

Pritaikyk Lietuvai:
- Atskiri paslaugų puslapiai: pvz. `/langu-remontas`, `/duru-remontas`, `/stiklo-keitimas`.
- Atskiri vietovių puslapiai: pvz. `/langu-remontas-vilnius`, `/langu-remontas-kaunas`, `/langu-remontas-klaipeda`.
- Kiekvienas vietovės puslapis naudoja TĄ PATĮ šabloną, keičiasi tik miesto pavadinimas antraštėje ir tekste (pvz. antraštė: „Patikimas langų remontas Vilniuje").
- **Svarbu:** vietovių puslapių tekstai turi šiek tiek skirtis (ne 1:1 kopija), kitaip Google laiko tai dubliuotu turiniu.

### 2.3. Pasitikėjimo signalai — PRIVALOMA
- **Badge juosta** po hero: pvz. „Vietinė įmonė", „Šeimos verslas", „15+ metų patirtis", „Apdrausta", „Su garantija".
- **Tikri atsiliepimai** su vardais (Google atsiliepimų kortelės su žvaigždutėmis). Naudok realius — netikri pastebimi.
- **„Apie mus"** su savininko istorija ir tikra nuotrauka (ne stock).
- Realios atliktų darbų nuotraukos galerijoje (prieš/po veikia ypač gerai).

### 2.4. Vizualinis ritmas — REKOMENDUOJAMA
- Kiekviena sekcija: mažas „eyebrow" ženkliukas + didelė antraštė + akcentinė linija.
- Paprastas 3–5 žingsnių „kaip vyksta procesas" blokas su ikonomis (sumažina kliento baimę).
- Vienas akcentinis spalvos tonas mygtukams (kontrastingas fonui).
- Banguoti/įstrižiniai sekcijų kraštai — neprivaloma, bet duoda „premium" jausmą.

### 2.5. Chatbotas — GREIČIAUSIAI PRALEISTI
Referencinė svetainė turi pokalbių robotą, bet mažam verslui jis dažniausiai neverta:
- Dengia tik vieną žmogų, kuris vis tiek atsako ne realiu laiku.
- Tą patį darbą (kontaktas) atlieka forma + telefonas, be papildomos priežiūros ir kainos.

**Vietoj jo Lietuvoje geriau veikia:** ryškus „Skambinti" mygtukas mobiliajame, Messenger/WhatsApp nuoroda, trumpa užklausos forma. Pridėk chatbotą tik jei kažkas realiai budi arba turi gerą automatinį DUK atsakiklį.

---

## 3. Ką IŠLAIKYTI iš mano esamo template

> Claude Code: pirmiausia peržiūrėk mano esamą kodą ir užpildyk šį sąrašą. Neperdaryk to, kas jau gerai veikia.

- [ ] Technologijų stekas / framework (naudok tą patį, neperrašinėk be reikalo)
- [ ] Bendras dizaino stilius / brand spalvos (jei jau tinka)
- [ ] Esama komponentų struktūra
- [ ] Bet kokios funkcijos, kurios man jau patinka: _______________

**Sujungimo principas:** imk mano template VIZUALINĮ pagrindą + referencinės svetainės KONVERSIJOS ir SEO struktūrą. Jei kyla konfliktas — laimi konversija (CTA, forma, telefonas).

---

## 4. Puslapių struktūra (siektinas rezultatas)

```
Pagrindinis (Home)
├── Hero su forma + CTA
├── Pasitikėjimo badge juosta
├── Apie mus
├── Paslaugos (kortelės → veda į atskirus puslapius)
├── Kaip vyksta procesas (žingsniai)
├── Galerija / atlikti darbai
├── Atsiliepimai
├── DUK
├── Aptarnaujamos vietovės (+ žemėlapis)
├── Galutinis CTA
└── Footer (kontaktai, nuorodos, darbo laikas)

Paslaugų puslapiai (vienas šablonas, kartojasi)
└── Hero → SEO tekstas → atsiliepimai → procesas → vietovės → CTA → footer

Vietovių puslapiai (vienas šablonas, kartojasi, keičiasi miestas)
└── Hero su miesto pavadinimu → tekstas → CTA → footer

Galerija | Tinklaraštis | Kontaktai | Privatumo politika | Taisyklės
```

---

## 5. Pagrindinio puslapio sekcijos — detaliai (placeholder turinys LT)

> Visą `[laužtiniuose skliaustuose]` esantį tekstą pakeisk realiu kliento turiniu.

**HERO**
- Antraštė: `[ĮMONĖS PAVADINIMAS] — [PAGRINDINĖ PASLAUGA] [MIESTE]`
- Paantraštė: 1–2 sakiniai apie patirtį ir paslaugas.
- Forma: Vardas, Telefonas, Žinutė, sutikimas, „Siųsti".
- Antrinis CTA: telefono numeris.

**BADGE JUOSTA**
`Vietinė įmonė · Šeimos verslas · [X]+ metų patirtis · Apdrausta · Su garantija`

**APIE MUS**
- Trumpa istorija (kas, kada įkūrė, kodėl verta pasitikėti) + savininko/komandos nuotrauka.
- Soc. tinklų ikonos.

**PASLAUGOS** (eyebrow: „Ką darome geriausiai")
- 3–4 kortelės su nuotrauka ir pavadinimu, kiekviena veda į savo puslapį.

**PROCESAS** (eyebrow: „Paprasta ir aišku")
- Žingsniai, pvz.: Susisiekite → Gaukite pasiūlymą → Atliekame darbą → Apmokėjimas.

**GALERIJA** (eyebrow: „Mūsų darbai")
- Nuotraukų tinklelis + „Žiūrėti visas" mygtukas.

**ATSILIEPIMAI** (eyebrow: „Ką sako klientai")
- Google atsiliepimų kortelės + „Palikite atsiliepimą" mygtukas.

**DUK**
- 4–6 dažniausi klausimai akordeono formatu (kaina, garantija, kiek užtrunka, ar nemokamas įvertinimas).

**VIETOVĖS** (eyebrow: „Aptarnaujame")
- Įterptas žemėlapis + miestų/rajonų sąrašas (kiekvienas veda į savo puslapį).

**GALUTINIS CTA**
- „Pasiruošę pradėti? Gaukite nemokamą pasiūlymą šiandien!" + mygtukas.

**FOOTER**
- Kontaktai, telefonas, el. paštas, paslaugų nuorodos, vietovės, darbo laikas, privatumo politika / taisyklės.

---

## 6. Techniniai reikalavimai

- **Kalba:** viskas lietuviškai. Atributai: `lang="lt"`.
- **Mobile-first:** dauguma paslaugų verslo lankytojų — telefone. Forma ir „Skambinti" mygtukas turi būti patogūs mažame ekrane.
- **Greitis:** optimizuotos nuotraukos (WebP), minimalūs skriptai.
- **SEO:** unikalūs `<title>` ir `meta description` kiekvienam puslapiui; LocalBusiness schema.org žymėjimas; semantinis HTML.
- **Pasiekiamumas:** kontrastingi mygtukai, alt tekstai, klaviatūros navigacija.
- **Formos:** veikiantis pateikimas (el. paštu arba į CRM); spam apsauga (honeypot ar pan.), NE įkyrus CAPTCHA.

---

## 7. Claude Code darbo eiga

1. Perskaityk šį brief.
2. Peržiūrėk esamą template ir užpildyk 3 skyrių (ką išlaikyti).
3. **Pasiūlyk planą** (kurias sekcijas pridėti, ką pertvarkyti) — palauk mano patvirtinimo prieš keisdamas kodą.
4. Įgyvendink iteracijomis: pirma pagrindinio puslapio struktūra, tada paslaugų šablonas, tada vietovių šablonas.
5. Po kiekvieno etapo parodyk rezultatą.
