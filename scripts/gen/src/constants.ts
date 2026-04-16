import { join } from "node:path";

export const ROOT_WORKSPACE_DIR = join(import.meta.dir, "../../..");

export const CONFIGS_DIR_NAME = "configs";
export const APPS_DIR_NAME = "apps";
export const PACKAGES_DIR_NAME = "packages";
export const SCRIPTS_DIR_NAME = "scripts";

export const CONFIGS_DIR_PATH = join(ROOT_WORKSPACE_DIR, CONFIGS_DIR_NAME);
export const APPS_DIR_PATH = join(ROOT_WORKSPACE_DIR, APPS_DIR_NAME);
export const PACKAGES_DIR_PATH = join(ROOT_WORKSPACE_DIR, PACKAGES_DIR_NAME);
export const SCRIPTS_DIR_PATH = join(ROOT_WORKSPACE_DIR, SCRIPTS_DIR_NAME);

export const DEFAULT_PACKAGE_RUNTIME = "bun";

export const DEFAULT_SCOPE = "repo";

export const ESLINT_CONFIG_PACKAGE_NAME = "@repo/eslint-config";
export const TYPESCRIPT_CONFIG_PACKAGE_NAME = "@repo/typescript-config";
export const CORE_PACKAGE_NAME = "@repo/core";
