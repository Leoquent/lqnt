"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import s from "./copy-statement.module.css";

export default function CopyStatement({ motionPaused }: { motionPaused: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (motionPaused) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 961px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const section = root.current!;
      const plane = section.querySelector<HTMLElement>("[data-paper-plane]")!;
      const pen = section.querySelector<SVGElement>("[data-pen]")!;
      const rotateX = gsap.quickTo(plane, "rotationX", { duration: .8, ease: "power3.out" });
      const rotateY = gsap.quickTo(plane, "rotationY", { duration: .8, ease: "power3.out" });
      const moveX = gsap.quickTo(plane, "x", { duration: .8, ease: "power3.out" });
      const moveY = gsap.quickTo(plane, "y", { duration: .8, ease: "power3.out" });
      const penX = gsap.quickTo(pen, "x", { duration: .6, ease: "power3.out" });
      const penY = gsap.quickTo(pen, "y", { duration: .6, ease: "power3.out" });
      const penRotate = gsap.quickTo(pen, "rotation", { duration: .6, ease: "power3.out" });
      let docBounds = { left: 0, top: 0, width: 0, height: 0 };
      const measure = () => {
        const rect = section.getBoundingClientRect();
        docBounds = { left: rect.left + window.scrollX, top: rect.top + window.scrollY, width: rect.width, height: rect.height };
      };
      measure();
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const x = gsap.utils.clamp(-1, 1, ((event.pageX - docBounds.left) / docBounds.width - .5) * 2);
        const y = gsap.utils.clamp(-1, 1, ((event.pageY - docBounds.top) / docBounds.height - .5) * 2);
        rotateX(-y * 11); rotateY(x * 15); moveX(x * 16); moveY(y * 9);
        penX(x * 30); penY(y * 22); penRotate(x * 8);
      };
      const reset = () => { rotateX(0); rotateY(0); moveX(0); moveY(0); penX(0); penY(0); penRotate(0); };
      section.addEventListener("pointerenter", measure);
      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", reset);
      window.addEventListener("resize", measure);
      return () => {
        section.removeEventListener("pointerenter", measure); section.removeEventListener("pointermove", move); section.removeEventListener("pointerleave", reset);
        window.removeEventListener("resize", measure);
      };
    }, root);
    return () => mm.revert();
  }, { scope: root, dependencies: [motionPaused], revertOnUpdate: true });

  return <section ref={root} className={s.section} aria-labelledby="copy-title">
    <p className={s.eyebrow} data-reveal>Der Text ist kein To-do für Sie.</p>
    <h2 id="copy-title" className={s.headline} data-reveal><span>„Schicken Sie mir noch Ihre Texte.“</span><br />Den Satz hören Sie <em>von mir nicht.</em></h2>
    <div className={s.bottom} data-reveal><p>Eine neue Website ist schon genug Projekt. Da sollten Sie nicht auch noch vor einem leeren Dokument sitzen und Ihr Unternehmen in die richtigen Worte bringen müssen.</p><p>Als ausgezeichneter Copywriter entwickle ich seit über einem Jahrzehnt Ideen und Texte für Marken. Ich finde die Worte, die Ihr Angebot verständlich machen und seinen Unterschied zeigen. Diese Erfahrung steckt auch in Ihren Website-Texten.</p><p>Vielleicht steckt vieles schon in Ihrer bisherigen Website. Ihre Texte, Unterlagen und unser Gespräch sind mein Ausgangspunkt. Ich schärfe die Botschaften und ordne, was für Ihre Kunden zählt. Daraus wachsen Inhalt, Aufbau und Gestaltung gemeinsam – für einen Auftritt, der zeigt, was heute in Ihrem Unternehmen steckt.</p></div>
    <div className={s.art} aria-hidden="true"><div className={s.plane} data-paper-plane>
      <svg className={s.paper} viewBox="0 0 350 290" fill="none"><g stroke="currentColor" strokeWidth="1.15"><path d="M70 18h170l43 43v206H70zM240 18v43h43" fill="#10140d" /><path d="M96 97h141M96 120h106" strokeWidth="5" /><path d="M96 161h150m-150 14h150m-150 14h103M96 229h60" /><path d="M70 276h222V63" opacity=".45" /></g></svg>
      <svg className={s.pen} data-pen viewBox="0 0 350 290" fill="none"><g stroke="currentColor" strokeWidth="1.5"><path d="m178 193 93-107 18 16-93 107-28 15z" fill="#283218" /><path d="m260 99 18 16m-100 78 18 16m-18-16-10 31 28-15" /><path d="m272 89 8-9 18 16-8 9" /></g></svg>
    </div></div>
  </section>;
}
