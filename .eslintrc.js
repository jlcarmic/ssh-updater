/* eslint-disable */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
  },
  plugins: ["@typescript-eslint", "eslint-plugin-import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsConfigRootDir: "./",
    sourceType: "module",
    ecmaVersion: 2020,
  },
  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": { ts: { alwaysTryTypes: true } },
    "import/extensions": [".ts"],
  },
  rules: {
    "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1 }],
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", "consistent"],
    "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    "camelcase": 0,
    "eqeqeq": ["error", "always"],
    "import/extensions": ["error", "never", { ignorePackages: true, pattern: { json: "always" } }],
    "import/no-unresolved": 0,
    "indent": "off",
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", { code: 120, ignoreComments: true, ignoreTrailingComments: true }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "object-curly-newline": ["error", { multiline: true, minProperties: 5, consistent: true }],
    "operator-linebreak": ["error", "after", { overrides: { "?": "before", ":": "before" } }],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
  },
};
