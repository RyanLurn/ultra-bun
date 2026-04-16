import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { PackageJson } from "@/schemas/package-json";

import {
  TYPESCRIPT_CONFIG_PACKAGE_NAME,
  ESLINT_CONFIG_PACKAGE_NAME,
  CORE_PACKAGE_NAME,
} from "@/constants";

interface GeneratePackageJsonParams {
  scope: string | null;
  name: string;
  directory: string;
}

function createPackageJson({
  scope,
  name,
}: Pick<GeneratePackageJsonParams, "scope" | "name">) {
  const packageJson: PackageJson = {
    name: `@${scope}/${name}`,
    type: "module",
    private: "true",
    scripts: {
      build: "tsdown",
      try: "bun run src/try.ts",
      "check-types": "tsc --noEmit",
      lint: "eslint --cache",
    },
    exports: {
      "./*": {
        import: "./dist/*.mjs",
        types: "./dist/*.d.mts",
      },
    },
    dependencies: {
      [CORE_PACKAGE_NAME]: "workspace:*",
      zod: "catalog:",
    },
    devDependencies: {
      [ESLINT_CONFIG_PACKAGE_NAME]: "workspace:*",
      [TYPESCRIPT_CONFIG_PACKAGE_NAME]: "workspace:*",
      "@types/bun": "catalog:",
      eslint: "catalog:",
      tsdown: "catalog:",
      typescript: "catalog:",
    },
  };

  return JSON.stringify(packageJson, null, 2);
}

export async function generatePackageJson({
  scope,
  name,
  directory,
}: GeneratePackageJsonParams): Promise<Result<number, FallBackError>> {
  const path = join(directory, "package.json");
  const content = createPackageJson({ scope, name });

  const writeToDiskResult = await writeTextToDisk({
    text: content,
    path,
  });

  return writeToDiskResult;
}
