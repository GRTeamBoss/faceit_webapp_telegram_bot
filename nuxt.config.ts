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
    faceitToken: 'c8eac926-06d1-4adb-ade5-be34b913a86f',
    steamApiToken: '37512CC952F57209920BA7098765EC13'
  }
})