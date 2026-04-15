import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { ValidationError } from "@repo/core/error/classes/validation";
import { readTextFromFile } from "@repo/core/fs/read-text-from-file";
import { parse } from "jsonc-parser";
import { join } from "node:path";

import { LockfileSchema, type Lockfile } from "@/schemas/lockfile";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readLockfile(): Promise<
  Result<
    Lockfile,
    ValidationError<"LockfileSchema"> | NonExistentPathError | FallBackError
  >
> {
  const lockfilePath = join(ROOT_WORKSPACE_DIR, "bun.lock");

  const readTextFromFileResult = await readTextFromFile({ path: lockfilePath });

  if (readTextFromFileResult.success === false) {
    return readTextFromFileResult;
  }

  const parsedLockfile = parse(readTextFromFileResult.data, undefined, {
    allowTrailingComma: true,
  }) as unknown;

  const validateLockfileResult = LockfileSchema.safeParse(parsedLockfile);

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
