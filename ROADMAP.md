# ROADMAP — Leoquent / lqnt.de

> Gepflegt vom Business-Agent. Stand: 28.09.2026, geprüft gegen `main` @ `6c5c181`.
> Arbeitsweise: Der Agent arbeitet auf `agent/<thema>`, Leo prüft den Branch, der Merge nach
> `main` ist der Deploy. Nichts geht ohne Freigabe live.
> Regeln und Stand der Technik: **`AGENTS.md`**.

---

## Festgelegte Architektur

- **GitHub Pages liefert die Website aus.** Push auf `main` → Actions → Pages → `lqnt.de`.
  Kostenlos, HTTPS automatisch, läuft bereits. Kein Umzug.
- **Der Hostinger-VPS macht die Prozesse dahinter** — Formular- und Lead-Verarbeitung,
  Vorschau-Umgebungen, spätere Dienste.
- **Previews unter `preview.lqnt.de`** — pro Branch ein eigener Pfad, auf dem VPS gebaut und
  hinter Traefik ausgeliefert. Die Live-Seite bleibt unberührt.
- **Formular-Endpunkt wird selbst gebaut** (entschieden 28.09.2026). Web3Forms wird nicht der
  Dauerzustand. Offen: DNS `api.lqnt.de` und Traefik-Zugang.
- **Lunda-KI entfällt.** Verworfen am 28.09.2026.
- **Ansprache: „ich".** Durchgehend. Firmen-„wir" raus, Partner-„wir" erlaubt.
- **Sprache:** Deutsch. Ton direkt, ohne Agenturfloskeln.

---

## Erledigt

- **Ansprache auf `/prozesse/`** — 24 Stellen von Firmen-„wir" auf „ich" umgestellt, Anker
  `#warum-wir` → `#warum-ich` mitgezogen. Live verifiziert.
- **Entwurfsrouten entfernt** — `/entwurf/filmisch` und `/entwurf/interaktiv` geben jetzt
  HTTP 404. Sie waren schon auf `noindex`; jetzt sind sie ganz weg.
- **Funnel-Fehler behoben** — ohne Key wird nicht mehr ins Leere gesendet, der Ausweichweg mit
  Mail und Telefon erscheint sofort. Workflow-Zeile aktiviert.
- **`AGENTS.md` auf den echten Stand gebracht** — ersetzt die Fassung vom 14.08.2026.
- **`ROADMAP.md` angelegt** — diese Liste.
- **Deploy-Key** für `Leoquent/lqnt` eingetragen, Push verifiziert.
- **Schrift** Outfit ist eingebaut. **Deploy** auf `lqnt.de` steht.

---

## Status — verifiziert am 28.09.2026

| Punkt | Befund |
|---|---|
| Deploy | `main` → Actions → GitHub Pages → `lqnt.de`. `public/CNAME` = `lqnt.de` |
| Routen | 7 Seiten: `/`, `/webdesign`, `/prozesse`, `/impressum`, `/datenschutz`, `/demo-video`, `/404` |
| Quiz | nur auf `/prozesse/`. Sendet derzeit nichts automatisch; Ausweichweg greift sofort |
| Kontaktwege | kein `<form>` im Quelltext; 8 × `mailto:`, 4 × `tel:` |
| Sitemap | listet nur `/`; Rückfallwert in `app/sitemap.ts` ist noch `https://leoquent.github.io` |
| Altlasten | `addequat` 75 Fundstellen in 34 Dateien, `Admir` 40 in 13 — **0** in `app/`, `components/`, `lib/`, `public/` |
| `design-system/` + `.design-sync/` | 43 Dateien, Paketname `leoquent-addequat-brand`, Profilkarte „Admir" — **hängt nicht am Build** |
| `graphify-out/` | veraltet (gebaut aus `2a3b3936`), trägt den Großteil der Altlasten |
| `CLAUDE.md` | 250 Zeilen, abweichender alter Stand — Claude Code liest sie automatisch |
| Standard-Branch | steht auf `codex/leoquent-webdesign`, gehört auf `main` |
| Tote Abhängigkeiten | `nodemailer`, `@types/nodemailer` |

---

## P0 — kostet Geld

- [ ] **Formular-Endpunkt bauen.** Eigene Anwendung auf dem VPS: nimmt die Quiz-Antworten an,
      prüft, speichert, schickt eine Mail an `hi@lqnt.de`. Ersetzt Web3Forms.
      *Braucht von dir: DNS-Eintrag `api` und Traefik-Zugang.*
- [ ] **Postfach `hi@lqnt.de` prüfen** — existiert es, kommt dort Post an, liest es jemand?
      *Braucht von dir: Postfach in hPanel und das Passwort in der Instanz.*
- [ ] **Impressum: USt-IdNr** eintragen, sobald erteilt.

## P1 — Auffindbarkeit und Ordnung

- [ ] **Sitemap vervollständigen** — alle Routen eintragen, Rückfallwert auf `lqnt.de` ändern.
- [ ] **Zusagen prüfen.** „garantierter ROI", „Performance Pricing", „keine Kompromisse",
      „Keine Standard-Agentur" — inhaltlich und rechtlich belastbar?
- [ ] **`design-system/` und `.design-sync/`** — entfernen oder umbenennen. Hängt nicht am
      Build, trägt aber den alten Namen und eine Admir-Karte.
- [ ] **`CLAUDE.md`** — auf `AGENTS.md` verweisen oder entfernen. Sonst liest Claude Code den
      alten Stand.
- [ ] **Standard-Branch auf `main`** umstellen. *Dein Klick: Settings → General → Default branch.*
- [ ] **Eigenes Formular** als zweiter Weg neben dem Quiz — für Besucher ohne Mailprogramm.
- [ ] **Preview-Umgebung bauen** (`preview.lqnt.de`). *Braucht DNS und Traefik-Zugang.*
- [ ] **Alte Dokumente aufräumen** — 11 historische Dateien im Wurzelverzeichnis einordnen oder
      nach `docs/archiv/` verschieben. Einordnung steht in `AGENTS.md` Abschnitt 8.

## P2 — Wachstum

- [ ] Referenzen erweitern — welche Projekte dürfen gezeigt werden?
- [ ] JSON-LD `ProfessionalService` + `FAQPage`
- [ ] Telefonnummer in Header und Footer sichtbar
- [ ] Preisanker auf `/webdesign/` direkt verlinkbar machen

## P3 — Technisches Aufräumen

- [ ] `nodemailer` und `@types/nodemailer` aus `package.json` entfernen
- [ ] hardcodierte Hex-Werte durch Tokens ersetzen
- [ ] verwaistes `public/og-image.png`
- [ ] `graphify-out/` neu erzeugen oder entfernen
- [ ] Design-Durchgang (Leo, später): einheitliche Linie zwischen `/`, `/webdesign/`, `/prozesse/`

---

## Einrichtung auf deiner Seite — konkret

### 1. Lead-Endpunkt auf dem VPS

1. Hostinger **DNS → A-Record** `api` → `187.124.181.132`.
2. Zugang zur Traefik-Konfiguration auf dem VPS bereitstellen (Compose-Datei und dynamische
   Konfiguration). Ohne das wird nicht geraten.
3. Danach baut der Agent den Endpunkt, testet ihn und stellt das Quiz darauf um.

### 2. Postfach

Hostinger **hPanel → E-Mails** prüfen, ob `hi@lqnt.de` existiert. Für die E-Mail-Assistenz
braucht es IMAP: Server `imap.hostinger.com:993`, Postfach-Passwort (nicht das hPanel-Login).
Das Passwort kommt nicht durch den Chat, sondern in die Datei in der Instanz.

### 3. Previews (`preview.lqnt.de`)

1. Hostinger **DNS → A-Record** `preview` → `187.124.181.132`.
2. Zugang zur Traefik-Konfiguration bereitstellen.
3. Der Agent baut je Branch eine Vorschau unter `preview.lqnt.de/<branch>`.

---

## Was nur Leo klären kann

- **Referenzen:** welche bisherigen Projekte dürfen gezeigt werden?
- **Nische:** bleibt offen oder festlegen?
- **USt-IdNr:** sobald erteilt.
- **`design-system/` und `.design-sync/`:** entfernen oder umbenennen?
- **`CLAUDE.md`:** verweisen oder entfernen?
- **Zugänge:** DNS, Traefik/SSH zum VPS, Mail-Postfach.
- **Trennungsvereinbarung** mit Admir, inklusive `leoquent.de` und Postfach `lunda-ki.de`.