"use client";

import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./project-showcase.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
type Props = { name: string; domain: string; poster: string; mobile: string; screens: string[]; scrollImage?: { src: string; width: number; height: number }; color?: string };
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Real screenshots in a reusable, customer-coloured scroll stage. */
export default function ProjectShowcase({ name, domain, poster, mobile, screens, scrollImage, color = "#141c22" }: Props) {
  const root = useRef<HTMLElement>(null);
  const [staticView, setStaticView] = useState(false);
  useGSAP(() => {
    if (staticView || !root.current) return;
    const figure = root.current;
    const stage = figure.querySelector<HTMLElement>("[data-project-stage]")!;
    const track = figure.querySelector<HTMLElement>("[data-project-track]")!;
    const screen = track.parentElement!;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-height: 600px)", () => {
      let context: gsap.Context | null = null;
      const fit = () => {
        const fits = stage.offsetHeight <= window.innerHeight - 110;
        if (fits === Boolean(context)) return;
        context?.revert(); context = null;
        delete figure.dataset.scroll;
        if (fits) {
          figure.dataset.scroll = "true";
          context = gsap.context(() => {
            const timeline = gsap.timeline({ scrollTrigger: { trigger: figure, start: "top 80px", end: "bottom bottom", scrub: 0.4, invalidateOnRefresh: true } });
            timeline.to(track, { y: () => -(track.scrollHeight - screen.clientHeight), ease: "none", duration: 1 }, 0);
            timeline.fromTo("[data-project-tablet]", { y: 12, rotate: -1 }, { y: -12, rotate: 0.6, ease: "none", duration: 1 }, 0);
            timeline.fromTo("[data-project-phone]", { y: 24 }, { y: -20, ease: "none", duration: 1 }, 0);
            timeline.to("[data-project-light]", { y: -45, ease: "none", duration: 1 }, 0);
          }, figure);
        }
        ScrollTrigger.refresh();
      };
      const observer = new ResizeObserver(fit); observer.observe(stage);
      window.addEventListener("resize", fit); fit();
      return () => { observer.disconnect(); window.removeEventListener("resize", fit); context?.revert(); delete figure.dataset.scroll; };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [staticView], revertOnUpdate: true });

  return <figure ref={root} className={s.showcase} style={{ "--project-color": color } as CSSProperties}>
    <div className={s.stage} data-project-stage>
      <div className={s.devices}>
        <div className={s.light} data-project-light aria-hidden="true" />
        <div className={s.tablet} data-project-tablet>
          <div className={s.bar}><span aria-hidden="true">●</span><span>{domain}</span><span>Web</span></div>
          <div className={s.screen}><div className={s.track} data-project-track>
            {scrollImage ? <img className={s.longCapture} src={base + scrollImage.src} width={scrollImage.width} height={scrollImage.height} alt={`${name}: Website vom Einstieg über das Team bis zu den Leistungen`} loading="lazy" /> : [poster, ...screens].map((src, i) => <img key={src} src={base + src} width="1280" height="800" alt={i === 0 ? `${name}: Website mit eigenem Markenauftritt` : ""} loading="lazy" />)}
          </div></div>
        </div>
        <div className={s.phone} data-project-phone><img src={base + mobile} width="390" height="844" alt={`${name}: Einstieg auf dem Smartphone`} loading="lazy" /></div>
      </div>
      <figcaption><span className={s.scrollHint}>Beim Scrollen bewegt sich die Kundenwebsite im Tablet. </span>Markenauftritt auf großem und kleinem Bildschirm. Die Projektbeschreibung darunter zeigt die Gestaltung im Detail.</figcaption>
      <button className={s.motionControl} aria-pressed={staticView} onClick={() => setStaticView(!staticView)}>{staticView ? "Scrollansicht einschalten" : "Ohne Bewegung ansehen"}</button>
    </div>
  </figure>;
}
