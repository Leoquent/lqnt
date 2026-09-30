import s from "./project-showcase.module.css";

type Props = { name: string; domain: string; poster: string; video: string; mobile: string };
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Shared reference format: real desktop recording, mobile still, explicit playback. */
export default function ProjectShowcase({ name, domain, poster, video, mobile }: Props) {
  return <figure className={s.showcase}>
    <div className={s.devices}>
      <div className={s.browser}><div className={s.bar}><span aria-hidden="true">● ● ●</span><span>{domain}</span><span>Desktop</span></div><video controls playsInline preload="none" poster={base + poster} width="1280" height="800" aria-label={`Stummer Website-Rundgang: ${name}`}><source src={base + video} type="video/webm" />Ihr Browser unterstützt diese Aufnahme nicht. Die Standbilder und Projektbeschreibung zeigen die Inhalte.</video></div>
      <div className={s.phone}><img src={base + mobile} width="390" height="844" alt={`${name}: Einstieg auf dem Smartphone`} loading="lazy" /><span>Mobil</span></div>
    </div>
    <figcaption>Die Website in Bewegung: Starten Sie den stummen Rundgang im Desktopfenster. Er zeigt den Wechsel von dunklen zu hellen Flächen, das Team und die Leistungen. Rechts die mobile Ansicht.</figcaption>
  </figure>;
}
