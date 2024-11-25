import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["*", "!src"],
  },
  ...compat.extends(
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next/core-web-vitals",
    "plugin:@next/next/recommended"
  ),
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        {
          allowSameFolder: false,
          prefix: "@",
          rootDir: "src",
        },
      ],

      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^@?\\w"],
            ["^.*\\u0000$"],
            ["^@"],
            ["^\\u0000"],
            ["^.+\\.s?css$"],
            ["^@/(static|assets)(/.*|$)"],
          ],
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
