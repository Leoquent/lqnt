import type { Metadata } from "next";
import { ServiceData } from "@/lib/seo";
import { brandFont } from "@/lib/brand-font";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lqnt.de";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const url = `${siteUrl}${basePath}/webdesign/`;
const title = "Webdesign mit Konzept, Text & Charakter | Leoquent";
const description = "Websites von Leonid Ryazanskiy: Konzept, eigene Texte, Design und Entwicklung aus einer Hand. Pakete ab 1.900 €.";
const image = { url: `${siteUrl}${basePath}/og-image-1200x630.png`, width: 1200, height: 630, alt: "Leoquent – Webdesign, Konzept und eigene Texte" };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", locale: "de_DE", siteName: "Leoquent", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export default function WebdesignLayout({ children }: { children: React.ReactNode }) {
  return <div className={brandFont.className}><ServiceData name="Webdesign mit Konzept und Text" description={description} path="/webdesign/" />{children}</div>;
}
