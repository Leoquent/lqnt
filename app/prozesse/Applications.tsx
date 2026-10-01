"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { applications, type ApplicationExample } from "./applicationExamples";
import styles from "./applications.module.css";

function Example({ item, headingId }: { item: ApplicationExample; headingId: string }) {
  return <>
    <p className={styles.context}>{item.category}</p>
    <h3 id={headingId}>{item.title}</h3>
    <p className={styles.lead}>{item.lead}</p>
    <ol className={styles.flow}>
      {item.steps.map((step, index) => <li key={step}>
        <span>{["Ausgangslage", "Verarbeitung", "Ergebnis"][index]}</span>
        <strong>{step}</strong>
      </li>)}
    </ol>
    <div className={styles.sample}>
      <p>Beispielhaftes Ergebnis</p>
      <h4>{item.sample}</h4>
      <ul>{item.result.map(result => <li key={result}>{result}</li>)}</ul>
    </div>
    <p className={styles.decision}><strong>Ihre Rolle</strong> · {item.human}</p>
  </>;
}

export default function Applications({ onAnalyse }: { onAnalyse: () => void }) {
  const [selected, setSelected] = useState(0);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  useEffect(() => {
    // Accordion height changes move the sections with scroll animations below it.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selected, openMobile]);

  return <section className={styles.section} id="anwendungen" aria-labelledby="applications-heading">
    <span id="branchen" className={styles.legacyAnchor} aria-hidden="true" />
    <div className={styles.inner}>
      <header className={styles.intro}>
        <div><p className={styles.eyebrow}>Mögliche Anwendungen</p><h2 id="applications-heading">Was wäre, wenn<br /><span>Ihre Systeme mitarbeiten?</span></h2></div>
        <p className={styles.introCopy}>Viele Betriebe haben ähnliche Zeitfresser. Entdecken Sie, wie KI, Automatisierung und eigene Software Ihnen Arbeit abnehmen können.<small>Wählen Sie eine Situation, die Sie kennen.</small></p>
      </header>

      <div className={styles.desktop}>
        <div className={styles.situations} role="group" aria-label="Alltagssituation auswählen">
          <p className={styles.prompt}>Sechs Situationen. Was kennen Sie davon?</p>
          {applications.map((item, index) => <button key={item.id} type="button" className={styles.trigger} aria-pressed={selected === index} aria-controls="application-detail" onClick={() => setSelected(index)}>
            <span>{item.label}</span><span className={styles.arrow} aria-hidden="true">↗</span>
          </button>)}
        </div>
        <div className={styles.detail} id="application-detail" role="region" aria-labelledby="application-detail-heading">
          <Example item={applications[selected]} headingId="application-detail-heading" />
        </div>
      </div>

      <div className={styles.mobile}>
        <p className={styles.prompt}>Sechs Situationen. Was kennen Sie davon?</p>
        {applications.map(item => <div key={item.id}>
          <button type="button" className={styles.trigger} aria-expanded={openMobile === item.id} aria-controls={`application-${item.id}`} onClick={() => setOpenMobile(openMobile === item.id ? null : item.id)}>
            <span>{item.label}</span><span className={styles.expandIcon} aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d={openMobile === item.id ? "M16 0a16 16 0 1 1 0 32A16 16 0 0 1 16 0ZM8 14v4h16v-4H8Z" : "M16 0a16 16 0 1 1 0 32A16 16 0 0 1 16 0ZM14 7v7H7v4h7v7h4v-7h7v-4h-7V7h-4Z"} /></svg></span>
          </button>
          <div className={styles.detail} id={`application-${item.id}`} hidden={openMobile !== item.id} role="region" aria-labelledby={`application-${item.id}-heading`}>
            <Example item={item} headingId={`application-${item.id}-heading`} />
          </div>
        </div>)}
      </div>

      <footer className={styles.bottom}>
        <div><h3>Ihr Alltag sieht anders aus?</h3><p>Genau dort beginnt die <button type="button" onClick={onAnalyse}>kostenlose Potenzialanalyse.</button></p></div>
        <p>Diese Beispiele zeigen mögliche Abläufe. Welche Lösung zu Ihnen passt, hängt von Ihren Aufgaben, Daten und vorhandenen Systemen ab.</p>
      </footer>
    </div>
  </section>;
}
