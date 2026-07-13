import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/testSetup.ts"],
    // Scope to source so compiled copies under build/ are never picked up.
    include: ["src/**/*.spec.{ts,tsx}"],
  },
})
