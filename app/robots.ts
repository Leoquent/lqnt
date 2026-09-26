import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqnt.de';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
