# Webdesign — zweite Designiteration, 25.09.2026

Umgesetzt nach Leos Feedback:
- Hero: Botschaft / Gestaltung / Aktion; Typewriter erneut abspielbar, gemeinsames Scrollen
  der beiden dargestellten Geräte, Information öffnen als Beispiel für die dritte Aktion.
- Eigene Illustration für den klaren Weg durch eine Website.
- Textstatement über die Inhaltsbreite; Papier und separater Stift reagieren per Maus auf
  Desktop, ohne autonome Dauerschleife.
- Zusammenarbeit als native Scroll-Sequenz: Desktop-Bereich wird vorübergehend fixiert,
  rechts laufen vier Schritte hoch, links werden passende Website-Ebenen ergänzt. Nach
  Schritt 04 wird die Fixierung freigegeben. Mobile/niedrige Fenster/reduzierte Bewegung
  und Pausierung bleiben im normalen Textfluss.
- Websitekompetenz erklärt Aufbau, Nutzung, Technik und Prüfung. Über mich verwendet
  ausdrücklich Leos neue Angaben (Webdesign seit Jugend/Dreamweaver, Berufserfahrung im
  Werbetext, autodidaktische technische Umsetzung). KI ist Werkzeug, kein Qualitätsersatz.
- Prozessbrücke: erst analysieren, mit oder ohne KI sinnvoll vereinfachen.

Prüfung: TypeScript und Produktionsbuild samt statischem Export erfolgreich. Browserprüfungen
bei 320, 390, 1046 und 1280 px; keine verbleibenden horizontalen Überläufe der Illustration.
Typewriter beginnt mit verdeckten Buchstaben und endet vollständig sichtbar; beide Geräte
reagieren. Mausinteraktion verändert Papier- und Stifttransform. Scroll-Sequenz erreicht
Schritt 04 und gibt die folgende Sektion frei. Pausieren baut Pinning vollständig zurück.
Reduced Motion wird zusätzlich in allen neuen GSAP- und CSS-Bewegungen berücksichtigt.

Markenfrage bleibt offen. Empfehlung im Gespräch: Leoquent als Name, LQNT als Zeichen und
Domainkürzel. Keine Umbenennung vorgenommen. Quelldokumente aktualisiert:
copy/02-webdesign.md und brand/DESIGN_LEITLINIE.md. Kein Deployment.
