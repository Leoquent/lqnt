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
import PricingCards from "./PricingCards";
import QuizModal from "@/components/QuizModal";
import { brandPackage, faqs } from "./content";
import s from "./webdesign.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const mail = (subject: string) => "mailto:hi@lqnt.de?subject=" + encodeURIComponent(subject);
const links = [["Arbeiten", "arbeiten"], ["Leistungen", "leistungen"], ["Preise", "preise"], ["Über mich", "ueber-mich"]];

export default function WebdesignPage() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)');
    let lastY = window.scrollY;
    let direction = 0;
    let distance = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;
      if (!mobile.matches || menuOpen || y < 56 || header.current?.contains(document.activeElement)) {
        setHeaderHidden(false); distance = 0; return;
      }
      if (Math.sign(delta) !== direction) { direction = Math.sign(delta); distance = 0; }
      distance += Math.abs(delta);
      if (distance >= 12) { setHeaderHidden(direction > 0); distance = 0; }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    mobile.addEventListener('change', schedule);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); mobile.removeEventListener('change', schedule); };
  }, [menuOpen]);

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
    <header ref={header} className={s.header} data-hidden={headerHidden && !menuOpen} onFocusCapture={() => setHeaderHidden(false)}>
      <div className={s.headerInner}>
        <a href="#inhalt" className={s.brand} aria-label="leoquent – zum Seitenanfang" onClick={() => setMenuOpen(false)}><LqntMark className={s.mark} /><span>leoquent</span></a>
        <nav aria-label="Hauptnavigation" className={s.desktopNav}>{links.map(([label, id]) => <a key={id} href={"#" + id}>{label}</a>)}</nav>
        <div className={s.headerActions}><Link href="/" className={s.otherService}>Alle Leistungen <Arrow diagonal /></Link><button onClick={() => setQuizOpen(true)} className={s.headerCta}>Projekt besprechen <Arrow diagonal /></button></div>
        <button className={s.menuButton} ref={menuButton} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Schließen" : "Menü"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
      </div>
      <nav id="mobile-navigation" className={s.mobileNav} aria-label="Mobile Navigation" hidden={!menuOpen}>
        {links.map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setMenuOpen(false)}>{label}<Arrow /></a>)}
        <Link href="/">Alle Leistungen <Arrow diagonal /></Link><a href="#kontakt" onClick={() => setMenuOpen(false)}>Projekt besprechen <Arrow /></a><Link href="/prozesse/">Prozesse & Automatisierung <Arrow diagonal /></Link>
      </nav>
    </header>

    <main id="inhalt">
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.heroHeading}>
          <p className={s.eyebrow} data-intro><span className={s.dot} /> Webdesign & Markenauftritt</p>
          <h1 id="hero-title" data-intro>Ihr Unternehmen<br />kann was.<br /><em>Zeigen wir es.</em></h1>
        </div>
        <HeroPresentation motionPaused={motionPaused} />
        <div className={s.heroDetails}>
          <p className={s.heroLead} data-intro>Mit einer Website, die zeigt, was Sie ausmacht. Mit klaren Texten und eigenständigem Design. Und bei Bedarf mit einem neuen Markenauftritt – inklusive Logo.</p>
          <div className={s.heroActions} data-intro><a className={s.button} href="#arbeiten">Arbeiten entdecken <Arrow diagonal /></a><a className={s.textLink} href="#preise">Pakete ab 1.900 € <Arrow /></a></div>
          <p className={s.heroFootnote} data-intro>Ausgezeichneter Copywriter. Konzept, Text und Webdesign aus einer Hand. <a href="#ueber-mich">Mehr über mich</a></p>
        </div>
      </section>



      <section id="arbeiten" className={s.section} aria-labelledby="work-title">
        <div className={s.sectionRule} data-line />
        <div className={s.sectionHeading + " " + s.headingStraight} data-reveal><p className={s.eyebrow}>01 / Aus der Arbeit</p><h2 id="work-title">Von der Idee<br /><span>zum Auftritt.</span></h2><p>Wie ich Angebot, Botschaft und Gestaltung zusammenbringe. Einblicke in meine Arbeit.</p></div>
        <article className={s.project} data-reveal>
          <button className={s.projectSummary} aria-expanded={projectOpen} aria-controls="gebruederross-details" onClick={() => setProjectOpen(!projectOpen)}>
            <div className={s.projectVisual}><img src={basePath + "/referenzen/gebrueder-ross-desktop.webp"} alt="Gebrüder Ross: Website mit klarer Typografie in Dunkelblau und Gold" width="1440" height="1000" loading="lazy" /></div>
            <div className={s.projectText}><p className={s.eyebrow}>Recherche · Marke · Website</p><h3>Gebrüder Ross</h3><p>Nachlassabwicklung verständlich machen. Leistungen ordnen. Persönliches Vertrauen aufbauen.</p></div>
            <span className={s.projectToggle}>{projectOpen ? "Weniger" : "Projekt ansehen"}<span className={s.plus} aria-hidden="true">{projectOpen ? "−" : "+"}</span></span>
          </button>
          <div id="gebruederross-details" className={s.expand} data-open={projectOpen} inert={!projectOpen}>
            <div className={s.expandInner}><div className={s.projectDetails}>
              <div><p className={s.eyebrow}>Die Aufgabe</p><h4>Ein sensibles Thema.<br />Eine klare Orientierung.</h4><p>Gebrüder Ross unterstützt Nachlasspfleger und Nachlassverwalter im Großraum Stuttgart. Die Website erklärt ein breites Angebot: von der ersten Objektbegehung über die Verwertung bis zur Räumung und Übergabe.</p></div>
              <div><p className={s.eyebrow}>Der Auftritt</p><h4>Leistungen erklären.<br />Die Menschen dahinter zeigen.</h4><p>Von Zielgruppenrecherche und Logo über sämtliche Texte bis zur Entwicklung: Der Auftritt verbindet eine ruhige Gestaltung mit persönlichen Ansprechpartnern. Domain und Hosting übernehme ich ebenfalls.</p><ul><li>Sechs Leistungsseiten und mobile Detailansichten</li><li>Eigene Bildsprache mit KI-gestütztem Fotoshooting</li><li>Schlanke Umsetzung und eigener Formular-Endpunkt</li></ul><Link href="/referenzen/gebrueder-ross/" className={s.textLink}>Das Projekt im Detail <Arrow diagonal /></Link></div>
            </div></div>
          </div>
        </article>
        <p className={s.workNote}>Ein Einblick in meine Arbeit für ein Unternehmen mit einem erklärungsbedürftigen Angebot.</p>
      </section>

      <section id="leistungen" className={s.section} aria-labelledby="services-title">
        <div className={s.sectionRule} data-line />
        <div className={s.sectionHeading} data-reveal><p className={s.eyebrow}>02 / Was Ihre Website ausmacht</p><h2 id="services-title">Gut aussehen ist der Anfang.<br /><span>Verstanden werden <span className={s.keepTogether}>das Ziel.</span></span></h2><p>Ihre Besucher sollen erkennen, was Sie anbieten, warum es zu ihnen passt und wie es weitergeht.</p></div>
        <div className={s.services}>
          {([
            ["text", "01", "Worte, die treffen.", "Was Sie besonders macht, gehört auf den Punkt. Ich übersetze Ihr Wissen in verständliche Botschaften und schreibe die Texte selbst."],
            ["design", "02", "Ein eigener Auftritt.", "Ich baue auf Ihrer bestehenden Marke auf. Auf Wunsch modernisiere ich Ihren Auftritt oder entwickle eine neue Marke mit Ihnen – von Logo, Farben und Schriften bis zur passenden Sprache."],
            ["path", "03", "Ein klarer Weg.", "Sich informieren, Kontakt aufnehmen oder bewerben: Ihre Besucher finden, was sie brauchen. Verständliche Inhalte und passende nächste Schritte geben Orientierung."],
          ] as const).map(([kind, num, title, copy]) => <article className={s.service} key={kind} data-reveal data-ambient><span className={s.cardNumber}>{num}</span><div className={s.serviceDrawing}><Drawing kind={kind} /></div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className={s.expertise} data-reveal>
          <div className={s.expertiseIntro}><p className={s.eyebrow}>Konzept, Gestaltung und Entwicklung</p><h3>Auch unter der Oberfläche durchdacht.</h3></div>
          <div className={s.expertiseGrid}>
            <div><h4>Ein Aufbau mit Absicht.</h4><p>Welche Fragen haben Ihre Besucher? Wie unterscheiden Sie sich vom Wettbewerb? Daraus entwickle ich Botschaften, Inhalte und Kontaktwege. Die Tiefe der Zielgruppen- und Wettbewerbsrecherche richtet sich nach dem Projekt.</p></div>
            <div><h4>Für echte Nutzung gestaltet.</h4><p>Ich plane für kleine und große Bildschirme. Mit lesbaren Texten, gut erreichbaren Bedienelementen und Animationen, die Orientierung geben.</p></div>
            <div><h4>Die passende Technik dahinter.</h4><p>Ein schlanker Auftritt, selbst pflegbare Inhalte oder eine Anbindung an bestehende Systeme: Die Umsetzung richtet sich danach, was Sie später mit der Website tun möchten. Datenschutz plane ich mit – mit lokal eingebundenen Schriften, datensparsamen Formularen und bewusst ausgewählten Diensten.</p></div>
            <div><h4>Vor dem Livegang geprüft.</h4><p>Ich prüfe Darstellung, Tastaturbedienung und Kontaktwege. Ladezeiten, Bildgrößen und technische SEO-Grundlagen gehören ebenso dazu wie eine klare Übergabe.</p></div>
          </div>
          <div className={s.searchIntro}><h4>Gefunden werden. Auch in der KI-Suche.</h4><p>Ich schreibe Inhalte, die echte Fragen Ihrer Kunden beantworten. Klare Leistungsseiten, nachvollziehbare Beispiele und eine technisch zugängliche Website helfen Suchmaschinen und KI-Suchdiensten, Ihr Angebot einzuordnen. SEO und die Optimierung für KI-Suche, oft GEO genannt, plane ich deshalb gemeinsam.</p><Link href="/webdesign/seo-und-ki-suche/" className={s.textLink}>So plane ich Inhalte für die Suche <Arrow diagonal /></Link></div>
          <div className={s.searchIntro}><h4>Auch vor Ort sichtbar.</h4><p>Für lokale Unternehmen richte ich auf Wunsch ein Google-Unternehmensprofil ein oder überarbeite den bestehenden Eintrag: mit passenden Angaben, Leistungen und Bildern. Die Inhaberschaft liegt bei Ihnen. Ich begleite Einrichtung und Bestätigung durch Google – als Ergänzung zur Website oder als eigenes Projekt.</p><p className={s.localProfileNote}>Google stellt das Profil kostenlos bereit. Mein Angebot umfasst die Einrichtung und Abstimmung; Voraussetzung ist, dass Ihr Unternehmen für ein Profil zugelassen ist. <a href="https://support.google.com/business/answer/7163406?hl=de">Google-Hinweise zur Zusammenarbeit mit Dienstleistern</a></p></div>
          <p className={s.expertiseFoot}>Was das für Sie heißt: Text, Gestaltung und Technik entstehen aus demselben Konzept.</p>
        </div>
      </section>

      <CopyStatement motionPaused={motionPaused} />

      <section id="preise" className={s.section} aria-labelledby="prices-title">
        <div className={s.sectionRule} data-line />
        <PricingCards motionPaused={motionPaused}>
        <div className={s.sectionHeading + " " + s.headingStraight} data-reveal><p className={s.eyebrow}>03 / Der passende Rahmen</p><h2 id="prices-title">So viel Website,<br /><span>wie Ihr Vorhaben braucht.</span></h2><p>Umfang, Funktionen und die Inszenierung machen den Unterschied. Sie wählen den Rahmen, der zu Ihrem Vorhaben passt.</p></div>
        <p className={s.taxNote}>Angebot für Unternehmen. Alle Preise netto zuzüglich gesetzlicher Umsatzsteuer.</p>
        </PricingCards>
        <div className={s.brandModule}><p className={s.eyebrow}>Bei Bedarf dazu: Ihre Marke</p><h3>Die Website braucht ein Gesicht.<br />Und eine eigene Stimme.</h3><p>Ihr Logo und Markenstil stehen schon? Dann baue ich darauf auf. Wenn sie fehlen oder nicht mehr passen, entwickle ich mit Ihnen eine stimmige Grundlage für Ihren Auftritt. Zu jedem Website-Paket oder als eigenes Projekt.</p><p className={s.brandPrice}>Markengrundlage <strong>ab {brandPackage.price} €</strong><span>Einmalig · netto zuzüglich Umsatzsteuer</span></p><ul className={s.brandScope}>{brandPackage.features.map(feature => <li key={feature}>{feature}</li>)}</ul><p className={s.brandScopeNote}>Für eine klar umrissene Marke. Umfangreichere Markenstrategie, Namensentwicklung und zusätzliche Anwendungen kalkuliere ich separat. Kleine Anpassungen an einem vorhandenen Logo sind auch nach Aufwand möglich. Den genauen Umfang und Festpreis vereinbaren wir vor dem Start.</p><a href={mail("Logo und Markenauftritt besprechen")} className={s.textLink}>Über meine Marke sprechen <Arrow diagonal /></a></div>
        <p className={s.packageBasics}>Immer dabei: ein gemeinsames Briefing, eigene Website-Texte, mobile Optimierung, technische SEO-Grundlagen, Prüfung vor dem Livegang und die Anbindung Ihrer Domain. Die Website-Preise setzen ein nutzbares Logo und vorhandene Markengrundlagen voraus; Neuentwicklung oder Modernisierung kommt bei Bedarf dazu.</p>
        <p className={s.priceNote}>Auch der technische Start gehört zum Website-Paket: Ich verbinde Ihre Domain mit der neuen Website und richte die nötigen DNS-Einträge und HTTPS ein. Umfangreiche Website-Umzüge oder die Übernahme von E-Mail-Postfächern stimmen wir gesondert ab. Der genaue Festpreis, besondere Funktionen und etwaige Lizenzkosten stehen vor dem Start im Angebot. Hosting und Domainkosten fallen laufend an; dafür können Sie meine Betreuung wählen oder den Betrieb selbst organisieren.</p>
        <div className={s.care} data-reveal><div><p className={s.eyebrow}>Nach dem Livegang</p><h3>Ihre Website läuft.<br />Ich kümmere mich.</h3><p>Damit Ihre Website aktuell bleibt und sich weiterentwickelt: Ich übernehme Hosting und technischen Betrieb, auf Wunsch auch Inhaltspflege und laufende Suchmaschinenoptimierung. Alles in einer Betreuung, passend zu Ihrem Bedarf. Oder Sie übernehmen selbst – mit der vereinbarten Website und allen Zugängen.</p></div><div className={s.careOffer}><span className={s.optional}>Optional · Hosting inklusive</span><p>ab <strong>69 €</strong> / Monat <span className={s.careTax}>netto zzgl. Umsatzsteuer</span></p><span>Inklusive Hosting und technischer Betreuung. Ihre bestehende Domain nutzen wir weiter; bei Bedarf ist eine neue Standard-Domain inklusive. Der Betrieb eines von mir erstellten, vereinbarten Kontaktformulars gehört dazu. Inhaltspflege, Auswertungen und laufende SEO-Arbeit ergänzen die Betreuung im vereinbarten Umfang.</span></div></div>
        <div className={s.careDetails}><div><h3>Technik in guten Händen.</h3><p>In meiner Betreuung hoste ich Ihre Website in Deutschland. Datenschutz, Datenflüsse und Zugriffsrechte berücksichtige ich bei der Einrichtung. Welche Prüfungen, Sicherungen und Reaktionszeiten dazugehören, halten wir im Betreuungsangebot fest.</p></div><div><h3>Verstehen, was ankommt.</h3><p>Auf Wunsch richte ich eine datensparsame Webanalyse und Google Search Console ein. In einer erweiterten Betreuung werte ich Besuche und Suchanfragen aus und setze daraus abgeleitete Verbesserungen im vereinbarten Zeitbudget um.</p></div></div>
      </section>

      <Collaboration motionPaused={motionPaused} />

      <section id="ueber-mich" className={s.about} aria-labelledby="about-title">
        <div className={s.aboutHeading} data-reveal><p className={s.eyebrow}>05 / Hi, ich bin Leo.</p><h2 id="about-title">Ich denke in Ideen.<br /><span>Und in ganzen Websites.</span></h2></div>
        <figure className={s.portrait}><div className={s.portraitImage}><img src={basePath + "/FOTOS/leonid_cropped_2.webp"} alt="Leonid Ryazanskiy, Gründer von leoquent" width="1400" height="1868" loading="lazy" /></div><figcaption><span>Der Kopf hinter leoquent.</span><Arrow diagonal /></figcaption></figure>
        <div className={s.aboutCopy} data-reveal><p className={s.personalLead}>Sie bringen das Wissen über Ihr Unternehmen mit. Ich mache daraus einen Auftritt, den Ihre Kunden verstehen.</p><p>Ich bin Leonid Ryazanskiy. Seit über einem Jahrzehnt entwickle ich Konzepte, Ideen und Texte für Marken – in enger Zusammenarbeit mit Art Directors und Designern. Ich wechsle dabei bewusst die Perspektive: Was für Sie selbstverständlich ist, muss für Ihre Kunden erst verständlich und relevant werden. Daraus entstehen Botschaften, die den Unterschied Ihres Angebots auf den Punkt bringen.</p><p>Ihre Marke zeigt sich darin, was Sie versprechen, wie Sie sprechen und was Menschen mit Ihnen erleben. Ihre Website ist ein Teil davon. Deshalb denke ich Strategie, Sprache und Gestaltung gemeinsam. Ich hinterfrage Gewohntes und suche nach einer Idee, die zu Ihrem Unternehmen passt und über die einzelne Seite hinaus funktioniert.</p><p>Webdesign begleitet mich seit meiner Jugend, damals noch mit Dreamweaver. Heute verbinde ich diese Leidenschaft mit meiner Erfahrung aus der Werbung. Von der ersten Botschaft bis zur letzten Interaktion entwickle ich Ihren Auftritt: Ich schreibe, gestalte und setze die Website um. Wenn nötig, beginnt das schon bei Logo, Markenstil und Tonalität. Sie haben einen Ansprechpartner, der das Ganze im Blick behält.</p><p>KI gehört dabei zu meinen Werkzeugen. Die Richtung geben Ihr Unternehmen, Ihre Ziele und die Menschen vor, die Sie erreichen möchten. Je nach Projekt ergänze ich meine Arbeit durch mein Netzwerk aus Entwicklung, Design, Art Direction, Fotografie, Projektmanagement und Social Media.</p><div className={s.agencies}><span>Unter anderem tätig für:</span><p>Scholz & Friends · Serviceplan · Havas · fischerAppelt · Zum Goldenen Hirschen</p></div></div>
      </section>

      <section className={s.credentials} data-reveal aria-labelledby="credentials-title"><div className={s.credentialsIntro}><h2 id="credentials-title">Preisgekrönte Kommunikation.</h2><p>Arbeiten aus meiner Werbelaufbahn wurden unter anderem hier ausgezeichnet.</p></div><div>Cannes Lions<span>ADC</span>New York Festivals<span>The One Show</span></div></section>

      <section className={s.section + " " + s.faqSection} aria-labelledby="faq-title">
        <div data-reveal><p className={s.eyebrow}>06 / Noch offen?</p><h2 id="faq-title">Gute Fragen.<br /><span>Klare Antworten.</span></h2></div>
        <div className={s.faqList}>{faqs.map((faq, i) => <div className={s.faq} key={faq.q} data-reveal><h3><button aria-expanded={faqOpen === i} aria-controls={"faq-answer-" + i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>{faq.q}<span aria-hidden="true">{faqOpen === i ? "−" : "+"}</span></button></h3><div id={"faq-answer-" + i} className={s.expand} data-open={faqOpen === i} inert={faqOpen !== i}><div className={s.expandInner}><p className={s.faqAnswer}>{faq.a}</p></div></div></div>)}</div>
      </section>

      <section id="kontakt" className={s.contact} aria-labelledby="contact-title" data-ambient>
        <div data-reveal><p className={s.eyebrow}><span className={s.dot} /> Der erste Schritt ist ein Gespräch.</p><h2 id="contact-title">Erzählen Sie mir,<br /><span>was Sie vorhaben.</span></h2><p>Neue Website, frischer Blick auf die bestehende oder ein neuer Markenauftritt? Ich höre mir an, was Sie brauchen, und sage Ihnen ehrlich, was ich dafür tun kann.</p><div className={s.contactActions}><button onClick={() => setQuizOpen(true)} className={s.button}>Projekt besprechen <Arrow diagonal /></button><a href="tel:+4917647177623" className={s.textLink}>Oder direkt anrufen <Arrow /></a></div><span className={s.contactNote}>Kostenloses Erstgespräch · unverbindlich</span></div><div className={s.contactArt} aria-hidden="true"><Drawing kind="design" /></div>
      </section>

      <aside className={s.bridge} data-reveal aria-label="Prozesse und Automatisierung"><div><p className={s.eyebrow}>Erst verstehen. Dann sinnvoll vereinfachen.</p><h2>Weniger von Hand.<br /><span>Mehr Zeit fürs Eigentliche.</span></h2><p>Dieser Blick aufs Ganze endet nicht bei der Website. Wo gehen in Ihrem Alltag Zeit und Informationen verloren? Ich analysiere Ihre Abläufe, verbinde bestehende Software oder entwickle passende Werkzeuge. Mit KI, wenn sie hilft. Ohne, wenn es einfacher geht. Auch unabhängig von einer neuen Website.</p></div><Link href="/prozesse/" className={s.bridgeLink}>Prozesse & Automatisierung <Arrow diagonal /></Link></aside>
    </main>

    <footer className={s.footer}><div className={s.footerTop}><Link href="/" className={s.brand}><LqntMark className={s.mark} /><span>leoquent</span></Link><a href="mailto:hi@lqnt.de">hi@lqnt.de <Arrow diagonal /></a></div><div className={s.footerBottom}><span>© {new Date().getFullYear()} leoquent · Leonid Ryazanskiy</span><button onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused}>{motionPaused ? "Bewegung fortsetzen" : "Bewegung pausieren"}</button><nav aria-label="Rechtliches"><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link><a href="#inhalt">Nach oben ↑</a></nav></div></footer>
    <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} mode="webdesign" />
  </div>;
}
