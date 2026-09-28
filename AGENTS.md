# AGENTS.md — Projekt Leoquent

> **Einstieg.** Diese Datei vor jeder Änderung vollständig lesen. Sie beschreibt den
> tatsächlichen Stand, die getroffenen Entscheidungen und die bindenden Grenzen.
> Wo sie auf andere Dokumente verweist, gilt die Einordnung in Abschnitt 8.
>
> **Für Leo:** Diese Datei wird vom Business-Agent gepflegt. Stimmt sie nicht mehr, ist das
> ein Fehler, der gemeldet gehört — keine Absicht.

**Stand:** 28.09.2026 · geprüft gegen `main` @ `5c1bc8c` · Verfasser: Business-Agent
**Architektur umgestellt:** GitHub liefert nicht mehr aus, der VPS tut es.
**Vorherige Fassung:** 14.08.2026 — in mehreren Punkten falsch, siehe Abschnitt 10.

---

## 1. Was das hier ist

Website für **Leoquent** — Einzelunternehmen von Leonid Ryazanskiy.

Ehemals „leoquent & addequat", eine GbR mit einem zweiten Gesellschafter (Admir).
**Diese Partnerschaft besteht nicht mehr.** Reste davon stehen noch im Repo, siehe Abschnitt 9.

**Positionierung:** Webdesign als Einstiegsprodukt, Prozesse und Automatisierung als Upsell
im Bestandskundengeschäft. Zielgruppe: Mittelstand, Handwerk, Praxen.

Die strategische Begründung steht in **`NEUAUSRICHTUNG_2026.md`** (Stand 26.09.2026) — mit
Prüfvorbehalt, siehe Abschnitt 8. Nicht überstimmen, ohne mit Leo zu sprechen.

### Festgelegt — nicht mehr zur Diskussion

| Thema | Entscheidung |
|---|---|
| **Name** | `Leoquent`. Im Fließtext, Impressum, Titel, Signatur immer ausgeschrieben. |
| **LQNT** | Ausschließlich die Bildmarke und die Domain. **Nie als Firmenname im Text.** |
| **Domain** | `lqnt.de`. `leoquent.de` gehört jemand anderem und wird nicht verfolgt. Keine Defensivdomains. |
| **Rechtsform** | Einzelunternehmen. Geschäftsbezeichnung „Leoquent", Firma ist der Personenname. |
| **Schrift** | Outfit (Google Fonts, SIL OFL). 700 Wortmarke, 600 Headlines, 500 Auszeichnung, 400 Fließtext. |
| **Logo** | Fertig. Siehe `brand/LOGO.md` und `brand/marks/`. Nicht neu bauen. |
| **Sprache** | Alles Deutsch. Ton: direkt, ohne Agentur-Floskeln. |
| **Ansprache** | Durchgehend **„ich"** (entschieden 28.09.2026). Siehe Abschnitt 4. |

---

## 2. Arbeitsweise — bindend

**Modus: Vorschlag → Freigabe → Ausführung.**

1. Änderungen auf einem Branch `agent/<thema>` vorbereiten und pushen.
2. Leo sieht sich den Branch an. Der **Merge nach `main` ist der Deploy**.
3. Nach dem Go durchziehen, nicht nach jedem Teilschritt fragen.
4. Am Ende berichten: was tatsächlich passiert ist, mit Beleg (Ausgabe, Datei, Zähler).

**Grenzen:**

- Keine E-Mails ohne ausdrückliche Freigabe versenden.
- Keine Live-Website ohne Freigabe ändern.
- Nichts löschen oder überschreiben ohne Rückfrage.
- Keine Passwörter, API-Schlüssel oder Tokens in Dokumente, Notizen oder Skills schreiben.
  Zugangsdaten kommen von Leonid und bleiben in der Instanz.
- Keine Podcast-Inhalte und keine Podcast-Recherche — dafür gibt es einen eigenen Agenten.

**Ton:** Deutsch, nüchtern, präzise, direkt. Kurze Hauptsätze. Eine begründete Empfehlung
statt Optionsmenüs. Bei Unsicherheit immer die Stufe nennen: *geprüft* / *wahrscheinlich,
ungeprüft* / *unbekannt*. Nie eine Behauptung als Fakt verkleiden.

**Arbeitsrhythmus:** ein Schritt nach dem anderen. Keine Parallelbaustellen.

---

## 3. Architektur — umgestellt am 28.09.2026

```
VPS (Hermes-Agent, lqnt-web, lqnt-api)
   │  Agent baut und pusht
   ▼
GitHub — Quelle des Codes, nicht die Auslieferung
   │  Push auf main startet preview-release.yml
   ├─► Zweig `site`  ──►  vorschau.lqnt.de   automatisch, nach jedem Push
   └─► Zweig `live`  ──►  lqnt.de            nur nach Freigabe
                                ▲
             Freigabe über das GitHub-Environment `production` (Prüfer: Leo)
```

- **Der Hostinger-VPS liefert die Website aus.** Ein Nginx-Container je Zweig unter
  `/docker/lqnt-web/`, davor Traefik mit Let's-Encrypt-Zertifikat. Serverstandort Deutschland.
- **GitHub ist Quelle, nicht Auslieferung.** GitHub Actions baut, legt das Ergebnis in die
  Zweige `site` und `live`; ein Abholer auf dem VPS liest sie im Minutentakt.
  **Kein Schlüssel und kein Zugang von außen nötig** — beide Zweige sind öffentlich lesbar.
- **Freigabe vor Veröffentlichung.** Der Produktionsjob hängt am Environment `production`.
  Ohne Leos Klick wandert nichts nach `live`. Leo ist der Prüfer, nicht der Agent.
- **Der Agent merged nicht in die Veröffentlichung hinein.** Auf `main` arbeiten heißt:
  Vorschau aktualisieren. Was live geht, entscheidet Leo.
- **Der frühere Weg über `deploy.yml` und `public/CNAME` ist am 28.09.2026 entfallen.**
  Die Pages-Einstellung im Repo schaltet Leo ab, sobald die DNS-Umschaltung durchgelaufen ist
  (früher würde Pages Besucher mit alten Zwischenspeichern auf 404 werfen).
- **Lunda-KI entfällt.** Es gibt kein Multi-Tenant-Produkt.
- **Kein Server im Website-Repo.** `output: 'export'` bedeutet: keine API-Routen, `app/api`
  existiert nicht. Was zur Laufzeit passieren soll, gehört auf den VPS (`lqnt-api`).

---

## 4. Technik

| Punkt | Wert |
|---|---|
| Framework | Next.js 15, App Router, `output: 'export'` (statischer Export) |
| Sprache | TypeScript — **Typfehler brechen den Build** |
| Lint | ESLint wird beim Build ignoriert (`eslint.ignoreDuringBuilds: true`) |
| Styling | Tailwind, Tokens in `app/globals.css` über `@theme` |
| Schrift | **Outfit** (`next/font/google` in `app/layout.tsx`) — eingebaut |
| Deploy | Push auf `main` → `preview-release.yml` → Zweige `site`/`live` → VPS |
| Vorschau | `vorschau.lqnt.de` — Zweig `site`, nach jedem Push automatisch |
| Produktion | `lqnt.de` — Zweig `live`, nur nach Freigabe im Environment `production` |

**Befehle:**

```bash
npm ci
./node_modules/.bin/next dev      # localhost:3000
./node_modules/.bin/next build    # lokales Binary benutzen, nicht npx
```

**Design-Tokens** (`app/globals.css`):

| Token | Wert | Verwendung |
|---|---|---|
| `vanta` | `#050505` | Hintergrund |
| `lime` | `#CCFF00` | CTAs, Highlights, aktive Zustände |
| `gridline` | `#1A1A1A` | Sektionsrahmen |
| `bone` | `#EAEAEA` | Fließtext auf Dunkel |
| `mute` | `#666666` | Sekundärtext |

**CSS-Klassen:** `.hero-headline`, `.section-headline`, `.brutalist-marker` (Lime-Textmarker),
`.btn-glitch`, `.noise-bg` (SVG-Korn, z-index 9999).

**Interaktionsmuster:** Hover-Reveal (`translate-y-[120%]` → `0`), aktiver Zustand
`bg-lime text-vanta`, Mobile-Akkordeon über `openSolution` / `openIndustry` / `openMember`
mit `grid-rows-[0fr]` → `grid-rows-[1fr]`.

**Ansprache — entschieden am 28.09.2026:** durchgehend **„ich"**.
Firmen-„wir" (Pluralis modestiae) fliegt raus. Partner-„wir", das Leonid und den Kunden
meint („Wir klären im Erstgespräch …"), ist erlaubt und sparsam einzusetzen.
Gegenüber Kunden gilt die Sie-Form. `/prozesse/` wurde am 28.09.2026 umgestellt.

---

## 5. Routen — Stand 28.09.2026

Der Export erzeugt sieben Seiten:

- `/` — Einstieg (`app/page.tsx` mit `components/Gateway.tsx`): der Besucher wählt zwischen
  Webdesign und Prozessen
- `/webdesign` — Einstiegsprodukt, eigene Sektionen in `app/webdesign/`
- `/prozesse` — Automatisierung und Prozessarbeit; trägt das Quiz
- `/impressum`, `/datenschutz` — Rechtstexte
- `/demo-video` — Remotion-Player
- `/404`

**Entfernt am 28.09.2026:** `/entwurf/filmisch` und `/entwurf/interaktiv`. Sie dienten nur der
Wahl der Landingpage und werden nicht mehr gebraucht. Nicht wieder einführen.

`robots.txt` erlaubt alles und verweist auf die Sitemap.

---

## 6. Lead-Funnel

`components/QuizModal.tsx`, eingebunden **nur** in `app/prozesse/page.tsx`. Es gibt kein
Formular-Element im Quelltext — der Kontakt läuft über `mailto:hi@lqnt.de` und Telefon.

**Stand:** Der Funnel verschickt derzeit nichts automatisch.

- Der Workflow reicht `NEXT_PUBLIC_WEB3FORMS_KEY` durch (Zeile aktiviert am 28.09.2026).
- Das GitHub-Secret `WEB3FORMS_KEY` ist **nicht gesetzt**. Ohne Key wird gar nicht erst
  gesendet: der Besucher sieht sofort den Ausweichweg mit Mailadresse und Telefonnummer.
  Das ist beabsichtigt und besser als ein Fehlversuch.
- **Entscheidung 28.09.2026:** Der Endpunkt wird selbst gebaut und läuft auf dem VPS.
  Web3Forms wird nicht der Dauerzustand. Offen: DNS-Eintrag `api.lqnt.de`, Traefik-Zugang.

**Tote Abhängigkeit:** `nodemailer` und `@types/nodemailer` in `package.json` — Rest aus der
Zeit vor Web3Forms, wird nicht benutzt.

---

## 7. Was als Nächstes ansteht

Die gepflegte Arbeitsliste liegt in **`ROADMAP.md`** im Wurzelverzeichnis: Priorität, Status
und die Punkte, die nur Leonid klären kann. Bei Widerspruch gilt `ROADMAP.md` für Aufgaben
und `AGENTS.md` für Regeln.

---

## 8. Dokumente im Repo — was wofür gilt

Es liegen 16 Markdown-Dateien im Wurzelverzeichnis. Das ist historisch gewachsen und die
Hauptursache für Verwirrung. Verbindliche Einordnung:

**Gilt:**

| Datei | Wofür |
|---|---|
| `AGENTS.md` | Diese Datei — Einstieg, Regeln, Stand |
| `ROADMAP.md` | Arbeitsliste und Prioritäten (Stand 28.09.2026) |
| `brand/LOGO.md` | Verbindlich für Logo und Typografie |
| `brand/IMPRESSUM_VORLAGE.md` | Verbindlich für das Impressum, inkl. Begründung § 5 DDG |
| `brand/DESIGN_LEITLINIE.md` | Design-Regeln |
| `NEUAUSRICHTUNG_2026.md` | Strategie und Positionierung (Stand 26.09.2026) |

**Nur mit Prüfung benutzen:** `PLAN.md` (Umsetzungsplan vom 26.09.2026; Block A und B sind
erledigt, die Angaben zu Funnel, Routen und `from_name` sind überholt).

**Historisch, nicht mehr als Quelle verwenden:** `TODO.md`, `LAUNCH_CHECKLIST.md`,
`HANDOVER_CODING_AI.md`, `AI_HANDOVER_PROTOCOL.md`, `EMAIL_HANDOVER.md`,
`LinkedIn_Launch_Playbook.md`, `New_Website_Copy.md`, `Website_Content_For_AI.md`,
`AI_Style_And_Vibe_Prompt.md`, `COPY.md`, `README.md`.

Die drei Copy-Dateien (`New_Website_Copy.md`, `Website_Content_For_AI.md`,
`AI_Style_And_Vibe_Prompt.md`) tragen das Zweier-Team-Narrativ. Wer daraus Texte generiert,
schreibt Admir und addequat wieder in die Seite. **Nicht als Copy-Quelle nehmen.**

**`CLAUDE.md`** ist eine abweichende Fassung dieser Datei (250 Zeilen, eigener Inhalt).
Claude Code liest sie automatisch und bekommt damit den veralteten Stand. Entweder auf diese
Datei verweisen oder entfernen — Entscheidung offen.

---

## 9. Altlasten — gezählt am 28.09.2026

| Fundort | `addequat` | `Admir` |
|---|---|---|
| `app/`, `components/`, `lib/`, `public/` | **0** | **0** |
| gesamtes Repo ohne `graphify-out/` | 75 Fundstellen in 34 Dateien | 40 in 13 Dateien |

Die sichtbare Website ist **sauber**. Die Reste stecken in:

- **Dokumenten** (siehe Abschnitt 8) — reine Textarbeit.
- **`design-system/` (28 Dateien)** und **`.design-sync/` (15 Dateien)** — eine
  Komponentenbibliothek, deren Paketname `leoquent-addequat-brand` lautet und die in
  `.design-sync/previews/ProfileCard.tsx` noch eine Profilkarte „Admir" trägt.
  **Sie hängt nicht am Build:** keine Referenz in `package.json`, `tsconfig.json` oder
  `next.config.ts`, und nichts davon erscheint im Export. Entweder entfernen oder umbenennen
  — Entscheidung offen.
- **`graphify-out/`** — generierter Wissensgraph, trägt den Großteil der Fundstellen, gebaut
  aus dem Commit `2a3b3936` (main steht auf `6c5c181`). Neu erzeugen oder entfernen.

**Beabsichtigte Treffer, nicht anfassen:** in `/prozesse/` steht „Keine Standard-Agentur" und
im Lebenslauf „internationale Agenturnetzwerke". Das ist gewollte Sprache, kein Rest.

---

## 10. Bekannte Irrtümer in älteren Dateien

Diese Aussagen stehen noch irgendwo im Repo und sind **falsch**:

- „Die Seite ist noch nicht live" → sie ist live unter `lqnt.de`.
- „Der Lead-Funnel verliert seit dem Live-Gang Anfragen" → er verliert keine, es greift ein
  sichtbarer Ausweichweg mit Mail und Telefon. Der automatische Versand funktioniert nicht.
- „Admirs Profilkarte steht in `app/page.tsx:1383-1445` und muss entfernt werden" → sie ist
  entfernt; im Quellcode gibt es 0 Fundstellen.
- „Das generische wir darf bleiben" → widerspricht der Entscheidung vom 28.09.2026.
- „addequat/AGENTur kommt in 702 Fundstellen über 109 Dateien vor" → aktuell 75 in 34 Dateien
  ohne `graphify-out`; die sichtbare Website ist frei davon.
- „Geladen wird nur Inter, Outfit fehlt" → Outfit ist eingebunden.
- „`from_name` in `QuizModal.tsx` lautet noch ‚leoquent & addequat Website'" → lautet
  „Leoquent Website".
- „Das Quiz ist ein Overlay auf `/`" → es liegt auf `/prozesse/`.
- „Die Marketingseite steckt komplett in `app/page.tsx`" → inzwischen gibt es `app/webdesign/`
  und `app/prozesse/` als eigene Routen.
- „E-Mail-Versand über Nodemailer und Gmail SMTP" → es ist Web3Forms, clientseitig.
- „`/api/analyse` steht im Konflikt mit `output: 'export'`" → die Route existiert nicht.
- „Repo-Remote `leoquentaddequat.git`" → `git@github.com:Leoquent/lqnt.git`.
- „Die Wortmarke ist als Pfade in `brand/marks/` fertig" → Dateien prüfen; ob sie dem
  aktuellen Stand entsprechen, ist **ungeprüft**.

**Offen und noch nicht korrekt:** `app/sitemap.ts` listet nur `/` und hat den Rückfallwert
`https://leoquent.github.io` in der Konstante. Beides gehört bereinigt.

---

## 11. Marke und Logo

Alle Dateien liegen in **`brand/marks/`**, die Regeln in **`brand/LOGO.md`**. Beides lesen,
bevor du Logo oder Typografie anfasst.

- **Bildmarke** LQNT, zweizeiliges Quadrat, reine Vektorgeometrie
- **Wortmarke** `leoquent`, aus Outfit 700 in Pfade gewandelt, schriftunabhängig
- **Hauptlogo** `leoquent-lockup-h-descriptor.svg` — Marke + Wort + zweizeiliger Deskriptor
- **Header** nutzt bewusst **kein** Lockup, sondern Bildmarke + `leoquent` als HTML-Text
- Master-Dateien tragen `fill="currentColor"` → als React-Komponente einbinden, nicht als `<img>`

**Deskriptor — entschieden:** `WEBDESIGN, PROZESSE &` / `AUTOMATISIERUNG`, zweizeilig,
linksbündig unter der Wortmarke. Einstiegsprodukt zuerst, Upsell danach.

Nicht mehr diskutieren: „Prozessoptimierung" (für den Kunden dasselbe wie Automatisierung)
und „KI" (Trendwort mit Zeitstempel — gehört in Website-Texte, nicht ins Logo).

---

## 12. Was nur Leo klären kann

- **USt-IdNr** für das Impressum (steht dort als „in Beantragung").
- **Referenzen:** welche Projekte dürfen gezeigt werden? Ohne Antwort ist keine
  Referenzsektion baubar.
- **Nische** — in `NEUAUSRICHTUNG_2026.md` bewusst offen gelassen.
- **Formular-Endpunkt:** DNS-Eintrag `api.lqnt.de` und Traefik-Zugang auf dem VPS.
- **Postfach `hi@lqnt.de`:** anlegen und Zugang hinterlegen (nur Lesen, kein Senden).
- **Gewerbeanmeldung:** gewerblich oder freiberuflich — entscheidet über Gewerbesteuer und
  IHK-Beitrag.
- **`design-system/` und `.design-sync/`:** entfernen oder umbenennen?
- **`CLAUDE.md`:** auf diese Datei verweisen oder entfernen?
- **Standard-Branch im GitHub-Repo** steht auf `codex/leoquent-webdesign`. Gehört auf `main`.
- **Trennungsvereinbarung** mit Admir, inklusive `leoquent.de` und dem Postfach `lunda-ki.de`,
  das im Impressum steht und möglicherweise nicht mehr erreichbar ist.