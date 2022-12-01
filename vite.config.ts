import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import svgr from "@svgr/rollup"
import { visualizer } from "rollup-plugin-visualizer"
import optimizeLodashImports from "rollup-plugin-optimize-lodash-imports"


export default defineConfig({
  server: {
    port: 3000,
    strictPort: true
  },
  plugins: [
    reactRefresh(),
    svgr({ memo: true }),
    process.env.NODE_ENV == 'production' && optimizeLodashImports(),
    visualizer()
  ],
  resolve: {
    alias: {
      // TODO: Aliases
    }
  },
  esbuild: {
    jsxInject: "import React from \"react\""
  },
  build: {
    chunkSizeWarningLimit: 4096
  }
})
