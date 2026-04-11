import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

import { FileAlreadyExistsError } from "@/errors/file-already-exists";

export async function writeFile({
  overwrite = true,
  content,
  path,
}: {
  overwrite?: boolean;
  path: string | URL;
  content: string;
}): Promise<Result<number, FileAlreadyExistsError | FallBackError>> {
  try {
    if (overwrite === false) {
      const fileReference = Bun.file(path);

      if (await fileReference.exists()) {
        const error = new FileAlreadyExistsError(
          "Cannot write to a file that already exists when overwrite is set to false.",
          {
            context: {
              operation: "writeFile",
              path,
            },
          }
        );
        return {
          success: false,
          error,
        };
      }
    }

    const bytes = await Bun.write(path, content);
    return {
      success: true,
      data: bytes,
    };
  } catch (error) {
    const context = {
      arguments: {
        content,
        path,
      },
      operation: "writeFile",
    };

    const fallbackError = createFallbackError({
      message: "Failed to write file to destination",
      cause: error,
      context,
    });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
