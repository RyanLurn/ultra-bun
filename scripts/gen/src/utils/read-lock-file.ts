import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { InvalidJsonError } from "@repo/core/error/classes/invalid-json";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { ValidationError } from "@repo/core/error/classes/validation";
import { readJsonFile } from "@repo/core/fs/read-json-file";
import { join } from "node:path";

import { LockFileSchema, type LockFile } from "@/schemas/lock-file";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readLockFile(): Promise<
  Result<
    LockFile,
    | ValidationError<"LockFileSchema">
    | NonExistentPathError
    | InvalidJsonError
    | FallBackError
  >
> {
  const lockFilePath = join(ROOT_WORKSPACE_DIR, "bun.lock");

  const readJsonFileResult = await readJsonFile({ path: lockFilePath });

  if (readJsonFileResult.success === false) {
    return readJsonFileResult;
  }

  const validateLockFileResult = LockFileSchema.safeParse(
    readJsonFileResult.data
  );

  if (validateLockFileResult.success === false) {
    return {
      success: false,
      error: new ValidationError({
        message: `Failed to validate lockfile content at path: ${lockFilePath}`,
        context: {
          schema: "LockFileSchema",
          lockFilePath,
        },
        cause: validateLockFileResult.error,
      }),
    };
  }

  return {
    success: true,
    data: validateLockFileResult.data,
  };
}
