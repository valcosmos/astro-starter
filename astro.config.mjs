import { defineConfig } from 'astro/config'

import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  image: {
    service: {
      entrypoint: '@astrojs/image/sharp'
    }
  },
  integrations: [sitemap()]
})
