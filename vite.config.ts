import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import svgr from "@svgr/rollup"
import builtins from "rollup-plugin-node-builtins"
import { visualizer } from "rollup-plugin-visualizer"
import optimizeLodashImports from "rollup-plugin-optimize-lodash-imports"

const builtinsPlugin = {
  ...builtins({ crypto: true }),
  name: "rollup-plugin-node-builtins"
}

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true
  },
  plugins: [
    reactRefresh(),
    svgr({ memo: true }),
    builtinsPlugin,
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
