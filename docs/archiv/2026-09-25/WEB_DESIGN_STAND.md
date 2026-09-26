# Webdesign — Umsetzung und Prüfung, 25.09.2026

Die von Leo gewählte Richtung /entwurf/interaktiv ist auf /webdesign übertragen.
Die Designentscheidung ist in brand/DESIGN_LEITLINIE.md festgehalten; die aktuelle Copy
steht separat in copy/02-webdesign.md. Die vorherige Fassung wurde in diesem Archiv gesichert.

## Verifiziert

- TypeScript-Prüfung ohne Fehler.
- Produktionsbuild einschließlich statischem Export erfolgreich.
- Browserprüfung bei 390 px, 667 × 375 px (Querformat), 1280 px und normaler Fensterbreite.
- Hero-Auswahl, Projekt-Akkordeon, FAQ, Navigation zu Sektionen und Animationspause funktionieren.
- Geschlossenes Akkordeon ist nicht fokussierbar; mobile Navigation scrollt in niedrigen Viewports
  und ist oberhalb ihres Breakpoints ausgeblendet.
- Keine defekten lokalen Sprunglinks oder fehlenden Porträtbilder in der Browserprüfung.
- CSS und GSAP beachten prefers-reduced-motion; laufende CSS-Animationen pausieren außerhalb
  des sichtbaren Bereichs und über den sichtbaren Pausenknopf im Footer.

## Noch für spätere Iterationen

- RümpelRoss: echte Projektansicht ersetzen, weitere freigegebene Referenzen ergänzen.
- Calendly: konkreten Link später von Leo einsetzen. Bis dahin E-Mail und Telefon.
- Homepage: gewählten Gateway-Entwurf später auf / übernehmen; /prozesse gestalterisch separat
  weiterentwickeln. Beide aktuellen Seiten wurden in dieser Umsetzung nicht überschrieben.
- Vor Veröffentlichung weiterhin den bestehenden Launch-Backlog zu Rechtstexten, Domain,
  Steuerausweis und Formular-Konfiguration berücksichtigen. Kein Deployment in dieser Sitzung.
