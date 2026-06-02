import { defineConfig } from 'astro/config'
import { CLIENT } from './src/data/client.js'

// `site` naudojamas canonical nuorodoms ir sitemap.xml. Keisk per client.seo.url.
export default defineConfig({
  site: CLIENT.seo?.url || 'https://example.lt',
  build: { format: 'directory' },
})
