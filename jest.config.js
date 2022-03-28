module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(mathbox|threestrap|three|shadergraph)/)",
  ],
  testEnvironment: "jsdom",
  setupFiles: ["./src/testSetup.ts"],
}
