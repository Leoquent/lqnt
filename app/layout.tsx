import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leoquent.github.io';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const ogImageLandscape = `${siteUrl}${basePath}/og-image-1200x630.png`;
const ogImageSquare = `${siteUrl}${basePath}/og-image-1200x1200.png`;

// Titel und Beschreibung folgen dem festgelegten Deskriptor der Marke
// (CLAUDE.md §3: WEBDESIGN, PROZESSE & AUTOMATISIERUNG). Zwischenstand — die
// endgültigen Texte kommen mit der neuen Copy-Quelle (PLAN.md, Block C).
// Die OG-Bilddateien zeigen noch das alte Logo und werden in Block D ersetzt.
const title = 'Leoquent | Webdesign, Prozesse & Automatisierung';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
    description:
      'Webdesign, das beeindruckt. Prozesse & Automatisierung, die Ihnen den Rücken freihalten. Hochwertige Websites und intelligente Workflows für Ihr Unternehmen.',
    applicationName: 'Leoquent',
    alternates: {
      canonical: `${siteUrl}${basePath}/`,
    },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: 'Leoquent',
      title,
      description:
        'Webdesign, das beeindruckt. Prozesse & Automatisierung, die Ihnen den Rücken freihalten. Hochwertige Websites und intelligente Workflows für Ihr Unternehmen.',
      url: `${siteUrl}${basePath}/`,
    images: [
      {
        url: ogImageLandscape,
        width: 1200,
        height: 630,
        alt: 'Leoquent — Webdesign, Prozesse & Automatisierung',
      },
      {
        url: ogImageSquare,
        width: 1200,
        height: 1200,
        alt: 'Leoquent — Webdesign, Prozesse & Automatisierung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Websites für Mittelstand, Handwerk, Praxen und Immobilienverwaltung.',
    images: [ogImageLandscape],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} bg-vanta text-bone overflow-x-hidden`}>
      <body suppressHydrationWarning className="antialiased selection:bg-[#CCFF00] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
