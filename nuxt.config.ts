// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Application metadata
  app: {
    head: {
      title: 'Vue Practice - Nuxt 3',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern Nuxt 3 practice project' },
      ],
    },
  },

  // Compatibility and version
  compatibilityDate: '2025-07-15',

  // Development tools
  devtools: {
    enabled: true,
  },

  // Modules
  modules: ['@pinia/nuxt'],

  // Styling
  css: ['~/styles/globals.scss'],

  // Runtime config
  runtimeConfig: {
    public: {
      appName: 'Vue Practice',
      apiBaseUrl: 'http://localhost:3000/api',
    },
  },

  // TypeScript
  typescript: {
    typeCheck: false,
    strict: true,
  },

  // Experimental features
  experimental: {
    payloadExtraction: false,
  },

  // Features
  features: {
    inlineStyles: false,
  },
})
