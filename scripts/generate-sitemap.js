import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verified canonical production domain from index.html canonical link
export const SITE_URL = 'https://gastroclinic27.com';

// Verified public canonical routes matching src/App.jsx
export const ROUTES = [
  '/',
  '/about',
  '/clinics',
  '/services',
  '/appointment',
  '/testimonials',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
];

export function generateSitemapXml(siteUrl = SITE_URL, routes = ROUTES) {
  const urlEntries = routes
    .map((route) => {
      const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

// Write to public/sitemap.xml so Vite automatically includes it in dist/
const targetPath = path.resolve(__dirname, '../public/sitemap.xml');
const xmlContent = generateSitemapXml();
fs.writeFileSync(targetPath, xmlContent, 'utf-8');
console.log(`[SEO] Sitemap successfully written to ${targetPath} (${ROUTES.length} URLs)`);
