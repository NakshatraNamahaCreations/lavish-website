import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const vitePrerender = require('vite-plugin-prerender')
const puppeteer = require('puppeteer')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class CustomPuppeteerRenderer {
  constructor(options = {}) {
    this._options = options
    this._browser = null
  }
  async initialize() {
    this._browser = await puppeteer.launch({
      headless: true,
      args: this._options.args || ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  }
  async renderRoutes(routes, Prerenderer) {
    const rootOptions = Prerenderer.getOptions()
    const baseURL = `http://localhost:${rootOptions.server.port}`
    const results = []
    for (const route of routes) {
      const page = await this._browser.newPage()
      page.on('pageerror', (err) => {
        console.log(`[prerender ${route}] PAGEERROR: ${err.message}`)
      })
      try {
        await page.goto(`${baseURL}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 60000,
        })
      } catch (e) {
        console.log(`[prerender ${route}] navigation: ${e.message}`)
      }
      if (this._options.renderAfterTime) {
        await new Promise((r) => setTimeout(r, this._options.renderAfterTime))
      }
      const html = await page.content()
      const pathname = await page.evaluate('window.location.pathname')
      results.push({ originalRoute: route, route: pathname, html })
      await page.close()
    }
    return results
  }
  async destroy() {
    if (this._browser) await this._browser.close()
  }
}

const categoryRoutes = [
  '/anniversarydecor/681b1109ddb6b3f4663e78e5',
  '/ringceremonydecor/681b1095ddb6b3f4663e78c2',
  '/bridetobedecor/681b10a5ddb6b3f4663e78cc',
  '/groomtobedecor/681b10abddb6b3f4663e78d1',
  '/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4',
  '/birthdaydecoration/681b113eddb6b3f4663e78f9',
  '/babyshowerdecor/681b1146ddb6b3f4663e78fe',
  '/welcomebabydecor/681b1240ddb6b3f4663e794c',
  '/photography-service/681b1255ddb6b3f4663e7956',
  '/namingceremonydecor/681b124bddb6b3f4663e7951',
  '/entertainmentdecor/681b1238ddb6b3f4663e7947',
]

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/blogs',
  '/privacy-policy',
  '/return-refund',
  '/shipping-delivery',
  '/terms-conditions',
  '/birthday-event-planner-in-bangalore',
  '/all-services',
]

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [...staticRoutes, ...categoryRoutes],
      renderer: new CustomPuppeteerRenderer({
        renderAfterTime: 3000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }),
      postProcess(renderedRoute) {
        let html = renderedRoute.html

        const helmetMetas = [...html.matchAll(/<meta\s+([^>]*?)data-rh="true"[^>]*?>/g)]
        for (const m of helmetMetas) {
          const attrs = m[1]
          const nameMatch = attrs.match(/\sname="([^"]+)"/) || attrs.match(/^name="([^"]+)"/)
          const propMatch = attrs.match(/\sproperty="([^"]+)"/) || attrs.match(/^property="([^"]+)"/)
          if (nameMatch) {
            const name = nameMatch[1].replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
            html = html.replace(
              new RegExp(`\\s*<meta[^>]*\\sname="${name}"(?![^>]*data-rh)[^>]*>`, 'g'),
              ''
            )
          }
          if (propMatch) {
            const prop = propMatch[1].replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
            html = html.replace(
              new RegExp(`\\s*<meta[^>]*\\sproperty="${prop}"(?![^>]*data-rh)[^>]*>`, 'g'),
              ''
            )
          }
        }

        if (/<link[^>]*rel="canonical"[^>]*data-rh="true"/.test(html)) {
          html = html.replace(
            /\s*<link\s+rel="canonical"(?![^>]*data-rh)[^>]*>/g,
            ''
          )
        }

        renderedRoute.html = html

        const title = (html.match(/<title[^>]*>(.*?)<\/title>/) || [])[1]
        console.log(`[prerender ${renderedRoute.route}] title="${title}"`)
        return renderedRoute
      },
    }),
  ],
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
  },
})
