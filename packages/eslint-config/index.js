module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // this should come last
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "parameter",
        modifiers: ["unused"],
        format: ["camelCase"],
        leadingUnderscore: "allow", // do not require... it's annoying when required for object destructuring.
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "max-classes-per-file": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/__tests__/**/*.ts",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/playwright.config.ts",
          "**/vite.config.ts",
          "**/*.stories.tsx",
          "**/src/setupTests.ts",
          "**/src/playwright/**",
          "**/src/test_util/**/*.ts",
          "**/src/test_util/**/*.tsx",
        ],
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        assert: "either",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json"],
      },
      node: {
        project: ["tsconfig.json"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
      },
    },
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
    {
      files: ["**/*.spec.*"],
      excludedFiles: ["**/src/playwright/**"],
      extends: ["react-app/jest"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["build/"],
}
