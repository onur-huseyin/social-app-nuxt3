// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      '/api/fetchInstagramData': { swr: true }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/tailwind.css', '~/assets/main.css' ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: ['@nuxtjs/google-fonts', '@nuxt/ui'],
  googleFonts: {
    families: {
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  }

})