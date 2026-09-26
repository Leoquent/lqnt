# Impressum — Vorlage und Anmeldedaten

> **Keine Rechts- oder Steuerberatung.** Struktur und Pflichtangaben nach bestem Wissen
> zusammengestellt. Vor dem Livegang einmal von einem Anwalt oder über einen
> IHK-Gründungsservice prüfen lassen — das ist meist kostenlos.

**Rechtsform:** Einzelunternehmen, Gewerbe angemeldet.
**Geschäftsbezeichnung:** Leoquent
**Firma im Rechtssinne:** der Personenname — Leoquent ist ein Zusatz, kein Ersatz.

---

## 1. Für die Gewerbeanmeldung

**Geschäftsbezeichnung:** `Leoquent`

**Angemeldete Tätigkeit** — bewusst breit, damit du bei einer Verschiebung des Geschäfts
nicht nachmelden musst:

```
Webdesign und Webentwicklung, digitale Prozessberatung und Prozessautomatisierung,
Online-Marketing sowie damit verbundene Dienstleistungen
```

**Drei Punkte, die dich sonst überraschen:**

- **Gewerbesteuer-Freibetrag** liegt bei 24.500 € Gewerbeertrag für Einzelunternehmen. Im
  ersten Jahr fällt realistisch keine an.
- **IHK-Mitgliedschaft** kommt mit dem Gewerbe automatisch. Für Existenzgründer gibt es in
  den ersten Jahren eine Beitragsbefreiung unter bestimmten Ertragsgrenzen — nicht
  automatisch, sondern auf Antrag. Frag beim ersten Schreiben aktiv danach.
- **Kleinunternehmerregelung (§ 19 UStG):** Bei B2B-Kunden meist ein Nachteil. Deine Kunden
  ziehen die Umsatzsteuer ohnehin ab, du selbst aber könntest keine Vorsteuer geltend machen
  — bei Hardware, Software-Abos und Hosting relevant. Die Grenzen wurden zuletzt angehoben,
  aktuelle Werte beim Finanzamt erfragen.

---

## 2. Impressum — Textvorlage

Ersetzt `app/impressum/page.tsx`. Die eckigen Klammern muss Leo füllen.

```
Impressum

Angaben gemäß § 5 DDG

Leoquent
Inhaber: Leonid Ryazanskiy
[Straße und Hausnummer]
[PLZ] [Ort]

Kontakt
Telefon: [Nummer]
E-Mail: [Adresse @lqnt.de]

Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG
[USt-IdNr., sofern vorhanden — sonst diesen Block ersatzlos streichen]

Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
Leonid Ryazanskiy, Anschrift wie oben
```

### Was sich gegenüber der alten Fassung ändert

| Alt | Neu |
|---|---|
| `[Vorname Nachname]` als Platzhalter | Leonid Ryazanskiy, ausgeschrieben |
| Rechtsform GbR | entfällt — Einzelunternehmen braucht keine Rechtsformangabe |
| Admir als Vertretungsberechtigter | streichen |
| `info@lunda-ki.de` | neue Adresse auf `lqnt.de` |
| `§ 5 TMG` | **`§ 5 DDG`** — das TMG wurde vom Digitale-Dienste-Gesetz abgelöst |

### Was **nicht** hinein gehört

**Der Link zur EU-Plattform für Online-Streitbeilegung.** Die OS-Plattform der EU-Kommission
wurde eingestellt; der früher übliche Verweis geht ins Leere und ist damit eher ein Risiko
als eine Absicherung. Steht in vielen Impressen noch drin — vor dem Livegang den aktuellen
Stand prüfen und den Block weglassen.

**Verbraucherstreitbeilegung nach § 36 VSBG:** Die Hinweispflicht trifft Unternehmen ab
mehr als zehn Beschäftigten. Als Einzelunternehmer bist du nicht verpflichtet. Ein
freiwilliger Satz („Wir sind nicht bereit und nicht verpflichtet, an
Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.") ist
üblich und schadet nicht.

---

## 3. Auch anzupassen

- **`app/datenschutz/page.tsx:28`** — nennt ebenfalls die GbR und Admir. Verantwortlicher
  im Sinne der DSGVO ist jetzt Leonid Ryazanskiy allein, mit derselben Anschrift.
- **Ladungsfähige Anschrift** heißt: kein Postfach, keine c/o-Adresse ohne echten Sitz.
  Wenn du von zu Hause arbeitest, steht deine Privatanschrift im Netz — das ist bei
  Einzelunternehmen der Normalfall und rechtlich nicht vermeidbar. Wer das nicht will,
  braucht ein Coworking mit Ladungsfähigkeit oder einen Anbieter für Geschäftsadressen.

---

## 4. Offen, sobald das Gewerbe angemeldet ist

- Steuernummer vom Finanzamt (kommt nach dem Fragebogen zur steuerlichen Erfassung)
- USt-IdNr. beim Bundeszentralamt für Steuern beantragen — kostenlos, online, nötig sobald
  du EU-Dienstleistungen beziehst oder anbietest
- Geschäftskonto (keine Pflicht bei Einzelunternehmen, aber trennt Privat und Geschäft
  und erspart Ärger bei der Buchhaltung)
- Berufshaftpflicht prüfen — bei Webprojekten für Kunden mit Umsatzbezug relevant
