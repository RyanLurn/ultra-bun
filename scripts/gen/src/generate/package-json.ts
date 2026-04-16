import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

interface GeneratePackageJsonParams {
  scope: string | null;
  name: string;
  directory: string;
}

function createPackageJson({
  scope,
  name,
}: Pick<GeneratePackageJsonParams, "scope" | "name">) {
  const packageJsonObject = {
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
      zod: "catalog:",
    },
    devDependencies: {
      "@repo/eslint-config": "workspace:*",
      "@repo/typescript-config": "workspace:*",
      "@types/bun": "catalog:",
      eslint: "catalog:",
      tsdown: "catalog:",
      typescript: "catalog:",
    },
  };

  return JSON.stringify(packageJsonObject, null, 2);
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
