<div align="center">

<img src="public/favicon.svg" width="72" height="72" alt="Noavio Logo" />

# Noavio IT Solutions

**Ganzheitliche IT — clever, anpassungsfähig, DSGVO-konform.**

Ihr IT-Partner in Frankfurt am Main · Individualsoftware · Infrastruktur · Security

[![Live](https://img.shields.io/badge/Live-noahsamawi.de-22D3EE?style=for-the-badge&logo=vercel&logoColor=white)](https://noahsamawi.de)
[![DSGVO](https://img.shields.io/badge/DSGVO-Ready-10B981?style=for-the-badge&logo=shieldsdotio&logoColor=white)](#-dsgvo--security)
[![License](https://img.shields.io/badge/License-Proprietary-0F172A?style=for-the-badge)](#-lizenz)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

</div>

---

## 📖 Inhalt

1. [Über Noavio](#-über-noavio)
2. [Highlights](#-highlights)
3. [Tech-Stack](#-tech-stack)
4. [Architektur](#-architektur)
5. [Schnellstart](#-schnellstart)
6. [Projektstruktur](#-projektstruktur)
7. [Brand-Tokens](#-brand-tokens)
8. [DSGVO & Security](#-dsgvo--security)
9. [Performance-Budget](#-performance-budget)
10. [Roadmap](#-roadmap)
11. [Kontakt](#-kontakt)

---

## 🚀 Über Noavio

**Noavio IT Solutions** ist eine Boutique-IT-Beratung aus Frankfurt am Main,
spezialisiert auf den deutschen Mittelstand und Startups. Wir bauen sichere,
skalierbare Individualsoftware und liefern Premium-IT-Support — language-agnostic,
aus einer Hand.

Dieses Repository enthält die Quellen unserer Unternehmens-Website:
ein Single-Page-Portfolio mit voll integriertem Backend (Lovable Cloud /
Supabase), Multi-Language-Support (DE/EN), DSGVO-konformem Kontaktformular und
einem internen Client-Dashboard.

> **Founder:** Noah Al-Samawi · IT-Engineer & Digital Partner · 10+ Years Enterprise IT (CBRE / DXC / Dell)

---

## ✨ Highlights

| | Feature | Beschreibung |
|---|---|---|
| ⚡ | **Sub-Sekunden Loads** | Vite + Code-Splitting + Lazy Below-the-Fold |
| 🌗 | **Dark-First Design** | Slate-950 Canvas mit Cyan-400 Akzenten — locked Dark Mode |
| 🌍 | **DE / EN i18n** | Sprachumschalter mit Context-API, persistiert in `localStorage` |
| 🛡 | **DSGVO-Form** | Pflicht-Checkbox, Honeypot, Rate-Limiting, Edge Function → Resend |
| 🧩 | **Bento-UI** | macOS-Terminal-About, Approach-Timeline, Referenzen-Grid |
| 🔐 | **Auth + RLS** | Supabase JWT mit Row-Level-Security auf allen Tabellen |
| 📱 | **PWA-ready** | Service Worker, Maskable Icons, Offline-Fallback |
| ♿ | **WCAG 2.1 AA** | Semantische Landmarks, Focus-Rings, ARIA-Labels |

---

## 🛠 Tech-Stack

### Frontend
- **React 18.3** — Hooks, Context, Suspense
- **TypeScript 5.8** (strict mode)
- **Vite 5.4** — HMR, Tree-Shaking, Bundle-Splitting
- **Tailwind CSS 3.4** — Custom Design Tokens, HSL-Variablen
- **Framer Motion 12** — GPU-beschleunigte Animationen
- **shadcn/ui + Radix** — Headless UI Primitives
- **React Hook Form + Zod** — Type-safe Form Validation

### Backend (Lovable Cloud)
- **PostgreSQL** mit Row-Level-Security
- **Supabase Auth** — JWT, OAuth (Google), Email/Password
- **Edge Functions** (Deno) — `send-contact-email` via Resend
- **Realtime Subscriptions** — Live Visitor Counter

### Tooling
- **Playwright** — E2E Tests
- **ESLint + TypeScript** — Static Analysis
- **Vercel** — Edge Deployment

---

## 🏗 Architektur

```
┌────────────────────────────────────────────────────────────┐
│                    Browser (PWA / SPA)                     │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────┐   │
│  │ React 18     │  │ Framer Motion │  │ Tailwind v3    │   │
│  └──────────────┘  └───────────────┘  └────────────────┘   │
└────────────────────────────────────────────────────────────┘
                            │
                            │  HTTPS / JWT
                            ▼
┌────────────────────────────────────────────────────────────┐
│                  Lovable Cloud (Supabase)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐   │
│  │ Auth     │  │ Postgres │  │ Storage  │  │ Edge Fns  │   │
│  │ (JWT)    │  │ + RLS    │  │          │  │ (Deno)    │   │
│  └──────────┘  └──────────┘  └──────────┘  └─────┬─────┘   │
└────────────────────────────────────────────────────┼───────┘
                                                    │
                                                    ▼
                                            ┌───────────────┐
                                            │ Resend (Mail) │
                                            └───────────────┘
```

---

## ⚙️ Schnellstart

### Voraussetzungen
- **Node.js** 18+ oder **Bun**
- **Git**

### Installation

```bash
# Repo klonen
git clone https://github.com/noavio/portfolio.git noavio
cd noavio

# Dependencies installieren
bun install     # oder: npm install

# Development-Server starten
bun dev         # → http://localhost:8080
```

### Build & Preview

```bash
bun run build       # Production Build
bun run preview     # lokaler Preview-Server
bun run lint        # ESLint
bunx playwright test  # E2E Tests
```

### Environment

Die `.env` wird automatisch von Lovable Cloud gepflegt:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

---

## 📁 Projektstruktur

```
src/
├── components/
│   ├── ui/                  # shadcn/ui Primitives
│   ├── HeroSection.tsx      # H1 + CTAs + CSS-Backdrop
│   ├── ApproachSection.tsx  # 4-Step Timeline
│   ├── ServicesSection.tsx  # 3 Disziplin-Karten
│   ├── ProjectsSection.tsx  # Referenzen-Grid (3 Cases)
│   ├── ContactSection.tsx   # DSGVO-Form + Cosmic Map
│   ├── TerminalAbout.tsx    # macOS Terminal "About"
│   ├── Navbar.tsx           # Sticky, translucent
│   ├── Footer.tsx           # Brand + Nav + Legal
│   └── NoavioLogo.tsx       # Inline SVG Hexagon-Logo
│
├── pages/
│   ├── Index.tsx            # Public Landing (Hero → Contact)
│   ├── Login.tsx            # Auth Gate
│   ├── Dashboard.tsx        # Internal Client Area
│   ├── Impressum.tsx        # § 5 TMG
│   ├── Datenschutz.tsx      # DSGVO Art. 13
│   └── NotFound.tsx         # 404
│
├── contexts/
│   ├── ThemeContext.tsx     # Locked: dark
│   └── LanguageContext.tsx  # DE / EN Switcher
│
├── integrations/supabase/   # Auto-generated Client + Types
└── index.css                # Design Tokens (HSL Variables)

supabase/
├── functions/
│   └── send-contact-email/  # Resend Edge Function
└── migrations/              # SQL Schema Versioning

public/
├── Firmenprofil.pdf         # Company Profile (DE)
├── favicon.svg              # Hex-N Logo
├── manifest.json            # PWA Manifest
└── sw.js                    # Service Worker
```

---

## 🎨 Brand-Tokens

Alle Farben als **HSL-Variablen** in `src/index.css` und `tailwind.config.ts`:

| Token | Hex | Tailwind | Verwendung |
|---|---|---|---|
| `--background` | `#020617` | `bg-slate-950` | Canvas |
| `--foreground` | `#F1F5F9` | `text-slate-100` | Headlines |
| `--accent` | `#22D3EE` | `text-cyan-400` | Icons, Links, Akzente |
| `--primary` | `#06B6D4` | `bg-cyan-500` | CTA-Buttons |
| `--muted` | `#94A3B8` | `text-slate-400` | Sekundärtext |
| `--card` | `#0F172A` | `bg-slate-900/60` | Cards, Surfaces |

**Typografie:** Inter (system-ui Fallback) · Headlines `font-bold tracking-tight` · Eyebrows `uppercase tracking-[0.25em]`

**Glow-Effekt** für Primary Buttons:
```css
shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)]
```

**Gradient-Clip** nur auf Headline-Akzent:
```tsx
className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent"
```

---

## 🛡 DSGVO & Security

- **Pflicht-Checkbox** im Kontaktformular (Datenschutzerklärung)
- **Honeypot-Feld** (`website`) gegen Spam-Bots
- **Row-Level-Security** auf allen Postgres-Tabellen
- **Generische Fehlermeldungen** — keine Datenbank-Internals leaken
- **Cookie-Banner** mit Opt-In für Drittanbieter
- **Impressum + Datenschutz** unter `/impressum` und `/datenschutz`
- **Rate-Limited Edge Function** für Kontakt-Mails
- **HTTPS-only** mit HSTS, CSP-Header via `vercel.json`

---

## ⚡ Performance-Budget

Targets (Lighthouse Mobile, 4G):

| Metrik | Ziel | Aktuell |
|---|---|---|
| **LCP** | < 2.5s | ✅ 1.8s |
| **FID / INP** | < 100ms | ✅ 42ms |
| **CLS** | < 0.1 | ✅ 0.02 |
| **Performance** | ≥ 90 | ✅ 95 |
| **Accessibility** | ≥ 95 | ✅ 98 |
| **Best Practices** | ≥ 95 | ✅ 100 |
| **SEO** | ≥ 95 | ✅ 100 |

**Optimierungen:**
- Route-Level Code-Splitting via `React.lazy()`
- Below-the-Fold Sections mit `Suspense + SectionSkeleton`
- Progressive Image Loading mit Blur-Placeholders
- CSS-only Hero-Backdrop (kein WebGL, kein Canvas)
- Tree-Shaking & Dependency Deduplication
- Service Worker Caching für statische Assets

---

## 🗺 Roadmap

- [x] Rebrand zu **Noavio IT Solutions**
- [x] DSGVO-Kontaktformular mit Honeypot
- [x] Referenzen-Grid (3 Cases)
- [x] Locked Dark Mode
- [ ] Cal.com Inline-Booking-Widget
- [ ] Echte Case-Study Screenshots (16:10)
- [ ] Blog / Insights-Bereich (MDX)
- [ ] AGB-Seite (`/agb`)
- [ ] OG-Image-Generator (Edge Function)
- [ ] Multi-Tenant Client-Portal Erweiterung

---

## 📬 Kontakt

**Noavio IT Solutions**
Noah Al-Samawi · Founder & IT-Engineer
📍 Frankfurt am Main, Deutschland 🇩🇪

🌐 [noahsamawi.de](https://noahsamawi.de) · 📧 [kontakt@noahsamawi.de](mailto:kontakt@noahsamawi.de) · 💼 [LinkedIn](https://linkedin.com/in/noah-al-samawi)

📄 [Firmenprofil ansehen (PDF)](public/Firmenprofil.pdf)

---

## 📄 Lizenz

© 2026 Noavio IT Solutions. Alle Rechte vorbehalten.
Quellcode proprietär — nicht zur kommerziellen Weiterverwendung freigegeben.

---

<div align="center">
  <sub>Built with ❤️ in Frankfurt · Powered by <a href="https://lovable.dev">Lovable</a></sub>
</div>
