"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LqntMark from "@/components/LqntMark";
import { Arrow, Drawing } from "./Drawings";
import HeroPresentation from "./HeroPresentation";
import CopyStatement from "./CopyStatement";
import Collaboration from "./Collaboration";
import { faqs, packages } from "./content";
import s from "./webdesign.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const mail = (subject: string) => "mailto:hi@lqnt.de?subject=" + encodeURIComponent(subject);
const links = [["Arbeiten", "arbeiten"], ["Leistungen", "leistungen"], ["Preise", "preise"], ["Über mich", "ueber-mich"]];

export default function WebdesignPage() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useGSAP(() => {
    if (motionPaused) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-intro]", { y: 30, opacity: 0, duration: 1.05, stagger: .12, ease: "power3.out", clearProps: "transform,opacity" });
      root.current?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 28, opacity: .15, duration: .85, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 94%", once: true } });
      });
      root.current?.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 1.15, ease: "power3.inOut", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 95%", once: true } });
      });
      root.current?.querySelectorAll<HTMLElement>("[data-ambient]").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (self) => { el.dataset.visible = String(self.isActive); } });
      });
    }, root);
    return () => mm.revert();
  }, { scope: root, dependencies: [motionPaused], revertOnUpdate: true });

  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 550);
    return () => window.clearTimeout(timer);
  }, [projectOpen, faqOpen]);

  return <div className={s.page} ref={root} data-paused={motionPaused}>
    <a href="#inhalt" className={s.skip}>Zum Inhalt</a>
    <header className={s.header}>
      <div className={s.headerInner}>
        <a href="#inhalt" className={s.brand} aria-label="Leoquent – zum Seitenanfang" onClick={() => setMenuOpen(false)}><LqntMark className={s.mark} /><span>leoquent</span></a>
        <nav aria-label="Hauptnavigation" className={s.desktopNav}>{links.map(([label, id]) => <a key={id} href={"#" + id}>{label}</a>)}</nav>
        <div className={s.headerActions}><Link href="/" className={s.otherService}>Alle Leistungen <Arrow diagonal /></Link><a href="#kontakt" className={s.headerCta}>Projekt besprechen <Arrow diagonal /></a></div>
        <button className={s.menuButton} ref={menuButton} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Schließen" : "Menü"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
      </div>
      <nav id="mobile-navigation" className={s.mobileNav} aria-label="Mobile Navigation" hidden={!menuOpen}>
        {links.map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setMenuOpen(false)}>{label}<Arrow /></a>)}
        <Link href="/">Alle Leistungen <Arrow diagonal /></Link><a href="#kontakt" onClick={() => setMenuOpen(false)}>Projekt besprechen <Arrow /></a><Link href="/prozesse/">Prozesse & Automatisierung <Arrow diagonal /></Link>
      </nav>
    </header>

    <main id="inhalt">
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.heroCopy}>
          <p className={s.eyebrow} data-intro><span className={s.dot} /> Webdesign von Leoquent</p>
          <h1 id="hero-title" data-intro>Ihr Unternehmen<br />kann was.<br /><em>Zeigen wir es.</em></h1>
          <p className={s.heroLead} data-intro>Eine Website, die zeigt, was Sie ausmacht. Durchdacht im Aufbau, eigenständig im Design – mit Texten, die ich für Sie schreibe.</p>
          <div className={s.heroActions} data-intro><a className={s.button} href="#arbeiten">Arbeiten entdecken <Arrow diagonal /></a><a className={s.textLink} href="#preise">Pakete ab 1.900 € <Arrow /></a></div>
          <p className={s.heroFootnote} data-intro>Konzept, Text und Umsetzung. Ein Ansprechpartner.</p>
        </div>
        <HeroPresentation motionPaused={motionPaused} />
      </section>

      <div className={s.credentials} data-reveal><p>Texte von einem ausgezeichneten Werbetexter.<span>Ausgezeichnet unter anderem bei</span></p><div>Cannes Lions<span>ADC</span>New York Festivals<span>The One Show</span></div></div>

      <section id="arbeiten" className={s.section} aria-labelledby="work-title">
        <div className={s.sectionRule} data-line />
        <div className={s.sectionHeading + " " + s.headingStraight} data-reveal><p className={s.eyebrow}>01 / Aus der Arbeit</p><h2 id="work-title">Ein neuer Auftritt.<br /><span>Ein vertrauter Charakter.</span></h2><p>Wie aus einem bestehenden Unternehmen eine Website mit klarer Linie wird.</p></div>
        <article className={s.project} data-reveal>
          <button className={s.projectSummary} aria-expanded={projectOpen} aria-controls="ruempelross-details" onClick={() => setProjectOpen(!projectOpen)}>
            <div className={s.projectVisual} aria-hidden="true"><svg viewBox="0 0 280 180" fill="none"><path d="M62 145V63l79-38 78 38v82H62Zm0-82 79 39 78-39m-78 39v81M82 95l39 19v49L82 144V95Zm78 17 36-18v48l-36 19v-49Z" stroke="currentColor" /><path d="m39 149 100 49 103-49M140 10v26M21 64l27 13M229 77l27-13" stroke="currentColor" strokeDasharray="3 5" /></svg><span>Projektansicht folgt</span></div>
            <div className={s.projectText}><p className={s.eyebrow}>Webdesign · Text · Interaktion</p><h3>RümpelRoss</h3><p>Den Charakter behalten. Das Angebot schärfen. Den Weg zur Anfrage vereinfachen.</p></div>
            <span className={s.projectToggle}>{projectOpen ? "Weniger" : "Projekt ansehen"}<span className={s.plus} aria-hidden="true">{projectOpen ? "−" : "+"}</span></span>
          </button>
          <div id="ruempelross-details" className={s.expand} data-open={projectOpen} inert={!projectOpen}>
            <div className={s.expandInner}><div className={s.projectDetails}>
              <div><p className={s.eyebrow}>Die Ausgangslage</p><h4>Viel Persönlichkeit.<br />Wenig Orientierung.</h4><p>Die selbst gebaute Website zeigte den Betrieb, machte es Besuchern aber schwer, sich zurechtzufinden. Botschaften, Leistungen und Kontaktmöglichkeiten brauchten eine klarere Ordnung.</p></div>
              <div><p className={s.eyebrow}>Mein Beitrag</p><h4>Ein roter Faden.<br />Vom ersten Blick bis zur Anfrage.</h4><p>Markenfarben und Comic-Charakter bleiben. Neu sind die Texte, die Gestaltung und eine Dramaturgie, die durch das Angebot führt.</p><ul><li>Responsive Gestaltung, eigene Grafiken und Icons</li><li>Scroll-Animationen und Vorher-nachher-Slider</li><li>Quiz zur Anfrage und zusätzliche Kontaktwege</li></ul><a href="https://leoquent.github.io/ruempelross/" target="_blank" rel="noreferrer" className={s.textLink}>Projektvorschau öffnen <Arrow diagonal /></a></div>
            </div></div>
          </div>
        </article>
        <p className={s.workNote}>Weitere Projekte entstehen gerade. Hier zeige ich sie, sobald sie bereit sind.</p>
      </section>

      <section id="leistungen" className={s.section} aria-labelledby="services-title">
        <div className={s.sectionRule} data-line />
        <div className={s.sectionHeading} data-reveal><p className={s.eyebrow}>02 / Was Ihre Website ausmacht</p><h2 id="services-title">Gut aussehen ist der Anfang.<br /><span>Verstanden werden das Ziel.</span></h2><p>Ihre Besucher sollen erkennen, was Sie anbieten, warum es zu ihnen passt und wie es weitergeht.</p></div>
        <div className={s.services}>
          {([
            ["text", "01", "Worte, die treffen.", "Was Sie besonders macht, gehört auf den Punkt. Ich übersetze Ihr Wissen in verständliche Botschaften und schreibe die Texte selbst."],
            ["design", "02", "Ein eigener Auftritt.", "Gestaltung, Bilder und Bewegung passen zu Ihrem Unternehmen. Vom ersten Eindruck bis ins Detail – auf dem Handy genauso wie am großen Bildschirm."],
            ["path", "03", "Ein klarer Weg.", "Sich informieren, Kontakt aufnehmen oder bewerben: Ihre Besucher finden, was sie brauchen. Verständliche Inhalte und passende nächste Schritte geben Orientierung."],
          ] as const).map(([kind, num, title, copy]) => <article className={s.service} key={kind} data-reveal data-ambient><span className={s.cardNumber}>{num}</span><div className={s.serviceDrawing}><Drawing kind={kind} /></div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className={s.expertise} data-reveal>
          <div className={s.expertiseIntro}><p className={s.eyebrow}>Konzept, Gestaltung und Entwicklung</p><h3>Auch unter der Oberfläche durchdacht.</h3></div>
          <div className={s.expertiseGrid}>
            <div><h4>Ein Aufbau mit Absicht.</h4><p>Welche Fragen haben Ihre Besucher? Was müssen sie zuerst verstehen? Daraus entwickle ich die Reihenfolge Ihrer Inhalte, die Navigation und die passenden Kontaktwege.</p></div>
            <div><h4>Für echte Nutzung gestaltet.</h4><p>Ich plane für kleine und große Bildschirme. Mit lesbaren Texten, gut erreichbaren Bedienelementen und Animationen, die Orientierung geben.</p></div>
            <div><h4>Die passende Technik dahinter.</h4><p>Ein schlanker Auftritt, selbst pflegbare Inhalte oder eine Anbindung an bestehende Systeme: Die Umsetzung richtet sich danach, was Sie später mit der Website tun möchten.</p></div>
            <div><h4>Vor dem Livegang geprüft.</h4><p>Ich prüfe Darstellung, Tastaturbedienung und Kontaktwege. Ladezeiten, Bildgrößen und technische SEO-Grundlagen gehören ebenso dazu wie eine klare Übergabe.</p></div>
          </div>
          <p className={s.expertiseFoot}>Was das für Sie heißt: Text, Gestaltung und Technik entstehen aus demselben Konzept.</p>
        </div>
      </section>

      <CopyStatement motionPaused={motionPaused} />

      <section id="preise" className={s.section} aria-labelledby="prices-title">
        <div className={s.sectionRule} data-line />
        <div className={s.sectionHeading + " " + s.headingStraight} data-reveal><p className={s.eyebrow}>03 / Der passende Rahmen</p><h2 id="prices-title">So viel Website,<br /><span>wie Ihr Vorhaben braucht.</span></h2><p>Umfang, Funktionen und die Inszenierung machen den Unterschied. Sie wählen den Rahmen, der zu Ihrem Vorhaben passt.</p></div>
        <div className={s.packages}>{packages.map((pkg, i) => <article className={s.package} data-featured={i === 1} data-reveal key={pkg.name}>
          <div className={s.packageTop}><span>0{i + 1}</span><h3>{pkg.name}</h3></div><p className={s.packageLead}>{pkg.lead}</p><p className={s.packageDescription}>{pkg.description}</p><p className={s.price}><span>ab</span> {pkg.price} <span>€</span></p><span className={s.once}>Einmaliges Website-Projekt</span><div className={s.packageRule} /><ul>{pkg.features.map(f => <li key={f}><span aria-hidden="true">↗</span>{f}</li>)}</ul><a href={mail("Website-Projekt – Paket " + pkg.name)} className={i === 1 ? s.button : s.outlineButton}>Über {pkg.name} sprechen <Arrow diagonal /></a>
        </article>)}</div>
        <p className={s.packageBasics}>Immer dabei: eigene Texte, mobile Optimierung, technische SEO-Grundlagen und Prüfung vor dem Livegang.</p>
        <p className={s.priceNote}>Der genaue Festpreis steht vor dem Start fest. Seitenumfang, individuelle Animationen und Anbindungen stimmen wir im Angebot ab. Für den laufenden Betrieb können Sie die Betreuung unten wählen oder Hosting und Domain selbst organisieren. Etwaige Lizenzkosten sind im Angebot ausgewiesen.</p>
        <div className={s.care} data-reveal><div><p className={s.eyebrow}>Nach dem Livegang</p><h3>Ihre Website läuft.<br />Ich kümmere mich.</h3><p>Damit Ihre Website aktuell bleibt und sich weiterentwickelt: Ich übernehme Hosting und technischen Betrieb, auf Wunsch auch Inhaltspflege und laufende Suchmaschinenoptimierung. Alles in einer Betreuung, passend zu Ihrem Bedarf. Oder Sie übernehmen selbst – mit der vereinbarten Website und allen Zugängen.</p></div><div className={s.careOffer}><span className={s.optional}>Optional · Hosting inklusive</span><p>ab <strong>69 €</strong> / Monat</p><span>Inklusive Hosting, technischer Betreuung und einer Standard-Domain. Inhaltspflege, laufende SEO-Arbeit und teurere Wunschdomains erweitern die Betreuung zu einem entsprechend höheren Monatspreis. Leistungen, Umfang und Reaktionszeiten vereinbaren wir vorab.</span></div></div>
      </section>

      <Collaboration motionPaused={motionPaused} />

      <section id="ueber-mich" className={s.about} aria-labelledby="about-title">
        <div className={s.aboutHeading} data-reveal><p className={s.eyebrow}>05 / Hi, ich bin Leo.</p><h2 id="about-title">Ich denke in Ideen.<br /><span>Und in ganzen Websites.</span></h2></div>
        <figure className={s.portrait}><div className={s.portraitImage}><img src={basePath + "/FOTOS/leonid_cropped_2.webp"} alt="Leonid Ryazanskiy, Gründer von Leoquent" width="720" height="900" loading="lazy" /></div><figcaption><span>Der Kopf hinter Leoquent.</span><Arrow diagonal /></figcaption></figure>
        <div className={s.aboutCopy} data-reveal><p>Ich bin Leonid Ryazanskiy. Seit über einem Jahrzehnt entwickle ich Konzepte, Ideen und Texte für Marken – in enger Zusammenarbeit mit Art Directors und Designern. Dabei habe ich gelernt, Botschaften und Gestaltung zusammenzudenken: Was macht ein Angebot relevant? Was bleibt im Kopf? Und was bewegt Menschen zum nächsten Schritt?</p><p>Webdesign begleitet mich seit meiner Jugend, damals noch mit Dreamweaver. Heute verbinde ich diese Leidenschaft mit meiner Erfahrung aus der Werbung. Ich entwickle Ihre Website strategisch und kreativ: mit einer klaren Idee, einem durchdachten Aufbau und einem Design, das Ihre Botschaft trägt.</p><p>Von der ersten Formulierung bis zur letzten Interaktion entsteht so ein zusammenhängender Auftritt. Ich schreibe die Texte, gestalte den Weg durch die Seite und setze sie um. Sie haben einen Ansprechpartner, der das Ganze im Blick behält.</p><p>KI gehört dabei zu meinen Werkzeugen. Die Richtung geben Ihr Unternehmen, Ihre Ziele und die Menschen vor, die Sie erreichen möchten. Je nach Projekt ergänze ich meine Arbeit durch mein Netzwerk aus Entwicklung, Design, Art Direction, Fotografie, Projektmanagement und Social Media.</p><div className={s.agencies}><span>Unter anderem tätig für:</span><p>Scholz & Friends · Serviceplan · Havas · fischerAppelt · Zum Goldenen Hirschen</p></div></div>
      </section>

      <section className={s.section + " " + s.faqSection} aria-labelledby="faq-title">
        <div data-reveal><p className={s.eyebrow}>06 / Noch offen?</p><h2 id="faq-title">Gute Fragen.<br /><span>Klare Antworten.</span></h2></div>
        <div className={s.faqList}>{faqs.map((faq, i) => <div className={s.faq} key={faq.q} data-reveal><h3><button aria-expanded={faqOpen === i} aria-controls={"faq-answer-" + i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>{faq.q}<span aria-hidden="true">{faqOpen === i ? "−" : "+"}</span></button></h3><div id={"faq-answer-" + i} className={s.expand} data-open={faqOpen === i} inert={faqOpen !== i}><div className={s.expandInner}><p className={s.faqAnswer}>{faq.a}</p></div></div></div>)}</div>
      </section>

      <section id="kontakt" className={s.contact} aria-labelledby="contact-title" data-ambient>
        <div data-reveal><p className={s.eyebrow}><span className={s.dot} /> Der erste Schritt ist ein Gespräch.</p><h2 id="contact-title">Erzählen Sie mir,<br /><span>was Sie vorhaben.</span></h2><p>Neue Website oder neuer Blick auf die bestehende? Ich höre mir an, was Sie brauchen, und sage Ihnen ehrlich, was ich dafür tun kann.</p><div className={s.contactActions}><a href={mail("Lassen Sie uns über meine Website sprechen")} className={s.button}>Projekt besprechen <Arrow diagonal /></a><a href="tel:+4917647177623" className={s.textLink}>Oder direkt anrufen <Arrow /></a></div><span className={s.contactNote}>Kostenloses Erstgespräch · unverbindlich</span></div><div className={s.contactArt} aria-hidden="true"><Drawing kind="design" /></div>
      </section>

      <aside className={s.bridge} data-reveal aria-label="Prozesse und Automatisierung"><div><p className={s.eyebrow}>Erst verstehen. Dann sinnvoll vereinfachen.</p><h2>Weniger von Hand.<br /><span>Mehr Zeit fürs Eigentliche.</span></h2><p>Dieser Blick aufs Ganze endet nicht bei der Website. Wo gehen in Ihrem Alltag Zeit und Informationen verloren? Ich analysiere Ihre Abläufe, verbinde bestehende Software oder entwickle passende Werkzeuge. Mit KI, wenn sie hilft. Ohne, wenn es einfacher geht. Auch unabhängig von einer neuen Website.</p></div><Link href="/prozesse/" className={s.bridgeLink}>Prozesse & Automatisierung <Arrow diagonal /></Link></aside>
    </main>

    <footer className={s.footer}><div className={s.footerTop}><Link href="/" className={s.brand}><LqntMark className={s.mark} /><span>leoquent</span></Link><a href="mailto:hi@lqnt.de">hi@lqnt.de <Arrow diagonal /></a></div><div className={s.footerBottom}><span>© {new Date().getFullYear()} Leoquent · Leonid Ryazanskiy</span><button onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused}>{motionPaused ? "Bewegung fortsetzen" : "Bewegung pausieren"}</button><nav aria-label="Rechtliches"><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link><a href="#inhalt">Nach oben ↑</a></nav></div></footer>
  </div>;
}
