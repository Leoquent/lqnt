# Umsetzungsplan — Leoquent

**Stand:** 14.08.2026 · Ersetzt nach Freigabe Abschnitt 10 von `CLAUDE.md`.

---

## 0. Neu entschieden in dieser Sitzung

Diese vier Punkte waren in `CLAUDE.md` und `NEUAUSRICHTUNG_2026.md` noch offen oder falsch
und sind jetzt geklärt:

| Thema | Stand |
|---|---|
| **Gewerbe** | In Anmeldung. USt-IdNr. in Beantragung. Beides darf so ins Impressum. |
| **Trennungsvereinbarung** | **Existiert nicht und wird nicht verfolgt.** Es gab nie etwas Schriftliches. Leo führt allein weiter. Der Punkt fällt ersatzlos aus allen Dokumenten. |
| **Postfach** | `hi@lqnt.de`, liegt bei Hostinger (IMAP `imap.hostinger.com:993`, SMTP `smtp.hostinger.com:465`). `info@lunda-ki.de` ist tot und muss überall raus. |
| **Domain** | `lqnt.de` ist da und hat aktives Mail — die Domain liegt also bereits bei Hostinger. |
| **Zielgruppe** | Nicht nur Praxen und Handwerk: **die Immobilienbranche gehört dazu** — Immobilienverwaltungen, Makler. |
| **Anschrift** | Leonid Ryazanskiy, Uerdinger Str. 75, 40474 Düsseldorf · +49 176 47 177 623 |
| **Hosting** | **Hostinger VPS** (Leos eigener Server). GitHub Pages entfällt, `deploy.yml` wird ersetzt. |
| **Referenz** | **RümpelRoss** (Entrümpelung, Stuttgart) darf gezeigt werden, alte Seite ausdrücklich auch. **Noch nicht live** — Stand unter `leoquent.github.io/ruempelross/`, Livegang in den nächsten Wochen. |
| **Preise** | **Webdesign: sichtbar**, Einstieg **ab 1.490 €**. Übrige Leistungen individuell. Potenzialanalyse bleibt kostenlos. **Betreuung Basis ist optional (keine Pflicht).** |
| **Serverstandort** | **Deutschland** — bestätigt. Kein Drittland-Hinweis nötig, „gehostet in Deutschland" ist gedeckt. |
| **Deskriptor** | `MARKE, WEBDESIGN` / `& AUTOMATISIERUNG` — von Leo am 30.09.2026 geändert. |
| **rümpelOS** | Eigenes Produkt (`D:\Coding\ruempelross os\ruempelOS`), Phase 0 — Klick-Prototyp auf Leos VPS, zum Testen und Entwickeln. **Kommt vorerst nicht auf die Website**, auch die übrigen Produkte nicht. Später eigene Domain und eigener Auftritt, danach als Portfolio-Eintrag auf `lqnt.de`. Das alte Geschäft (KI, Automatisierung) wird weiterhin verkauft. |
| **Calendly** | Leo richtet einen eigenen Account später selbst ein. Der Fremdlink muss trotzdem sofort raus. |
| **Web3Forms** | Formular „lqnt", Website-URL `https://lqnt.de` (ohne Pfad — das Quiz ist ein Overlay auf `/`, es gibt keine `/quiz`-Route). Zustellung an `hi@lqnt.de`. Domain-Beschränkung bis zum Umzug auf `lqnt.de` ausgeschaltet lassen. |

Konsequenz für den Rest des Repos: die Fragen „wem gehört leoquent.de", „ist lunda-ki.de noch
erreichbar" und „Trennungsvereinbarung" sind erledigt. Sie stehen noch in
`NEUAUSRICHTUNG_2026.md` Abschnitt 5 und `CLAUDE.md` Abschnitt 11 und werden dort gestrichen.

---

## 1. Der eigentliche Befund

`CLAUDE.md` behandelt „Admir entfernen" als P0 und „Inhalte" als P2. **Das ist die falsche
Reihenfolge**, und zwar aus einem Grund:

> Die Seite verkauft durchgehend das alte Produkt. Nicht in Nebensätzen — in jeder Sektion.

Konkret, von oben nach unten in `app/page.tsx`:

| Sektion | Aktueller Inhalt | Passt zur neuen Positionierung? |
|---|---|---|
| Hero | „KI-Systeme, die Ihre Arbeit machen." | Nein — Webdesign ist das Einstiegsprodukt |
| Ticker | GENERATIVE UI · COMPUTER VISION · NEURAL NETWORKS | Nein — ein Malerbetrieb weiß nicht, was Computer Vision ist |
| Status Quo | „autonome Architekturen", Mission/Vision „autonomes Betriebssystem für den europäischen Mittelstand" | Nein — Enterprise-Sprache an Handwerksbetriebe |
| Solutions | KI-Strategie · Autonome Agenten · Custom Development · System-Integration | Nein — Webdesign ist ein Badge unter Punkt 3 |
| Prozess | Analyse · Architektur · Entwicklung · Betrieb | Struktur ok, Texte sind Software-Projekt-Sprache |
| Branchen | 5 Branchen, alle mit KI-Use-Cases | Nein — laut Strategie max. 2–3, und die Cases sind KI-Cases |
| Warum wir | „Performance Pricing · garantierter ROI" | Nein — und rechtlich angreifbar (unbelegte Erfolgszusage) |
| Über uns | Zwei Profilkarten | Nein |
| CTA | „Bereit für echte Freiräume?" | Fast — Text bezieht sich auf Automatisierung |
| Funnel | 5 Schritte, Frage 4 ist „Nutzen Sie bereits KI-Tools?" | Nein — kein Branchenfeld, KI-zentriert |

Das ist keine Korrekturliste, das ist ein Neutext. **Admir zu entfernen und sonst nichts zu
tun, hinterlässt eine saubere Seite, die das falsche Produkt verkauft.**

**Zweiter Befund:** Die drei Copy-Quellen sind auf *zwei* Achsen kontaminiert — Zweier-Team
**und** KI-first-Positionierung. `New_Website_Copy.md` heißt im Untertitel bereits
„Neuausrichtung", enthält aber acht Branchen, vier KI-Solutions und die „L&A Symbiose".
Diese Dateien zu bereinigen ist mehr Arbeit als sie zu ersetzen. Deshalb: **archivieren, eine
neue Quelle schreiben.**

**Dritter Befund — Entwarnung:** Die „702 Fundstellen über 109 Dateien" klingen schlimmer als
sie sind. Ausgeliefert werden davon **sechs Dateien**:

```
app/page.tsx  app/layout.tsx  app/impressum/page.tsx
app/datenschutz/page.tsx  app/robots.ts  components/QuizModal.tsx
```

Alles andere liegt in `.design-sync/`, `ds-bundle/`, `design-system/`, `docs/` und den
Handover-Markdowns — nichts davon wird gebaut oder importiert (geprüft: kein einziger Import
aus `design-system` oder `ds-bundle` im App-Code). Das ist Block E, nicht Block B.

---

## 2. Die Blöcke

### Block A — Rechtstexte ✅ erledigt bis auf zwei Punkte

Getrennt vom Rest, weil es das einzige ist, das ein echtes Risiko trägt.

| # | Was | Wo |
|---|---|---|
| A1 | Impressum komplett neu: GbR raus, Admir raus, EU-Streitschlichtungs-Block raus (die OS-Plattform der EU wurde eingestellt), `info@lunda-ki.de` → `hi@lqnt.de`, `§ 5 DDG` steht bereits korrekt drin | `app/impressum/page.tsx` |
| A2 | USt-IdNr.: „in Beantragung – wird nach Erteilung ergänzt" bleibt so stehen. Eine Pflichtangabe ist sie nur, wenn sie existiert; die Formulierung ist ehrlich und schadet nicht | `app/impressum/page.tsx:46-50` |
| A3 | Datenschutz: Verantwortlicher ist Leonid Ryazanskiy allein, `hi@lqnt.de`, Hosting-Anbieter **namentlich** statt `[Hosting-Anbieter, z. B. …]` | `app/datenschutz/page.tsx:28-29,34,80` |
| A4 | Calendly: der Link im Erfolgsbildschirm zeigt auf **`calendly.com/ofxffm/30min`** — das ist ein fremder Account. Leo richtet einen eigenen später selbst ein; bis dahin wird der Link durch Telefonnummer + `hi@lqnt.de` ersetzt. Sektion 4 der Datenschutzerklärung bleibt vorbereitet stehen, greift aber erst mit dem eigenen Account | `components/QuizModal.tsx:315`, `app/datenschutz/page.tsx:54-60` |
| A5 | Freiwilliger VSBG-Satz bleibt (steht schon drin, ist korrekt: Hinweispflicht trifft erst ab >10 Beschäftigten) | `app/impressum/page.tsx:68-74` |

**Offen — nur du kannst das:**

- **AVV bei Hostinger abschließen bzw. herunterladen.** Die Datenschutzerklärung behauptet
  jetzt, dass einer besteht. Er muss auch existieren.
- **Serverstandort des VPS bestätigen.** Liegt er außerhalb der EU, braucht die
  Datenschutzerklärung einen Hinweis zur Drittlandübermittlung, und die Aussage „gehostet in
  Deutschland" auf der Startseite muss weg.

*Kein Rechtsrat. Vor dem Livegang einmal über den IHK-Gründungsservice prüfen lassen, das ist
in der Regel kostenlos.*

**Zur Zeitfolge Gewerbe ↔ Livegang:** Das Impressum ist unabhängig vom Anmeldestatus
auszufüllen. Wann die Seite online geht, ist deine Entscheidung — der übliche Weg ist,
die Gewerbeanmeldung vor dem Beginn der Tätigkeit einzureichen, nicht vor dem Launch der
Website.

---

### Block B — Identität im Code ✅ erledigt

Die vollständige Liste. Kein Text wird hier neu erfunden, nur der Name korrigiert und der
tote Zweig entfernt.

| # | Was | Wo |
|---|---|---|
| B1 | Metadaten: Title, Description, `applicationName`, OG, Twitter — überall „leoquent & addequat \| Die AGENTur für den Mittelstand" | `app/layout.tsx:17-52` |
| B2 | Header-Wortmarke `leoquent & addequat` → Bildmarke + `leoquent` als HTML-Text (wie in `brand/LOGO.md` festgelegt) | `app/page.tsx:658-668` |
| B3 | Footer-Copyright | `app/page.tsx:1466` |
| B4 | `robots.ts` Default-URL `https://lunda-ki.de` → `https://lqnt.de` | `app/robots.ts:3` |
| B5 | Web3Forms `from_name: "leoquent & addequat Website"` | `components/QuizModal.tsx:264` |
| B6 | Seitentitel Impressum + Datenschutz | `app/impressum/page.tsx:6`, `app/datenschutz/page.tsx:6` |
| B7 | Admir-Profilkarte (63 Zeilen) entfernen, Über-uns-Grid von `lg:col-span-4 ×3` auf Solo-Layout umbauen | `app/page.tsx:1383-1445` |
| B8 | „Zwei Spezialisten vereint. Eine Lücke geschlossen…" | `app/page.tsx:1317` |
| B9 | `public/FOTOS/admir_cropped.webp` löschen | `public/FOTOS/` |

B7/B8 sind Teil von Block C, wenn die Über-uns-Sektion ohnehin neu geschrieben wird — ich
würde sie aber sofort machen, damit kein Zwischenstand mit einer fremden Person existiert.

---

### Block C — Inhalte (das große Stück)

**Vorgehen:** erst eine neue Copy-Quelle schreiben, dann die Seite daraus bauen. Nicht
umgekehrt, und nicht beides gleichzeitig — sonst driftet wieder alles auseinander.

#### C0 — Neue Copy-Quelle

Eine Datei, `COPY.md`, aus `NEUAUSRICHTUNG_2026.md` Abschnitt 4 abgeleitet. Die drei alten
Dateien wandern nach `docs/archiv/` mit einer Kopfzeile „Historisch, nicht verwenden".
Grund: solange sie im Wurzelverzeichnis liegen, greift jede künftige KI-Sitzung darauf zu.

#### C1 — Sektion für Sektion

| Sektion | Neu |
|---|---|
| **Hero** | Konkretes Versprechen. Der am 30.09.2026 freigegebene Deskriptor lautet *Marke, Webdesign & Automatisierung*. Die Startseite behält zwei Wege. |
| **Ticker** | GENERATIVE UI / NEURAL NETWORKS ersetzen oder Sektion streichen. Der Ticker spricht Entwickler an, nicht Handwerksbetriebe |
| **Status Quo** | Typewriter-Painpoints auf echte Kundenprobleme umschreiben (Anfragen gehen unter, Website von 2014, keine Termine). **Mission/Vision-Block bleibt.** „Das autonome Betriebssystem für den Mittelstand" ist keine Behauptung mehr, sondern beschreibt, woran Leo baut — Prinzip P3 des rümpelOS-Konzepts sagt wörtlich, aus dem einen OS werde später „X OS" für weitere Branchen. Der Block wird aber auf die neue Reihenfolge umgeschrieben: Website zuerst, Prozesse und Automatisierung danach, das Betriebssystem als Fluchtpunkt — **ohne das Produkt zu nennen oder zu bewerben** |
| **Solutions** | Die vier KI-Kacheln durch die drei Angebote aus `NEUAUSRICHTUNG_2026.md` 4.4 ersetzen: **Der Auftritt** (Website) · **Die Nachtschicht** (ein automatisierter Prozess) · **Rückendeckung** (Betreuung). Reihenfolge = Kaufreihenfolge |
| **Prozess** | Struktur (4 Schritte, Sticky-Slider) bleibt — die Technik ist gelöst und stabil. Nur die Texte auf ein Website-Projekt umschreiben |
| **Branchen** | Von 5 auf 3 reduzieren: **Immobilien** (Verwaltungen, Makler) · **Praxen** · **Handwerk**. Handel, Logistik und Social fliegen raus. Immobilien ersetzt keine der beiden anderen, sondern die drei gestrichenen — die Branche stand in den alten Quelldokumenten bereits drin, war aber mit „KI-Immobilienbewertung" belegt und muss auf Verwaltungs- und Maklerprozesse umgeschrieben werden |
| **Warum wir** | „Performance Pricing / garantierter ROI" → **„Festpreis. Vorher. Schriftlich."** Dazu Nachbesserung ohne Mehrkosten und Ratenzahlung 3×. Gleiche Härte, einlösbar, nicht UWG-angreifbar |
| **Über uns** | Eine Person. Leonids Text bleibt inhaltlich, muss aber vom „Symbiose"-Rahmen gelöst werden. Rolle „The Architect of Intent" überdenken — englische Fantasietitel passen nicht zur Zielgruppe |
| **CTA** | Bleibt strukturell, Text von „Automatisierung" auf den Website-Einstieg drehen |
| **Funnel** | Branchen-Schritt ergänzen, „Nutzen Sie bereits KI-Tools?" ersetzen, Antwortoptionen von B2B-Sprache auf Handwerks-/Praxissprache |

#### C2 — Was fehlt und neu gebaut wird

Aktuell hat die Seite **null Vertrauenssignale**. Das ist bei einem Solo-Anbieter ohne
Bekanntheit der wichtigste Hebel:

- **Telefonnummer** in Header und Footer — für Handwerk und Praxen der bevorzugte Erstkontakt
- **Preisanker** — Festpreis sichtbar. *Braucht deine Entscheidung, siehe Abschnitt 3*
- **FAQ-Sektion** — zusätzlich die Grundlage für `FAQPage`-JSON-LD
- **Referenzen** — *braucht deine Entscheidung*

---

### Block D — Marke & Technik

| # | Was |
|---|---|
| D1 | Outfit statt Inter in `app/layout.tsx` + `globals.css`. `next/font` self-hosted → die Aussage in der Datenschutzerklärung bleibt korrekt |
| D2 | Bildmarke aus `brand/marks/` als React-Komponente (die Master tragen `fill="currentColor"`, deshalb nicht als `<img>`). `favicon.svg` → `app/icon.svg`, `app/icon.png` und `apple-icon.png` ersetzen |
| D3 | **Web3Forms reparieren.** Key als GitHub-Secret `WEB3FORMS_KEY`, in `deploy.yml` unter `env:` als `NEXT_PUBLIC_WEB3FORMS_KEY` durchreichen, zusätzlich in `.env.local` für die lokale Entwicklung. Aktuell fehlt er auch in `.env.example` — das Formular funktioniert nicht mal lokal. Formular-Einstellung: URL `https://lqnt.de`, Zustellung `hi@lqnt.de`, Domain-Beschränkung erst nach D5 einschalten |
| D4 | **Fallback im Fehlerfall.** `QuizModal.tsx:620-624` zeigt nur „Senden fehlgeschlagen. Bitte erneut versuchen." Jetzt, wo `hi@lqnt.de` existiert, wird daraus ein sichtbarer `mailto:`-Link plus Telefonnummer. Danach live testen |
| D5 | **Deploy auf den Hostinger-VPS** statt GitHub Pages. `deploy.yml` wird ersetzt: statisch bauen (`out/`), dann per SSH/rsync auf den Server, SSH-Key als GitHub-Secret. `NEXT_PUBLIC_SITE_URL=https://lqnt.de`, `NEXT_PUBLIC_BASE_PATH=""`, `.env.production` anpassen. `public/CNAME` und `.nojekyll` entfallen — beides ist reine GitHub-Pages-Mechanik. Auf dem Server: Webserver auf `out/` zeigen lassen, TLS über Let's Encrypt |
| D6 | OG-Bild 1200 × 630 aus `brand/marks/leoquent-lockup-h-descriptor-white.svg` auf Vanta |
| D7 | JSON-LD `ProfessionalService` + `FAQPage` — greift erst mit echter Anschrift und FAQ |

---

### Block E — Aufräumen

| # | Was |
|---|---|
| E1 | `nodemailer` + `@types/nodemailer` aus `package.json` |
| E2 | Hardcodierte Hex-Farben → Tokens (`app/page.tsx:768,798,944,1280,1326,1389`) |
| E3 | `public/og-image.png` — verwaist |
| E4 | `.env.example`: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_NOTIFY_TO`, `NEUTRON_CRM_*` sind tot. `NEXT_PUBLIC_WEB3FORMS_KEY` fehlt dafür |
| E5 | `design-system/`, `ds-bundle/`, `.design-sync/`, `.superdesign/` — nirgends importiert, tragen aber den alten Namen und werden von KI-Sitzungen gefunden. Löschen oder nach `docs/archiv/` |
| E6 | Wurzelverzeichnis: 13 Markdown-Dateien, davon sind `AI_HANDOVER_PROTOCOL.md`, `EMAIL_HANDOVER.md`, `HANDOVER_CODING_AI.md`, `LAUNCH_CHECKLIST.md`, `TODO.md` überholt. Nach `docs/archiv/`. Übrig bleiben: `CLAUDE.md`, `NEUAUSRICHTUNG_2026.md`, `COPY.md`, `README.md`, `PLAN.md` |
| E7 | `CLAUDE.md` + `NEUAUSRICHTUNG_2026.md` um die vier erledigten Punkte aus Abschnitt 0 korrigieren |
| E8 | Build-Artefakte im Repo: `build.log`, `eslint*.log`, `tsc*.log`, `tsconfig.tsbuildinfo` |

---

## 3. Was ich von dir brauche

**Blockierend — ohne diese Antworten kann ich den jeweiligen Block nicht abschließen:**

1. **Ladungsfähige Anschrift + Telefonnummer.** Für Impressum, Datenschutz, Header, Footer,
   Funnel-Fallback und JSON-LD. Der meistbenutzte Einzelwert im ganzen Projekt.
2. **Wo läuft die Website?** GitHub Pages behalten (kostenlos, Domain zeigt per DNS dorthin)
   oder auf Hostinger, wo die Domain und das Mail schon liegen? Entscheidet den Deploy **und**
   den Hosting-Anbieter, der in der Datenschutzerklärung namentlich stehen muss.
3. **Ist die RümpelRoss-Website ein zeigbares Referenzprojekt?** Und darüber hinaus: welche
   weiteren Projekte darfst du zeigen? Ohne mindestens eins ist weder die Referenzsektion
   baubar noch eine Branchenseite glaubwürdig.
4. **Preise auf die Seite — ja oder nein?** Die Strategie sagt ja (Festpreis ist
   Marktstandard, alle geprüften Wettbewerber nennen Zahlen). Sichtbare Zahlen filtern
   Anfragen vor. Deine Entscheidung.

**Erledigt: die Spannung zwischen Heroprodukt und Upsell-Strategie.**
Sie bestand nur, solange unklar war, was rümpelOS ist. Da es vorerst gar nicht auf die Seite
kommt, verkauft `lqnt.de` genau zwei Dinge — Websites und Automatisierung — und das
Betriebssystem bleibt der Fluchtpunkt der Mission, ohne genannt zu werden. Die Leiter ist im
rümpelOS-Konzept sogar schon technisch angelegt: die Universal-Inbox (Prinzip P2) führt
„Website-Leads (Quiz-Modal)" als eigene Eingangsquelle. Website → Automatisierung → OS ist
eine Linie, keine zwei konkurrierenden Angebote.

**Folgehinweis für später, nicht Teil dieses Plans:** Wenn du Kundenwebsites baust, sollte
deren Lead-Erfassung perspektivisch per Webhook in die Inbox laufen. Das ist ein Argument im
Verkaufsgespräch und gehört in die Angebotsbeschreibung von „Der Auftritt" — technisch aber
erst relevant, wenn rümpelOS Phase 2 erreicht.

**Nicht blockierend:** Block B läuft komplett ohne dich. Block A bis auf die Anschrift auch.
C0 (die neue Copy-Quelle) kann ich vollständig aus der Strategie ableiten und dir zum
Gegenlesen vorlegen — Branchen und Preise bleiben darin als markierte Lücken.

---

## 4. Vorschlag für den Einstieg

**Schritt 1 — sofort, ohne Rückfragen:** Block B komplett. Danach steht nirgends mehr ein
falscher Name und keine fremde Person mehr auf der Seite.

**Schritt 2 — parallel:** Block A bis auf Anschrift und Telefon, mit klar markierten Lücken
an genau zwei Stellen statt der aktuellen sieben Platzhalter.

**Schritt 3 — sobald du Punkt 4 und 6 beantwortet hast:** C0, die neue Copy-Quelle, als
Textdokument zum Gegenlesen. Erst danach fasse ich `app/page.tsx` inhaltlich an.

Grund für diese Reihenfolge: Block B und A haben ein echtes Risiko (fremde Person, fehlendes
Impressum) und null Entscheidungsbedarf. Block C hat kein Risiko, solange die Seite nicht live
ist, aber den größten Entscheidungsbedarf. Also erst das Riskante ohne Rückfragen, dann das
Aufwendige mit Rückfragen.
