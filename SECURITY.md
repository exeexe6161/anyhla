# anyhla.com Security Checklist

## Implementiert (Code-Ebene)
- HTTP Security Headers via vercel.json
- Content-Security-Policy (strict, eigene Domain only, object-src 'none')
- HSTS für 2 Jahre + preload
- AI-Bot-Blocking via robots.txt (19 Bots blockiert)
- Sitemap mit hreflang-Tags (DE/EN)
- Cross-Origin-Opener-Policy: same-origin

## Test-Ergebnisse (Stand 7. Mai 2026)
- securityheaders.com: A (Grade capped at A wegen 'unsafe-inline' für Astro Hydration)
- observatory.mozilla.org: B+ (80/100, 9/10 Tests bestanden)
- Browser-Console: keine CSP-Violations

## Manuell zu prüfen / pflegen

### Vercel Dashboard
- [ ] Vercel Analytics-Settings — bewusst entscheiden ob aktiv (aktuell aus)
- [ ] Domain Settings → SSL erzwungen (sollte automatisch sein)
- [ ] Deployment Protection für Preview-Environments aktiv
- [ ] Falls Pro-Plan: Vercel Firewall + Custom Rules erwägen

### Domain-Registrar (United-Domains)
- [ ] 2FA für Account aktiviert
- [ ] Domain-Lock aktiviert (verhindert Transfer)
- [ ] WHOIS-Privacy aktiv
- [ ] DNSSEC wenn möglich
- [ ] E-Mail-Weiterleitung info@anyhla.com → privates Postfach geprüft

### Account-2FA
- [ ] GitHub: 2FA aktiviert
- [ ] Vercel: 2FA aktiviert
- [ ] United-Domains: 2FA aktiviert
- [ ] Anjas IG-Account: 2FA aktiviert (wichtig vor Token-Ausstellung)

## Pre-Commit-Hook installiert
.git/hooks/pre-commit blockiert versehentliches Committen von:
- Realname (Anja Gür-Pattern)
- @gmail.com, @web.de, @gmx (private E-Mail-Adressen)
- API-Tokens (Stripe, Meta, OAuth — sk_live_, EAAG, IGQVJ Prefixe)

Bei Impressum-Änderungen muss --no-verify genutzt werden.

## Bekannte Trade-offs / TODOs

### CSP wird in Phase 3 (IG-Integration) erweitert
Bei Anbindung an Instagram Graph API erweitert sich die CSP um:
- img-src https://*.cdninstagram.com https://*.fbcdn.net (für IG-Thumbnails)
- ODER: alle Bilder lokal cachen → CSP bleibt strict

Empfehlung: Bilder lokal cachen (siehe TODO unten).

### TODO: Instagram-Bilder lokal cachen
Aktuell Plan: Build-Time-Fetch von IG-Posts → Bilder lokal speichern in 
public/ig/. Vorteile:
- CSP bleibt strict (keine externen Bild-Domains)
- Performance: Vercel CDN statt Instagram CDN
- DSGVO: keine Drittland-Datenübertragung beim Bilder-Aufruf
- Resilient gegen IG-URL-Rotation

Implementierung: separates Sync-Skript in scripts/sync-instagram.mjs,
ausgeführt zu Build-Zeit auf Vercel.

### TODO: Bild-Schutz auf Foto-Tiles
Wenn echte IG-Bilder da sind (Phase 3):
- CSS-Klasse .photo-protected mit user-select: none, draggable=false
- oncontextmenu="return false" auf <img>-Tags
- NUR auf Foto-Tiles, nicht global

### TODO: EXIF-Daten in Fotos
Vor IG-Upload Anja sollte mit exiftool Copyright setzen:
exiftool -Copyright="© Anyhla 2026" -Artist="Anyhla" *.jpg

### TODO: Watermark erwägen
Dezenter "© Anyhla" Schriftzug unten rechts auf jedem Portfolio-Foto
schreckt mehr ab als jeder Code-Schutz.

### TODO: Vercel Firewall (Pro-Plan)
Falls Hobby-Plan zu wenig wird:
- Pro-Plan: Custom Firewall Rules
- Bot-Pattern blocken auf User-Agent-Ebene
- Rate-Limiting

## Bekannt: AI-Blocking ist nicht rechtsverbindlich
robots.txt ist eine höfliche Bitte. Anthropic, OpenAI, Google halten 
sich tendenziell dran. Andere ignorieren es. Echte Blockade nur durch 
Cloudflare oder rechtliche Schritte möglich.

## Bekannt: HSTS ist 2 Jahre bindend
Wenn Browser den HSTS-Header sieht, erzwingt er HTTPS für 2 Jahre. 
Falls anyhla.com je auf HTTP zurück müsste, wären User mit gecachtem 
HSTS gesperrt. Bei seriöser Domain kein Problem.

## Empfehlungen für später

### Bei Spam-Anfragen über Kontakt-Formular
Cloudflare Turnstile oder hCaptcha einbauen (DSGVO-konform beide), 
Honeypot-Field als Bot-Filter.

### HSTS Preload Submission
Nach 6 Monaten stabilem Live-Betrieb: Domain auf hstspreload.org 
einreichen für Browser-Default-HTTPS.
