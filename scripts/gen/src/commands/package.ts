import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { PackageCommandArgs } from "@/commands/schema";

import { runBunInstall } from "@/utils/run-bun-install";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function generatePackage({ name, runtime }: PackageCommandArgs) {
  const packageDir = join(ROOT_WORKSPACE_DIR, "package", name);

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
    "@repo/core": "workspace:*",
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

  // Generate tsdown.config.ts file
  const tsdownConfigContent = `
import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/**/*.ts", "!src/try.ts"],
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

  // Run `bun install`
  const runBunInstallResult = await runBunInstall();

  if (runBunInstallResult.success === false) {
    return runBunInstallResult;
  }
}
