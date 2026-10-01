"use client";

import { useEffect, useRef, useState } from "react";
import HeroScene from "./HeroScene";
import s from "./webdesign.module.css";

const HOLD_MS = 5800;

/** One tour, with a reading pause whenever the visitor takes an interest. */
export default function HeroPresentation({ motionPaused }: { motionPaused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const remaining = useRef({ scene: 0, ms: HOLD_MS });
  const [scene, setScene] = useState(0);
  const [replay, setReplay] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const stage = root.current;
    if (!stage || manual || motionPaused || scene === 2) return;
    if (remaining.current.scene !== scene) remaining.current = { scene, ms: HOLD_MS };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia('(max-width: 700px)');
    let intersectionRatio = 0;
    let visible = false;
    let hovered = window.matchMedia("(hover: hover) and (pointer: fine)").matches && stage.matches(":hover");
    let focused = stage.contains(document.activeElement);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let started = 0;
    const pause = () => {
      if (timer === undefined) return;
      clearTimeout(timer);
      timer = undefined;
      remaining.current.ms = Math.max(0, remaining.current.ms - (performance.now() - started));
    };
    const sync = () => {
      visible = intersectionRatio >= (mobile.matches ? 0.95 : 0.45);
      if (!visible || hovered || focused || document.hidden || reduced.matches) { pause(); return; }
      if (timer !== undefined) return;
      started = performance.now();
      timer = setTimeout(() => {
        timer = undefined;
        remaining.current.ms = 0;
        setScene(scene + 1);
      }, remaining.current.ms);
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersectionRatio = entry.isIntersecting ? entry.intersectionRatio : 0;
      sync();
    }, { threshold: [0, 0.45, 0.95] });
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { hovered = true; sync(); } };
    const leave = () => { hovered = false; sync(); };
    const focusIn = () => { focused = true; sync(); };
    const focusOut = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && stage.contains(event.relatedTarget); sync(); };
    observer.observe(stage);
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    stage.addEventListener("focusin", focusIn);
    stage.addEventListener("focusout", focusOut);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    mobile.addEventListener('change', sync);
    return () => {
      pause(); observer.disconnect();
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
      stage.removeEventListener("focusin", focusIn);
      stage.removeEventListener("focusout", focusOut);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener('change', sync);
    };
  }, [scene, manual, motionPaused]);

  const playing = !manual && scene < 2;
  return <div ref={root} className={s.heroStage} data-intro data-ambient>
    <HeroScene scene={scene} replay={replay} motionPaused={motionPaused} />
    <div className={s.sceneControls} role="group" aria-label="Website-Bausteine entdecken">
      {["Botschaft", "Gestaltung", "Aktion"].map((label, i) => <button key={label} aria-pressed={scene === i} onClick={() => { setManual(true); setScene(i); setReplay(value => value + 1); }}><span>0{i + 1}</span>{label}</button>)}
      <button className={s.tourControl} disabled={motionPaused} aria-label={playing ? "Automatischen Durchlauf anhalten" : "Drei Schritte automatisch abspielen"} onClick={() => {
        if (playing) setManual(true);
        else { remaining.current = { scene: 0, ms: HOLD_MS }; setScene(0); setReplay(value => value + 1); setManual(false); }
      }}><svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M6 4v12M14 4v12" fill="none" stroke="currentColor" strokeWidth="2" /> : <path d="m6 3 10 7-10 7Z" fill="currentColor" />}</svg></button>
    </div>
    <p className={s.srOnly} aria-live={manual ? "polite" : "off"}>{["Botschaft: Klare Texte zeigen, was Ihr Unternehmen ausmacht.", "Gestaltung: Ring und Strich verbinden sich zum Q von leoquent. Die Website passt sich beiden Geräten an.", "Aktion: Mehr erfahren öffnet zusätzliche Informationen. Der nächste Schritt kann auch eine Anfrage oder Bewerbung sein."][scene]}</p>
  </div>;
}
