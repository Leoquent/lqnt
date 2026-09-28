# ROADMAP — Leoquent / lqnt.de

> Gepflegt vom Business-Agent. Stand: 28.09.2026, geprüft gegen `main` @ `99b45e0`.
> Arbeitsweise: Der Agent arbeitet auf `agent/<thema>`, Leo prüft den Branch, der Merge nach
> `main` ist der Deploy. Nichts geht ohne Freigabe live.

---

## Festgelegte Architektur

- **GitHub Pages liefert die Website aus.** Push auf `main` → Actions → Pages → `lqnt.de`.
  Kostenlos, HTTPS automatisch, läuft bereits. Kein Umzug.
- **Der Hostinger-VPS macht die Prozesse dahinter** — Formular- und Lead-Verarbeitung,
  Vorschau-Umgebungen, spätere Dienste.
- **Previews unter `preview.lqnt.de`** — pro Branch ein eigener Pfad, auf dem VPS gebaut und
  von nginx hinter Traefik ausgeliefert. Die Live-Seite bleibt unberührt.
- **Lunda-KI entfällt.** Verworfen am 28.09.2026.
- **Sprache:** Deutsch. Ton direkt, ohne Agenturfloskeln.
- **Perspektivisch:** Der Agent bekommt Zugriff auf alle Repos (eigener Deploy-Key je Repo).

---

## Status — verifiziert, nicht aus älteren Dokumenten

| Punkt | Befund |
|---|---|
| Deploy | `main` → GitHub Actions → GitHub Pages → `lqnt.de`. Assets auf `/`, `SITE_URL=https://lqnt.de` |
| Schrift | Outfit ist eingebaut (`app/layout.tsx`) — Ziel erreicht |
| Quiz-Funnel | Auslöser nur auf `/prozesse/`. `access_key` wird beim Build **nicht** eingesetzt — im Workflow ist die Zeile auskommentiert |
| Fehler-Fallback | **sichtbar vorhanden und live**: „Senden fehlgeschlagen" + `hi@lqnt.de` + Telefon. Kein stiller Verlust, aber jeder Lead läuft derzeit manuell |
| Kontaktwege | kein `<form>` im Quelltext; 8 × `mailto:`, 4 × `tel:` |
| Sitemap | enthält nur `/` — alle Unterseiten fehlen |
| Impressum | Anschrift, Telefon, Mail stehen. Offen: USt-IdNr |
| Altlasten | `addequat` 500 Fundstellen in 63 Dateien, `Admir` 86 in 28 — davon **0** in `app/`, `components/`, `lib/`, `public/`. Nur Doku-Hygiene |
| Tote Abhängigkeiten | `nodemailer`, `@types/nodemailer` |
| graphify | `graphify-out/` ist veraltet (gebaut aus `2a3b3936`) und trägt noch den alten Namen |

---

## P0 — kostet Geld

- [ ] **Formular-Endpunkt aktivieren.** Key als GitHub-Secret `WEB3FORMS_KEY` anlegen, dann
      Agent: Workflow-Zeile aktivieren + Key-Prüfung im Code. *(dein Schritt: Key holen und Secret setzen)*
- [ ] **Postfach `hi@lqnt.de` prüfen** — existiert es, kommt dort Post an, liest es jemand?
- [ ] **Impressum: USt-IdNr** eintragen, sobald erteilt.

## P1 — Einheitlichkeit und Auffindbarkeit

- [ ] **Eine Ansprache.** `/webdesign/` spricht „ich", `/prozesse/` spricht „wir"
      („Wir bauen exakt die Lösung", „Unser Weg", „Wir gewinnen, wenn Sie gewinnen").
      Entscheiden, dann durchziehen.
- [ ] **Zusagen prüfen.** „garantierter ROI", „Performance Pricing", „kompromisslos" —
      inhaltlich und rechtlich belastbar?
- [ ] **Sitemap vervollständigen** — alle Routen eintragen.
- [ ] **Entwurfsrouten klären.** `/entwurf/filmisch` und `/entwurf/interaktiv` liegen im Repo.
- [ ] **Eigenes Formular** als zweiter Weg neben dem Quiz — für Besucher ohne Mailprogramm.
- [ ] **Preview-Umgebung bauen** (`preview.lqnt.de`) — braucht DNS-Eintrag und Traefik-Zugang.

## P2 — Wachstum

- [ ] Referenzen erweitern (welche Projekte dürfen gezeigt werden?)
- [ ] JSON-LD `ProfessionalService` + `FAQPage`
- [ ] Telefonnummer in Header und Footer sichtbar
- [ ] Preisanker auf `/webdesign/` direkt verlinkbar machen

## P3 — Aufräumen und Design

- [ ] `nodemailer` und `@types/nodemailer` entfernen
- [ ] hardcodierte Hex-Werte durch Tokens ersetzen
- [ ] verwaistes `public/og-image.png`
- [ ] `graphify-out/` neu erzeugen oder entfernen
- [ ] Design-Durchgang (Leo, später): einheitliche Linie zwischen `/`, `/webdesign/`, `/prozesse/`

---

## Einrichtung auf deiner Seite — konkret

### 1. Quiz soll wieder automatisch senden (Web3Forms)

1. Auf `web3forms.com` einen Access Key für `hi@lqnt.de` holen. Der Key kommt per Mail.
2. GitHub → Repo `Leoquent/lqnt` → **Settings → Secrets and variables → Actions →
   New repository secret**. Name: `WEB3FORMS_KEY`. Wert: der Key.
3. Danach aktiviert der Agent die auskommentierte Zeile im Workflow. Ab dem Merge nach `main`
   landen Quiz-Anfragen automatisch in `hi@lqnt.de`.

### 2. Postfach

Hostinger **hPanel → E-Mails** prüfen, ob `hi@lqnt.de` als Postfach existiert. Für die
E-Mail-Assistenz des Agenten braucht es IMAP: Server `imap.hostinger.com:993`,
Postfach-Passwort (nicht das hPanel-Login).

### 3. Previews (`preview.lqnt.de`)

1. Hostinger **DNS → A-Record** `preview` → `187.124.181.132`.
2. Zugang zur Traefik-Konfiguration auf dem VPS (oder SSH) bereitstellen.
3. Der Agent baut dann je Branch einen Container mit Traefik-Label unter
   `preview.lqnt.de/<branch>`.

---

## Was nur Leo klären kann

- **Referenzen:** welche bisherigen Projekte dürfen gezeigt werden?
- **Nische:** bleibt offen oder festlegen?
- **USt-IdNr:** sobald erteilt.
- **Postfach-Setup:** welche Adressen sollen existieren?
- **Zugänge:** DNS, Traefik/SSH zum VPS, Mail-Postfach.