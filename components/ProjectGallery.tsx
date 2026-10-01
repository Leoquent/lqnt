import Link from "next/link";
import DirectionArrow from "./DirectionArrow";
import s from "./project-gallery.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const projects = [
  { slug: "gebrueder-ross", name: "Gebrüder Ross", category: "Recherche · Marke · Website", description: "Nachlassabwicklung verständlich machen. Leistungen ordnen. Persönliches Vertrauen aufbauen.", desktop: "gebrueder-ross-einstieg.webp", mobile: "gebrueder-ross-mobile.webp", theme: "navy", number: "01" },
  { slug: "ruempelross", name: "Rümpelross", category: "Text · Webdesign · Interaktion", description: "Entrümpelung verständlich erklären. Leistungen zeigen. Den Weg zur Anfrage verkürzen.", desktop: "ruempelross-desktop.webp", mobile: "ruempelross-mobile.webp", theme: "yellow", number: "02" },
];

export default function ProjectGallery({ motionPaused = false }: { motionPaused?: boolean }) {
  return <div className={s.gallery} data-paused={motionPaused}>
    {projects.map(project => <Link key={project.slug} href={`/referenzen/${project.slug}/`} className={s.project} data-theme={project.theme} aria-label={`${project.name}: Projekt ansehen`}>
      <div className={s.visual}>
        <span className={s.index} aria-hidden="true">{project.number} / leoquent</span>
        <div className={s.browser}>
          <div className={s.browserBar} aria-hidden="true"><span>● ● ●</span><span>{project.name}</span></div>
          <picture><source media="(max-width: 700px)" srcSet={base + "/referenzen/" + project.mobile} /><img src={base + "/referenzen/" + project.desktop} width="1280" height="800" alt={`${project.name}: Einblick in den Website-Auftritt`} loading="lazy" /></picture>
        </div>
        <span className={s.open} aria-hidden="true"><DirectionArrow diagonal /></span>
      </div>
      <div className={s.description}><p className={s.category}>{project.category}</p><h3>{project.name}</h3><p className={s.copy}>{project.description}</p><span className={s.link}>Projekt ansehen <DirectionArrow diagonal /></span></div>
    </Link>)}
  </div>;
}
