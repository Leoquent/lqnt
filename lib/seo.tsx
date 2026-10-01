import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://lqnt.de").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const absoluteUrl = (path: string) => `${siteUrl}${basePath}${path}`;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), type: "website", locale: "de_DE", siteName: "leoquent", images: [{ url: absoluteUrl("/og-image-1200x630.png"), width: 1200, height: 630, alt: "leoquent – Marke, Webdesign & Automatisierung" }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-image-1200x630.png")] },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function ServiceData({ name, description, path }: { name: string; description: string; path: string }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name, description, url: absoluteUrl(path), provider: { "@id": absoluteUrl("/#organization") } }} />;
}
