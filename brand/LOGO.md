# Leoquent — Logo-Regeln

Stand: alle Dateien in `brand/marks/` sind reine Vektorgeometrie. Die Wortmarke ist aus
Outfit 700 in Pfade gewandelt und damit schriftunabhängig.

---

## Die Bestandteile

**Bildmarke** — LQNT als zweizeiliges Quadrat, `L Q` oben, `N T` unten. 971 × 1027 Einheiten.

**Wortmarke** — `leoquent`, Outfit 700, durchgehend klein, Laufweite `-0.035em`. 3726 × 931.

**Deskriptor** — `MARKE, WEBDESIGN` / `& AUTOMATISIERUNG`, Outfit 500, Laufweite `+0.10em`,
zweizeilig, linksbündig unter der Wortmarke. Von Leo am 30.09.2026 für alle Anwendungen
freigegeben. Der Umbruch vor `&` gleicht die Zeilenlängen an. Er ersetzt die früheren
Fassungen mit „Websites“ bzw. „Webdesign, Prozesse“. Bildmarke und Wortmarke bleiben erhalten.

---

## Es gibt genau eine horizontale Logik

Das kompakte Lockup ohne Deskriptor wurde bewusst gestrichen. Eine zweizeilige quadratische
Marke neben einer einzeiligen Wortmarke hat keine gemeinsame Linie — das Auge sucht eine und
findet keine. Statt zwei Fassungen mit widersprüchlicher vertikaler Logik gibt es jetzt:

| Kontext | Umsetzung |
|---|---|
| **Website-Header** | Bildmarke + `leoquent` als **lebender HTML-Text**, per CSS ausgerichtet |
| **Footer, Visitenkarte, Briefkopf, Angebots-PDF, OG-Bild** | `leoquent-lockup-h-descriptor.svg` |
| **Quadratische Flächen, Social-Profile** | `leoquent-lockup-v.svg` |
| **Favicon, Avatar, App-Icon** | `lqnt-mark.svg` bzw. `favicon.svg` |
| **Messewand, Fahrzeug, Kleidung** | Bildmarke allein — auf Distanz zählt die Silhouette |

Der Header nutzt HTML-Text statt einer Logodatei, weil die Ausrichtung damit ein CSS-Problem
bleibt: skaliert mit, ist markierbar, für Screenreader und Suchmaschinen lesbar, und in zwei
Pixeln korrigierbar ohne neue Datei.

---

## Dateien

| Datei | Zweck |
|---|---|
| `lqnt-mark.svg` | **Bildmarke, Master** — `currentColor` |
| `lqnt-mark-{white,vanta,lime}.svg` | feste Farben |
| `leoquent-wordmark*.svg` | Wortmarke allein |
| `leoquent-lockup-h-descriptor*.svg` | **Hauptlogo** — Marke + Wort + Deskriptor, 3811 × 1027 |
| `leoquent-lockup-v*.svg` | vertikal gestapelt |
| `favicon.svg` | Lime auf Vanta-Kachel, Eckenradius 22 % |
| `favicon-mono*.svg` | enger Beschnitt ohne Kachel |

Die Deskriptor-Pfade lassen sich mit `scripts/update-brand-descriptor.py` und der lokalen
Outfit-Variablenschrift neu erzeugen (Python, fonttools mit WOFF-Unterstützung). Das Skript
prüft, dass Bildmarke und Wortmarke unverändert bleiben. Linkvorschaubilder werden aus
dem weißen SVG-Master auf Vanta gerendert, mit 700 px Logobreite auf 1200 px Bildbreite.

---

## Konstruktion der Bildmarke

Alle Striche folgen einem System:

| Strichart | Stärke |
|---|---|
| Senkrechte (L-Stamm, N-Stämme, T-Stamm) | **128** |
| Waagerechte und Diagonale (L-Arm, T-Balken, Q-Schwanz) | **120** |
| Rundstrich (Q-Ring) | **132** |

Der Rundstrich ist bewusst 3 % stärker als die Senkrechten: Das Auge nimmt Rundungen leichter
wahr, gleiche Messwerte würden ungleich wirken. Waagerechte sind aus demselben Grund dünner.

**Der Q** ist ein exakter Kreis, Mittelpunkt `731,5`, Außenradius `255,33`. Er ist auf dem
Versalband des L zentriert und **überschießt oben wie unten um 7 Einheiten** — ohne diesen
Überschuss würde ein Kreis neben einem flachen Buchstaben kleiner wirken. Der Schwanz läuft
im 45-Grad-Winkel, kreuzt den Ring und endet bündig mit der rechten Kante des T.

**Der L-Arm** endet bündig mit der rechten Kante des N darunter.

### Bekannte Abweichung

Die Versalhöhe der oberen Zeile (496,7) ist **4,6 % größer** als die der unteren (475,0).
Bewusst nicht korrigiert: Eine gleichmäßige Skalierung von N und T hätte deren Strichstärken
auf 133,8 mitgezogen, und ungleiche Strichstärken fallen sofort auf, ungleiche Versalhöhen
erst beim Nachmessen. Sauber wäre eine rein vertikale Streckung mit neu geschnittener
N-Diagonale — ein eigener Arbeitsgang.

---

## Farbe

**Grundregel: einfarbig.** Die Marke muss in Stickerei, Stempel, Graustufe und einfarbigem
Druck funktionieren.

| Untergrund | Marke |
|---|---|
| Vanta `#050505` / dunkel | Bone `#EAEAEA` oder Lime `#CCFF00` |
| Weiß / hell | Vanta `#050505` |
| Foto | Weiß, nur auf ruhigen dunklen Bildpartien |

**Kein Q-Akzent.** Einzelne Buchstaben werden nie abgesetzt eingefärbt — auch nicht groß, auch
nicht auf der Website. Das kippt das Quadrat aus der Balance.

**Die Kachel** gehört zum Favicon, nicht zum Logo.

---

## Maße und Abstände

**Schutzraum:** rundum mindestens **25 % der Markenbreite**. Nichts dringt hinein.

**Abstand Marke ↔ Text im Lockup:** 30 % der Markenbreite.

**Mindestgrößen:**

- Bildmarke allein: **20 px** digital, **8 mm** Druck
- Lockup mit Deskriptor: **200 px** Gesamtbreite digital, **50 mm** Druck

Darunter nur die Bildmarke im Favicon-Beschnitt.

**Ausrichtung im Lockup:** Die Wortmarke sitzt mit ihrer Grundlinie auf der Grundlinie der
LQ-Zeile. Die zweite Deskriptor-Zeile sitzt auf der Grundlinie der NT-Zeile. Zwei geteilte
Linien — daher wirkt das Lockup ruhig.

---

## Verboten

- Verzerren, in eine nicht-quadratische Fläche pressen
- Einzelne Buchstaben umfärben
- Schlagschatten, Verlauf, Kontur, Glow, 3D
- Neu setzen in einer anderen Schrift — es gibt genau eine Datei
- Rotieren
- Bildmarke und Text frei neu anordnen — es gibt zwei Lockups, sonst keine
- Den Deskriptor einzeilig setzen

---

## Schrift

**Outfit** (Google Fonts, SIL Open Font License, kommerziell frei).

| Einsatz | Schnitt |
|---|---|
| Wortmarke, Header-Text | 700 |
| Überschriften | 600 |
| Auszeichnung | 500 |
| Fließtext | 400 |

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

.logo-wordmark {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  letter-spacing: -0.035em;
  text-transform: lowercase;
}
```

---

## Einbau in Next.js

**Favicon** — Next legt `app/icon.svg` automatisch als Favicon an:

```
app/icon.svg          ← Kopie von brand/marks/favicon.svg
app/apple-icon.png    ← 180 × 180, aus favicon.svg gerendert
```

**Header** — Bildmarke als React-Komponente, Wortmarke als Text:

```tsx
<a href="/" className="flex items-center gap-3 text-bone hover:text-lime transition-colors">
  <LqntMark className="h-8 w-8" />
  <span className="font-sans font-bold text-xl tracking-[-0.035em] lowercase">
    leoquent
  </span>
</a>
```

Die Marke muss als React-Komponente eingebunden werden, nicht als `<img>` — sonst greift
`currentColor` nicht und die Farbe lässt sich nicht per CSS steuern.
