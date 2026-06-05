// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],
  css: ["@/assets/css/style.css"],
  runtimeConfig: {
    faceitToken: process.env.FACEIT_API_TOKEN,
    steamApiToken: process.env.STEAM_API_TOKEN
  }
})