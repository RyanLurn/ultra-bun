import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { InvalidJsonError } from "@repo/json/errors/invalid-json";
import { jsonParse } from "@repo/json/parse";

import type { FilePath } from "@/types";

import { FileDoesNotExistError } from "@/errors/file-does-not-exist";

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
      const jsonParseResult = jsonParse({ text });

      if (jsonParseResult.success) {
        return jsonParseResult;
      }

      const error = new InvalidJsonError({
        context: {
          ...jsonParseResult.error.context,
          operation: readFileContentAsJson.name,
        },
        message:
          "Failed to read file content as json because it doesn't conform to the JSON grammar",
        cause: jsonParseResult.error.cause,
      });
      return {
        success: false,
        error,
      };
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
  } catch (cause) {
    const context = {
      operation: readFileContentAsJson.name,
      arguments: {
        path,
      },
    };

    const error = createFallbackError({
      message:
        "Failed to read file content as json due to an unknown exception",
      context,
      cause,
    });
    return {
      success: false,
      error,
    };
  }
}

export async function readFileContentAsText({
  path,
}: {
  path: FilePath;
}): Promise<Result<string, FileDoesNotExistError | FallBackError>> {
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
  } catch (cause) {
    const context = {
      operation: readFileContentAsText.name,
      arguments: {
        path,
      },
    };

    const error = createFallbackError({
      message:
        "Failed to read file content as text due to an unknown exception",
      context,
      cause,
    });
    return {
      success: false,
      error,
    };
  }
}
