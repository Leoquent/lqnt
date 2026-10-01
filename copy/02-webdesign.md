# Webdesign — implementierte Copy für `lqnt.de/webdesign`

**Historische Momentaufnahme vom 26.09.2026.** Die Feedback-Runden vom 30.09.2026
sind im [aktuellen Review](../REVIEW_2026-09-30.md), besonders Abschnitt 9, dokumentiert.
Für den heutigen Wortlaut sind die folgenden Implementierungsdateien maßgeblich.
Diese Datei dokumentiert den damaligen Inhalt aus [page.tsx](../app/webdesign/page.tsx),
[content.ts](../app/webdesign/content.ts), [HeroPresentation.tsx](../app/webdesign/HeroPresentation.tsx),
[HeroScene.tsx](../app/webdesign/HeroScene.tsx), [QArtwork.tsx](../app/webdesign/QArtwork.tsx),
[CopyStatement.tsx](../app/webdesign/CopyStatement.tsx) und
[Collaboration.tsx](../app/webdesign/Collaboration.tsx).
Gestaltung und Angebotsentscheidungen folgen der [Designleitlinie](../brand/DESIGN_LEITLINIE.md).
Neuere ausdrückliche Gesprächsentscheidungen haben Vorrang vor älteren Dokumenten.

Die frühere Webdesign-Copy liegt im
[Archiv vor dem Designwechsel](../docs/archiv/2026-09-25/webdesign-copy-vor-designwechsel.md).
Für diese Seite ersetzt der folgende Stand ältere Abschnittsfolgen und Angebotsformulierungen,
auch wenn sie noch in allgemeinen Copy-Regeln stehen. Beschriftungen und Zitate unten sind
Seiteninhalt; Hinweise zu Reihenfolge, Verhalten und Angebotsgrenzen sind Dokumentation.

**Offene Markenfrage:** Die Seite verwendet derzeit Leoquent als Namen und LQNT als Zeichen
und in der Domain `lqnt.de`. Diese Aufteilung bleibt die Empfehlung; Leo erwägt die
Markenfrage noch. Die Dokumentation des Ist-Stands ist keine neue Brandingfreigabe.

## Der aktuelle rote Faden

Die Seite beginnt mit dem Können des Unternehmens und zeigt anschließend Arbeit, Leistungen
und Expertise in Konzept, Gestaltung und Technik sowie den persönlichen Texter-Vorteil.
Die Besucherführung umfasst Informieren, Kontakt und Bewerbung. Darauf folgen Preise,
Betreuung und Zusammenarbeit. Der persönliche Hintergrund verbindet Webdesign seit der
Jugend mit über einem Jahrzehnt Konzeption und Text in enger Zusammenarbeit mit Art Directors
und Designern. Ideen, Botschaften und Gestaltung werden gemeinsam gedacht.
Eine eigene Problemsektion und eine Branchensektion gehören nicht zu dieser Fassung.

| Reihenfolge | Bereich | Inhaltliche Aufgabe |
|---|---|---|
| 1 | Hero und interaktive Illustration | Botschaft, Gestaltung und Aktion zeigen; den nächsten Schritt passend zum Besucherziel erklären. |
| 2 | Auszeichnungen | Den Hintergrund als Werbetexter zeigen. |
| 3 | Arbeiten | Gebrüder Ross und Rümpelross zeigen und zu eigenen Projektseiten führen. |
| 4 | Leistungen und Expertise | Text, Design, Besucherführung und die passende technische Umsetzung erklären. |
| 5 | Text-Statement | Die Texterstellung als persönliche Leistung in jedem Paket verankern. |
| 6 | Pakete und Betreuung | Projektumfang, Animationsaufwand und optionale Betreuung ab 69 €/Monat einschließlich Hosting, technischem Betrieb und Standard-Domain erklären. |
| 7 | Zusammenarbeit | Vier Schritte mit bleibenden Texten, progressiver Legende und zentrierter Illustration erklären. |
| 8 | Über mich | Ideen, Konzeption und Text, Zusammenarbeit mit Art Directors und Designern, Jugend mit Dreamweaver und KI als Werkzeug einordnen. |
| 9 | FAQ | Umfang, Material, Zeitrahmen und Übergabe klären. |
| 10 | Kontakt | Zum unverbindlichen Erstgespräch per E-Mail oder Telefon führen. |
| 11 | Brücke | Erst Abläufe verstehen, dann mit passender Technik und gegebenenfalls KI vereinfachen. |

## Header und Navigation

- Gesamtes Logo aus Bildmarke und `leoquent`: gemeinsamer Link zum Seitenanfang `#inhalt`; zugängliche Bezeichnung: `Leoquent – zum Seitenanfang`. Schließt das mobile Menü.
- Sprunglink: `Zum Inhalt` → `#inhalt`.
- Hauptnavigation: `Arbeiten` → `#arbeiten`, `Leistungen` → `#leistungen`, `Preise` → `#preise`, `Über mich` → `#ueber-mich`.
- Zusätzlicher Link: `Alle Leistungen` → `/`.
- Kontaktbutton: `Projekt besprechen` → `#kontakt`.
- Mobile Menütaste: `Menü` / `Schließen`. Mobile Navigation mit denselben Abschnittslinks, `Alle Leistungen` → `/`, `Projekt besprechen` und `Prozesse & Automatisierung` → `/prozesse/`.

## Hero

**Auszeichnung:** `Webdesign von Leoquent`

**Headline:**

> Ihr Unternehmen  
> kann was.  
> Zeigen wir es.

**Fließtext:**

> Eine Website, die zeigt, was Sie ausmacht. Durchdacht im Aufbau, eigenständig im Design – mit Texten, die ich für Sie schreibe.

**Aktionen (aktualisiert am 01.10.2026):** `Projekt besprechen` öffnet die Webdesign-Projektanfrage (`QuizModal`, wie der Kontaktbutton in Header und Kontaktsektion). `Pakete ab 1.900 €` → `#preise` bleibt der sekundäre Link.

**Fußzeile:**

> Konzept, Text und Umsetzung. Ein Ansprechpartner.

**Interaktive Illustration:** Die drei Tasten sind mit `01 Botschaft`, `02 Gestaltung` und
`03 Aktion` beschriftet; die Gruppe heißt `Website-Bausteine entdecken`. Desktop- und
Handyansicht zeigen dieselbe Beispielwebsite. Erneutes Betätigen einer Taste spielt die
zugehörige Animation wieder ab, sofern Bewegung aktiviert ist.

Ein einmaliger automatischer Durchlauf führt von Botschaft über Gestaltung zu Aktion:
5.800 ms Haltezeit pro Schritt, danach bleibt Aktion stehen. Der Timer läuft nur, wenn
mindestens 45 % der Präsentation sichtbar sind und der Browser-Tab aktiv ist. Hover mit der
Maus und Fokus innerhalb der Präsentation pausieren den Timer; anschließend läuft die
verbleibende Zeit weiter. Eine manuelle Schrittauswahl beendet den automatischen Durchlauf.
Bei reduzierter oder global pausierter Bewegung gibt es keinen automatischen Wechsel.
Es gibt keinen sichtbaren Hinweistext zum Autoplay. Ein dezenter Symbolbutton trägt die
zugänglichen Bezeichnungen `Automatischen Durchlauf anhalten` bzw.
`Drei Schritte automatisch abspielen`; letzterer startet einen neuen einmaligen Durchlauf.
Bei global pausierter Bewegung ist der Button deaktiviert.

| Auswahl | Eingeblendeter Hinweis | Bildunterschrift |
|---|---|---|
| Botschaft | Die richtigen Worte. | Eine Botschaft. Auf jedem Bildschirm. |
| Gestaltung | Ein eigener Charakter. | Eine Website. Unterschiedliche Ansichten. |
| Aktion | Ein sinnvoller nächster Schritt. | Informieren. Anfragen. Bewerben. |

**Texte innerhalb der Beispielwebsite:**

- Browserrahmen: `Ihr nächster Auftritt`.
- Botschaft: `Ihre Marke.`, `Das macht Sie aus.`, `Gute Arbeit. / Klar gezeigt.`, `Mehr erfahren`.
- Gestaltung: `Ein Auftritt mit Charakter.`, `Bis ins Detail.`, `Form trifft Funktion.`, `01 / Klar gestaltet`, `02 / Überall stimmig`, `Ihre Inhalte. Ihr eigener Rhythmus.`
- Aktion: `Alles klar. Und jetzt?`, `Einfach / weiterkommen.`, `Mehr erfahren`, `Das steckt dahinter.`, `Gut informiert. In Ihrem Tempo.`

**Begleittexte für Screenreader, je Auswahl:**

- `Botschaft: Klare Texte zeigen, was Ihr Unternehmen ausmacht.`
- `Gestaltung: Ring und Strich verbinden sich zum Q von Leoquent. Die Website passt sich beiden Geräten an.`
- `Aktion: Mehr erfahren öffnet zusätzliche Informationen. Der nächste Schritt kann auch eine Anfrage oder Bewerbung sein.`

Die Illustration demonstriert Textaufbau, einen Sektionswechsel und das Öffnen weiterer
Informationen. Die dargestellte Schaltfläche `Mehr erfahren` ist Teil dieser Demonstration,
kein zusätzlicher Kontaktlink der Leoquent-Seite.

In Zustand 1 stehen ein geschlossener Ring und ein leicht versetzter Balken getrennt voneinander.
In Zustand 2 scrollen beide Geräte zur Gestaltung: Der Balken gleitet leicht verzögert
von oben in den geschlossenen Ring. Danach drehen sich beide gemeinsam in die originale
Q-Stellung. Der Ring bleibt durchgehend geschlossen.
Das kleine, kräftig gefüllte Q übernimmt Außenradius 255,33, Innenradius 123,33 und
Schwanzpolygon aus dem zweiten Pfad von `components/LqntMark.tsx`. Die freigegebene
Standalone-Illustration verändert keine Logo-Master. Ohne Animation sowie bei reduzierter
oder pausierter Bewegung steht das finale Q statisch. In Zustand 3 bleibt der Cursor nur
auf dem Desktop und ist am Button verankert; das Telefon zeigt einen Tap-Ring direkt auf
dem Button mit kurzer Druckreaktion. Manuelle Auswahl wird für Screenreader höflich
angekündigt; automatische Wechsel erzeugen keine Live-Ansage.

## Auszeichnungen

> Texte von einem ausgezeichneten Werbetexter.

**Einleitung:** `Ausgezeichnet unter anderem bei`

**Namen:** Cannes Lions · ADC · New York Festivals · The One Show

## 01 / Aus der Arbeit

**Anker:** `#arbeiten`

**Headline:** Von der Idee / zum Auftritt.

**Einleitung:** Wie ich Angebot, Botschaft und Gestaltung zusammenbringe. Einblicke in meine Arbeit.

Zwei direkt verlinkte Projektflächen. Desktop: nebeneinander, leichte Breitenverschiebung und Bildbewegung auf Hover oder Tastaturfokus. Mobil: untereinander, Projektlink immer sichtbar.

### Gebrüder Ross

**Auszeichnung:** Recherche · Marke · Website

**Kurztext:** Nachlassabwicklung verständlich machen. Leistungen ordnen. Persönliches Vertrauen aufbauen.

**Link:** Projekt ansehen → `/referenzen/gebrueder-ross/`

### Rümpelross

**Auszeichnung:** Text · Webdesign · Interaktion

**Kurztext:** Entrümpelung verständlich erklären. Leistungen zeigen. Den Weg zur Anfrage verkürzen.

**Link:** Projekt ansehen → `/referenzen/ruempelross/`

**Nachsatz:** Zwei Unternehmen, zwei eigenständige Auftritte. Mehr zu Konzept und Gestaltung auf den Projektseiten.

## 02 / Was Ihre Website ausmacht

**Anker:** `#leistungen`

**Ausrichtung:** Überschrift und Einleitung stehen links, wie die übrigen Sektionsüberschriften.

**Headline:**

> Gut aussehen ist der Anfang.  
> Verstanden werden das Ziel.

**Einleitung:**

> Ihre Besucher sollen erkennen, was Sie anbieten, warum es zu ihnen passt und wie es weitergeht.

### 01 · Worte, die treffen.

> Was Sie besonders macht, gehört auf den Punkt. Ich übersetze Ihr Wissen in verständliche Botschaften und schreibe die Texte selbst.

### 02 · Ein eigener Auftritt.

> Gestaltung, Bilder und Bewegung passen zu Ihrem Unternehmen. Vom ersten Eindruck bis ins Detail – auf dem Handy genauso wie am großen Bildschirm.

### 03 · Ein klarer Weg.

> Sich informieren, Kontakt aufnehmen oder bewerben: Ihre Besucher finden, was sie brauchen. Verständliche Inhalte und passende nächste Schritte geben Orientierung.

### Expertise — Konzept, Gestaltung und Entwicklung

**Gestaltung:** Helle Fläche `#e3e6d9` mit dunkler Hauptschrift `#192016`. Die Headline steht
linksbündig unter der Auszeichnung „Konzept, Gestaltung und Entwicklung“.

**Headline:**

> Auch unter der Oberfläche durchdacht.

**Ein Aufbau mit Absicht.**

> Welche Fragen haben Ihre Besucher? Was müssen sie zuerst verstehen? Daraus entwickle ich die Reihenfolge Ihrer Inhalte, die Navigation und die passenden Kontaktwege.

**Für echte Nutzung gestaltet.**

> Ich plane für kleine und große Bildschirme. Mit lesbaren Texten, gut erreichbaren Bedienelementen und Animationen, die Orientierung geben.

**Die passende Technik dahinter.**

> Ein schlanker Auftritt, selbst pflegbare Inhalte oder eine Anbindung an bestehende Systeme: Die Umsetzung richtet sich danach, was Sie später mit der Website tun möchten.

**Vor dem Livegang geprüft.**

> Ich prüfe Darstellung, Tastaturbedienung und Kontaktwege. Ladezeiten, Bildgrößen und technische SEO-Grundlagen gehören ebenso dazu wie eine klare Übergabe.

**Nachsatz:**

> Was das für Sie heißt: Text, Gestaltung und Technik entstehen aus demselben Konzept.

Dokumentiert sind diese konkreten Prüftätigkeiten. Daraus werden keine automatisierten
Audit-Ergebnisse, garantierten Messwerte oder Benchmark-Zusagen abgeleitet.

## Text-Statement

Eigene Komponente [CopyStatement.tsx](../app/webdesign/CopyStatement.tsx) mit
[eigenem CSS](../app/webdesign/copy-statement.module.css). Die Überschrift nutzt auf Desktop
die volle verfügbare Inhaltsbreite. Papier und Stift reagieren dort räumlich auf die Maus;
unterhalb von 961 px, ohne geeignete Maussteuerung, bei reduzierter Bewegung oder bei
pausierter Bewegung ist dieser Effekt deaktiviert. Der Text bleibt unabhängig davon lesbar.

**Auszeichnung:** `Der Text ist kein To-do für Sie.`

**Headline:**

> „Schicken Sie mir noch Ihre Texte.“  
> Den Satz hören Sie von mir nicht.

Das Text-Statement enthält keine Signatur.

**Fließtext:**

> Eine neue Website ist schon genug Projekt. Da sollten Sie nicht auch noch vor einem leeren Dokument sitzen und Ihr Unternehmen in die richtigen Worte bringen müssen.
>
> Vielleicht steckt vieles schon in Ihrer bisherigen Website. Ihre Texte, Unterlagen und unser Gespräch sind mein Ausgangspunkt. Ich schärfe die Botschaften und ordne, was für Ihre Kunden zählt. Daraus wachsen Inhalt, Aufbau und Gestaltung gemeinsam – für einen Auftritt, der zeigt, was heute in Ihrem Unternehmen steckt.

## 03 / Der passende Rahmen

**Anker:** `#preise`

**Headline:**

> So viel Website,  
> wie Ihr Vorhaben braucht.

**Einleitung:**

> Umfang, Funktionen und die Inszenierung machen den Unterschied. Sie wählen den Rahmen, der zu Ihrem Vorhaben passt.

Alle drei Karten tragen den Hinweis `Einmaliges Website-Projekt`. Alle Pakete enthalten
Texte für den vereinbarten Umfang. Der Animationsaufwand steigt von dezenten Einstiegs- und
Hover-Animationen über abgestimmte Scroll-Interaktionen bis zu aufwendigerem Scrollytelling.
Die mittlere Karte ist visuell hervorgehoben; eine zusätzliche Empfehlung wird nicht behauptet.

### 01 · Präsenz — ab 1.900 €

**Leitsatz:**

> Ein klarer Auftritt. Auf einer Seite.

**Beschreibung:**

> Für ein überschaubares Angebot, das schnell verständlich werden soll.

**Leistungen:**

- Kompakter Onepager
- Konzept und eigene Texte
- Bewährte Struktur, auf Ihre Marke abgestimmt
- Dezente Einstiegs- und Hover-Animationen
- Kontaktformular und direkter Anruf

**Button:** `Über Präsenz sprechen` — E-Mail an `hi@lqnt.de`, Betreff `Website-Projekt – Paket Präsenz`.

### 02 · Auftritt — ab 3.900 €

**Leitsatz:**

> Mehr Profil. Mehr Raum für Ihr Angebot.

**Beschreibung:**

> Für Unternehmen, die ihre Leistungen und ihren Unterschied ausführlicher zeigen möchten.

**Leistungen:**

- Umfangreicher Onepager oder mehrere Seiten
- Vertiefte Konzeption und eigene Texte
- Individuell entwickeltes Design
- Abgestimmte Scroll-Animationen und Interaktionen
- Geführte Anfrage nach vereinbartem Umfang
- Suchbegriffsrecherche und darauf abgestimmte Inhalte

**Button:** `Über Auftritt sprechen` — E-Mail an `hi@lqnt.de`, Betreff `Website-Projekt – Paket Auftritt`.

### 03 · Wachstum — ab 6.900 €

**Leitsatz:**

> Ein Auftritt mit eigener Dramaturgie.

**Beschreibung:**

> Für anspruchsvolle Inhalte, eine besondere Inszenierung oder zusätzliche Funktionen.

**Leistungen:**

- Erweiterte Seiten- und Inhaltsstruktur
- Konzept und Texte für den vereinbarten Umfang
- Individuelle Grafiken und visuelle Erzählung
- Aufwendigere Animationen und Scrollytelling
- Buchung, Karriere oder Anbindung nach Absprache
- Erweiterte Suchstrategie und gezielte Leistungsseiten

**Button:** `Über Wachstum sprechen` — E-Mail an `hi@lqnt.de`, Betreff `Website-Projekt – Paket Wachstum`.

### Gemeinsamer Preishinweis

**Gemeinsame Grundlagen unter den Paketen:**

> Immer dabei: eigene Texte, mobile Optimierung, technische SEO-Grundlagen und Prüfung vor dem Livegang.

**Preishinweis:**

> Der genaue Festpreis steht vor dem Start fest. Seitenumfang, individuelle Animationen und Anbindungen stimmen wir im Angebot ab. Für den laufenden Betrieb können Sie die Betreuung unten wählen oder Hosting und Domain selbst organisieren. Etwaige Lizenzkosten sind im Angebot ausgewiesen.

### Markengrundlage — aktualisiert am 01.10.2026

**Preis:** ab **990 €**, einmalig, netto zuzüglich Umsatzsteuer. Als Ergänzung zur Website oder als eigenes Projekt.

**Enthalten:**

- Briefing zu Angebot und Zielgruppe
- Logo entwickeln oder modernisieren: eine Gestaltungsrichtung, eine Korrekturrunde
- Farbpalette und Schriftkombination
- Kompakte Markenübersicht und Logo-Dateien für Web und Druck

Markenbotschaft, Sprachleitlinien, vertiefte Markenstrategie, Namensentwicklung und zusätzliche Anwendungen werden separat kalkuliert. Kleine Anpassungen an einem vorhandenen Logo sind auch nach Aufwand möglich. Umfang, Dateien und Festpreis werden vor dem Start vereinbart. Preis und Umfang stehen identisch im Markenbaustein und in der Logo-FAQ; die drei Website-Paketpreise bleiben unverändert.

## Betreuung — Nach dem Livegang

**Gestaltung:** Olivfarbene Fläche `#191e11`.

**Headline:**

> Ihre Website läuft.  
> Ich kümmere mich.

**Fließtext:**

> Damit Ihre Website aktuell bleibt und sich weiterentwickelt: Ich übernehme Hosting und technischen Betrieb, auf Wunsch auch Inhaltspflege und laufende Suchmaschinenoptimierung. Alles in einer Betreuung, passend zu Ihrem Bedarf. Oder Sie übernehmen selbst – mit der vereinbarten Website und allen Zugängen.

**Kennzeichnung und Preis:** `Optional · Hosting inklusive` · **ab 69 € / Monat**

**Leistungsumfang:**

> Inklusive Hosting, technischer Betreuung und einer Standard-Domain. Inhaltspflege, laufende SEO-Arbeit und teurere Wunschdomains erweitern die Betreuung zu einem entsprechend höheren Monatspreis. Leistungen, Umfang und Reaktionszeiten vereinbaren wir vorab.

**Dokumentierte Angebotsgrenze:** Der Einstiegspreis umfasst Hosting, technischen Betrieb
und eine Standard-Domain. Inhaltspflege, laufende SEO-Arbeit und teurere Wunschdomains
erweitern dieselbe Betreuung zu einem entsprechend höheren vereinbarten Monatspreis;
sie sind kein separates Produkt. Es gibt kein pauschales Minutenkontingent und keine
Zusage unbegrenzter Inhaltspflege oder beliebiger Domainkosten. Umfang und Reaktionszeiten
werden vorab vereinbart; etwaige Lizenzkosten stehen im Angebot. Die Betreuung ist optional,
Hosting und Domain können auch selbst organisiert werden.

## 04 / Die Zusammenarbeit

**Anker:** `#ablauf`

Eigene Komponente [Collaboration.tsx](../app/webdesign/Collaboration.tsx) mit
[eigenem CSS](../app/webdesign/collaboration.module.css). Sie verwendet die vier Texte aus
`steps` in `content.ts`; deren aktueller Wortlaut steht unten.

Die Texte erscheinen beim Scrollen nacheinander an ihren festen Positionen untereinander.
Bereits erschienene Schritte bleiben sichtbar. Links ergänzt sich die Legende:
`01 Zuhören`, `02 Struktur`, `03 Umsetzung`, `04 Übergabe`.
Die Illustration folgt **Ohr → Limepunkt → Auge mit grüner Pupille → Limekreis mit Haken**.
Ohr und Punkt werden um denselben Mittelpunkt vergrößert; der Kreis bleibt zentriert und
rund. Beim Übergang zur Übergabe schließt und öffnet sich das Auge einmal: Die Maske folgt
beiden Lidern, statt den Kreis zu quetschen. Anschließend erscheinen der Haken und Schritt 4.
Alle vier Texte und Legenden bleiben nach der Schlussphase stehen.

Der Scroll-Bereich wird ab 961 px Breite und 800 px Höhe nur dann fixiert, wenn beide
Spalten vollständig unter den gemessenen Header passen. Die fixierte Fläche füllt die
verfügbare Bildschirmhöhe unter dem Header. Bei weniger Platz, reduzierter oder pausierter
Bewegung bleiben alle Schritte und die vollständige Legende im normalen Lesefluss sichtbar,
mit statischem Limekreis und Haken. Größenänderungen und geladene Schriften lösen eine
erneute Platzprüfung aus. Native Scroll-Eingaben bleiben erhalten.

**Headline:**

> Ihr Wissen.  
> Mein Handwerk.  
> Unser Projekt.

**Einleitung:**

> Sie kennen Ihr Unternehmen. Ich bringe es in Form. Mit klaren Schritten und Zwischenständen, die Sie sehen können.

### 01 · Erst verstehen.

> Was bieten Sie an? Wen möchten Sie erreichen? Und was soll die Website für Sie tun? In einem kostenlosen Erstgespräch klären wir, ob es passt.

### 02 · Dann auf den Punkt.

> Ich entwickle Struktur, Botschaften und Konzept. Den Leistungsumfang, die Animationen und den Festpreis halten wir vor dem Start schriftlich fest.

### 03 · Sichtbar machen.

> Ich schreibe, gestalte und entwickle. Sie sehen Zwischenstände im Browser und geben Feedback. Die vereinbarten Korrekturrunden gehören dazu.

### 04 · Gut übergeben.

> Vor dem Livegang prüfe ich Darstellung, Bedienung und Kontaktwege. Danach erhalten Sie die vereinbarten Dateien und Zugänge – auf Wunsch mit laufender Betreuung.

## 05 / Hi, ich bin Leo.

**Anker:** `#ueber-mich`

**Aufbau:** Auszeichnung und Headline stehen über beiden Spalten. Das Porträt links hat
eine eigene Bildunterschrift unter dem Bild, ohne Overlay; der Fließtext steht rechts.

**Bildunterschrift:** `Der Kopf hinter Leoquent.`

**Porträt-Alternativtext:** `Leonid Ryazanskiy, Gründer von Leoquent`

**Headline:**

> Ich denke in Ideen.  
> Und in ganzen Websites.

**Fließtext:**

> Ich bin Leonid Ryazanskiy. Seit über einem Jahrzehnt entwickle ich Konzepte, Ideen und Texte für Marken – in enger Zusammenarbeit mit Art Directors und Designern. Dabei habe ich gelernt, Botschaften und Gestaltung zusammenzudenken: Was macht ein Angebot relevant? Was bleibt im Kopf? Und was bewegt Menschen zum nächsten Schritt?
>
> Webdesign begleitet mich seit meiner Jugend, damals noch mit Dreamweaver. Heute verbinde ich diese Leidenschaft mit meiner Erfahrung aus der Werbung. Ich entwickle Ihre Website strategisch und kreativ: mit einer klaren Idee, einem durchdachten Aufbau und einem Design, das Ihre Botschaft trägt.
>
> Von der ersten Formulierung bis zur letzten Interaktion entsteht so ein zusammenhängender Auftritt. Ich schreibe die Texte, gestalte den Weg durch die Seite und setze sie um. Sie haben einen Ansprechpartner, der das Ganze im Blick behält.
>
> KI gehört dabei zu meinen Werkzeugen. Die Richtung geben Ihr Unternehmen, Ihre Ziele und die Menschen vor, die Sie erreichen möchten. Je nach Projekt ergänze ich meine Arbeit durch mein Netzwerk aus Entwicklung, Design, Art Direction, Fotografie, Projektmanagement und Social Media.

**Erfahrungszeile:**

> Unter anderem tätig für:
>
> Scholz & Friends · Serviceplan · Havas · fischerAppelt · Zum Goldenen Hirschen

**Faktengrenze:** „Über ein Jahrzehnt“ beschreibt Konzeption, Ideen und Text für Marken
in enger Zusammenarbeit mit Art Directors und Designern. Webdesign seit der Jugend ist eine
eigene Aussage, keine Behauptung von zehn oder mehr Jahren professioneller Webentwicklung.
Konkrete Einstiegsjahre werden nicht ergänzt.

## 06 / Noch offen?

**Headline:**

> Gute Fragen.  
> Klare Antworten.

Die Antworten sind aufklappbar; jeweils eine kann geöffnet sein.

### Muss ich die Texte selbst schreiben?

> Nein. Die Texte sind in jedem Paket enthalten. Ich brauche Ihr Wissen über Ihr Unternehmen – aus einem Gespräch, vorhandenen Unterlagen und Ihrem Feedback. Daraus entwickle ich die Inhalte für den vereinbarten Website-Umfang.

### Was bedeutet der Ab-Preis?

> Er ist der Einstieg für den beschriebenen Umfang. Im Gespräch klären wir Seiten, Inhalte, Funktionen und Animationen. Danach erhalten Sie ein konkretes Festpreisangebot. Zusätzliche Wünsche stimmen wir gesondert ab, bevor weitere Kosten entstehen.

### Geht auch ein großer Onepager?

> Ja. Die Zahl der URLs entscheidet nicht über die Qualität. Ein Onepager kann Ihr Angebot ausführlich erzählen. Eigene Unterseiten sind sinnvoll, wenn Leistungen unterschiedliche Fragen beantworten oder gezielt einzeln gefunden und verlinkt werden sollen.

### Und wenn Fotos oder Grafiken fehlen?

> Ich prüfe zuerst, was bereits vorhanden ist. Je nach Projekt helfen Bildbearbeitung, individuelle Grafiken, passende Bildlizenzen oder KI-gestützte Bearbeitung. Für eigene Aufnahmen kann ich Fotografen hinzuziehen. Aufwand und Nutzungsrechte klären wir im Angebot.

### Wie lange dauert die Umsetzung?

> Als Orientierung: drei bis sechs Wochen, abhängig von Umfang, Funktionen und Abstimmungen. Einen belastbaren Zeitplan vereinbaren wir nach dem Erstgespräch. Sie müssen vor dem Start keine fertigen Website-Texte liefern.

### Kann ich die Website später selbst betreuen?

> Ja. Sie können den Betrieb selbst übernehmen oder einen anderen Dienstleister beauftragen. Wenn Sie Inhalte selbst ändern möchten, planen wir die passende Bearbeitungsmöglichkeit von Anfang an ein. Alternativ kümmere ich mich ab 69 € im Monat um Hosting, eine Standard-Domain und den technischen Betrieb. Auf Wunsch gehören auch Inhaltspflege und laufende Suchmaschinenoptimierung zur Betreuung. Dafür vereinbaren wir einen entsprechend höheren Monatspreis. Teurere Wunschdomains berücksichtigen wir ebenfalls. Leistungen, Umfang und Reaktionszeiten stehen vorab fest.

### Ist Suchmaschinenoptimierung enthalten?

> Technische SEO-Grundlagen gehören zu jeder Website: eine verständliche Struktur, passende Seitentitel und Beschreibungen sowie indexierbare Inhalte. In den größeren Paketen kommen Suchbegriffsrecherche und eine vertiefte Inhalts- und Seitenplanung hinzu. Nach dem Start kann laufende SEO-Arbeit Teil Ihrer Betreuung sein – etwa die Auswertung relevanter Suchanfragen und die Weiterentwicklung Ihrer Inhalte. Dafür legen wir einen passenden monatlichen Umfang fest. Bestimmte Platzierungen lassen sich nicht garantieren.

### Arbeiten Sie allein?

> Ich bin Ihr direkter Ansprechpartner und verantworte Konzept und Umsetzung. Je nach Projekt ergänze ich meine Arbeit durch mein Netzwerk aus Entwicklung, Design, Art Direction, Fotografie, Projektmanagement und Social Media.

## Kontakt

**Anker:** `#kontakt`

**Auszeichnung:** `Der erste Schritt ist ein Gespräch.`

**Headline:**

> Erzählen Sie mir,  
> was Sie vorhaben.

**Fließtext:**

> Neue Website oder neuer Blick auf die bestehende? Ich höre mir an, was Sie brauchen, und sage Ihnen ehrlich, was ich dafür tun kann.

**Kontaktwege:**

- `Projekt besprechen` — E-Mail an `hi@lqnt.de`, Betreff `Lassen Sie uns über meine Website sprechen`.
- `Oder direkt anrufen` — Telefonlink zu `+49 176 47177623` (`tel:+4917647177623`).

**Hinweis:** `Kostenloses Erstgespräch · unverbindlich`

Die Kontaktaktion auf dieser Seite öffnet eine E-Mail. Es gibt hier kein eingebautes
Kontaktformular, Terminbuchungsmodul oder Analyse-Quiz; solche Funktionen in den Paketen
beschreiben Leistungen für Kundenwebsites.

## Brücke zu Prozesse & Automatisierung

Steht nach dem Kontakt und dokumentiert nur den Verweis von der Webdesign-Seite.

**Auszeichnung:** `Erst verstehen. Dann sinnvoll vereinfachen.`

**Headline:**

> Weniger von Hand.  
> Mehr Zeit fürs Eigentliche.

**Fließtext:**

> Dieser Blick aufs Ganze endet nicht bei der Website. Wo gehen in Ihrem Alltag Zeit und Informationen verloren? Ich analysiere Ihre Abläufe, verbinde bestehende Software oder entwickle passende Werkzeuge. Mit KI, wenn sie hilft. Ohne, wenn es einfacher geht. Auch unabhängig von einer neuen Website.

**Link:** `Prozesse & Automatisierung` → `/prozesse/`

## Footer

- Marke: `leoquent` → `/`.
- E-Mail: `hi@lqnt.de` → `mailto:hi@lqnt.de`.
- Copyright: `© {aktuelles Jahr} Leoquent · Leonid Ryazanskiy` — Jahr dynamisch.
- Bewegungstaste: `Bewegung pausieren` / `Bewegung fortsetzen`.
- Links: `Impressum` → `/impressum/`, `Datenschutz` → `/datenschutz/`, `Nach oben ↑` → `#inhalt`.
