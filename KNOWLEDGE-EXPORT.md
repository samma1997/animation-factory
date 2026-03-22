# SAMMA Factory — Knowledge Export Completo
> Documento da dare a Claude nella prossima chat per riprendere con tutto il contesto.
> Data: 2026-03-22

---

## 1. CHI È LUCA SAMMARCO

- **Titolo:** Digital Product Builder / Creative Developer
- **Sito attuale:** lucasammarco.com (WordPress + Elementor — da rifare completamente)
- **Non è più:** un "web designer" che fa siti statici
- **È:** qualcuno che costruisce prodotti digitali completi (SaaS, app, piattaforme, siti animati)
- **Target clienti:** Startup pre-seed/seed, SaaS founders, agenzie premium (8-25K€ per progetto)
- **Preferenze comunicazione:** italiano, autonomia completa, no stime di tempo, no conferme — vai e fai

---

## 2. IL PROGETTO: SAMMA FACTORY

### Cos'è
Una piattaforma/engine per creare siti web premium con animazioni avanzate, replicabile per clienti diversi. Il primo sito sarà lucasammarco.com.

### Tre livelli
1. **La Piattaforma** — engine con animazioni, design system, SEO, blocchi riutilizzabili
2. **lucasammarco.com** — primo caso d'uso (DA FARE — è l'obiettivo finale)
3. **Sistema Esportabile** — blocchi portabili tra progetti (SAMMA ↔ ABTG)

### Repository e URL
- **Repo:** https://github.com/samma1997/animation-factory
- **Dashboard live:** https://samma1997.github.io/animation-factory/admin/
- **Directory locale:** `~/Projects/animation-factory/`
- **Test horizontal scroll:** https://samma1997.github.io/animation-factory/test-horizontal/
- **Test stacking cards:** https://samma1997.github.io/animation-factory/test-stacking/

### Progetto parallelo (per ABTG - Alfio Bardolla)
- **Repo:** https://github.com/samma1997/ab-landing-system
- **Dashboard:** https://samma1997.github.io/ab-landing-system/admin
- **Directory locale:** `~/Projects/ab-landing-system-ref/`
- Sono DUE progetti separati, indipendenti

---

## 3. STATO ATTUALE DELLA PIATTAFORMA

### Tech Stack
- Next.js 16+ (App Router, static export)
- TypeScript
- Tailwind CSS v4 con `@theme inline` e CSS variables
- GSAP 3.14+ + ScrollTrigger (animazioni)
- Framer Motion (presente ma da eliminare in futuro — consolidare su solo GSAP)
- Lenis (smooth scroll)
- Lucide React (icone)
- Deploy: GitHub Pages con GitHub Actions

### Struttura file
```
animation-factory/
├── src/
│   ├── app/
│   │   ├── globals.css          ← Brand tokens CSS variables
│   │   ├── layout.tsx           ← Instrument Sans + Inter fonts
│   │   ├── page.tsx             ← Splash page
│   │   ├── icon.svg             ← Favicon (logo LS)
│   │   ├── admin/
│   │   │   ├── layout.tsx       ← Dark theme wrapper
│   │   │   └── page.tsx         ← Dashboard SPA (tutto in un file)
│   │   ├── test-horizontal/     ← Demo horizontal scroll cards
│   │   ├── test-stacking/       ← Demo stacking cards
│   │   └── _slug_disabled/      ← Route dinamica (disabilitata, 0 pagine)
│   ├── components/
│   │   ├── blocks-library/      ← 14 blocchi riutilizzabili
│   │   ├── blocks/              ← Blocchi specifici per landing
│   │   ├── conversion/          ← Widget (StickyCtaBar, CountdownBanner, etc.)
│   │   ├── ui/                  ← Primitivi (Button, SectionHeading, SectionWrapper)
│   │   └── SmoothScrollProvider.tsx
│   ├── lib/
│   │   ├── animations.ts        ← 14 animazioni GSAP
│   │   ├── BlockRenderer.tsx    ← Mappa type → componente
│   │   ├── templates.ts         ← Template vuoti (da riempire)
│   │   └── page-registry.ts     ← Tipi e helpers pagine
│   ├── types/
│   │   └── blocks.ts            ← Union types blocchi
│   └── content/
│       └── pages/registry.json  ← Registro pagine (vuoto)
├── .github/workflows/deploy.yml ← Auto-deploy su push
└── next.config.ts               ← output: export, basePath: /animation-factory
```

### Dashboard Admin
- **Sempre dark mode** (con toggle light disponibile)
- **Colore accent:** Viola `#7C3AED`
- **Logo:** SVG reale di Luca (monogramma LS geometrico) — file in `/Downloads/Subtract.svg`
- **Favicon:** Logo LS su sfondo slate `#0F172A`
- **Logo cliccabile:** riporta alla Dashboard

### Tab della Dashboard
1. **Dashboard** — 3 stat cards (Pagine Live, Pagine Totali, Ultimo Deploy) + tabella pagine
2. **Pagine** — tabella con stato, categoria, data, route, azioni (vuota — 0 pagine)
3. **Blocchi** — griglia filtrabile per categoria + sistema Export/Import integrato
4. **Preview** — iframe preview desktop/mobile
5. **Banca Immagini** — 3 cartelle: Portfolio, Brand Assets, Sfondi

### 14 Blocchi disponibili
Hero Split, Hero Center, Logo Ticker, Checklist Section, Comparison Table, Numbered Phases, Pillar Cards, Speaker Cards, Urgency Section, Form Section, CTA Divider, Horizontal Scroll Cards, Stacking Cards, Footer SAMMA

### 14 Animazioni GSAP (`lib/animations.ts`)
fadeUp, fadeIn, slideInLeft, slideInRight, scaleUp, clipReveal, scrollFadeUp, scrollStagger, scrollCounter, magneticHover, buttonHoverFill, textRevealLines, typewriter, scrollMarquee, horizontalScrollPin, createAnimContext

### Sistema Export/Import Blocchi
- Nel tab Blocchi: checkbox per selezionare blocchi → Esporta come JSON
- Il JSON include: metadata blocchi + animazioni
- Importa: carica JSON da un altro progetto
- I blocchi usano CSS variables → si adattano automaticamente al brand target

---

## 4. BRAND IDENTITY (DECISO MA NON ANCORA IMPLEMENTATO NEI BLOCCHI)

### Palette "Tech Forward" (proposta accettata)
| Token | Colore | Uso |
|-------|--------|-----|
| Primary | `#0F172A` | Sfondo hero, navbar, footer |
| Secondary | `#3B82F6` | Link, hover, icone |
| Accent | `#EC4899` | CTA, highlight |
| Surface | `#F8FAFC` | Card, sezioni alternate |
| Dark | `#1E293B` | Sezioni dark |
| Muted | `#64748B` | Testo secondario |
| Admin accent | `#7C3AED` | Dashboard viola |

### Font (implementati)
- **Heading:** Instrument Sans
- **Body:** Inter
- **Code:** JetBrains Mono (da aggiungere se serve)

### Posizionamento
- **Headline:** "Non faccio siti. Codifico visioni."
- **Tono:** Curioso, preciso, ambizioso — mai corporate, mai casual

---

## 5. INTEGRAZIONE RAINDROP.IO

### Configurazione
- **Token:** `8bc96b1a-2643-4017-bc88-02fd4ddff55c`
- **App Name:** SammaScrape
- **Collection "SAMMA Scrape" ID:** `68746862`

### API
```bash
# Lista cartelle
curl -H "Authorization: Bearer 8bc96b1a-2643-4017-bc88-02fd4ddff55c" "https://api.raindrop.io/rest/v1/collections"

# Lista bookmark nella cartella SAMMA Scrape
curl -H "Authorization: Bearer 8bc96b1a-2643-4017-bc88-02fd4ddff55c" "https://api.raindrop.io/rest/v1/raindrops/68746862"
```

### Workflow Scraping
1. Luca salva siti su Raindrop nella cartella "SAMMA Scrape" con note su cosa gli piace
2. Dice "vai scrapa"
3. Claude legge i bookmark via API
4. Per ogni sito: scrapa, trova TUTTE le animazioni, fa una lista numerata
5. Luca sceglie: "voglio la 2, 5 e 7"
6. Claude le implementa e le aggiunge alla piattaforma

---

## 6. ANALISI TECNICA GIÀ FATTA (Miglioramenti da implementare)

### Performance (priorità)
- Drop Framer Motion → -57.7 KB
- Immagini AVIF via sharp → hero da 400KB a 60KB
- next/font subset → font da 350KB a 27KB
- Server Components per blocchi statici → -40% bundle
- Target: PageSpeed 85-95, LCP < 1.8s

### Architettura
- Separare blocchi Server vs Client nel BlockRenderer
- Image loader Cloudinary o sharp pre-build
- `generateStaticParams` + `generateMetadata` completi
- Sitemap + Robots + Structured Data automatici

### SEO
- Sistema completo progettato: `PageSEOConfig`, `StructuredData`, `BreadcrumbSchema`, `FAQSchema`
- SEO Scoring system (0-100) per la dashboard
- Tutto pronto come TypeScript — da implementare

### CI/CD
- Pipeline: ESLint → TypeScript → Test → Bundle Size → Lighthouse CI → Deploy
- Preview URL per PR (Vercel)
- Multi-brand deploy con matrix strategy
- Rollback via tag git

---

## 7. STRUTTURA SITO lucasammarco.com (DA COSTRUIRE)

```
1. HERO — "Non faccio siti. Codifico visioni." + animazioni premium
2. FEATURED WORK — 2 case study live
3. HOW I WORK — Discovery → Design+Code → Launch+Iterate
4. WHAT I BUILD — Landing animate, SaaS, Interactive experiences, Brand websites
5. CASE STUDIES — 2-3 con metrics
6. WHY HIRE ME — 3 differenziatori
7. TECH STACK — credibilità tecnica
8. TESTIMONIALS — (se disponibili)
9. ABOUT — 2 paragrafi essenziali
10. CTA FINALE — form contatto
11. FOOTER
```

---

## 8. PROSSIMI PASSI (in ordine)

1. **Scraping animazioni** — Luca riempie Raindrop, poi scraping + implementazione
2. **Definire brand/colori/font definitivi** — prove con referenze
3. **Costruire lucasammarco.com** — primo sito sulla piattaforma
4. **Ottimizzazioni performance** — drop Framer Motion, AVIF, etc.
5. **SEO system** — implementare i componenti già progettati
6. **CI/CD pipeline** — quality gates

---

## 9. COME USARE QUESTO DOCUMENTO

Nella nuova chat, incolla questo messaggio:

```
Leggi questo file e usalo come contesto completo per continuare il lavoro:
/Users/lucasammarco/Projects/animation-factory/KNOWLEDGE-EXPORT.md
```

Oppure se sei su un altro PC, copia il file nella stessa path relativa al progetto e dillo a Claude.
