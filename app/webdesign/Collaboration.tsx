"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { steps } from "./content";
import s from "./collaboration.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PIN_QUERY =
  "(min-width: 961px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";
const PHASES = ["Zuhören", "Struktur", "Umsetzung", "Übergabe"];
const CAMERA_START = "translate(210 140) scale(1) translate(-210 -140)";
const CAMERA_END = "translate(210 140) scale(12) translate(-210 -140)";
// Identical command/coordinate counts allow path interpolation without a plugin.
const UPPER_LID = "M62 140 C104 80 161 58 210 58 C259 58 316 80 358 140";
const LOWER_LID = "M62 140 C104 200 161 222 210 222 C259 222 316 200 358 140";
const CLOSED_LID = "M62 140 C104 140 161 140 210 140 C259 140 316 140 358 140";
const FORMING_UPPER_LID = "M62 140 C104 16 161 -8 210 -8 C259 -8 316 16 358 140";
const FORMING_LOWER_LID = "M62 140 C104 264 161 288 210 288 C259 288 316 264 358 140";
const OPEN_APERTURE = `${UPPER_LID} C316 200 259 222 210 222 C161 222 104 200 62 140 Z`;
const CLOSED_APERTURE = `${CLOSED_LID} C316 140 259 140 210 140 C161 140 104 140 62 140 Z`;

function ProjectIllustration() {
  const apertureId = useId();
  return (
    <div className={s.visual}>
      <svg className={s.illustration} viewBox="0 0 420 280" fill="none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={apertureId} clipPathUnits="userSpaceOnUse">
            <path d={OPEN_APERTURE} data-collaboration-aperture />
          </clipPath>
        </defs>
        <g data-collaboration-camera transform={CAMERA_START}>
          <g className={s.ear} data-collaboration-ear transform="translate(20 -3)">
            <path d="M151 103C153 58 181 28 214 28C252 28 278 57 278 97C278 130 256 153 240 178C226 200 225 229 200 237C174 245 152 228 151 207" />
            <path d="M174 122C159 109 164 78 181 62C196 49 218 49 234 62C249 75 252 96 246 115" />
            <path d="M171 101C188 90 207 99 215 115C224 134 219 148 205 159C194 168 190 174 181 186C174 194 163 189 166 179L177 161C183 151 175 142 165 138" />
          </g>
        </g>
        <g clipPath={`url(#${apertureId})`}>
          <g data-collaboration-camera transform={CAMERA_START}>
            {/* One circle, one focal center: point, green pupil and handover seal. */}
            <circle className={s.disc} data-collaboration-disc cx="210" cy="140" r="72" />
          </g>
          <path className={s.check} data-collaboration-check d="M179 141L201 162L241 117" pathLength="1" strokeDasharray="1" strokeDashoffset="0" />
        </g>
        <g className={s.eye} data-collaboration-eye>
          <path d={UPPER_LID} data-collaboration-upper-lid />
          <path d={LOWER_LID} data-collaboration-lower-lid />
        </g>
      </svg>
      <ol className={s.legend} role="list" aria-label="Die vier Projektphasen">
        {PHASES.map((label, index) => (
          <li key={label} data-collaboration-legend>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{label}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Collaboration({ motionPaused }: { motionPaused: boolean }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const titleId = useId();

  useGSAP(() => {
    const section = root.current;
    const stage = frame.current;
    const introduction = intro.current;
    const stepList = list.current;
    if (!section || !stage || !introduction || !stepList || motionPaused) return;

    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      let pinContext: gsap.Context | null = null;
      let disposed = false;
      let fitFrame = 0;
      let refreshFrame = 0;
      const items = Array.from(stepList.children);
      const legend = gsap.utils.toArray<HTMLElement>("[data-collaboration-legend]", section);
      const header = section.closest("main")?.parentElement?.querySelector("header");
      const pinTop = () => parseFloat(getComputedStyle(section).getPropertyValue("--collaboration-pin-top"));

      const refreshPositions = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };

      const removePin = () => {
        pinContext?.revert();
        pinContext = null;
        delete section.dataset.collaborationPin;
      };

      const updateFit = () => {
        if (disposed) return;
        if (header) section.style.setProperty("--collaboration-pin-top", `${header.getBoundingClientRect().height}px`);
        const style = getComputedStyle(stage);
        const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
          + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        // Measure natural child boxes: ScrollTrigger may have fixed the frame height.
        // Opacity/child transforms never change these boxes, so reveals cannot toggle fit.
        const requiredHeight = Math.max(introduction.offsetHeight, stepList.offsetHeight) + padding;
        const fits = requiredHeight <= window.innerHeight - pinTop();
        if (fits === Boolean(pinContext)) return;

        removePin();
        if (fits) {
          // Expand only the outer stage; natural child heights stay measurable.
          section.dataset.collaborationPin = "true";
          pinContext = gsap.context(() => {
            const ear = stage.querySelector<SVGGElement>("[data-collaboration-ear]")!;
            const camera = stage.querySelectorAll<SVGGElement>("[data-collaboration-camera]");
            const disc = stage.querySelector<SVGCircleElement>("[data-collaboration-disc]")!;
            const aperture = stage.querySelector<SVGPathElement>("[data-collaboration-aperture]")!;
            const eye = stage.querySelector<SVGGElement>("[data-collaboration-eye]")!;
            const lids = stage.querySelectorAll<SVGPathElement>("[data-collaboration-upper-lid], [data-collaboration-lower-lid]");
            const check = stage.querySelector<SVGPathElement>("[data-collaboration-check]")!;

            // Opacity only: text stays in the accessibility tree; there are no controls.
            gsap.set(items.slice(1), { opacity: 0 });
            gsap.set(legend.slice(1), { opacity: 0, y: 7 });
            gsap.set(ear, { opacity: 1 });
            gsap.set(camera, { attr: { transform: CAMERA_START } });
            gsap.set(disc, { opacity: 0, attr: { r: 6 } });
            gsap.set(eye, { opacity: 0 });
            gsap.set(lids[0], { attr: { d: FORMING_UPPER_LID } });
            gsap.set(lids[1], { attr: { d: FORMING_LOWER_LID } });
            gsap.set(check, { opacity: 0, attr: { "stroke-dashoffset": 1 } });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: stage,
                pin: stage,
                start: () => "top " + pinTop() + "px",
                end: () => "+=" + Math.round(Math.min(1900, Math.max(1450, window.innerHeight * 1.9))),
                pinSpacing: true,
                scrub: 0.4,
                invalidateOnRefresh: true,
                // Finish the smoothing tween toward its current target (1 or 0).
                onLeave: self => { self.getTween()?.progress(1); },
                onLeaveBack: self => { self.getTween()?.progress(1); },
              },
            });

            const reveal = (index: number, position: number) => {
              timeline.to(items[index], { opacity: 1, duration: 0.5 }, position);
              timeline.to(legend[index], { opacity: 1, y: 0, duration: 0.5 }, position);
            };

            timeline.addLabel("zuhoeren").to({}, { duration: 0.5 });

            const pointAt = timeline.duration();
            timeline.addLabel("struktur", pointAt);
            timeline.to(disc, { opacity: 1, duration: 0.22 }, pointAt);
            // Explicit SVG attributes bypass CSSPlugin's cached SVG origin/matrix.
            // Fixed endpoints also survive refresh invalidation halfway through the dolly.
            timeline.fromTo(camera,
              { attr: { transform: CAMERA_START } },
              { attr: { transform: CAMERA_END }, duration: 1.15, ease: "power2.inOut", immediateRender: false },
              pointAt + 0.3,
            );
            timeline.to(ear, { opacity: 0, duration: 0.55 }, pointAt + 0.8);
            reveal(1, pointAt + 0.75);
            timeline.to({}, { duration: 0.45 });

            const eyeAt = timeline.duration();
            timeline.addLabel("umsetzung", eyeAt);
            reveal(2, eyeAt + 0.15);
            timeline.to(eye, { opacity: 1, duration: 0.6 }, eyeAt);
            timeline.to(lids[0], { attr: { d: UPPER_LID }, duration: 0.75, ease: "power2.out" }, eyeAt);
            timeline.to(lids[1], { attr: { d: LOWER_LID }, duration: 0.75, ease: "power2.out" }, eyeAt);
            timeline.to({}, { duration: 0.45 });

            const handoverAt = timeline.duration();
            timeline.addLabel("uebergabe", handoverAt);
            // One real blink: the aperture tracks both lids; the circle never squashes.
            timeline.to(lids, { attr: { d: CLOSED_LID }, duration: 0.26, ease: "power2.in" }, handoverAt);
            timeline.to(aperture, { attr: { d: CLOSED_APERTURE }, duration: 0.26, ease: "power2.in" }, handoverAt);
            const openAt = handoverAt + 0.34;
            timeline.to(lids[0], { attr: { d: UPPER_LID }, duration: 0.48, ease: "power2.out" }, openAt);
            timeline.to(lids[1], { attr: { d: LOWER_LID }, duration: 0.48, ease: "power2.out" }, openAt);
            timeline.to(aperture, { attr: { d: OPEN_APERTURE }, duration: 0.48, ease: "power2.out" }, openAt);
            timeline.to(eye, { opacity: 0, duration: 0.48 }, openAt);
            timeline.to(check, { opacity: 1, attr: { "stroke-dashoffset": 0 }, duration: 0.5 }, openAt + 0.18);
            reveal(3, openAt);
            // All four rows and labels remain visible through this hold and after release.
            timeline.to({}, { duration: 0.8 });
          }, stage);
        }
        refreshPositions();
      };

      const scheduleFit = () => {
        if (disposed) return;
        cancelAnimationFrame(fitFrame);
        fitFrame = requestAnimationFrame(updateFit);
      };
      // Reconsider pinning after wrapping, font loading, zoom or viewport changes.
      const observer = new ResizeObserver(scheduleFit);
      observer.observe(introduction);
      observer.observe(stepList);
      if (header) observer.observe(header);
      window.addEventListener("resize", scheduleFit, { passive: true });
      void document.fonts.ready.then(scheduleFit);
      updateFit();

      return () => {
        disposed = true;
        observer.disconnect();
        window.removeEventListener("resize", scheduleFit);
        cancelAnimationFrame(fitFrame);
        cancelAnimationFrame(refreshFrame);
        removePin();
        section.style.removeProperty("--collaboration-pin-top");
      };
    }, root);

    return () => {
      mm.revert();
      delete section.dataset.collaborationPin;
    };
  }, { scope: root, dependencies: [motionPaused], revertOnUpdate: true });

  return (
    <section id="ablauf" className={s.collaboration} ref={root} aria-labelledby={titleId}>
      <div className={s.frame} ref={frame}>
        <div className={s.intro} ref={intro}>
          <p className={s.eyebrow}>04 / Die Zusammenarbeit</p>
          <h2 id={titleId} className={s.title}>Ihr Wissen.<br />Mein Handwerk.<br /><span>Unser Projekt.</span></h2>
          <p className={s.lead}>Sie kennen Ihr Unternehmen. Ich bringe es in Form. Mit klaren Schritten und Zwischenständen, die Sie sehen können.</p>
          <ProjectIllustration />
        </div>
        <ol className={s.steps} ref={list} role="list">
          {steps.map((step, index) => (
            <li className={s.step} key={step.title}>
              <span className={s.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
