# Referenz: Nachlassbüro Andreas Moll

Stand: 25.10.2026. Route: `/referenzen/andreas-moll/`.

## Inhalt und Bildquellen

- `moll-vorher.webp`: echte Aufnahme der früheren Website vom 29.09.2026, aus dem Projektbestand. Kein Zwischenstand des Relaunchs.
- `moll-desktop.webp`, `moll-mobile.webp`, `moll-taetigkeiten.webp`, `moll-team.webp`: Aufnahmen der veröffentlichten Website vom 25.10.2026. Die Teamaufnahme zeigt die Justitia im Seitenkontext.
- `moll-logo-vorher.webp`: ursprüngliche, vom Kunden bereitgestellte Rastermarke mit Schatten und Verläufen. Die Bilddatei bleibt vollständig; die Darstellung im Vergleich schneidet ausschließlich den äußeren Weißraum an.
- `moll-logo.svg`: am 25.10.2026 freigegebene Vektorfassung mit Claim, unverändert aus dem Logo-Paket übernommen.
- Rasterbilder wurden als WebP komprimiert. Screenshots wurden inhaltlich nicht retuschiert.

Porträts und buntes Knotenmotiv sind Kundenmaterial. Nach Angaben von Andreas wurden seine Porträts vorab mit KI bearbeitet; die Referenz beansprucht keine eigene Fotoproduktion. Die Justitia-Gestaltung und ihre zurückhaltende Animation gehören zum Website-Projekt.

## Abgrenzung des Leistungsstands

Website und Logo-Paket sind veröffentlicht beziehungsweise übergeben. Die Visitenkarten werden als zwei Entwurfsrichtungen zur Auswahl beschrieben. Druckfreigabe und finale Druckausarbeitung sind nicht Bestandteil der Erfolgsaussage. Ausfüllbare PDF-Prüffassungen und die nicht aktive Online-Datenrückmeldung werden nicht als fertige öffentliche Funktionen beworben.

Keine erfundenen Kundenzitate, Leistungskennzahlen oder Aussagen über zusätzliche Anfragen. Ein späteres Testimonial gehört mit freigegebenem Wortlaut und Namensnennung zwischen Projektabschluss und Kontaktaufforderung; bis dahin bleibt die Seite ohne Zitat oder Platzhalter.

## Einbindung

Die Seite verwendet die vorhandenen Komponenten für redaktionelle Projektseiten, Desktop-/Handyansicht und Screenshots. Der neue Galerieeintrag steht unter dem bestehenden Zweierpaar; seine Bildhöhe folgt der verfügbaren Breite. Der Case ist über die Galerie, die Rümpelross-Projektseite und die Sitemap erreichbar.

Die Veröffentlichung folgt dem bestehenden Branch- und Freigabeablauf. Ein Push des Case-Branches veröffentlicht noch keine neue Produktionsversion.

## Wiederverwendbare Referenzvorlage

Alle drei Projekte verwenden jetzt `components/ReferenceCase.tsx` und die gemeinsame Route `app/referenzen/[slug]/page.tsx`. Inhalte stehen separat in `content/reference-existing.ts` und `content/reference-moll.ts`. Die Registrierung in `lib/references.ts` erzeugt Galerieeintrag, Nummerierung, Unterseite und Sitemap. Normale Karten werden automatisch paarweise gruppiert; breite Einträge stehen einzeln.

Die ausfüllbare Vorlage liegt unter `vorlagen/REFERENZ-AUSFUELLEN.md`, die technische Inhaltsvorlage daneben als `referenz.ts.example`. Ein freigegebenes Kundenzitat ist ein optionaler Datenbaustein. Nicht freigegebene Zitate werden weder angezeigt noch als Galeriedaten an den Browser übertragen.

Die Umstellung wurde gegen die zuvor exportierten Seiten geprüft: sichtbare Texte, Bilder samt Alternativtexten und Links sind bei allen drei Cases identisch. Der neue Build erzeugt alle drei bisherigen Referenz-URLs. Es sind keine Änderungen an den noch separat liegenden FAQ-Commits enthalten.

## Prüfung am 25.10.2026

- Produktionsbuild einschließlich TypeScript-Prüfung erfolgreich; neue Route statisch exportiert.
- Gezieltes ESLint: keine Fehler, fünf Hinweise zu den im vorhandenen statischen Export verwendeten `img`-Elementen.
- 98 lokale Link- und Assetverweise in Case, Übersicht und Rümpelross-Seite geprüft; keine fehlenden Ziele. Canonical, Sitemap und jeweils eine Hauptüberschrift bestätigt.
- Case bei 320 und 390 Pixeln sowie Desktop geprüft; kein horizontaler Seitenüberlauf. Website- und Logo-Vergleiche visuell geprüft.
- Galerie bei 390, 900 Pixeln und Desktop geprüft. Die bestehenden zwei Karten bleiben zusammen, Moll folgt als eigener Eintrag. Der Bildausschnitt zeigt Tätigkeit und Person.
- Neue Galerie-Verlinkung per Enter geöffnet; keine Browserfehler beobachtet.
