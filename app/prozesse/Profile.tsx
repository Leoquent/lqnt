"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./profile.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Profile() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const card = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLButtonElement>(null);
  const open = hovered || pinned;

  useEffect(() => {
    if (!card.current || !copy.current || !heading.current) return;
    const measure = () => {
      card.current?.style.setProperty("--profile-content-height", `${copy.current!.scrollHeight + heading.current!.offsetHeight + 104}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(copy.current);
    observer.observe(heading.current);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => window.clearTimeout(timer);
  }, [open]);

  return <article ref={card} className={`lg:col-span-8 ${styles.card}`} data-profile-open={open}
    onPointerEnter={event => { if (event.pointerType === "mouse" && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(true); }}
    onPointerLeave={event => { if (event.pointerType === "mouse") setHovered(false); }}
    onClick={event => {
      if (!(event.target as HTMLElement).closest("button, a") && !window.getSelection()?.toString()) setPinned(!pinned);
    }}
    onKeyDown={event => { if (event.key === "Escape") { setPinned(false); setHovered(false); heading.current?.focus(); } }}>
    <img className={styles.portrait} src={`${basePath}/FOTOS/leonid_cropped_2.webp`} alt="Leonid Ryazanskiy" width="1400" height="1868" loading="lazy" />
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.content}>
      <h3 className={styles.heading}>
        <button ref={heading} type="button" aria-expanded={open} aria-controls="process-profile-copy" onClick={() => { setPinned(!open); setHovered(false); }}>
          <span>Leonid Ryazanskiy.<small>Strategie, Kreativität &amp; Entwicklung</small></span>
          <span className={styles.arrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19 19 5M5 5h14v14" /></svg></span>
          <span className="sr-only">{open ? "Profil schließen" : "Profil öffnen"}</span>
        </button>
      </h3>
      <div id="process-profile-copy" className={styles.reveal} aria-hidden={!open} inert={!open}>
        <div className={styles.clip}>
          <div ref={copy} className={styles.copy}>
            <p>Seit über einem Jahrzehnt arbeite ich als Copywriter und Konzeptioner für Marken. In Agenturen wie Scholz &amp; Friends, Serviceplan und Havas habe ich gelernt, komplexe Aufgaben zu verstehen, die entscheidenden Fragen zu stellen und daraus klare Konzepte zu entwickeln.</p>
            <p>Diese Arbeit verbindet Strategie und Kreativität. Ein gutes Konzept muss zu den Menschen passen, die damit arbeiten – und sich im Alltag bewähren. Genau diesen Blick bringe ich in Ihre Prozesse ein: Was braucht Ihr Team? Wo stockt die Arbeit? Und welche Verbindung oder welches Werkzeug würde wirklich helfen?</p>
            <p>In KI-Workshops habe ich Creative Teams an neue Arbeitsweisen herangeführt. Heute entwickle ich selbst passende Anwendungen und Automatisierungen. Als Strategic AI Engineer übersetze ich zwischen dem, was Ihr Unternehmen braucht, und dem, was KI und Software dafür leisten müssen. Ich entwickle die strategische Richtung und mache aus Ihrer Geschäftslogik klare Regeln, Datenwege und überprüfbare Abläufe.</p>
            <p>Sie sprechen direkt mit mir – von der ersten Frage über den Prototyp bis zur Einführung. Ich mache Zusammenhänge verständlich und halte Ziele, Grenzen und nächste Schritte fest. Je nach Aufgabe ergänze ich meine Arbeit durch mein Netzwerk aus Programmierern, Frontend- und Backend-Entwicklern, UI- und UX-Designern sowie Fachleuten für Gestaltung und Projektmanagement.</p>
          </div>
        </div>
      </div>
    </div>
  </article>;
}
