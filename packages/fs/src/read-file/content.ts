import type { InvalidJsonError } from "@repo/json/errors/invalid-json";
import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { jsonParse } from "@repo/json/parse";

import type { FilePath } from "@/types";

import { FileDoesNotExistError } from "@/errors/file-does-not-exist";

export async function readFileContent({
  format = "text",
  path,
}: {
  format?: "text" | "json";
  path: FilePath;
}): Promise<
  Result<unknown, FileDoesNotExistError | InvalidJsonError | FallBackError>
> {
  try {
    const file = Bun.file(path);

    if (await file.exists()) {
      const content = await file.text();

      if (format === "text") {
        return {
          success: true,
          data: content,
        };
      }

      return jsonParse({ text: content });
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
