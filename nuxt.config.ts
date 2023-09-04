// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "in-out" },
  },
  modules: ["@pinia/nuxt", "@invictus.codes/nuxt-vuetify", "@nuxtjs/web-vitals"],
  vuetify: {
    vuetifyOptions: {
      defaults: {
        VBtn: {
          variant: "text",
          elevation: "0",
        },
        VTextField: {
          variant: "underlined",
        },
        VSelect: {
          variant: "underlined",
        },
      },
    },
    moduleOptions: {
      useVuetifyLabs: true,
      styles: "sass",
      autoImport: true,
    },
  },
  srcDir: "./src",
  devtools: { enabled: true },
  nitro: { serveStatic: true },
  css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css", "@fortawesome/fontawesome-free/css/all.css"],
  build: { transpile: ["vuetify"] },
  vite: {
    resolve: { alias: { src: path.resolve(__dirname, "./src") } },
  },
});
