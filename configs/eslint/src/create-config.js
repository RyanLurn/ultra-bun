import { globalIgnores, defineConfig } from "eslint/config";
import ts from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-config-prettier/flat";
import tanstackRouter from "@tanstack/eslint-plugin-router";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * @import {Config} from "eslint/config"
 *
 * @typedef {Object} CreateConfigParams
 * @property {"bun" | "browser" | "isomorphic"} runtime
 * @property {boolean} hasRouter
 * @property {boolean} hasReact
 *
 * @param {CreateConfigParams} param0
 * @returns {Config[]}
 */
export function createConfig({ runtime, hasRouter, hasReact }) {
  const globalIgnoresConfig = globalIgnores([
    "**/routeTree.gen.ts",
    "**/_generated/",
    "**/migrations/",
    "**/.tanstack/",
    "**/dist/",
  ]);

  const globalsLanguageOption =
    runtime === "bun"
      ? globals.bunBuiltin
      : runtime === "browser"
        ? globals.browser
        : { ...globals.bunBuiltin, ...globals.browser };

  return defineConfig([
    globalIgnoresConfig,
    js.configs.recommended,
    ts.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
        globals: globalsLanguageOption,
      },
      rules: {
        "@typescript-eslint/only-throw-error": hasRouter
          ? [
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
            ]
          : "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        curly: "error",
      },
    },
    perfectionist.configs["recommended-line-length"],
    hasRouter ? tanstackRouter.configs["flat/recommended"] : {},
    hasReact ? reactHooks.configs.flat.recommended : {},
    prettier,
  ]);
}
