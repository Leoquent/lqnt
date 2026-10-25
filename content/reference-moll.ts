import type { Reference } from "@/lib/reference-types";

export const mollReference: Reference = {
  slug: "andreas-moll",
  name: "Andreas Moll",
  metadata: {
    title: "Andreas Moll: Website-Relaunch und Logo-Modernisierung | leoquent",
    description: "Vorher und nachher: eine neue Website für das Nachlassbüro Andreas Moll. Klare Tätigkeitsfelder, persönliche Gestaltung und ein behutsam modernisiertes Logo.",
  },
  gallery: {
    category: "Website-Relaunch · Logo-Modernisierung",
    description: "Ein Nachlassbüro klarer präsentieren. Fachliche Inhalte ordnen. Eine vertraute Marke weiterentwickeln.",
    poster: "/referenzen/moll-desktop.webp",
    theme: "red",
  },
  hero: {
    heading: ["Bewährtes erhalten.", "Klarer auftreten."],
    intro: "Eine neue Website für das Nachlassbüro Andreas Moll. Mit vertrauter Marke und klarer Orientierung.",
    poster: "/referenzen/moll-desktop.webp",
    mobile: "/referenzen/moll-mobile.webp",
    color: "#6f282b",
  },
  overview: {
    text: "Für Andreas Moll habe ich den bestehenden Webauftritt neu strukturiert und gestaltet. Seine fachlichen Inhalte, der persönliche Auftritt und die Bedeutung seines Teams sollten erhalten bleiben. Daraus entstand eine Website mit klaren Tätigkeitsfeldern, ausführlichen Informationen und einem direkten Weg zum Kontakt.",
    services: "Bestandsanalyse · Struktur · Textüberarbeitung · Webdesign · Logo-Modernisierung · Entwicklung · Übergabe",
  },
  facts: [
    { label: "Unternehmen", value: ["Nachlassbüro Andreas Moll", "Langenbrettach und Stuttgart"] },
    { label: "Adressaten der Website", value: ["Gerichte, Erben und Auftraggeber, darunter gemeinnützige Organisationen"] },
    { label: "Die Aufgabe", value: ["Fachliche Tiefe erhalten, Orientierung verbessern und die Marke weiterentwickeln"] },
  ],
  blocks: [
    {
      type: "section",
      heading: ["Ein persönlicher Einstieg.", "Eine klare Richtung."],
      paragraphs: [
        "Die bisherige Startseite verband Logo und Porträt in einem großen Bildkopf. Die Navigation lag auch am Desktop hinter einer Menüschaltfläche. Ich habe beides getrennt und den Einstieg neu aufgebaut: Büroname, Tätigkeitsfeld und nächste Schritte sind direkt sichtbar.",
        "Warme helle Flächen, ruhige Typografie und rote Akzente geben dem Auftritt eine persönliche Wirkung. Die Porträts stammen aus dem bereitgestellten Kundenmaterial; nach Andreas’ Angaben wurden seine Fotos vorab mit KI bearbeitet.",
      ],
    },
    {
      type: "comparison", variant: "website", label: "Die Startseite vor und nach dem Relaunch",
      items: [
        {
          label: "Vorher / bisherige Website",
          image: { src: "/referenzen/moll-vorher.webp", width: 1265, height: 712, alt: "Bisherige Startseite mit gemeinsamem Logo-Porträt-Bildkopf und eingeklappter Navigation" },
          openLabel: "Bisherige Website in voller Größe öffnen",
          caption: "Der tatsächliche Ausgangsstand vor der Neugestaltung.",
        },
        {
          label: "Nachher / veröffentlichter Auftritt",
          image: { src: "/referenzen/moll-desktop.webp", width: 1265, height: 712, alt: "Neue Startseite mit separatem Logo, sichtbarer Navigation und persönlichem Porträt neben der Einleitung" },
          openLabel: "Neue Website in voller Größe öffnen",
          caption: "Mehr Raum für Tätigkeit, Person und Orientierung.",
        },
      ],
    },
    {
      type: "section", heading: ["Fachliche Tiefe.", "Leichter zugänglich."],
      paragraphs: [
        "Die Website soll auch zum Lesen einladen. Deshalb habe ich die Inhalte gemeinsam mit Andreas geordnet und überarbeitet. Nachlasspflegschaft, Testamentsvollstreckung, Nachlassverwaltung und Erbenermittlung erhalten eigene Seiten. Eine Themenauswahl führt vom Überblick zu den Details.",
        "Die Teamseite erklärt das Selbstverständnis des Büros. Inhaltsverzeichnisse erleichtern die Orientierung in längeren Texten. Auf dem Handy ordnen sich Bilder, Navigation und Inhalte passend zum schmaleren Bildschirm an.",
      ],
    },
    { type: "screenshot", src: "/referenzen/moll-taetigkeiten.webp", width: 1265, height: 712, alt: "Die neue Website von Andreas Moll mit gegliederten Tätigkeitsfeldern und weiterführenden Fachinformationen", caption: "Ein übersichtlicher Einstieg führt zu den ausführlichen Fachseiten." },
    {
      type: "section", heading: ["Die Marke bleibt.", "Die Formen werden klar."],
      paragraphs: [
        "Die bekannte MOLL-Wortmarke und das Linienzeichen bleiben erkennbar. Ich habe Schatten und Verläufe durch klare Farbflächen ersetzt und das Logo sauber als Vektor aufgebaut. So lässt es sich vom kleinen Browser-Symbol bis zur gedruckten Unterlage verwenden.",
        "Das Logo-Paket enthält Varianten mit und ohne den bestehenden Claim, für helle und dunkle Flächen sowie passende Dateien für Web, Office und Druck.",
      ],
    },
    {
      type: "comparison", variant: "logo", label: "Das Logo vor und nach der Modernisierung",
      items: [
        {
          label: "Vorher / ursprüngliches Logo",
          image: { src: "/referenzen/moll-logo-vorher.webp", width: 1200, height: 1200, alt: "Ursprüngliches MOLL-Logo mit Schatten und auslaufenden Linien" },
          openLabel: "Ursprüngliches MOLL-Logo in voller Größe öffnen",
          caption: "Die vorhandene Marke als Ausgangspunkt.",
          cropWhiteSpace: true,
        },
        {
          label: "Nachher / freigegebene Vektorfassung",
          image: { src: "/referenzen/moll-logo.svg", width: 1352, height: 840, alt: "Modernisiertes MOLL-Logo mit klaren roten, grauen und anthrazitfarbenen Flächen und dem Claim Ein Plan Der Weg Zum Ergebnis" },
          openLabel: "Modernisiertes MOLL-Logo in voller Größe öffnen",
          caption: "Klare Flächen, saubere Linien, vielseitig einsetzbar.",
        },
      ],
    },
    {
      type: "section", heading: ["Bilder, die zur", "Arbeit passen."],
      paragraphs: ["Das bunte Knotenmotiv des Kunden bleibt als Bild für Zusammenarbeit erhalten. Für „Gespräch auf Augenhöhe“ habe ich eine eigene Justitia gestaltet. Beim Scrollen hebt sie den Arm und bringt die Waage ins Gleichgewicht. Bei reduzierter Bewegung bleibt die ausgeglichene Endpose stehen."],
    },
    { type: "screenshot", src: "/referenzen/moll-team.webp", width: 1265, height: 712, alt: "Individuell gestaltete Justitia neben dem Abschnitt Gespräch auf Augenhöhe auf der Teamseite", caption: "Die Illustration greift das Thema des Abschnitts auf und bewegt sich zurückhaltend mit dem Scrollen." },
    {
      type: "section", heading: ["Online gebracht.", "Geordnet übergeben."],
      paragraphs: [
        "Die neue Website läuft auf dem bestehenden Webspace des Kunden. Ich habe die Veröffentlichung, die Anbindung des Kontaktformulars sowie passende Vorschaubilder für geteilte Links und das Browser-Symbol umgesetzt.",
        "Zur Übergabe gehören das Logo-Paket, Schriften und eine Outlook-Signatur mit Anleitung. Ergänzend habe ich zwei Visitenkartenrichtungen gestaltet, jeweils mit und ohne Mobilnummer. Sie liegen als Entwürfe zur Auswahl vor; die Druckausarbeitung folgt nach der Entscheidung.",
      ],
      link: { label: "Die Website besuchen", href: "https://moll-beratung.de/" },
    },
  ],
  relatedSlug: "gebrueder-ross",
  relatedLabel: "Weiteres Projekt",
  closing: {
    heading: ["Ein neuer Auftritt.", "Mit Ihrem Unternehmen als Ausgangspunkt."],
    text: "Ich bringe vorhandene Inhalte, Gestaltung und Technik zusammen. Damit Ihre Website verständlich zeigt, was Sie tun.",
    link: { label: "Über Ihre Website sprechen", href: "/webdesign/#kontakt" },
  },
};
