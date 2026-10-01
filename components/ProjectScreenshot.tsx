"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./project-screenshot.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
type Props = { src: string; alt: string; width: number; height: number; children: ReactNode };

export default function ProjectScreenshot({ src, alt, width, height, children }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ mobile: "(max-width: 700px)", desktop: "(min-width: 701px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const small = context.conditions?.mobile;
      gsap.fromTo("[data-project-screenshot]", { y: small ? 7 : 16, rotationX: small ? 1.5 : 3 }, {
        y: small ? -7 : -16, rotationX: small ? -.8 : -1.5, ease: "none",
        scrollTrigger: { trigger: root.current, start: "clamp(top bottom)", end: "bottom top", scrub: .35, invalidateOnRefresh: true },
      });
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return <figure ref={root} className={s.figure}>
    <div className={s.stage}>
      <div className={s.screen} data-project-screenshot>
        <img src={base + src} alt={alt} width={width} height={height} loading="lazy" draggable={false} />
      </div>
    </div>
    <figcaption>{children}</figcaption>
  </figure>;
}
