import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { InvalidJsonError } from "@repo/core/error/classes/invalid-json";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { readJsonFile } from "@repo/core/fs/read-json-file";
import { join } from "node:path";

import type { BunLockfile } from "@/schemas/bun-lockfile";

import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readLockfile(): Promise<
  Result<BunLockfile, NonExistentPathError | InvalidJsonError | FallBackError>
> {
  const lockfilePath = join(ROOT_WORKSPACE_DIR, "bun.lock");

  const readLockfileResult = await readJsonFile({ path: lockfilePath });

  if (readLockfileResult.success === false) {
    return readLockfileResult;
  }

  return {
    success: true,
    data: readLockfileResult.data as BunLockfile,
  };
}
