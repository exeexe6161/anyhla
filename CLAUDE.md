# Anyhla Site — Master Prompt

Astro-Foto-Portfolio-Website für die Künstlerin Anyhla. Dieses Dokument ist die zentrale Referenz für alle Arbeiten am Projekt.

## Projekt-Kontext
- Marke: Anyhla (Künstlername / Instagram-Handle)
- Domain: www.anyhla.com
- Stil: hell, editorial, magazin-artig. Cremefarbener Hintergrund, klare Typografie, 3-Spalten-Bildraster.
- Sprache: Deutsch (UI)

## Constraints (kritisch)
1. Keine Markennamen oder Realnamen im Code, in Klassennamen, Kommentaren, Commit-Messages oder Repo-Slugs. Nur "Anyhla" als Wordmark. Bürgerlicher Name nur im Impressum.
2. DSGVO-konform: keine externen Tracker, keine Google-Fonts-CDN, keine Cookies ohne Consent. Alles self-hosted.
3. Schriften self-hosted aus public/fonts/inter/ via @font-face. Inter Variable (woff2) ist bereits da.
4. Generische Klassennamen (.grid, .tile, .header) — keine Inspirations-Kommentare im Code.
5. Vanilla CSS in src/styles/ — kein Tailwind, kein UI-Framework.
6. Bilder optimieren: WebP/AVIF mit Fallback, lazy-loading außer Hero.

## Tech-Stack
- Astro 6.x mit TypeScript Strict
- Vanilla CSS
- Inter Variable (self-hosted) als einzige Schriftfamilie
- Static Site Generation
- Deploy: Vercel (auto-deploy auf Push zu main)

## Phasen-Plan (stoppe nach jeder Phase)

### Phase 1 — Skelett
- 5 Routen: /, /about, /contact, /impressum, /datenschutz
- Layout.astro mit Header (Menu-Button links, Wordmark zentriert aus public/brand/anyhla-wordmark.svg, IG-Icon rechts → /contact) + Footer (Links zu Impressum/Datenschutz, Copyright)
- Home: Hero "Anyhla" + 3-Spalten-Grid mit 6 Bild-Platzhaltern (graue Boxen aspect-ratio 4/5)
- Inter via @font-face einbinden
- Nur Skelett, keine finale Optik. Funktional und navigierbar.

### Phase 2 — Magazin-Styling
- Color-Tokens: --bg-cream #F4F1EA, --bg-soft #ECE7DC, --fg-dark #0E0E0C, --fg-muted #75706A
- Typografie-Skala mit Inter
- 3-Spalten Desktop / 2-Spalten Tablet / 1-Spalte Mobile
- Sanfte Hover-States
- Slide-down Menu-Overlay

### Phase 3 — Instagram
- Meta Graph API, Build-Zeit-Fetch
- Long-lived Token in .env (nicht committen)
- Thumbnails in public/ig/ cachen
- 60-Tage-Token-Refresh dokumentieren

### Phase 4 — Legal
- Impressum: Adresse, Kontakt, Verantwortlich i.S.d. § 18 MStV
- Datenschutz: DSGVO, Vercel-Hosting USA-Datentransfer, Server-Logs, IG-Embeds
- Cookie-Banner nur falls nötig

### Phase 5 — Polish
- Lighthouse-Audit
- Open Graph Meta-Tags (og-image in public/brand/og-image.png)
- Sitemap + robots.txt

## Workflow
- Effort-Level: Default xhigh, max bei Architektur/Debug, medium-high bei UI-Iteration
- Direkt auf main (Single-Developer)
- Commits englisch, präsens, kurz
- Vor Push: npm run build muss fehlerfrei sein

## Branding
- Wordmark "ANYHLA" mit diagonalem Cut oben links am ersten A
- Submark: A in Outline-Quadrat, gleicher Cut
- Beide als SVG mit eingebetteten Pfaden in public/brand/

## Design-Sprache
- Hintergrund: cream (#F4F1EA) oder weiß
- Akzent: Anthrazit (#0E0E0C), Muted-Grau (#75706A)
- Typografie: Inter Variable, Headlines 700-800, Body 400, Captions italic 400 muted
- Großzügiger Whitespace, Bilder dominieren
- Minimale Animationen — höchstens sanftes Fade-in

## Ordnerstruktur (Soll)
- public/brand/ ← Logos + Favicons + OG (vorhanden)
- public/fonts/inter/ ← Inter Variable (vorhanden)
- public/images/ ← eigene Fotos (kommen später)
- src/components/ ← Header, Footer, Grid, Tile, MenuOverlay
- src/layouts/ ← Layout.astro
- src/pages/ ← index, about, contact, impressum, datenschutz
- src/styles/ ← global.css, tokens.css

## Wichtige Befehle
- npm run dev (localhost:4321)
- npm run build
- git save "msg"
- git push
