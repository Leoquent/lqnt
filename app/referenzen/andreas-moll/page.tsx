import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import EditorialPage from "@/components/EditorialPage";
import DirectionArrow from "@/components/DirectionArrow";
import { pageMetadata, JsonLd, absoluteUrl } from "@/lib/seo";
import s from "@/components/editorial.module.css";
import d from "@/components/project-details.module.css";
import c from "./moll-case.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = pageMetadata(
  "Andreas Moll: Website-Relaunch und Logo-Modernisierung | leoquent",
  "Vorher und nachher: eine neue Website für das Nachlassbüro Andreas Moll. Klare Tätigkeitsfelder, persönliche Gestaltung und ein behutsam modernisiertes Logo.",
  "/referenzen/andreas-moll/",
);

export default function AndreasMollCaseStudy() {
  return <EditorialPage label="Andreas Moll" project="moll">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: absoluteUrl("/webdesign/") },
      { "@type": "ListItem", position: 3, name: "Andreas Moll", item: absoluteUrl("/referenzen/andreas-moll/") },
    ] }} />

    <div className={d.hero}>
      <p className={s.eyebrow}>Aus meiner Arbeit / Andreas Moll</p>
      <h1>Bewährtes erhalten.<br /><span>Klarer auftreten.</span></h1>
      <p className={d.intro}>Eine neue Website für das Nachlassbüro Andreas Moll. Mit vertrauter Marke und klarer Orientierung.</p>
    </div>
    <ProjectShowcase name="Andreas Moll" poster="/referenzen/moll-desktop.webp" mobile="/referenzen/moll-mobile.webp" color="#6f282b" />
    <div className={d.overview}>
      <p>Für Andreas Moll habe ich den bestehenden Webauftritt neu strukturiert und gestaltet. Seine fachlichen Inhalte, der persönliche Auftritt und die Bedeutung seines Teams sollten erhalten bleiben. Daraus entstand eine Website mit klaren Tätigkeitsfeldern, ausführlichen Informationen und einem direkten Weg zum Kontakt.</p>
      <p>Bestandsanalyse · Struktur · Textüberarbeitung · Webdesign · Logo-Modernisierung · Entwicklung · Übergabe</p>
    </div>
    <dl className={s.facts}>
      <div><dt>Unternehmen</dt><dd>Nachlassbüro Andreas Moll<br />Langenbrettach und Stuttgart</dd></div>
      <div><dt>Adressaten der Website</dt><dd>Gerichte, Erben und Auftraggeber, darunter gemeinnützige Organisationen</dd></div>
      <div><dt>Die Aufgabe</dt><dd>Fachliche Tiefe erhalten, Orientierung verbessern und die Marke weiterentwickeln</dd></div>
    </dl>

    <section className={s.section}>
      <h2>Ein persönlicher Einstieg.<br />Eine klare Richtung.</h2>
      <div><p>Die bisherige Startseite verband Logo und Porträt in einem großen Bildkopf. Die Navigation lag auch am Desktop hinter einer Menüschaltfläche. Ich habe beides getrennt und den Einstieg neu aufgebaut: Büroname, Tätigkeitsfeld und nächste Schritte sind direkt sichtbar.</p><p>Warme helle Flächen, ruhige Typografie und rote Akzente geben dem Auftritt eine persönliche Wirkung. Die Porträts stammen aus dem bereitgestellten Kundenmaterial; nach Andreas’ Angaben wurden seine Fotos vorab mit KI bearbeitet.</p></div>
    </section>
    <div className={c.comparison} aria-label="Die Startseite vor und nach dem Relaunch">
      <figure>
        <p className={c.label}>Vorher / bisherige Website</p>
        <a className={c.imageLink} href={base + "/referenzen/moll-vorher.webp"} target="_blank" rel="noreferrer" aria-label="Bisherige Website in voller Größe öffnen">
          <img src={base + "/referenzen/moll-vorher.webp"} width="1265" height="712" alt="Bisherige Startseite mit gemeinsamem Logo-Porträt-Bildkopf und eingeklappter Navigation" loading="lazy" />
          <span>Bild vergrößern <DirectionArrow diagonal /></span>
        </a>
        <figcaption>Der tatsächliche Ausgangsstand vor der Neugestaltung.</figcaption>
      </figure>
      <figure>
        <p className={c.label}>Nachher / veröffentlichter Auftritt</p>
        <a className={c.imageLink} href={base + "/referenzen/moll-desktop.webp"} target="_blank" rel="noreferrer" aria-label="Neue Website in voller Größe öffnen">
          <img src={base + "/referenzen/moll-desktop.webp"} width="1265" height="712" alt="Neue Startseite mit separatem Logo, sichtbarer Navigation und persönlichem Porträt neben der Einleitung" loading="lazy" />
          <span>Bild vergrößern <DirectionArrow diagonal /></span>
        </a>
        <figcaption>Mehr Raum für Tätigkeit, Person und Orientierung.</figcaption>
      </figure>
    </div>

    <section className={s.section}>
      <h2>Fachliche Tiefe.<br />Leichter zugänglich.</h2>
      <div><p>Die Website soll auch zum Lesen einladen. Deshalb habe ich die Inhalte gemeinsam mit Andreas geordnet und überarbeitet. Nachlasspflegschaft, Testamentsvollstreckung, Nachlassverwaltung und Erbenermittlung erhalten eigene Seiten. Eine Themenauswahl führt vom Überblick zu den Details.</p><p>Die Teamseite erklärt das Selbstverständnis des Büros. Inhaltsverzeichnisse erleichtern die Orientierung in längeren Texten. Auf dem Handy ordnen sich Bilder, Navigation und Inhalte passend zum schmaleren Bildschirm an.</p></div>
    </section>
    <ProjectScreenshot src="/referenzen/moll-taetigkeiten.webp" width={1265} height={712} alt="Die neue Website von Andreas Moll mit gegliederten Tätigkeitsfeldern und weiterführenden Fachinformationen">Ein übersichtlicher Einstieg führt zu den ausführlichen Fachseiten.</ProjectScreenshot>

    <section className={s.section}>
      <h2>Die Marke bleibt.<br />Die Formen werden klar.</h2>
      <div><p>Die bekannte MOLL-Wortmarke und das Linienzeichen bleiben erkennbar. Ich habe Schatten und Verläufe durch klare Farbflächen ersetzt und das Logo sauber als Vektor aufgebaut. So lässt es sich vom kleinen Browser-Symbol bis zur gedruckten Unterlage verwenden.</p><p>Das Logo-Paket enthält Varianten mit und ohne den bestehenden Claim, für helle und dunkle Flächen sowie passende Dateien für Web, Office und Druck.</p></div>
    </section>
    <div className={`${c.comparison} ${c.logoComparison}`} aria-label="Das Logo vor und nach der Modernisierung">
      <figure>
        <p className={c.label}>Vorher / ursprüngliches Logo</p>
        <a className={`${c.logoFrame} ${c.originalLogo}`} href={base + "/referenzen/moll-logo-vorher.webp"} target="_blank" rel="noreferrer" aria-label="Ursprüngliches MOLL-Logo in voller Größe öffnen"><img src={base + "/referenzen/moll-logo-vorher.webp"} alt="Ursprüngliches MOLL-Logo mit Schatten und auslaufenden Linien" loading="lazy" /></a>
        <figcaption>Die vorhandene Marke als Ausgangspunkt.</figcaption>
      </figure>
      <figure>
        <p className={c.label}>Nachher / freigegebene Vektorfassung</p>
        <a className={c.logoFrame} href={base + "/referenzen/moll-logo.svg"} target="_blank" rel="noreferrer" aria-label="Modernisiertes MOLL-Logo in voller Größe öffnen"><img src={base + "/referenzen/moll-logo.svg"} alt="Modernisiertes MOLL-Logo mit klaren roten, grauen und anthrazitfarbenen Flächen und dem Claim Ein Plan Der Weg Zum Ergebnis" loading="lazy" /></a>
        <figcaption>Klare Flächen, saubere Linien, vielseitig einsetzbar.</figcaption>
      </figure>
    </div>

    <section className={s.section}>
      <h2>Bilder, die zur<br />Arbeit passen.</h2>
      <div><p>Das bunte Knotenmotiv des Kunden bleibt als Bild für Zusammenarbeit erhalten. Für „Gespräch auf Augenhöhe“ habe ich eine eigene Justitia gestaltet. Beim Scrollen hebt sie den Arm und bringt die Waage ins Gleichgewicht. Bei reduzierter Bewegung bleibt die ausgeglichene Endpose stehen.</p></div>
    </section>
    <ProjectScreenshot src="/referenzen/moll-team.webp" width={1265} height={712} alt="Individuell gestaltete Justitia neben dem Abschnitt Gespräch auf Augenhöhe auf der Teamseite">Die Illustration greift das Thema des Abschnitts auf und bewegt sich zurückhaltend mit dem Scrollen.</ProjectScreenshot>

    <section className={s.section}>
      <h2>Online gebracht.<br />Geordnet übergeben.</h2>
      <div><p>Die neue Website läuft auf dem bestehenden Webspace des Kunden. Ich habe die Veröffentlichung, die Anbindung des Kontaktformulars sowie passende Vorschaubilder für geteilte Links und das Browser-Symbol umgesetzt.</p><p>Zur Übergabe gehören das Logo-Paket, Schriften und eine Outlook-Signatur mit Anleitung. Ergänzend habe ich zwei Visitenkartenrichtungen gestaltet, jeweils mit und ohne Mobilnummer. Sie liegen als Entwürfe zur Auswahl vor; die Druckausarbeitung folgt nach der Entscheidung.</p><a className={s.button} href="https://moll-beratung.de/" target="_blank" rel="noreferrer">Die Website besuchen <DirectionArrow diagonal /></a></div>
    </section>
    <div className={d.related}><Link href="/referenzen/gebrueder-ross/"><span><small>Weiteres Projekt</small>Gebrüder Ross</span><DirectionArrow diagonal /></Link></div>
    <div className={s.callout}><h2>Ein neuer Auftritt.<br />Mit Ihrem Unternehmen als Ausgangspunkt.</h2><p>Ich bringe vorhandene Inhalte, Gestaltung und Technik zusammen. Damit Ihre Website verständlich zeigt, was Sie tun.</p><Link href="/webdesign/#kontakt" className={s.button}>Über Ihre Website sprechen <DirectionArrow diagonal /></Link></div>
  </EditorialPage>;
}
