import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

export async function writeFile({
  overwrite = true,
  content,
  path,
}: {
  overwrite?: boolean;
  path: string | URL;
  content: string;
}): Promise<Result<number, FallBackError>> {
  try {
    if (overwrite === false) {
      const fileReference = Bun.file(path);
      if (await fileReference.exists()) {
        throw new Error("File already exists");
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
