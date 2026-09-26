"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { Arrow } from "./Drawings";
import QArtwork from "./QArtwork";
import s from "./hero-scene.module.css";

gsap.registerPlugin(useGSAP, CustomEase);

function Lettering({ children, device }: { children: string; device: string }) {
  return <span className={s.typeLine}>{Array.from(children).map((letter, i) => <span data-letter={device} key={i}>{letter === " " ? "\u00a0" : letter}</span>)}</span>;
}

function MiniWebsite({ device }: { device: "desktop" | "phone" }) {
  return <div className={s.viewport} data-device={device}>
    <div className={s.scrollTrack}>
      <div className={s.miniPanel}>
        <div className={s.miniNav}><b>Ihre Marke.</b><span /><span /></div>
        <div className={s.introGrid}>
          <div><span className={s.smallLabel}>Das macht Sie aus.</span><strong className={s.headline}><Lettering device={device}>Gute Arbeit.</Lettering><Lettering device={device}>Klar gezeigt.</Lettering></strong><div className={s.copyLines}><i /><i /></div><span className={s.miniButton}>Mehr erfahren <Arrow /></span></div>
          <QArtwork variant="intro" />
        </div>
        <div className={s.bottomLines}><i /><i /><i /></div>
      </div>
      <div className={s.miniPanel + " " + s.designPanel}>
        <span className={s.smallLabel}>Ein Auftritt mit Charakter.</span><strong>Bis ins Detail.</strong>
        <div className={s.designGrid}>
          <div className={s.artwork}><QArtwork variant="design" /><span>Form trifft Funktion.</span></div>
          <div className={s.designDetails}><span>01 / Klar gestaltet</span><i /><i /><div className={s.swatches}><b /><b /><b /></div><span>02 / Überall stimmig</span><div className={s.detailLines}><i /><i /><i /></div></div>
        </div>
        <div className={s.sectionLine} /><span className={s.miniFoot}>Ihre Inhalte. Ihr eigener Rhythmus.</span>
      </div>
      <div className={s.miniPanel + " " + s.actionPanel}>
        <span className={s.smallLabel}>Alles klar. Und jetzt?</span><strong>Einfach<br />weiterkommen.</strong><div className={s.copyLines}><i /><i /></div>
        <div className={s.actionTarget}>
          <span className={s.actionButton} data-action-button>Mehr erfahren <Arrow /></span>
          {device === "phone"
            ? <span className={s.tapRing} data-action-tap />
            : <svg className={s.cursor} data-action-cursor viewBox="0 0 26 33" fill="none"><path d="M3 2v26l7-7 5 10 5-3-5-10h10L3 2Z" fill="#ccff00" stroke="#10150b" strokeWidth="1.5" /></svg>}
        </div>
        <div className={s.detailReveal} data-action-detail><span>Das steckt dahinter.</span><div><i /><i /></div><b>Gut informiert. In Ihrem Tempo.</b></div>
      </div>
    </div>
  </div>;
}

export default function HeroScene({ scene, replay, motionPaused }: { scene: number; replay: number; motionPaused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (motionPaused) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The unanimated SVG is the final master Q, including on first paint.
      gsap.set('[data-q="intro"] [data-q-turn]', { rotation: -135, svgOrigin: "1282.7 731.5" });
      gsap.set('[data-q="intro"] [data-q-tail]', { x: 150, y: 210 });
      if (scene === 0) {
        const intro = gsap.timeline({ delay: replay === 0 ? .6 : .2 });
        intro.fromTo('[data-letter="desktop"]', { opacity: 0 }, { opacity: 1, duration: .01, stagger: .046, ease: "none" }, 0);
        intro.fromTo('[data-letter="phone"]', { opacity: 0 }, { opacity: 1, duration: .01, stagger: .046, ease: "none" }, .08);
      }
      if (scene === 1) {
        const ease = CustomEase.create("", "0.22,0.8,0.2,1");
        const turn = '[data-q="design"] [data-q-turn]';
        const tail = '[data-q="design"] [data-q-tail]';
        // Both devices share one timeline. Reverting the hook resets every replay.
        gsap.set(turn, { rotation: -135, svgOrigin: "1282.7 731.5" });
        // In the rotated parent, this diagonal translation arrives from above.
        gsap.set(tail, { x: 150, y: 210, opacity: 1 });
        const artwork = gsap.timeline({ delay: 1.05 });
        artwork.to(tail, { x: 0, y: 0, opacity: 1, duration: .72, ease }, .18);
        artwork.to(turn, { rotation: 0, duration: 1.05, ease }, 1.16);
        gsap.from("." + s.designDetails + ">*", { opacity: 0, x: 8, duration: .5, stagger: .045, delay: .5, clearProps: "transform,opacity" });
      }
      if (scene === 2) {
        const action = gsap.timeline({ delay: .45 });
        action.fromTo("[data-action-cursor]", { x: 26, y: 22, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .65, ease: "power3.out" });
        action.fromTo("[data-action-tap]", { scale: .55, opacity: 0 }, { scale: 1, opacity: .9, duration: .18, ease: "power2.out" }, .53);
        action.to("[data-action-button]", { scale: .96, duration: .13, repeat: 1, yoyo: true }, ">-.06");
        action.to("[data-action-tap]", { scale: 1.6, opacity: 0, duration: .4, ease: "power2.out" }, .75);
        action.fromTo("[data-action-detail]", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: "power2.out" }, ">-.04");
        action.to("[data-action-cursor]", { opacity: 0, duration: .3 }, ">-.2");
      }
    }, root);
    return () => mm.revert();
  }, { scope: root, dependencies: [scene, replay, motionPaused], revertOnUpdate: true });

  return <div ref={root} className={s.scene} data-scene={scene} data-paused={motionPaused} aria-hidden="true">
    <div className={s.grid} /><div className={s.orbit} />
    <div className={s.browser}><div className={s.browserBar}><span /><span /><span /><i>Ihr nächster Auftritt</i></div><MiniWebsite device="desktop" /><div className={s.scrollRail}><i /></div></div>
    <div className={s.note}><span />{["Die richtigen Worte.", "Ein eigener Charakter.", "Ein sinnvoller nächster Schritt."][scene]}</div>
    <div className={s.phone}><div className={s.phoneBar} /><MiniWebsite device="phone" /></div>
    <span className={s.caption}>{["Eine Botschaft. Auf jedem Bildschirm.", "Eine Website. Unterschiedliche Ansichten.", "Informieren. Anfragen. Bewerben."][scene]}</span>
  </div>;
}
