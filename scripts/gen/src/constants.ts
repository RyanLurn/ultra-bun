import { join } from "node:path";

export const ROOT_WORKSPACE_DIR = join(import.meta.dir, "../../..");

export const DEFAULT_PACKAGE_RUNTIME = "bun";

export const DEFAULT_SCOPE = "repo";

export const ESLINT_CONFIG_PACKAGE_NAME = "@repo/eslint-config";
export const TYPESCRIPT_CONFIG_PACKAGE_NAME = "@repo/typescript-config";
export const CORE_PACKAGE_NAME = "@repo/core";
