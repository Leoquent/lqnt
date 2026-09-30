import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { JsonLd, absoluteUrl } from '@/lib/seo';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqnt.de';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const ogImageLandscape = `${siteUrl}${basePath}/og-image-1200x630.png`;
const ogImageSquare = `${siteUrl}${basePath}/og-image-1200x1200.png`;

const title = 'leoquent | Webdesign, Prozesse & Automatisierung';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
    description:
      'Webdesign mit eigenen Texten und passende Automatisierung: Leonid Ryazanskiy macht Ihr Angebot verständlich und vereinfacht Ihre Abläufe.',
    applicationName: 'leoquent',

    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: 'leoquent',
      title,
      description:
        'Webdesign mit eigenen Texten und passende Automatisierung: Leonid Ryazanskiy macht Ihr Angebot verständlich und vereinfacht Ihre Abläufe.',
      url: `${siteUrl}${basePath}/`,
    images: [
      {
        url: ogImageLandscape,
        width: 1200,
        height: 630,
        alt: 'leoquent — Webdesign, Prozesse & Automatisierung',
      },
      {
        url: ogImageSquare,
        width: 1200,
        height: 1200,
        alt: 'leoquent — Webdesign, Prozesse & Automatisierung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Webdesign mit eigenen Texten und passende Automatisierung: Leonid Ryazanskiy macht Ihr Angebot verständlich und vereinfacht Ihre Abläufe.',
    images: [ogImageLandscape],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${outfit.variable} bg-vanta text-bone overflow-x-hidden`}>
      <body suppressHydrationWarning className="antialiased selection:bg-[#CCFF00] selection:text-[#050505]">
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [
          { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: "leoquent", url: absoluteUrl("/"), founder: { "@id": absoluteUrl("/#leonid") }, email: "hi@lqnt.de" },
          { "@type": "Person", "@id": absoluteUrl("/#leonid"), name: "Leonid Ryazanskiy", url: absoluteUrl("/webdesign/#ueber-mich"), image: absoluteUrl("/FOTOS/leonid_cropped_2.webp"), worksFor: { "@id": absoluteUrl("/#organization") } },
          { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: "leoquent", url: absoluteUrl("/"), publisher: { "@id": absoluteUrl("/#organization") }, inLanguage: "de-DE" }
        ] }} />
        {children}
      </body>
    </html>
  );
}
