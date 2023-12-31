import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import autoImport from "unplugin-auto-import/vite";
export default defineConfig({
  plugins: [tsconfigPaths(), vue(), autoImport({ imports: ["vue", "vue-router"] })],
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./tests/coverage",
    },
  },
});
