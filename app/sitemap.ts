import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { references, referencePath } from "@/lib/references";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/webdesign/", "/prozesse/", ...references.map(reference => referencePath(reference.slug)), "/webdesign/seo-und-ki-suche/"].map(path => ({ url: absoluteUrl(path) }));
}
