import { isAbsolute } from "node:path";

import type { AbsolutePath } from "@/types/path";
import type { Result } from "@/types/result";

import { ValidationError } from "@/error/classes/validation";

export function validateAbsolutePath({
  path,
}: {
  path: string;
}): Result<AbsolutePath, ValidationError> {
  const context = { operation: validateAbsolutePath.name, input: path };

  try {
    if (path.length === 0) {
      return {
        success: false,
        error: new ValidationError({
          message: "File path cannot be an empty string",
          context,
        }),
      };
    }

    const isAbsolutePath = isAbsolute(path);

    if (isAbsolutePath) {
      return {
        success: true,
        data: path as AbsolutePath,
      };
    }

    return {
      success: false,
      error: new ValidationError({
        message: "Expected absolute path, received relative",
        context,
      }),
    };
  } catch (cause) {
    return {
      success: false,
      error: new ValidationError({
        message: `Expected absolute path to have type of string, received ${typeof path}`,
        context,
        cause,
      }),
    };
  }
}
