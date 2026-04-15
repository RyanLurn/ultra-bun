import { join } from "node:path";

export const ROOT_WORKSPACE_DIR = join(import.meta.dir, "../../..");

export const DEFAULT_PACKAGE_RUNTIME = "bun";

export const DEFAULT_SCOPE = "repo";
