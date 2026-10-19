# ROADMAP — Leoquent / lqnt.de

> Gepflegt vom Business-Agent. Stand: 19.10.2026, geprüft gegen `main` @ `e21b7e7`.
> Arbeitsweise: Der Agent arbeitet auf `agent/<thema>`, Leo prüft den Branch, der Merge nach
> `main` ist der Deploy. Nichts geht ohne Freigabe live.
> Regeln und Stand der Technik: **`AGENTS.md`**.

---

## Festgelegte Architektur

- **Der VPS liefert die Website aus.** Ein nginx-Container je Zweig unter `/docker/lqnt-web/`,
  davor Traefik mit Let's-Encrypt-Zertifikat. GitHub ist Quelle, nicht Auslieferung: Actions
  baut, die Zweige `site` und `live` werden auf dem VPS im Minutentakt abgeholt. Kein Zugang
  von außen nötig — beide Zweige sind öffentlich lesbar.
- **Der Hostinger-VPS macht die Prozesse dahinter** — Formular- und Lead-Verarbeitung
  (`lqnt-api`), Vorschau, weitere Dienste.
- **Vorschau unter `vorschau.lqnt.de`** — Zweig `site`, nach jedem Push auf `main`
  automatisch. Veröffentlicht wird `lqnt.de` aus dem Zweig `live`, erst nach Freigabe im
  GitHub-Environment `production`. `preview.lqnt.de` gibt es nicht.
- **Formular-Endpunkt läuft** — `https://api.lqnt.de`, Container `lqnt-api`. Seit 19.10.2026
  versendet er über den Google-Workspace-SMTP-Relay. Aufbau und Betriebsregeln:
  `AGENTS.md` Abschnitt 6.
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
- **Vorschau-Umgebung** — `vorschau.lqnt.de` läuft, Zweig `site`, automatisch nach jedem Push.
- **Lead-Endpunkt in Betrieb** — `api.lqnt.de` hinter Traefik, Registry `kunden.json` mit
  `lqnt` und `gebruederross`, Ablage unter `/data/leads/`, Backup und 12-Monats-Löschfrist per
  Cron. Beide Quizze senden dorthin, live getestet.
- **Mailversand auf Google Workspace umgestellt** (19.10.2026) — `smtp-relay.gmail.com:587`,
  STARTTLS, ohne Anmeldung; Absender `noreply@lqnt.de`, `Reply-To` auf den Interessenten.
- **Honeypot korrigiert** (19.10.2026) — das Feld hieß `firma` und hätte echte „Firma"-Felder
  stillschweigend verschluckt. Jetzt `botcheck`.
- **Schlusszeilen der Mail** (19.10.2026) — Herkunft kundenspezifisch („Automatisch erzeugt
  über das Kontaktformular auf <domain>.") plus Hinweis, an wen eine Antwort geht.
- **Dokumentation nachgezogen** (19.10.2026) — `AGENTS.md` Abschnitte 5, 6, 10, 12 und diese Liste.

---

## Status — verifiziert am 28.09.2026

| Punkt | Befund |
|---|---|
| Deploy | `main` → Actions → Zweige `site`/`live` → VPS (nginx je Zweig hinter Traefik) → `vorschau.lqnt.de` / `lqnt.de` |
| Routen | 10 Seiten: `/`, `/webdesign`, `/webdesign/seo-und-ki-suche`, `/prozesse`, `/referenzen/gebrueder-ross`, `/referenzen/ruempelross`, `/impressum`, `/datenschutz`, `/demo-video`, `/404` |
| Quiz | auf `/prozesse/` (Potenzialanalyse) **und** `/webdesign/` (Projekt besprechen); beide senden an `api.lqnt.de` |
| Kontaktwege | kein `<form>` im Quelltext; 11 × `mailto:`, 4 × `tel:`, dazu die beiden Quizze |
| Sitemap | listet sechs Routen auf `lqnt.de` (Rechtsseiten, `demo-video`, `404` bewusst ausgenommen) |
| Altlasten | `addequat` 75 Fundstellen in 34 Dateien, `Admir` 40 in 13 — **0** in `app/`, `components/`, `lib/`, `public/` |
| `design-system/` + `.design-sync/` | 43 Dateien, Paketname `leoquent-addequat-brand`, Profilkarte „Admir" — **hängt nicht am Build** |
| `graphify-out/` | veraltet (gebaut aus `2a3b3936`), trägt den Großteil der Altlasten |
| `CLAUDE.md` | 250 Zeilen, abweichender alter Stand — Claude Code liest sie automatisch |
| Standard-Branch | steht auf `codex/leoquent-webdesign`, gehört auf `main` |
| Tote Abhängigkeiten | `nodemailer`, `@types/nodemailer` |

---

## P0 — kostet Geld

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

### 1. Lead-Endpunkt auf dem VPS — erledigt

Der DNS-Eintrag `api` zeigt auf den VPS, der Dienst läuft hinter Traefik, beide Quizze senden
dorthin. Offen bleibt nur der Betrieb: **ändert sich die IPv4 des VPS, muss sie im
Google-Workspace-SMTP-Relay nachgezogen werden** — sonst kommt keine Mail mehr durch
(`AGENTS.md` Abschnitt 6).

### 2. Postfach — Post kommt an, IMAP fehlt

`hi@lqnt.de` empfängt (Anfragen aus den Formularen landen dort). Für die E-Mail-Assistenz fehlt
weiterhin der IMAP-Zugang; wo das Postfach liegt — Hostinger oder Google Workspace — ist
**ungeprüft**. Zugangsdaten kommen nicht durch den Chat, sondern in die Datei in der Instanz.

### 3. Previews — erledigt

Die Vorschau läuft unter `vorschau.lqnt.de` (Zweig `site`, nach jedem Push auf `main`).
`preview.lqnt.de` existiert nicht; der Name stand hier falsch.

---

## Was nur Leo klären kann

- **Referenzen:** welche bisherigen Projekte dürfen gezeigt werden?
- **Nische:** bleibt offen oder festlegen?
- **USt-IdNr:** sobald erteilt.
- **`design-system/` und `.design-sync/`:** entfernen oder umbenennen?
- **`CLAUDE.md`:** verweisen oder entfernen?
- **Zugänge:** Mail-Postfach `hi@lqnt.de` per IMAP steht noch aus.
- **Trennungsvereinbarung** mit Admir, inklusive `leoquent.de` und Postfach `lunda-ki.de`.