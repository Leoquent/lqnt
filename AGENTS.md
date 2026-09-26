# AGENTS.md — Projekt Leoquent

> **Für die KI:** Diese Datei ist der Einstieg. Lies sie vollständig, bevor du irgendetwas
> änderst. Sie enthält den aktuellen Stand, die getroffenen Entscheidungen und die Reihenfolge
> der offenen Arbeit. Wo sie auf andere Dokumente verweist, sind die verbindlich.
>
> **Für Leo:** Codex liest diese Datei beim Start automatisch. Du musst nicht darauf
> hinweisen.

**Stand:** 14.08.2026 · Letzte Sitzung: Markenentwicklung abgeschlossen

---

## 1. Was das hier ist

Website für **Leoquent** — Einzelunternehmen von Leonid Ryazanskiy.
Ehemals „leoquent & addequat", eine GbR mit einem zweiten Gesellschafter (Admir). **Diese
Partnerschaft besteht nicht mehr.** Ein großer Teil der offenen Arbeit besteht darin, das
aus Code, Texten und Rechtstexten zu entfernen.

**Positionierung:** Webdesign als Einstiegsprodukt, KI-Automatisierung und Prozessoptimierung
als Upsell im Bestandskundengeschäft. Zielgruppe: Mittelstand, Handwerk, Praxen.

Die vollständige Begründung steht in **`NEUAUSRICHTUNG_2026.md`** — das ist die
**Wahrheitsquelle für Strategie, Positionierung und Backlog.** Nicht überstimmen, ohne mit
Leo zu sprechen.

---

## 2. Festgelegt — nicht mehr zur Diskussion

| Thema | Entscheidung |
|---|---|
| **Name** | `Leoquent`. Im Fließtext, Impressum, Titel, Signatur immer ausgeschrieben. |
| **LQNT** | Ausschließlich die Bildmarke und die Domain. **Nie als Firmenname im Text.** |
| **Domain** | `lqnt.de`. `leoquent.de` gehört jemand anderem und wird nicht verfolgt. Keine Defensivdomains. |
| **Rechtsform** | Einzelunternehmen. Geschäftsbezeichnung „Leoquent", Firma ist der Personenname. |
| **Schrift** | Outfit (Google Fonts, SIL OFL). 700 Wortmarke, 600 Headlines, 500 Auszeichnung, 400 Fließtext. |
| **Logo** | Fertig. Siehe `brand/LOGO.md` und `brand/marks/`. Nicht neu bauen. |
| **Sprache** | Alles Deutsch. Ton: direkt, ohne Agentur-Floskeln. |

---

## 3. Die Marke ist fertig

Alle Dateien liegen in **`brand/marks/`**, die Regeln in **`brand/LOGO.md`**. Beides lesen,
bevor du Logo oder Typografie anfasst.

Kurzfassung:

- **Bildmarke** LQNT, zweizeiliges Quadrat, reine Vektorgeometrie
- **Wortmarke** `leoquent`, aus Outfit 700 in Pfade gewandelt, schriftunabhängig
- **Hauptlogo** `leoquent-lockup-h-descriptor.svg` — Marke + Wort + zweizeiliger Deskriptor
- **Header** nutzt bewusst **kein** Lockup, sondern Bildmarke + `leoquent` als HTML-Text
- Master-Dateien tragen `fill="currentColor"` → als React-Komponente einbinden, nicht als `<img>`

**Deskriptor — entschieden:** `WEBDESIGN, PROZESSE &` / `AUTOMATISIERUNG`, zweizeilig,
linksbündig unter der Wortmarke. Einstiegsprodukt zuerst, Upsell danach. Gebaut und in
`leoquent-lockup-h-descriptor*.svg` enthalten.

Nicht mehr diskutieren: „Prozessoptimierung" (für den Kunden dasselbe wie Automatisierung)
und „KI" (Trendwort mit Zeitstempel — gehört in Website-Texte, nicht ins Logo).

---

## 4. Befehle

```bash
npm install
./node_modules/.bin/next dev      # localhost:3000
./node_modules/.bin/next build    # lokales Binary benutzen, nicht npx
```

ESLint wird beim Build ignoriert (`eslint.ignoreDuringBuilds: true`).
**TypeScript-Fehler brechen den Build.**

---

## 5. Architektur

**Next.js 15, App Router.** Die gesamte Marketingseite steckt in **einer** Datei:
`app/page.tsx` — ein `"use client"`-Component mit allen Sektionen inline, keine
Section-Komponenten. GSAP-ScrollTrigger-Animationen laufen in einem einzigen `useGSAP`-Hook
in derselben Datei.

**Routen:**

- `/` — One-Pager (`app/page.tsx`)
- `/impressum`, `/datenschutz` — Rechtstexte
- `/demo-video` — Remotion-Player

**Es gibt keine API-Routen.** `app/api` existiert nicht. Falls du irgendwo einen Hinweis auf
`/api/analyse` findest: veraltet, ignorieren.

**`next.config.ts`:** `output: 'export'` (statischer Export), `basePath` aus
`NEXT_PUBLIC_BASE_PATH`. Alle internen Asset-URLs müssen das
`const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""`-Muster verwenden.

---

## 6. Design-System

Tokens in `app/globals.css` über `@theme`:

| Token | Wert | Verwendung |
|---|---|---|
| `vanta` | `#050505` | Hintergrund |
| `lime` | `#CCFF00` | CTAs, Highlights, aktive Zustände |
| `gridline` | `#1A1A1A` | Sektionsrahmen |
| `bone` | `#EAEAEA` | Fließtext auf Dunkel |
| `mute` | `#666666` | Sekundärtext |

**Achtung — Diskrepanz:** Geladen wird derzeit **nur Inter** (`app/layout.tsx`). Outfit ist
noch nicht eingebunden. Frühere Dokumentation nannte Syne und Playfair — die waren nie
angeschlossen. Beim Umbau: Inter durch Outfit ersetzen.

**CSS-Klassen** in `globals.css`: `.hero-headline`, `.section-headline`, `.brutalist-marker`
(Lime-Textmarker), `.btn-glitch`, `.noise-bg` (SVG-Korn, z-index 9999).

**Interaktionsmuster:** Hover-Reveal (`translate-y-[120%]` → `0`), aktiver Zustand
`bg-lime text-vanta`, Mobile-Akkordeon über `openSolution` / `openIndustry` / `openMember`
mit `grid-rows-[0fr]` → `grid-rows-[1fr]`.

---

## 7. Lead-Funnel

`components/QuizModal.tsx` — Overlay auf der Startseite, keine eigene Route. Ausgelöst von
allen „Potenzial analysieren"-Buttons und dem CTA-Formular unten.

**Backend: Web3Forms**, clientseitig:

```
components/QuizModal.tsx:258  fetch("https://api.web3forms.com/submit")
components/QuizModal.tsx:262  access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY
```

**Kaputt:** `.github/workflows/deploy.yml` reicht `NEXT_PUBLIC_WEB3FORMS_KEY` beim Build
**nicht** durch. Der Wert wird als `undefined` ins Client-Bundle inlined, und der `catch`-Zweig
hat keinen Fallback → stiller Anfrageverlust. **Muss vor dem Launch repariert werden**
(Key als GitHub-Secret, in `env:` durchreichen, plus sichtbarer `mailto:`-Fallback im Fehlerfall).

Die Seite ist **noch nicht live**, es sind also keine Anfragen verloren gegangen.

`nodemailer` in `package.json` ist eine tote Abhängigkeit aus der Zeit vor Web3Forms → entfernen.

---

## 8. Deployment

Aktuell GitHub Pages über `.github/workflows/deploy.yml`. Da es keine API-Routen mehr gibt,
funktioniert `output: 'export'` einwandfrei — **GitHub Pages bleibt und kostet nichts.**

Umzustellen auf die eigene Domain:

```yaml
env:
  NEXT_PUBLIC_SITE_URL: https://lqnt.de
  NEXT_PUBLIC_BASE_PATH: ""          # war /leoquentaddequat
  NEXT_PUBLIC_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
```

Dazu: `public/CNAME` mit dem Inhalt `lqnt.de`, DNS bei der Registrierstelle auf GitHub Pages
zeigen lassen, in den Repo-Settings die Custom Domain eintragen und HTTPS erzwingen.

Repo gehört dem GitHub-Konto `Leoquent`, Remote über SSH:
`git@github.com:Leoquent/leoquentaddequat.git`

---

## 9. Inhalt — Quellen und ihre Belastbarkeit

| Datei | Status |
|---|---|
| `NEUAUSRICHTUNG_2026.md` | **Verbindlich.** Strategie, Positionierung, geprüftes Backlog. |
| `New_Website_Copy.md` | Copy-Quelle, **aber kontaminiert** — enthält das Zweier-Team-Narrativ. |
| `Website_Content_For_AI.md` | dito |
| `AI_Style_And_Vibe_Prompt.md` | dito — baut den Markenkern auf der Leonid/Admir-Symbiose auf |
| `brand/LOGO.md` | **Verbindlich** für Logo und Typografie. |

**Wichtig:** Die drei kontaminierten Dateien **zuerst bereinigen, bevor neue Texte generiert
werden.** Solange das Zweier-Team-Narrativ darin steht, schreibt es jede KI-Iteration wieder
in die Seite. Das ist die Wurzel, nicht das Symptom.

---

## 10. Arbeitsreihenfolge

### P0 — vor allem anderen

1. **Admir vollständig entfernen.** Profilkarte `app/page.tsx:1383-1445` (63 Zeilen, Foto,
   Name, Rolle). „Zwei Spezialisten vereint" `app/page.tsx:1317`. Das generische „wir" darf
   bleiben — Pluralis modestiae ist bei Einzelunternehmen üblich.
2. **Impressum ausfüllen.** Textvorlage und alle Änderungen stehen in
   **`brand/IMPRESSUM_VORLAGE.md`** — dort ist auch begründet, warum `§ 5 TMG` zu `§ 5 DDG`
   wird und der EU-Streitschlichtungs-Link entfällt. Auch `app/datenschutz/page.tsx:28`
   anpassen. Leo muss nur noch Anschrift, Telefon und E-Mail einsetzen.
3. **Quelldokumente entgiften** (siehe Abschnitt 9).
4. **Namensspur beseitigen.** `addequat` / `AGENTur` kommt in **702 Fundstellen über 109
   Dateien** vor. Startpunkt: `app/layout.tsx` — Titel, OG- und Twitter-Tags lauten noch
   „leoquent & addequat | Die AGENTur für den Mittelstand".

### P1 — Marke und Technik

5. Outfit statt Inter in `app/layout.tsx` und `globals.css`
6. Bildmarke + `leoquent` als Text in den Header, `favicon.svg` → `app/icon.svg`
   (`app/icon.png` und `apple-icon.png` ersetzen)
7. Deploy auf `lqnt.de` umstellen (Abschnitt 8)
8. Web3Forms-Key durchreichen, Fallback bauen, live testen
9. OG-Bild 1200 × 630 aus `brand/marks/leoquent-lockup-h-descriptor-white.svg` auf Vanta

### P2 — Positionierung und Inhalt

10. Webdesign als eigene Solutions-Kachel — existiert bisher nur als Badge unter
    „Custom Development" (`app/page.tsx:38-41`)
11. Vertrauenssignale: Telefonnummer in Header und Footer, Referenzen, FAQ, Preisanker
12. Branchen-Step im Funnel ergänzen, Antwortoptionen auf Handwerks- und Praxissprache
13. Landingpages je Nische, JSON-LD (`LocalBusiness` / `ProfessionalService` + `FAQPage`)

### P3 — Aufräumen

14. `nodemailer` und `@types/nodemailer` entfernen
15. Hardcodierte Hex-Farben durch Tokens ersetzen
   (`app/page.tsx:768,798,944,1280,1326,1389`)
16. Verwaistes `public/og-image.png`

---

## 11. Was nur Leo klären kann

- **Gewerbeanmeldung.** Geschäftsbezeichnung „Leoquent", Tätigkeit bewusst breit formulieren.
  Offen: gewerblich oder freiberuflich — mit dem Finanzamt klären, entscheidet über
  Gewerbesteuer und IHK-Beitrag.
- **Referenzen.** Welche bisherigen Projekte darf er zeigen? Ohne diese Antwort ist weder die
  Referenzsektion baubar noch eine Nischenstrategie verkaufbar.
- **Nische.** In `NEUAUSRICHTUNG_2026.md` Abschnitt 4.7 bewusst offen gelassen.
- **Deskriptor** — siehe Abschnitt 3.
- **Trennungsvereinbarung** mit Admir, inklusive `leoquent.de` und dem Postfach `lunda-ki.de`,
  das im Impressum steht und möglicherweise nicht mehr erreichbar ist.

---

## 12. Bekannte Irrtümer in älteren Dokumenten

Diese Aussagen stehen noch in anderen Dateien im Repo und sind **falsch**:

- „`/api/analyse` steht im Konflikt mit `output: 'export'`" → die Route existiert nicht mehr
- „E-Mail-Versand über Nodemailer und Gmail SMTP" → es ist Web3Forms, clientseitig
- „Schriften sind Inter, Syne, Playfair Display" → nur Inter ist angeschlossen, Ziel ist Outfit
- „Der Lead-Funnel verliert seit dem Live-Gang Anfragen" → die Seite ist nicht live
- „`leoquent & addequat`" in jeder Form → der Name ist `Leoquent`
