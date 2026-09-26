import s from "./webdesign.module.css";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export function Drawing({ kind }: { kind: "text" | "design" | "path" | "flow" }) {
  return <svg viewBox="0 0 440 250" fill="none" aria-hidden="true" className={s.drawing}>
    {kind === "text" ? <g stroke="currentColor" strokeWidth="1.25">
      <g className={s.drawingFloat}><path d="M90 25h175l40 40v155H90zM265 25v40h40" /><path d="M120 80h115M120 97h85" strokeWidth="5" /><path d="M120 130h145m-145 15h145m-145 15h100" /><rect x="120" y="184" width="67" height="13" rx="2" /></g>
      <path d="m264 159 65-65 13 13-65 65-20 7zM318 105l13 13" className={s.drawingFloatReverse} />
      <path d="M53 73h17m-9-8v17M337 196h17m-9-8v17" opacity=".5" />
    </g> : kind === "design" ? <g stroke="currentColor" strokeWidth="1.25">
      <g className={s.drawingFloat}><rect x="44" y="33" width="318" height="190" rx="5" /><path d="M44 57h318M64 45h3m7 0h3m7 0h3M67 94h108m-108 17h80m-80 24h123m-123 10h123" /><rect x="67" y="174" width="62" height="20" rx="2" /><rect x="217" y="82" width="113" height="113" /><circle cx="273" cy="138" r="43" strokeDasharray="4 5" className={s.drawingOrbit} /><path d="m247 164 52-52m-52 0 52 52" /></g>
      <g className={s.drawingFloatReverse}><rect x="332" y="109" width="63" height="127" rx="7" fill="#0e0f0c" /><path d="M353 117h22M343 143h41m-41 9h29m-29 18h41m-41 8h41m-41 29h27" /><circle cx="364" cy="226" r="2" /></g>
    </g> : kind === "path" ? <g stroke="currentColor" strokeWidth="1.25">
      <path d="M70 40h280v173H70zM70 61h280" /><path d="M85 50h3m7 0h3m7 0h3" />
      <path d="M144 83h152m-152 11h115M144 122h152m-152 11h132" opacity=".6" />
      <path d="M103 83v97h126" strokeDasharray="4 6" className={s.wayLine} />
      <circle cx="103" cy="84" r="4" fill="#0e0f0c" /><circle cx="103" cy="123" r="4" fill="#0e0f0c" />
      <rect x="229" y="166" width="95" height="28" rx="2" fill="#ccff0010" />
      <path d="M242 180h65m-9-7 9 7-9 7" />
      <path className={s.wayPointer} d="m298 203 3-19 14 13-8-1-2 9z" fill="#0e0f0c" />
      <path d="M58 40H43v15m319 158h15v-15" opacity=".4" />
    </g> : <g stroke="currentColor" strokeWidth="1.25">
      <path d="M82 68h70v57h60m-130 65h70v-65m105 0h52V68h49m-49 57v65h49" className={s.flowLine} />
      <rect x="32" y="43" width="50" height="50" rx="6" /><path d="M46 58h23m-23 9h23m-23 9h15" />
      <rect x="32" y="165" width="50" height="50" rx="6" /><path d="m43 179 14 12 14-12m-28 0h28v21H43z" />
      <g className={s.drawingFloat}><rect x="212" y="100" width="50" height="50" rx="25" /><path d="m226 125 8 8 16-17" /></g>
      <rect x="358" y="43" width="50" height="50" rx="6" /><path d="m372 68 8 8 15-17" />
      <rect x="358" y="165" width="50" height="50" rx="6" /><path d="M371 179h24m-24 10h24m-24 10h15" />
    </g>}
  </svg>;
}

