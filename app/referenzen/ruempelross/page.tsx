import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import EditorialPage from "@/components/EditorialPage";
import DirectionArrow from "@/components/DirectionArrow";
import { pageMetadata, JsonLd, absoluteUrl } from "@/lib/seo";
import s from "@/components/editorial.module.css";
import d from "@/components/project-details.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata = pageMetadata("Rümpelross: Webdesign für Entrümpelung | leoquent", "Einblicke in das Website-Projekt für Rümpelross: klare Leistungen, ein markanter Auftritt und verständliche Wege zur Anfrage.", "/referenzen/ruempelross/");

export default function RuempelrossCaseStudy() {
  return <EditorialPage label="Rümpelross">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: absoluteUrl("/webdesign/") },
      { "@type": "ListItem", position: 3, name: "Rümpelross", item: absoluteUrl("/referenzen/ruempelross/") },
    ] }} />
    <div className={s.hero}><p className={s.eyebrow}>Aus meiner Arbeit / Rümpelross</p><h1>Platz schaffen.<br /><span>Schon beim ersten Klick.</span></h1><p className={s.lead}>Eine Entrümpelung beginnt oft mit vielen Fragen. Was wird übernommen? Wie läuft es ab? Und wie komme ich zu einem Angebot? Der Website-Auftritt für Rümpelross bringt diese Fragen in eine klare Reihenfolge – mit direkter Sprache, anschaulichen Leistungen und kurzen Wegen zur Anfrage.</p><p className={s.meta}>Text · Webdesign · Interaktion · Entwicklung<br />Einblicke in den Website-Projektstand</p></div>
    <ProjectShowcase name="Rümpelross" domain="Rümpelross / Website-Projekt" poster="/referenzen/ruempelross-desktop.webp" mobile="/referenzen/ruempelross-mobile.webp" color="#c9a600" />
    <dl className={s.facts}><div><dt>Unternehmen</dt><dd>Rümpelross<br />Entrümpelung in Stuttgart</dd></div><div><dt>Der Ausgangspunkt</dt><dd>Ein breites Angebot rund um Räumung und Haushaltsauflösung</dd></div><div><dt>Die Aufgabe</dt><dd>Leistungen greifbar machen und den Einstieg in eine Anfrage erleichtern</dd></div></dl>
    <section className={s.section}><h2>Direkte Worte.<br />Ein klarer Charakter.</h2><div><p>„Wenn viel zu viel wird, packen wir an.“ Der Einstieg beschreibt die Situation der Besucher und führt direkt zum Angebot. Die Sprache bleibt konkret und nah an der Aufgabe.</p><p>Die Gestaltung baut auf dem vorhandenen Markenauftritt auf. Gelb und Schwarz geben der Website ihren Kontrast. Große Überschriften, helle Informationsflächen und das bestehende Logo halten die einzelnen Bereiche zusammen.</p><p>Der regionale Bezug ist bereits im Einstieg sichtbar. Auf dem Handy stehen die Botschaft und der nächste Schritt im Vordergrund.</p></div></section>
    <figure className={s.detailFigure}><img src={base + "/referenzen/ruempelross-leistungen.webp"} width="1250" height="791" loading="lazy" alt="Rümpelross: sechs illustrierte Leistungen auf einer hellen Fläche mit gelber Navigation" /><figcaption>Leistungen mit eigenen Illustrationen und kurzen Erklärungen. Die helle Fläche schafft einen ruhigen Gegenpol zum dunklen Einstieg.</figcaption></figure>
    <section className={s.section}><h2>Die passende Hilfe.<br />Schnell erkennbar.</h2><div><p>Entrümpelung, Haushaltsauflösung oder einzelne Rückbauarbeiten: Die Leistungsübersicht macht unterschiedliche Anliegen sichtbar. Eigene Leistungsseiten bieten Platz für die Details.</p><p>Ein Ablauf in vier Schritten erklärt den Weg von der ersten Anfrage bis zur Übergabe. Vorher-Nachher-Ansichten zeigen die Veränderung am Objekt. Besucher können dadurch besser einordnen, welche Arbeit hinter dem Angebot steckt.</p></div></section>
    <figure className={s.detailFigure}><img src={base + "/referenzen/ruempelross-kontakt.webp"} width="1250" height="791" loading="lazy" alt="Beispielhafter WhatsApp-Dialog neben einer Erklärung zur Anfrage mit Fotos" /><figcaption>Ein dargestellter Beispieldialog erklärt die Anfrage mit Fotos. Er veranschaulicht den Ablauf und zeigt keine echte Kundennachricht.</figcaption></figure>
    <section className={s.section}><h2>Interaktion mit<br />einer Aufgabe.</h2><div><article><h3>Zeigen, wie die Anfrage funktioniert.</h3><p>Ein animierter Beispieldialog führt durch den Kontakt per WhatsApp. Daneben stehen drei einfache Schritte: Fotos aufnehmen, senden und Rückmeldung erhalten. Die Animation erklärt eine konkrete Handlung.</p></article><article><h3>Fragen in kleine Schritte aufteilen.</h3><p>Im gezeigten Projektstand führt ein Preisassistent durch sechs Fragen zum Vorhaben. So wird aus einer offenen Anfrage ein verständlicher Einstieg, ohne dass Besucher vorab alle Fachbegriffe kennen müssen.</p></article><article><h3>Auf dem Handy erreichbar bleiben.</h3><p>Die mobile Darstellung ordnet Inhalte untereinander und hält die Kontaktwege griffbereit. Telefonnummer und Anfrage sind auch dann erreichbar, wenn Besucher bereits tiefer in die Leistungen eingestiegen sind.</p></article></div></section>
    <div className={d.related}><Link href="/referenzen/gebrueder-ross/"><span><small>Weiteres Projekt</small>Gebrüder Ross</span><DirectionArrow diagonal /></Link></div>
    <div className={s.callout}><h2>Ein Auftritt,<br />der zu Ihrer Arbeit passt.</h2><p>Ich bringe Angebot, Texte und Gestaltung zusammen. Damit Ihre Besucher verstehen, was Sie für sie tun können.</p><Link href="/webdesign/#kontakt" className={s.button}>Über Ihre Website sprechen <DirectionArrow diagonal /></Link></div>
  </EditorialPage>;
}
