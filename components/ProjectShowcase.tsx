"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./project-showcase.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
type Props = { name: string; poster: string; mobile: string; color?: string };
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Both views share the page's scroll; movement lasts until the composition leaves it. */
export default function ProjectShowcase({ name, poster, mobile, color = "#142333" }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ mobile: "(max-width: 700px)", desktop: "(min-width: 701px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const small = context.conditions?.mobile;
      // The stationary figure includes the moving edges. Both tweens span its full visibility.
      const motion = gsap.timeline({
        defaults: { duration: 1, ease: "none" },
        scrollTrigger: { trigger: root.current, start: "clamp(top bottom)", end: "bottom top", scrub: .35, invalidateOnRefresh: true },
      });
      motion.fromTo("[data-project-desktop]", {
        rotationY: small ? -2 : -4, rotationX: small ? 1 : 2,
        y: small ? 5 : 10, z: small ? -10 : -24,
      }, { rotationY: 0, rotationX: 0, y: small ? -9 : -18, z: small ? -10 : -24 }, 0);
      // The foreground phone drifts down relative to the screen as the page scrolls up.
      // Percentage travel keeps the composition balanced at intermediate viewport sizes.
      motion.fromTo("[data-project-mobile]", {
        rotationY: small ? -2 : -3, rotationZ: 1,
        yPercent: small ? -12 : -14, z: small ? 24 : 70,
      }, { yPercent: small ? 20 : 24 }, 0);
    }, root);
    return () => mm.revert();
  }, { scope: root });

  return <figure ref={root} className={s.showcase} style={{ "--project-color": color } as CSSProperties} aria-label={`${name}: Desktop- und Mobilansicht`}>
    <div className={s.stage}>
      <div className={s.halo} aria-hidden="true" />
      <div className={s.desktop} data-project-desktop>
        <img src={base + poster} alt={`${name}: Website auf einem großen Bildschirm`} width="1280" height="800" fetchPriority="high" draggable={false} />
      </div>
      <div className={s.mobile} data-project-mobile>
        <img src={base + mobile} alt={`${name}: dieselbe Website auf dem Handy`} width="390" height="844" draggable={false} />
      </div>
    </div>
  </figure>;
}
