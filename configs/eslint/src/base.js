import { globalIgnores, defineConfig } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import ts from "typescript-eslint";
import js from "@eslint/js";

export const baseConfig = defineConfig([
  globalIgnores([
    "**/routeTree.gen.ts",
    "**/_generated/",
    "**/migrations/",
    "**/.tanstack/",
    "**/.turbo/",
    "**/dist/",
  ]),
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              package: "@tanstack/router-core",
              name: "Redirect",
              from: "package",
            },
            {
              package: "@tanstack/router-core",
              name: "NotFoundError",
              from: "package",
            },
          ],
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      curly: "error",
    },
  },
  perfectionist.configs["recommended-line-length"],
]);
