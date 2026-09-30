import Link from "next/link";
import LqntMark from "./LqntMark";
import DirectionArrow from "./DirectionArrow";
import s from "./editorial.module.css";

export default function EditorialPage({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className={s.page}>
    <a className={s.skip} href="#inhalt">Zum Inhalt</a>
    <header className={s.header}><Link href="/" className={s.brand} aria-label="leoquent – Startseite"><LqntMark /><span>leoquent</span></Link><nav aria-label="Hauptnavigation"><Link href="/webdesign/">Webdesign</Link><a href="mailto:hi@lqnt.de">Projekt besprechen <DirectionArrow diagonal /></a></nav></header>
    <main id="inhalt"><nav className={s.breadcrumb} aria-label="Brotkrumennavigation"><Link href="/">Start</Link><span>/</span><Link href="/webdesign/">Webdesign</Link><span>/</span><span aria-current="page">{label}</span></nav>{children}</main>
    <footer className={s.footer}><span>leoquent · Leonid Ryazanskiy</span><nav aria-label="Weitere Seiten"><Link href="/prozesse/">Prozesse & Automatisierung</Link><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link></nav></footer>
  </div>;
}
