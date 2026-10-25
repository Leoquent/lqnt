# Eine neue Referenz für leoquent

Diese Vorlage kopieren und ausfüllen. Stichpunkte reichen als Ausgangspunkt. Der Seitenaufbau ist bereits vorhanden: Texte und Bilder werden in gemeinsame Bausteine eingesetzt. Eine neue Projektseite muss dafür nicht mehr gestaltet oder programmiert werden.

## 1. Das Projekt auf einen Blick

- **Kunde / Projektname:**
- **Branche / Tätigkeit:**
- **Veröffentlichte Website:**
- **Projektstand und Abschlussdatum:**
- **Wer soll die Kundenwebsite nutzen?**
- **Was sollte die Website für diese Menschen leisten?**
- **Welche Leistungen habe ich tatsächlich übernommen?**
- **Was kam vom Kunden oder von anderen Beteiligten?**
- **Darf ich das Projekt und dieses Bildmaterial als Referenz zeigen?**

## 2. Galerie und Einstieg

- **Kurze Kategorie:** zum Beispiel „Website-Relaunch · Logo-Modernisierung“.
- **Galerietext:** zwei bis drei kurze Sätze zur Aufgabe.
- **Hauptüberschrift:** ein konkreter Gedanke, möglichst in zwei kurzen Zeilen.
- **Einleitung:** ein bis zwei Sätze zur Einordnung.
- **Überblick:** ein Absatz zur Ausgangslage, meinem Beitrag und dem fertigen Auftritt.

## 3. Die Geschichte des Projekts

Drei bis fünf Abschnitte reichen meist. Nicht jedes Projekt braucht jeden Baustein. Pro Abschnitt: Überschrift, ein bis drei Absätze und bei Bedarf ein passendes Bild.

### Ausgangslage

- Was war bereits vorhanden?
- Was war für Besucher schwierig oder unklar?
- Was sollte erkennbar bleiben?

### Konzept und Inhalte

- Welche Inhalte oder Leistungen habe ich geordnet?
- Was habe ich geschrieben oder überarbeitet?
- Welche Wege können Besucher jetzt nehmen?

### Gestaltung und Besonderheiten

- Welche gestalterischen Entscheidungen passen zur Aufgabe?
- Welche Illustration, Animation oder Funktion erklärt etwas Wichtiges?
- Gab es eine neue Marke oder eine Modernisierung? Genau unterscheiden.

### Umsetzung und Ergebnis

- Was ist jetzt tatsächlich veröffentlicht oder nutzbar?
- Was wurde übergeben?
- Welche ergänzenden Leistungen sind erwähnenswert?
- Was ist noch ein Entwurf? Welche Auswahl oder Freigabe steht aus?

Nur belegte Ergebnisse nennen. Keine zusätzlichen Anfragen, Umsatzsteigerungen, Messwerte oder Kundenaussagen ergänzen, wenn sie nicht vorliegen.

## 4. Bilder planen

| Bild | Zweck | Datei / Quelle | Bildunterschrift |
|---|---|---|---|
| Desktop-Einstieg | Projektansicht und Galerie | | |
| Mobiler Einstieg | Dieselbe Website auf dem Handy | | |
| Detail 1 | Wichtigste Besonderheit zeigen | | |
| Detail 2, optional | Weitere konkrete Entscheidung zeigen | | |
| Echte Altwebsite, optional | Vorher–Nachher-Vergleich | | |
| Altes und neues Logo, optional | Modernisierung zeigen | | |

Ich empfehle Desktop und Handy plus ein bis drei aussagekräftige Details. Ein Screenshot soll jeweils etwas Neues erklären. Die Desktop-Aufnahme lässt sich für Galerie und Vergleich wiederverwenden. Visitenkartenbilder sind sinnvoll, wenn Geschäftsausstattung ein Schwerpunkt war; sonst genügt die Erwähnung im Text.

Vorher und nachher möglichst bei gleicher Bildschirmgröße aufnehmen. Ein früherer Relaunch-Entwurf ist keine Altwebsite. Screenshots nicht verzerren. Für die Doppelansicht eignen sich etwa 1280 × 800 Pixel am Desktop und 390 × 844 Pixel mobil. Abweichende echte Maße korrekt eintragen. Rasterbilder als optimierte WebP-Dateien, Vektorlogos als SVG. Alternativtext und Bildunterschrift beschreiben das Sichtbare und seine Aufgabe.

## 5. Kundenstimme, optional

> Ich möchte unser Projekt als Referenz auf meiner Website zeigen. Magst du mir zwei, drei Sätze geben? Was hat dir an der Zusammenarbeit besonders gefallen, und was ist am neuen Auftritt für dich besser als vorher? Dürfte ich deine Rückmeldung mit deinem Namen und Unternehmen veröffentlichen?

- **Originalantwort:**
- **Gekürzter Wortlaut, falls nötig:**
- **Name und Rolle / Unternehmen:**
- **Freigabe des Wortlauts und der Namensnennung erhalten am:**

Das Zitat erscheint am Ende der passenden Projektseite vor der Kontaktaufforderung. Ohne freigegebenen Wortlaut bleibt es unsichtbar. Keine erfundenen Aussagen oder leeren Platzhalter veröffentlichen.

## 6. Die vorhandene Mechanik nutzen

1. Diese ausgefüllte Vorlage und die Bilder bereitstellen.
2. Inhalte unter `content/` nach `referenz.ts.example` ablegen. Die Daten werden gegen den Typ `Reference` geprüft.
3. Den Datensatz einmal in `lib/references.ts` importieren und zur Sammlung hinzufügen.
4. Bilder unter `public/referenzen/` ablegen.
5. Build und Darstellung prüfen. Galerie, Nummerierung, Unterseite, Metadaten, Brotkrumen und Sitemap übernehmen den neuen Eintrag automatisch.

Die Reihenfolge der Sammlung ist die Galeriereihenfolge. `wide: true` verwendet die breite Projektfläche; ohne diese Angabe steht die Karte im üblichen Paar. `navy`, `yellow` und `red` sind vorhandene Farbrichtungen. Die große Doppelansicht bekommt ihren Lichtschein über die Projektfarbe `hero.color`.

Gemeinsamer Aufbau: `components/ReferenceCase.tsx`. Einzige Referenzroute: `app/referenzen/[slug]/page.tsx`. Änderungen an Abständen oder Bilddarstellung werden zentral gepflegt. Der bestehende Freigabe- und Veröffentlichungsablauf bleibt bestehen.

## Beispiel Andreas Moll

Sieben eigenständige Bilddateien: Desktop, Handy, echte Altwebsite, Tätigkeitsübersicht, Justitia, ursprüngliches Logo und freigegebenes Vektorlogo. Der Desktop-Einstieg wird in Galerie, Doppelansicht und Vergleich verwendet. Visitenkarten sind eine ergänzende Erwähnung; der Schwerpunkt liegt auf Website und Logo. Andreas’ Zitat lässt sich nach Antwort und Freigabe ergänzen.
