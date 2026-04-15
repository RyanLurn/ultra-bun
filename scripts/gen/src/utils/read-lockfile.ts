import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { InvalidJsonError } from "@repo/core/error/classes/invalid-json";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { ValidationError } from "@repo/core/error/classes/validation";
import { readJsonFile } from "@repo/core/fs/read-json-file";
import { join } from "node:path";

import { LockfileSchema, type Lockfile } from "@/schemas/lockfile";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readLockfile(): Promise<
  Result<
    Lockfile,
    | ValidationError<"LockfileSchema">
    | NonExistentPathError
    | InvalidJsonError
    | FallBackError
  >
> {
  const lockfilePath = join(ROOT_WORKSPACE_DIR, "bun.lock");

  const readJsonFileResult = await readJsonFile({ path: lockfilePath });

  if (readJsonFileResult.success === false) {
    return readJsonFileResult;
  }

  const validateLockfileResult = LockfileSchema.safeParse(
    readJsonFileResult.data
  );

  if (validateLockfileResult.success === false) {
    return {
      success: false,
      error: new ValidationError({
        message: `Failed to validate lockfile content at path: ${lockfilePath}`,
        context: {
          schema: "LockfileSchema",
          lockfilePath,
        },
        cause: validateLockfileResult.error,
      }),
    };
  }

  return {
    success: true,
    data: validateLockfileResult.data,
  };
}
