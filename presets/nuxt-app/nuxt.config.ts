// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  devtools: { enabled: true },

  // App-level head defaults
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Runtime config — public values exposed to client, private to server only
  runtimeConfig: {
    // Private — server only (override with NUXT_* env vars)
    apiSecret: '',
    // Public — exposed to client
    public: {
      apiBase: '',
    },
  },
  compatibilityDate: '2025-01-01',

  typescript: {
    strict: true,
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
