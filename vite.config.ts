import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import svgr from "@svgr/rollup"
import builtins from "rollup-plugin-node-builtins"
// import path from "path"

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
    builtinsPlugin
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
