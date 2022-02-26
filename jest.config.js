module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(mathbox|@sicmutils/threestrap|three|shadergraph)/)",
  ],
  testEnvironment: "jsdom",
}
