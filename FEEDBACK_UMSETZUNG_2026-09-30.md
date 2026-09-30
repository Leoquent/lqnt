# Feedback sinnvoll umsetzen

Stand: 30. September 2026. Arbeitsbranch: `agent/feedback-seo`, Basis `lqnt/main` bei `72a310e`. Veröffentlichung erst nach Sichtung durch Leo.

## Einschätzung

Die Rückmeldungen sind wertvoll, weil sie konkrete Verständnis- und Darstellungsprobleme zeigen. Sie sind keine repräsentative Kundenbefragung und belegen keine höhere Anfragequote. Die sinnvollste Konsequenz ist ein verständlicherer, persönlich erkennbarer Auftritt mit echten Belegen. Die bestehende Gestaltung und die klare Entscheidung auf der Startseite bleiben die Grundlage.

## Entscheidungen zum Feedback

| Punkt | Umsetzung / Entscheidung |
|---|---|
| S01 Kopfbereich | Kompakte Zeilenhöhe der Wortmarke und zentrierter Deskriptor; optisch in der Vorschau prüfen. Logo unverändert. |
| S02 Illustration über Text | Dekorative Linien im aktiven Zustand deutlich zurückgenommen; Text optisch freigestellt. |
| S03 iPhone-Pfeil | Unicode-Pfeile in den Gateway-Karten durch SVG ersetzt. Damit unabhängig vom Emoji-Font. Ein echter iPhone-Test bleibt ein sinnvoller abschließender Gerätecheck. |
| S04 „Luft bekommen“ | Freigegebene Formulierung „Zeit gewinnen“. |
| S05 Beispiele auf Entscheidungsebene | Bewusst nicht übernommen. Die Startseite bleibt clean. Konkrete Beispiele folgen auf den Leistungsseiten. |
| W01 Paketbutton Wachstum | Outline bleibt: Das mittlere Paket hat eine bewusste visuelle Hervorhebung. Alle drei Kontaktwege funktionieren gleich. Die Preisstufen bleiben unverändert. |
| W02 Projekttext klein | Lesbare 16 px und mehr Zeilenabstand. Echte Projektansicht statt Platzhalter. |
| W03 SEO / KI-Suche | Als Arbeitsweise erklärt und an Leoquent umgesetzt: Seitenstruktur, Metadaten, Sitemap, strukturierte Daten, eigene Projektseite und vertiefende Seite zur SEO-/GEO-Arbeit. |
| W04 Awards | Beibehalten und zur beruflichen Erfahrung verschoben. Die Einordnung bezieht sich ausdrücklich auf Arbeiten aus der Werbelaufbahn. Details zu einzelnen Auszeichnungen fehlen noch. |
| W05 zu starke Handwerksanmutung | Das echte Projekt Gebrüder Ross wird als Nachlassservice mit professionellen Auftraggebern beschrieben. Keine künstliche Beschränkung des Angebots auf Handwerk. |
| P01 Mission/Vision klein | Größer und verständlicher: konkreter Ausgangspunkt und Ziel der Zusammenarbeit. |
| P02 Pluszeichen | Gefüllter Kreis mit ausgespartem Plus; geöffneter Zustand wechselt durch Drehung und Farbe. Ganze Zeile bleibt bedienbar. |
| P03 Nutzen verständlich | Angebot, Hero, Ablauf und persönliche Vorstellung überarbeitet. Konkrete Beispiele: Daten übertragen, Anfragen sortieren, Vorgänge überblicken. Unbelegte ROI-Garantie entfernt. |
| P04 Branchenideen | Als mögliche Anwendungen eingeordnet. Technische Machbarkeit und Umfang werden projektbezogen geklärt. |
| G01/G02 Klarheit und Belege | Nutzen verständlicher; reales Projekt mit eigener Detailseite und öffentlichem Link. |
| G03 Persönlichkeit | Leo früher im Einstieg sichtbar, persönliche Nutzenaussage und beruflicher Hintergrund zusammengeführt. Eigene Motive werden nicht erfunden. |
| G04 Video | Später sinnvoll: 30–60 Sekunden mit einer konkreten Vorstellung. Benötigt eigene Aufnahme; kein Platzhaltervideo eingesetzt. |
| G05 Name | Leoquent bleibt. |
| G06 Abstände | Lesefluss der betroffenen Projekttexte verbessert. Kein pauschales Aufblähen aller Abschnitte. |

## Seitenstruktur und SEO / GEO

Mit „KEO“ ist hier die Optimierung für KI-Suche gemeint; der verbreitete Begriff dafür ist GEO. Priorität haben echte Inhalte und technische Zugänglichkeit.

| Seite | Eigene Aufgabe und Inhalt |
|---|---|
| `/` | Zwei verständliche Einstiege: sichtbar werden / Zeit gewinnen. |
| `/webdesign/` | Angebot, Projektbeleg, eigene Texte, Ablauf, Preise, Person, Fragen, Kontakt. |
| `/prozesse/` | Arbeitsalltag, mögliche Verbesserungen, Vorgehen, Ansprechpartner und nächster Schritt. |
| `/referenzen/gebrueder-ross/` | Reales Projekt: Zielgruppe, Aufgabe, Strukturentscheidungen, Desktop-/Mobilansicht und Link zur Website. Später echtes Kundenzitat. |
| `/webdesign/seo-und-ki-suche/` | Wie Inhalte und Technik für Suche geplant werden; wann eigene Seiten sinnvoll sind; Leistungsumfang und Grenzen. |

### Später ergänzen, wenn genügend eigene Substanz vorliegt

1. **Persönliche Seite:** berufliche Stationen, Motivation für Leoquent, eigene Arbeitsweise und überprüfbare Award-Beispiele. Vorerst erfüllt der ausführliche Über-mich-Abschnitt diese Aufgabe.
2. **Ein echter Automatisierungsfall:** Ausgangslage, Ablauf vorher/nachher, eingesetzte Systeme, Freigaben und gemessener Nutzen. Erst mit einem dokumentierten Projekt.
3. **Gezielte weitere Leistungsseiten:** beispielsweise Website-Texte oder Website-Relaunch, wenn Umfang, Verfahren und Beispiele eine eigenständige Seite tragen. Nicht einfach die Webdesign-Seite umformulieren.
4. **Regionale Positionierung:** Düsseldorf ist im Impressum genannt. Bevor lokale Suchseiten aufgebaut werden, klären, ob vor Ort oder überregional geworben werden soll. Keine Liste austauschbarer Städte-Seiten.

### Technische Änderungen

- Standarddomain `https://lqnt.de` statt altem GitHub-Wert.
- Eigene Canonicals und Metadaten für die indexierbaren Seiten; kein pauschal vererbter Startseiten-Canonical.
- Sitemap für alle fünf fachlichen Zielseiten; keine künstlich täglich erneuerten Änderungsdaten.
- Vorhandenes OG-Bild statt Verweis auf fehlende `og-webdesign.png`.
- Strukturierte Angaben zu Organisation, Person, Website, Leistungen, Artikel und Projekt-Brotkrumen. Keine erfundenen Bewertungen oder Erfolge.
- Demo-Video als technische Demo auf `noindex`; Rechtstexte behalten ihren bisherigen `noindex`-Status.
- Bestehende Crawler-Freigabe in robots.txt beibehalten. Keine zusätzliche KI-Datei als vermeintlichen Rankingtrick.

### Nach Veröffentlichung überprüfen

- Domain in Google Search Console und Bing Webmaster Tools prüfen, Sitemap einreichen, Indexierung der fünf Zielseiten ansehen.
- Tatsächliche Suchbegriffe, Klicks und qualifizierte Anfragen als Ausgangsbasis dokumentieren. Daraus nach ausreichender Datenmenge weitere Inhalte ableiten.
- Server-/CDN-Zugriff für Suchcrawler prüfen. Eine robots.txt-Freigabe allein sagt nichts über Firewallregeln aus.
- Die Vorschau erhält im angepassten Workflow `noindex` ausschließlich in ihrer Kopie des Build-Artefakts, einschließlich der Next-Navigationsdaten. Die Produktionsfreigabe lädt weiterhin das unveränderte Original-Artefakt. Nach Veröffentlichung den tatsächlichen Vorschau-Header/HTML-Stand kontrollieren; zusätzliche serverseitige Absicherung ist möglich.
- Keine Ranking-, Umsatz- oder KI-Zitationssteigerung behaupten, bevor sie gemessen ist.

## Quellen und Ableitung

Primärquellen, geprüft am 30.09.2026:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): bestehende SEO-Grundlagen gelten weiter; kein besonderes AI-Markup erforderlich.
- [Google: hilfreiche Inhalte](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): nachvollziehbare Erfahrung, Quellen und Urheberschaft. Daraus folgen hier die persönliche Einordnung und der konkrete Projektbeleg.
- [Google: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): verständliche Struktur, Seitentitel und verknüpfte Inhalte.
- [Google: Spamrichtlinien](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse): keine nahezu identischen Seiten allein für viele ähnliche Suchanfragen. Daher keine vorschnelle Städte- oder Branchenserie.
- [OpenAI: Crawler](https://developers.openai.com/api/docs/bots): OAI-SearchBot dient der Suche, GPTBot dem Modelltraining. Die Einstellungen sind unabhängig. Bestehende Regeln bleiben unverändert.
- [Gebrüder Ross](https://gebruederross.de/): öffentlich sichtbare Leistungen, Struktur, Ansprechpartner und Screenshots. Die Referenzbeschreibung interpretiert diese Gestaltung; sie behauptet keine gemessene Geschäftswirkung.

## Offene Angaben von Leo

**Du musst nicht das gesamte Dokument beantworten.** Für die nächste Inhaltsrunde reichen die Punkte 1–3. Das Kundenzitat folgt, sobald der Kunde antwortet; Suchstatistik-Zugänge können wir nach der Sichtung klären. Deine Angaben zum Umfang des Gebrüder-Ross-Projekts sind inzwischen eingearbeitet.

1. **Persönliche Motivation:** Warum hast du Leoquent gestartet, und welche Art Zusammenarbeit macht dir besonders Freude? Drei ehrliche Sätze reichen.
2. **Awards konkret:** Welche zwei oder drei Arbeiten können wir mit Marke, Jahr, Wettbewerb, Auszeichnung und deinem genauen Anteil nennen oder verlinken?
3. **Zielkunden/Region:** Welche Aufträge möchtest du in den nächsten sechs Monaten besonders gewinnen? Vor Ort im Raum Düsseldorf oder überregional?
4. **Kundenzitat:** Echte Antwort und Freigabe von Gebrüder Ross. Vorlage unten.
5. **Messung:** Besteht Zugriff auf Search Console / Bing Webmaster Tools? Keine Zugangsdaten in diesen Text schreiben.

## Kopierfertige Nachricht für Gebrüder Ross

> Hey Rapha, ich würde euren neuen Auftritt gern als Referenz auf meiner Website zeigen. Hättest du Lust, mir dafür kurz aus deiner Sicht zu antworten?
>
> – Was war euch beim neuen Auftritt besonders wichtig oder vorher schwierig?
> – Was hat euch an unserer Zusammenarbeit am meisten geholfen?
> – Was ist für euch am Ergebnis besonders gelungen?
>
> Ein paar ehrliche Sätze oder eine kurze Sprachnachricht reichen. Falls sich schon etwas konkret verbessert hat, erzähl gern davon – es muss aber keine Erfolgszahl sein. Ich würde daraus gegebenenfalls ein kurzes Zitat kürzen und dir den genauen Wortlaut vor Veröffentlichung zur Freigabe schicken. Wäre die Nennung mit deinem Namen, deiner Funktion und „Gebrüder Ross“ für dich in Ordnung? Welche Funktionsbezeichnung soll ich verwenden?

Die Nachricht ist vorbereitet, nicht versendet. Ein freigegebenes Zitat passt direkt unter das Projekt auf `/webdesign/` und ausführlicher auf die Projektseite. Keine künstliche Sternebewertung oder unbelegte Erfolgsaussage ergänzen.

## Prüfprotokoll

- Produktionsbuild und TypeScript-Prüfung bestanden, statischer Export erstellt. ESLint wird durch die bestehende Build-Konfiguration übersprungen; kein bestandener Lint-Lauf behauptet.
- Fünf Inhaltsseiten bei 390 und 1440 px geprüft: kein horizontaler Überlauf, keine JavaScript-Laufzeitfehler, keine fehlenden Bilder und keine defekten internen Linkziele.
- Weitere Ansichten bei 320, 768 und 1440 px mit aktiven Animationen geprüft. Nach einem Fund auf kurzen Displays die Prozess-Einleitung dort in den normalen Scrollfluss gesetzt; CTA-Erreichbarkeit anschließend bei 568, 667 und 900 px Höhe gezielt per Treffertest bestätigt.
- Projekt-Akkordeon und mobile Leistungs-Akkordeons geprüft; Leistungs-Akkordeon zusätzlich per Enter geöffnet/geschlossen.
- Metadaten, eindeutige Canonicals und parsbare JSON-LD-Ausgabe aus dem tatsächlich exportierten HTML geprüft. Sitemap enthält die fünf fachlichen Zielseiten.
- Zwei Tests für Vorschau-noindex bestanden: HTML und Navigationsdaten angepasst, wiederholte Ausführung unverändert, Produktionsdatei unangetastet.
- `git diff --check` bestanden.
- WebKit ist lokal nicht installiert. Es wurde kein echter iPhone-/Safari-Test durchgeführt. Der betroffene Pfeil ist jetzt echte SVG-Geometrie statt eines Unicode-Zeichens.
- Suchmaschinenzugang außerhalb von robots.txt, Indexierungsstatus und tatsächliche Suchleistung sind ohne Search-Console-/Serverzugriff nicht geprüft.
- Keine Kundenanfrage übermittelt; der bestehende Lead-Endpunkt wurde nicht mit Testanfragen belastet.

**Bestätigter Live-Befund:** `https://lqnt.de/` und die Live-Sitemap zeigen am 30.09.2026 noch `https://leoquent.github.io/`. `https://vorschau.lqnt.de/` liefert `index, follow` ohne zusätzlichen noindex-Header. Beide Befunde sind in diesem Branch adressiert, aber erst nach einer Veröffentlichung behoben.

**Lokaler Build:** Eine alte lokale Umgebungsvariable setzt `/leoquentaddequat` als Unterpfad. Die Prüfung erfolgte mit explizit leerem `NEXT_PUBLIC_BASE_PATH` und `NEXT_PUBLIC_SITE_URL=https://lqnt.de`. Private `.env`-Dateien werden nicht ins Repository übernommen. Der aktuelle GitHub-Workflow verwendet ohne diese privaten Dateien die korrekten Standardwerte.

**Dokumentationsabweichungen:** Die bestehende `AGENTS.md` beschreibt den Lead-Versand noch als Web3Forms/offen; der aktuelle Code nutzt bereits `https://api.lqnt.de/lead`. Ältere Roadmap-/Copy-Dokumente sind daher nicht als ungeprüfte Quelle für den Live-Stand geeignet. Dieser Bericht hält die Entscheidungen dieser Überarbeitung fest.

Screenshots und maschinenlesbare Prüfergebnisse liegen lokal unter `Eigener-Auftritt/gesammeltes Feedback/Website-Pruefung/`.

## Ergänzung: Gebrüder Ross als vollständige Referenz

Die ergänzenden Angaben von Leo und der achtseitige Projektbericht aus der Übergabe vom 29.09.2026 wurden ausgewertet. Die Referenz beschreibt jetzt Recherche, Zielgruppenverständnis, gesamte Textentwicklung, Logoentwicklung und Vektoraufbereitung, KI-gestützte Bildbearbeitung, sechs Leistungsseiten, mobile Optimierung, eigenen Formular-Endpunkt, Besucherstatistik sowie Domain und Hosting.

Die fachliche Abstimmung mit einem Nachlasspfleger aus Stuttgart stammt aus Leos aktueller Angabe. Sie wird ohne Namensnennung oder erfundenes Empfehlungsschreiben beschrieben. Die Statistik wird konkret als selbst gehostet, ohne Analyse-Cookies und ohne IP-Speicherung in der Statistik eingeordnet. Daraus entsteht keine pauschale rechtliche Compliance-Zusage. Historische Kompressionswerte werden nicht als neu gemessener Ladezeitgewinn dargestellt. Private Verträge und Übergabedokumente bleiben außerhalb des öffentlichen Repositorys.

### Einheitliches Format für weitere Referenzen

1. **Aufgabe und Zielgruppe:** Was musste der Auftritt leisten?
2. **Desktop-Rundgang und mobile Ansicht:** echte Websiteaufnahme mit bewusstem Start, Standbild vor Wiedergabe; keine automatisch laufende Schleife.
3. **Entscheidungen und Beitrag:** Recherche, Sprache, Gestaltung und Umsetzung verständlich erläutern.
4. **Zwei bis drei Detailansichten:** beispielsweise Menschen, Leistungserklärung oder besondere Interaktion. Jede Ansicht erklärt eine konkrete Entscheidung.
5. **Betrieb und belegbare Ergebnisse:** Umfang und technische Entscheidungen; Geschäftserfolge nur mit Nachweis.
6. **Echtes Kundenzitat:** sobald Wortlaut, Name und Funktion freigegeben sind.

`ProjectShowcase` stellt das wiederverwendbare Medienformat bereit. Gebrüder Ross hat einen kurzen stummen WebM-Rundgang, eine Smartphoneansicht und zusätzliche Screenshots von Team und Leistungen. Das Video lädt erst auf Anforderung (`preload="none"`) und läuft nicht automatisch. Die Bilder und Texte vermitteln den Inhalt auch ohne Wiedergabe.

## Weitere Desktop-/Mobile-Review-Runde

Die nachfolgenden Entscheidungen wurden am 30.09.2026 mit Leos laufenden Browserkommentaren weiterentwickelt. Der aktuelle Alt/Neu-Vergleich, die gesamte Review-Liste, Branding-/Betreuungskalkulation und Prüfgrenzen stehen in [REVIEW_2026-09-30.md](REVIEW_2026-09-30.md). Dort aufgeführte neuere Textentscheidungen ersetzen frühere Vorschläge dieses Dokuments.
