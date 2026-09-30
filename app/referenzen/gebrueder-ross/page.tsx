import Link from "next/link";
import EditorialPage from "@/components/EditorialPage";
import DirectionArrow from "@/components/DirectionArrow";
import { pageMetadata, JsonLd, absoluteUrl } from "@/lib/seo";
import s from "@/components/editorial.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata = pageMetadata("Gebrüder Ross: Webdesign für Nachlassservice | Leoquent", "Einblicke in den Website-Auftritt für Gebrüder Ross: ein sensibles Angebot verständlich erklären, Leistungen strukturieren und persönliche Ansprechpartner zeigen.", "/referenzen/gebrueder-ross/");

export default function RossCaseStudy() {
  return <EditorialPage label="Gebrüder Ross">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: absoluteUrl("/webdesign/") },
      { "@type": "ListItem", position: 3, name: "Gebrüder Ross", item: absoluteUrl("/referenzen/gebrueder-ross/") }
    ] }} />
    <div className={s.hero}><p className={s.eyebrow}>Aus meiner Arbeit / Gebrüder Ross</p><h1>Vertrauen beginnt<br /><span>mit Klarheit.</span></h1><p className={s.lead}>Ein Website-Auftritt für ein sensibles Thema: Gebrüder Ross übernimmt die Abwicklung von Nachlässen im Großraum Stuttgart. Ich habe den Auftritt gestaltet und umgesetzt.</p><p className={s.meta}>Webdesign · Struktur · Umsetzung</p></div>
    <figure className={s.showcase}><img className={s.desktop} src={base + "/referenzen/gebrueder-ross-desktop.webp"} width="1440" height="1000" alt="Desktopansicht: Gebrüder Ross stellt Nachlassservice und Auftraggeber im dunkelblauen und goldenen Design vor" fetchPriority="high" /><img className={s.mobile} src={base + "/referenzen/gebrueder-ross-mobile.webp"} width="390" height="844" alt="Der Auftritt auf einem schmalen Smartphone-Bildschirm" /></figure>
    <p className={s.caption}>Einblicke in die veröffentlichte Website · Stand September 2026</p>
    <dl className={s.facts}><div><dt>Unternehmen</dt><dd>Gebrüder Ross<br />Nachlassservice</dd></div><div><dt>Adressaten der Website</dt><dd>Nachlasspfleger, Verwalter und weitere professionelle Auftraggeber</dd></div><div><dt>Aufgabe des Auftritts</dt><dd>Leistungen erklären, Vertrauen aufbauen und Kontakt erleichtern</dd></div></dl>
    <section className={s.section}><h2>Ein breites Angebot.<br />Ein verständlicher Einstieg.</h2><div><p>Zu einem Nachlass gehört mehr als eine Räumung. Sicherung, Dokumentation, Inventarisierung, Verwertung und Übergabe greifen ineinander. Die Website muss diesen Zusammenhang erklären und zugleich schnelle Antworten auf einzelne Anliegen geben.</p><p>Der Einstieg benennt deshalb unmittelbar, für wen Gebrüder Ross arbeitet und welche Entlastung das Unternehmen bietet. Die weitere Seite führt über die Ansprechpartner und den Ablauf zu den einzelnen Leistungen.</p></div></section>
    <section className={s.section}><h2>Drei Entscheidungen,<br />die den Auftritt tragen.</h2><div><article><h3>01 / Menschen sichtbar machen.</h3><p>Simon Bartosch und Raphael Uhland treten als persönliche Ansprechpartner auf. Das Teamfoto und ihre Vorstellung geben dem Angebot ein Gesicht – gerade bei einer Zusammenarbeit, die Vertrauen voraussetzt.</p></article><article><h3>02 / Überblick und Tiefe verbinden.</h3><p>Die Leistungsübersicht lässt sich gezielt aufklappen. Wer mehr wissen möchte, findet eigene Seiten, etwa zur Nachlassverwertung oder zur Objektbegehung. So bleibt der Einstieg übersichtlich und konkrete Fragen bekommen ausreichend Raum.</p></article><article><h3>03 / Den nächsten Schritt erleichtern.</h3><p>Ein erklärter Ablauf, häufige Fragen sowie Telefon, E-Mail und Kontaktformular helfen bei der Vorbereitung einer Anfrage. Die Gestaltung führt diese Kontaktmöglichkeiten auf kleinen und großen Bildschirmen zusammen.</p></article></div></section>
    <section className={s.section}><h2>Das Ergebnis<br />ist sichtbar.</h2><div><p>Ein zusammenhängender Auftritt mit dunkelblauen Flächen, goldenen Akzenten und klarer typografischer Hierarchie. Die Website verbindet die persönliche Vorstellung des Unternehmens mit einer ausführlichen Erklärung seiner Leistungen.</p><a className={s.button} href="https://gebruederross.de/" target="_blank" rel="noreferrer">Die Website besuchen <DirectionArrow diagonal /></a></div></section>
    <div className={s.callout}><h2>Auch Ihr Angebot<br />verdient einen klaren Auftritt.</h2><p>Ich entwickle Websites, die ein Unternehmen verständlich machen: mit Konzept, eigenen Texten und einer Gestaltung, die dazu passt.</p><Link href="/webdesign/#kontakt" className={s.button}>Über Ihre Website sprechen <DirectionArrow diagonal /></Link></div>
  </EditorialPage>;
}
