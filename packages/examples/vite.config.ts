import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Resolve the workspace library to its TypeScript source so the examples
      // app (and the Playwright e2e tests) always exercise current source with
      // no build step. Exact-match only, so `mathbox-react/threestrap` is
      // unaffected.
      {
        find: /^mathbox-react$/,
        replacement: path.resolve(__dirname, "../mathbox-react/src/index.ts"),
      },
    ],
  },
})
