import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { PackageCommandArgs } from "@/commands/schema";

import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function generatePackage({ name }: PackageCommandArgs) {
  const packageDir = join(ROOT_WORKSPACE_DIR, "package", name);

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
}`;

  const writePackageJsonResult = await writeTextToDisk({
    text: packageJsonContent,
    path: join(packageDir, "package.json"),
  });
  if (writePackageJsonResult.success === false) {
    return writePackageJsonResult;
  }
}
