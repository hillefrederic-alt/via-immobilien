// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://via-immobilien.de',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/danke/') &&     // Thank you page not indexed
        !page.includes('/kontakt-alt/')  // Alternative layout not indexed
    }),
    robotsTxt({
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/'
        }
      ]
    })
  ]
});
