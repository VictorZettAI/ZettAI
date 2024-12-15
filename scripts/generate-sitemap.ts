import fs from 'fs';
import path from 'path';
import { globby } from 'globby';

const SITE_URL = 'https://zettai.com';

async function generateSitemap() {
  try {
    // Get all .tsx files from the pages directory
    const pages = await globby([
      'src/pages/**/*.tsx',
      '!src/pages/**/[*.tsx', // Exclude dynamic route files
      '!src/pages/_*.tsx',    // Exclude special files
      '!src/pages/api',       // Exclude API routes
    ]);

    // Add static routes
    const staticRoutes = [
      '',
      '/blog',
      '/casos',
      '/servicios',
      '/contacto',
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map((route) => {
      return `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
  ${pages
    .map((page) => {
      const route = page
        .replace('src/pages', '')
        .replace('.tsx', '')
        .replace('/index', '');
      return `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

    // Write sitemap to public directory
    fs.writeFileSync('public/sitemap.xml', sitemap.trim());
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
