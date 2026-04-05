module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["boundaries"],
  settings: {
    "boundaries/elements": [
      { type: "app", pattern: "src/app/**" },
      { type: "pages", pattern: "src/pages/**" },
      { type: "widgets", pattern: "src/widgets/**" },
      { type: "features", pattern: "src/features/**" },
      { type: "entities", pattern: "src/entities/**" },
      { type: "shared", pattern: "src/shared/**" },
    ],
    "boundaries/ignore": ["**/*.test.*", "**/*.stories.*", "**/*.spec.*"],
  },
  rules: {
    "no-console": "error",
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "boundaries/dependencies": [
      "warn",
      {
        default: "disallow",
        rules: [
          {
            from: { type: "app" },
            allow: { to: { type: ["app", "pages", "widgets", "features", "entities", "shared"] } },
          },
          {
            from: { type: "pages" },
            allow: { to: { type: ["pages", "widgets", "features", "entities", "shared"] } },
          },
          {
            from: { type: "widgets" },
            allow: { to: { type: ["widgets", "features", "entities", "shared"] } },
          },
          {
            from: { type: "features" },
            allow: { to: { type: ["features", "entities", "shared"] } },
          },
          {
            from: { type: "entities" },
            allow: { to: { type: ["entities", "shared"] } },
          },
          {
            from: { type: "shared" },
            allow: { to: { type: "shared" } },
          },
        ],
      },
    ],
  },
};
