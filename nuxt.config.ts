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
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
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
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  // Vue configuration
  vue: {
    compilerOptions: {
      // 忽略開發工具注入的自定義元素警告
      // Vue DevTools 和其他開發工具可能會注入這些元素
      isCustomElement: (tag) => {
        return tag.startsWith('vue-') ||
          tag === 'VueElement' ||
          tag.includes('-devtools-');
      },
    },
  },

  // Vue runtime configuration
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  // Styling
  css: ['~/styles/globals.scss'],

  // Runtime config
  runtimeConfig: {
    // Private keys (server-side only)
    steamApiKey: process.env.NUXT_STEAM_API_KEY || '',

    // Public keys (exposed to client)
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
});
