// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
	srcDir: "./src",
	devtools: { enabled: true },
	nitro: { serveStatic: true },
	css: ["vuetify/styles/main.sass"],
	build: { transpile: ["vuetify"] },
	vite: { resolve: { alias: { src: path.resolve(__dirname, "./src") } } },
});
