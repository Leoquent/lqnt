"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LqntMark from "@/components/LqntMark";
import s from "./gateway.module.css";
gsap.registerPlugin(useGSAP);
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const options = [
 {id:"webdesign", label:"Webdesign", title:<>Sichtbar <br/>werden.</>, copy:"Ein Auftritt, der zeigt, was Sie können. Mit klaren Texten, eigenem Charakter und einem einfachen Weg zur Anfrage.", tags:"Konzept · Text · Design · Entwicklung"},
 {id:"prozesse", label:"Prozesse & Automatisierung", title:<>Luft <br/>bekommen.</>, copy:"Weniger Handarbeit im Arbeitsalltag. Mit verbundenen Werkzeugen, individuellen Anwendungen und sinnvoll eingesetzter KI.", tags:"Analyse · Software · Automatisierung · KI"}
];
function Illustration({kind}:{kind:string}) {
 return kind === "webdesign" ? <svg viewBox="0 0 520 280" fill="none" aria-hidden="true">
 <rect x="55" y="28" width="380" height="220" rx="3" stroke="currentColor"/><path d="M55 58H435M78 43h32M352 43h18m12 0h30" stroke="currentColor"/>
 <path d="M80 92h155m-155 20h126m-126 20h143" stroke="currentColor" strokeWidth="9"/>
 <path d="M80 160h108m-108 10h91" stroke="currentColor" opacity=".45"/>
 <rect x="80" y="192" width="67" height="22" fill="currentColor"/><rect x="272" y="82" width="138" height="132" stroke="currentColor"/>
 <circle cx="341" cy="148" r="41" stroke="currentColor"/><path d="M302 179l78-63M301 116l79 63" stroke="currentColor"/>
 </svg> : <svg viewBox="0 0 520 280" fill="none" aria-hidden="true">
 <path className={s.route} d="M55 76H157Q180 76 180 100V120Q180 140 210 140H315Q345 140 345 109V77H457M55 202H157Q180 202 180 176V160Q180 140 210 140M315 140Q345 140 345 170V202H457" stroke="currentColor"/>
 {[ [55,76],[55,202],[457,77],[457,202] ].map(([x,y])=><g key={x+"-"+y}><rect x={x-16} y={y-16} width="32" height="32" fill="#10110f" stroke="currentColor"/><path d={`M${x-5} ${y}h10M${x} ${y-5}v10`} stroke="currentColor"/></g>)}
 <rect x="227" y="109" width="62" height="62" fill="#10110f" stroke="currentColor"/><path d="m243 140 10 10 22-24" stroke="currentColor" strokeWidth="2"/>
 </svg>;
}
export default function Gateway({mode}:{mode:"filmisch"|"interaktiv"}) {
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState<string|null>(null);
 const [replay,setReplay]=useState(0);
 useGSAP(()=>{
   const mm=gsap.matchMedia();
   mm.add("(prefers-reduced-motion: no-preference)",()=>{
     gsap.from("[data-reveal]",{y:mode==="filmisch"?28:45,opacity:0,duration:mode==="filmisch"?1.15:.75,stagger:mode==="filmisch"?.13:.08,ease:"power3.out",clearProps:"transform,opacity"});
     gsap.from("[data-rule]",{scaleX:0,transformOrigin:"left",duration:1.3,ease:"power3.inOut"});
   });
   return ()=>mm.revert();
 },{scope:root,dependencies:[mode,replay],revertOnUpdate:true});
 return <div ref={root} className={`${s.gateway} ${mode==="filmisch"?s.film:s.interactive}`} data-active={active||""}>
  <header className={s.header} data-reveal>
   <a href={`${base}/`} className={s.brand} aria-label="Leoquent — bisherige Startseite"><LqntMark className={s.mark}/><span>leoquent</span></a>
   <span className={s.descriptor}>Webdesign, Prozesse &<br/>Automatisierung</span>
  </header>
  <main className={s.main}>
   <div className={s.intro} data-reveal>
    <p className={s.eyebrow}>Gute Arbeit verdient gute digitale Lösungen.</p>
    <h1>Mehr Wirkung.<br/><span>Weniger Umwege.</span></h1>
   </div>
   <div className={s.choices} onMouseLeave={()=>setActive(null)}>
    {options.map((o,i)=><a key={o.id} className={s.choice} href={`${base}/${o.id}/`} onMouseEnter={()=>setActive(o.id)} onFocus={()=>setActive(o.id)} onBlur={()=>setActive(null)} data-reveal>
     <div className={s.rule} data-rule/>
     <div className={s.label}><span>{o.label}</span><span className={s.arrow} aria-hidden="true">↗</span></div>
     <div className={s.illustration}><Illustration kind={o.id}/></div>
     <h2>{o.title}</h2>
     <p className={s.copy}>{o.copy}</p>
     <div className={s.bottom}><span>{o.tags}</span><span className={s.discover}>Entdecken <span aria-hidden="true">→</span></span></div>
    </a>)}
   </div>
  </main>
  <footer className={s.footer}><span>© {new Date().getFullYear()} Leoquent</span><div><a href={`${base}/impressum/`}>Impressum</a><a href={`${base}/datenschutz/`}>Datenschutz</a></div></footer>
 </div>;
}
