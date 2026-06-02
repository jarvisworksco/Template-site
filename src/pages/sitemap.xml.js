// Sitemap generuojamas iš client.js — visi puslapiai automatiškai.
import { CLIENT } from '../data/client.js'
import { serviceSlug, areaSlug } from '../render.js'

export function GET({ site }) {
  const base = (site?.href || CLIENT.seo?.url || 'https://example.lt').replace(/\/$/, '')
  const paths = [
    '/',
    '/paslaugos/',
    '/vietoves/',
    ...(CLIENT.services || []).map((s) => `/paslaugos/${serviceSlug(s)}/`),
    ...(CLIENT.serviceAreas || []).map((a) => `/vietoves/${areaSlug(a)}/`),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
