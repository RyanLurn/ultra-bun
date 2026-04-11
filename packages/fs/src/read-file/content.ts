import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

import type { FilePath } from "@/types";

import { FileDoesNotExistError } from "@/errors/file-does-not-exist";

export async function readFileContent({
  format = "text",
  path,
}: {
  format?: "text";
  path: FilePath;
}): Promise<Result<string, FileDoesNotExistError | FallBackError>> {
  try {
    const file = Bun.file(path);

    if (await file.exists()) {
      const content = await file[format]();
      return {
        success: true,
        data: content,
      };
    }

    const error = new FileDoesNotExistError(
      `Cannot read file's ${format} content because the file doesn't exist`,
      {
        context: {
          operation: "readFileContent",
          path,
        },
      }
    );
    return {
      success: false,
      error,
    };
  } catch (error) {
    const context = {
      arguments: {
        format,
        path,
      },
      operation: "readFileContent",
    };

    const fallbackError = createFallbackError({
      message: "Failed to read file content",
      cause: error,
      context,
    });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
