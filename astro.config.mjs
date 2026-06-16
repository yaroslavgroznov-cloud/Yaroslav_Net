import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://groznov.net',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: { uk: 'uk-UA', en: 'en-US', ru: 'ru-RU' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
