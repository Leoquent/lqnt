import { pageMetadata, ServiceData } from "@/lib/seo";
import "./prozesse.css";

const description = "KI-Beratung, Prozessoptimierung und individuelle Software für Handwerk und KMU. Ich entwickle Agenten, vernetze Systeme und automatisiere Routineaufgaben.";
export const metadata = pageMetadata("KI-Beratung & Automatisierung für KMU | leoquent", description, "/prozesse/");

export default function ProzesseLayout({ children }: { children: React.ReactNode }) {
  return <><ServiceData name="KI-Beratung, Prozessoptimierung und Automatisierung" description={description} path="/prozesse/" />{children}</>;
}
