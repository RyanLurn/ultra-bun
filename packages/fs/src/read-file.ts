import type { InvalidJsonError } from "@repo/json/errors/invalid-json";
import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { jsonParse } from "@repo/json/parse";

import type { FilePath } from "@/types";

import { FileDoesNotExistError } from "@/errors/file-does-not-exist";

export async function readFileContentAsText({
  path,
}: {
  path: FilePath;
}): Promise<Result<unknown, FileDoesNotExistError | FallBackError>> {
  try {
    const file = Bun.file(path);

    if (await file.exists()) {
      const content = await file.text();
      return {
        success: true,
        data: content,
      };
    }

    const error = new FileDoesNotExistError(
      `Failed to read file content as text because the file doesn't exist`,
      {
        context: {
          operation: readFileContentAsText.name,
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
      operation: readFileContentAsText.name,
      arguments: {
        path,
      },
    };

    const fallbackError = createFallbackError({
      message:
        "Failed to read file content as text due to an unknown exception",
      cause: error,
      context,
    });
    return {
      error: fallbackError,
      success: false,
    };
  }
}

export async function readFileContentAsJson({
  path,
}: {
  path: FilePath;
}): Promise<
  Result<unknown, FileDoesNotExistError | InvalidJsonError | FallBackError>
> {
  try {
    const file = Bun.file(path);

    if (await file.exists()) {
      const text = await file.text();
      return jsonParse({ text });
    }

    const error = new FileDoesNotExistError(
      `Failed to read file content as json because the file doesn't exist`,
      {
        context: {
          operation: readFileContentAsJson.name,
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
      operation: readFileContentAsJson.name,
      arguments: {
        path,
      },
    };

    const fallbackError = createFallbackError({
      message:
        "Failed to read file content as json due to an unknown exception",
      cause: error,
      context,
    });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
