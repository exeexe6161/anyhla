// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://www.anyhla.com",
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: {
          de: "de-DE",
          en: "en-US",
        },
      },
      filter: (page) =>
        !page.includes("/404") && page !== "https://www.anyhla.com/",
    }),
  ],
});
