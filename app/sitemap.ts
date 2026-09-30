import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/webdesign/", "/prozesse/", "/referenzen/gebrueder-ross/", "/webdesign/seo-und-ki-suche/"].map(path => ({ url: absoluteUrl(path) }));
}
