module.exports = {
  extends: ["@mathbox-react/eslint-config"],
  // vite.config.ts is typechecked by the node-tooling tsconfig (bundler
  // resolution), not the browser-app tsconfig, so ESLint's type-aware parser
  // needs both projects to cover every linted file.
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
}
