import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { InvalidJsonError } from "@repo/core/error/classes/invalid-json";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { ValidationError } from "@repo/core/error/classes/validation";
import { readJsonFile } from "@repo/core/fs/read-json-file";
import { join } from "node:path";

import { LockFileSchema, type LockFile } from "@/schemas/lock-file";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readLockfile(): Promise<
  Result<
    LockFile,
    | ValidationError<typeof LockFileSchema>
    | NonExistentPathError
    | InvalidJsonError
    | FallBackError
  >
> {
  const lockfilePath = join(ROOT_WORKSPACE_DIR, "bun.lock");

  const readLockfileResult = await readJsonFile({ path: lockfilePath });

  if (readLockfileResult.success === false) {
    return readLockfileResult;
  }

  const validateLockfileResult = LockFileSchema.safeParse(
    readLockfileResult.data
  );

  if (validateLockfileResult.success === false) {
    return {
      success: false,
      error: new ValidationError({
        message: `Failed to validate lockfile content at path: ${lockfilePath}`,
        schema: LockFileSchema,
        cause: validateLockfileResult.error,
      }),
    };
  }

  return {
    success: true,
    data: validateLockfileResult.data,
  };
}
