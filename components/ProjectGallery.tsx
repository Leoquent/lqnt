import Link from "next/link";
import DirectionArrow from "./DirectionArrow";
import s from "./project-gallery.module.css";
import type { ReferencePreview } from "@/lib/reference-types";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectGallery({ projects, motionPaused = false }: { projects: ReferencePreview[]; motionPaused?: boolean }) {
  const rows: { project: ReferencePreview; index: number }[][] = [];
  projects.forEach((project, index) => {
    const previous = rows[rows.length - 1];
    if (!project.wide && previous?.length === 1 && !previous[0].project.wide) {
      previous.push({ project, index });
    } else {
      rows.push([{ project, index }]);
    }
  });
  return <div className={s.gallery} data-paused={motionPaused}>
    {rows.map(row => <div className={s.row} key={row[0].project.slug}>{row.map(({ project, index }) => <Link key={project.slug} href={`/referenzen/${project.slug}/`} className={s.project} data-theme={project.theme} data-wide={project.wide || undefined} aria-label={`${project.name}: Projekt ansehen`}>
      <div className={s.visual}>
        <span className={s.index} aria-hidden="true">{String(index + 1).padStart(2, "0")} / leoquent</span>
        <div className={s.browser}>
          <div className={s.browserBar} aria-hidden="true"><span>● ● ●</span><span>{project.name}</span></div>
          <picture><img src={base + project.poster} width="1280" height="800" alt={`${project.name}: Einblick in den Website-Auftritt`} loading="lazy" /></picture>
        </div>
        <span className={s.open} aria-hidden="true"><DirectionArrow diagonal /></span>
      </div>
      <div className={s.description}><p className={s.category}>{project.category}</p><h3>{project.name}</h3><p className={s.copy}>{project.description}</p><span className={s.link}>Projekt ansehen <DirectionArrow diagonal /></span></div>
    </Link>)}</div>)}
  </div>;
}
