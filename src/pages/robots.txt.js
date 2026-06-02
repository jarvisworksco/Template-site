// robots.txt su nuoroda į sitemap.
import { CLIENT } from '../data/client.js'

export function GET({ site }) {
  const base = (site?.href || CLIENT.seo?.url || 'https://example.lt').replace(/\/$/, '')
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
