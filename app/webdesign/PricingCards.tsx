"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { packages } from "./content";
import { Arrow } from "./Drawings";
import s from "./pricing-cards.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Stable values across server rendering, hydration and pointer movement.
const particles = Array.from({ length: 64 }, (_, i) => ({
  x: ((i * 73 + 19) % 101) / 100,
  y: ((i * 47 + 7) % 103) / 102,
  radius: 0.6 + (i % 4) * 0.3,
  phase: i * 1.71,
}));

export default function PricingCards({ motionPaused, children }: { motionPaused: boolean; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    if (motionPaused) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-price-entry]", root.current).forEach((card, i) => {
        gsap.from(card, {
          y: 36, opacity: 0, duration: 0.95, ease: "back.out(1.12)",
          delay: window.innerWidth > 1000 ? i * 0.12 : 0,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: card, start: "top 94%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [motionPaused], revertOnUpdate: true });

  useEffect(() => {
    const area = root.current;
    const surface = canvas.current;
    const ctx = surface?.getContext("2d");
    if (!area || !surface || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, last = 0, time = 0;
    let visible = false;
    let pointer: { x: number; y: number } | null = null;
    const offsets = particles.map(() => ({ x: 0, y: 0 }));
    const animated = () => !motionPaused && !reduced.matches;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const count = width < 700 ? 28 : particles.length;
      particles.slice(0, count).forEach((particle, i) => {
        const x = particle.x * width, y = particle.y * height;
        const dx = pointer ? pointer.x - x : 0, dy = pointer ? pointer.y - y : 0;
        const pull = animated() && pointer ? Math.max(0, 1 - Math.hypot(dx, dy) / 240) * 0.16 : 0;
        offsets[i].x += (dx * pull - offsets[i].x) * 0.07;
        offsets[i].y += (dy * pull - offsets[i].y) * 0.07;
        const alpha = 0.2 + (Math.sin(time * 0.45 + particle.phase) + 1) * 0.14;
        ctx.fillStyle = i % 5 === 0 ? `rgba(204,255,0,${alpha})` : `rgba(196,203,176,${alpha})`;
        ctx.beginPath();
        ctx.arc(x + offsets[i].x, y + offsets[i].y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    const tick = (now: number) => {
      if (now - last >= 32) { time += Math.min((now - last) / 1000, 0.05); last = now; draw(); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && animated()) { last = performance.now(); frame = requestAnimationFrame(tick); }
      else draw();
    };
    const resize = () => {
      width = area.clientWidth; height = area.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      surface.width = Math.round(width * ratio); surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !animated()) return;
      const box = area.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const leave = () => { pointer = null; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizing = new ResizeObserver(resize);
    observer.observe(area); sizing.observe(area); resize();
    area.addEventListener("pointermove", move); area.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); sizing.disconnect();
      area.removeEventListener("pointermove", move); area.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    };
  }, [motionPaused]);

  return <div ref={root} className={s.presentation} data-pricing-motion={!motionPaused}>
    <canvas ref={canvas} className={s.particles} aria-hidden="true" />
    {children}
    <div className={s.grid}>
      {packages.map((pkg, i) => <div key={pkg.name} className={s.entry} data-price-entry>
        <article className={s.card} data-featured={i === 1}>
          {i === 1 && <span className={s.badge}>Mehr Raum fürs Angebot</span>}
          <div className={s.top}><span>0{i + 1}</span><h3>{pkg.name}</h3><span className={s.spark} aria-hidden="true">✳</span></div>
          <p className={s.lead}>{pkg.lead.map(line => <span key={line}>{line}</span>)}</p>
          <p className={s.description}>{pkg.description}</p>
          <p className={s.price}><span>ab</span> {pkg.price} <span>€</span></p>
          <span className={s.once}>Einmaliges Website-Projekt</span>
          <div className={s.rule} />
          <ul>{pkg.features.map(feature => <li key={feature}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.4" /></svg>{feature}</li>)}</ul>
          <a className={s.action} href={"mailto:hi@lqnt.de?subject=" + encodeURIComponent("Website-Projekt – Paket " + pkg.name)}>Über {pkg.name} sprechen <Arrow diagonal /></a>
        </article>
      </div>)}
    </div>
  </div>;
}
