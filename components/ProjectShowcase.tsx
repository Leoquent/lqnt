"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./project-showcase.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
type Props = { name: string; domain: string; poster: string; mobile: string; color?: string };
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Short reversible reveal; the page and screenshots never scroll independently. */
export default function ProjectShowcase({ name, domain, poster, mobile, color = "#142333" }: Props) {
  const root = useRef<HTMLElement>(null);
  const [view, setView] = useState<"desktop" | "mobile" | null>(null);
  const [smallScreen, setSmallScreen] = useState(false);
  const selected = view ?? (smallScreen ? "mobile" : "desktop");
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setSmallScreen(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ mobile: "(max-width: 700px)", desktop: "(min-width: 701px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const small = context.conditions?.mobile;
      gsap.fromTo("[data-project-frame]", { rotationX: small ? 4 : 12, scale: small ? .98 : .96, y: small ? 8 : 22 }, {
        rotationX: 0, scale: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 92%", end: "top 25%", scrub: .35 },
      });
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return <figure ref={root} className={s.showcase} style={{ "--project-color": color } as CSSProperties}>
    <div className={s.toolbar}>
      <span className={s.domain}>{domain}</span>
      <div className={s.views} aria-label="Website-Ansicht">
        <button className={s.desktopChoice} data-selected={view ?? "auto"} aria-pressed={selected === "desktop"} onClick={() => setView("desktop")}>Desktop</button>
        <button className={s.mobileChoice} data-selected={view ?? "auto"} aria-pressed={selected === "mobile"} onClick={() => setView("mobile")}>Mobil</button>
      </div>
    </div>
    <div className={s.stage}>
      <div className={s.frame} data-project-frame data-view={view ?? "auto"}>
        <div className={s.bar} aria-hidden="true"><span>● ● ●</span><span>{domain}</span><span>↗</span></div>
        <picture>
          {view === null && <source media="(max-width: 700px)" srcSet={base + mobile} />}
          <img src={base + (view === "mobile" ? mobile : poster)} alt={`${name}: ${selected === "mobile" ? "mobile Website" : "Website-Einstieg"}`} width="1280" height="800" loading="lazy" />
        </picture>
      </div>
    </div>
    <figcaption>Ein Auftritt, zwei Ansichten. Entdecken Sie die Website auf Desktop und Mobil.</figcaption>
  </figure>;
}
