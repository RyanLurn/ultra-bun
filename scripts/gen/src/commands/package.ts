import type { FallBackError } from "@repo/core/error/create-fallback";
import type { ShellError } from "@repo/core/error/classes/shell";
import type { Result } from "@repo/core/types/result";

import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { PackageCommandArgs } from "@/commands/schema";

import { runFormatScript } from "@/utils/run-format-script";
import { runBunInstall } from "@/utils/run-bun-install";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function generatePackage({
  name,
  runtime,
}: PackageCommandArgs): Promise<Result<undefined, FallBackError | ShellError>> {
  const packageDir = join(ROOT_WORKSPACE_DIR, "packages", name);
  console.log(`Generating @repo/${name} package at ${packageDir}.`);

  // Generate package.json file
  const packageJsonContent = `
{
  "name": "@repo/${name}",
  "type": "module",
  "private": "true",
  "scripts": {
    "build": "tsdown",
    "try": "bun run src/try.ts",
    "check-types": "tsc --noEmit",
    "lint": "eslint --cache"
  },
  "exports": {
    "./*": {
      "import": "./dist/*.mjs",
      "types": "./dist/*.d.mts"
    }
  },
  "dependencies": {
    "@repo/core": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/bun": "catalog:",
    "eslint": "catalog:",
    "tsdown": "catalog:",
    "typescript": "catalog:"
  }
}
`;

  const writePackageJsonResult = await writeTextToDisk({
    text: packageJsonContent.trim(),
    path: join(packageDir, "package.json"),
  });

  if (writePackageJsonResult.success === false) {
    return writePackageJsonResult;
  }
  console.log("Generated package.json file successfully.");

  // Generate tsconfig.json file
  const tsconfigContent = `
{
  "extends": "@repo/typescript-config/src/runtime/${runtime}.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", "eslint.config.js", "tsdown.config.ts"]
}
`;

  const writeTsconfigResult = await writeTextToDisk({
    text: tsconfigContent.trim(),
    path: join(packageDir, "tsconfig.json"),
  });

  if (writeTsconfigResult.success === false) {
    return writeTsconfigResult;
  }
  console.log("Generated tsconfig.json file successfully.");

  // Generate eslint.config.js file
  const eslintConfigContent = `
// @ts-check

import { ${runtime}Config } from "@repo/eslint-config/${runtime}";

export default ${runtime}Config;
`;

  const writeEslintConfigResult = await writeTextToDisk({
    text: eslintConfigContent.trim(),
    path: join(packageDir, "eslint.config.js"),
  });

  if (writeEslintConfigResult.success === false) {
    return writeEslintConfigResult;
  }
  console.log("Generated eslint.config.js file successfully.");

  // Generate tsdown.config.ts file
  const tsdownConfigContent = `
import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/**/*.ts", ${runtime !== "bun" ? `"src/**/*.tsx", ` : ""}"!src/try.ts"],
  unbundle: true,
});
`;

  const writeTsdownConfigResult = await writeTextToDisk({
    text: tsdownConfigContent.trim(),
    path: join(packageDir, "tsdown.config.ts"),
  });

  if (writeTsdownConfigResult.success === false) {
    return writeTsdownConfigResult;
  }
  console.log("Generated tsdown.config.ts file successfully.");

  // Run `bun install`
  console.log("Running `bun install`...");
  const runBunInstallResult = await runBunInstall();

  if (runBunInstallResult.success === false) {
    return runBunInstallResult;
  }
  console.log(runBunInstallResult.data);

  // Format code
  console.log("Formatting code...");
  const runFormatScriptResult = await runFormatScript();

  if (runFormatScriptResult.success === false) {
    return runFormatScriptResult;
  }
  console.log("Code files formatted.");

  // Operation completed successfully
  return {
    success: true,
    data: undefined,
  };
}
