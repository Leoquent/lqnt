"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import DirectionArrow from "./DirectionArrow";
import s from "./project-gallery.module.css";
import type { ReferencePreview } from "@/lib/reference-types";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectGallery({ projects, motionPaused = false }: { projects: ReferencePreview[]; motionPaused?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: projects.length <= 1 });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const rail = track.current;
    if (!rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const behavior = () => motionPaused || reduced.matches ? "instant" as const : "smooth" as const;
    let drag: { id: number; x: number; scroll: number; moved: boolean } | null = null;
    let suppressClickUntil = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function update() {
      if (!rail) return;
      const max = rail.scrollWidth - rail.clientWidth;
      const start = rail.scrollLeft <= 3, end = max - rail.scrollLeft <= 3;
      setEdges(old => old.start === start && old.end === end ? old : { start, end });
      if (progress.current) {
        const fraction = Math.min(1, rail.clientWidth / rail.scrollWidth);
        progress.current.style.width = `${fraction * 100}%`;
        progress.current.style.transform = `translateX(${max > 0 ? rail.scrollLeft / max * (1 - fraction) / fraction * 100 : 0}%)`;
      }
    }
    let scrollTicking = false;
    function onScroll() {
      // Throttle synchronous scroll updates to prevent layout thrashing and maintain 60fps
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          update();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!rail) return;
        const bounds = rail.getBoundingClientRect();
        const names = Array.from(rail.children).filter(child => {
          const rect = child.getBoundingClientRect();
          return rect.left < bounds.right - 40 && rect.right > bounds.left + 40;
        }).map(child => child.querySelector("h3")?.textContent).filter(Boolean);
        setAnnouncement(names.join(" und "));
      }, 180);
    }
    function down(event: PointerEvent) {
      if (!rail || event.pointerType !== "mouse" || event.button !== 0) return;
      suppressClickUntil = 0;
      drag = { id: event.pointerId, x: event.clientX, scroll: rail.scrollLeft, moved: false };
    }
    function move(event: PointerEvent) {
      if (!rail || !drag) return;
      const dx = event.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true; rail.dataset.dragging = "true"; rail.setPointerCapture(event.pointerId);
      }
      if (drag.moved) { event.preventDefault(); rail.scrollLeft = drag.scroll - dx; }
    }
    function finish() {
      if (!rail || !drag) return;
      const ended = drag; drag = null;
      if (rail.hasPointerCapture(ended.id)) rail.releasePointerCapture(ended.id);
      delete rail.dataset.dragging;
      if (ended.moved) {
        suppressClickUntil = performance.now() + 250;
        const first = rail.firstElementChild;
        if (first) {
          const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
          rail.scrollTo({ left: Math.round(rail.scrollLeft / step) * step, behavior: behavior() });
        }
      }
    }
    function click(event: MouseEvent) {
      if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
    }
    const preventDrag = (event: DragEvent) => event.preventDefault();
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener("scroll", onScroll, { passive: true });
    rail.addEventListener("pointerdown", down); rail.addEventListener("pointermove", move);
    rail.addEventListener("pointerup", finish); rail.addEventListener("pointercancel", finish);
    rail.addEventListener("lostpointercapture", finish); rail.addEventListener("click", click, true);
    rail.addEventListener("dragstart", preventDrag); window.addEventListener("pointerup", finish);
    update();
    return () => {
      finish(); observer.disconnect(); clearTimeout(timer);
      rail.removeEventListener("scroll", onScroll);
      rail.removeEventListener("pointerdown", down); rail.removeEventListener("pointermove", move);
      rail.removeEventListener("pointerup", finish); rail.removeEventListener("pointercancel", finish);
      rail.removeEventListener("lostpointercapture", finish); rail.removeEventListener("click", click, true);
      rail.removeEventListener("dragstart", preventDrag); window.removeEventListener("pointerup", finish);
    };
  }, [motionPaused, projects.length]);

  function step(direction: number) {
    const rail = track.current, first = rail?.firstElementChild;
    if (!rail || !first) return;
    const distance = first.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * distance, behavior: motionPaused || reduced ? "instant" : "smooth" });
  }

  if (!projects.length) return null;
  return <div className={s.gallery} data-paused={motionPaused} role="region" aria-roledescription="Karussell" aria-label="Ausgewählte Projekte" onKeyDown={event => {
    if (!event.altKey && !event.ctrlKey && !event.metaKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1);
    }
  }}>
    <div className={s.track} ref={track} id={id}>
      {projects.map((project, index) => <article key={project.slug} className={s.project} data-theme={project.theme} aria-label={`${project.name}, Projekt ${index + 1} von ${projects.length}`}>
        <Link href={`/referenzen/${project.slug}/`} className={s.projectLink} draggable={false} aria-label={`${project.name}: Projekt ansehen`}>
          <div className={s.visual}>
            <span className={s.visualLabel}>{project.name}</span>
            <div className={s.browser}>
              <div className={s.browserBar} aria-hidden="true"><span>● ● ●</span><span>{project.name}</span></div>
              <div className={s.screen}><img src={base + project.poster} width="1280" height="800" alt={`${project.name}: vollständige Website-Vorschau`} loading="lazy" draggable={false} /></div>
            </div>
            <span className={s.open} aria-hidden="true"><DirectionArrow diagonal /></span>
          </div>
          <div className={s.description}>
            <p className={s.category}>{project.category}</p><h3>{project.name}</h3>
            <p className={s.copy}>{project.description}</p>
            <span className={s.link}>Projekt ansehen <DirectionArrow diagonal /></span>
          </div>
        </Link>
      </article>)}
    </div>
    {projects.length > 1 && <div className={s.controls}>
      <div className={s.position}><span>{projects.length} Projekte</span><span className={s.hint}>Ziehen, wischen, entdecken</span></div>
      <div className={s.progress} aria-hidden="true"><span ref={progress} /></div>
      <div className={s.arrows}>
        <button type="button" className={`${s.arrow} ${s.previous}`} aria-label="Vorherige Projekte" aria-controls={id} disabled={edges.start} onClick={() => step(-1)}><DirectionArrow /></button>
        <button type="button" className={s.arrow} aria-label="Weitere Projekte" aria-controls={id} disabled={edges.end} onClick={() => step(1)}><DirectionArrow /></button>
      </div>
    </div>}
    <p className={s.srOnly} aria-live="polite" aria-atomic="true">{announcement}</p>
  </div>;
}
