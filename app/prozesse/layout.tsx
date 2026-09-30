import { pageMetadata, ServiceData } from "@/lib/seo";
import "./prozesse.css";

const description = "Weniger doppelte Datenpflege und wiederkehrende Büroarbeit: Leonid Ryazanskiy analysiert Ihre Abläufe, verbindet Software und entwickelt passende Automatisierungen.";
export const metadata = pageMetadata("Prozesse vereinfachen & Arbeit automatisieren | Leoquent", description, "/prozesse/");

export default function ProzesseLayout({ children }: { children: React.ReactNode }) {
  return <><ServiceData name="Prozesse und Automatisierung" description={description} path="/prozesse/" />{children}</>;
}
