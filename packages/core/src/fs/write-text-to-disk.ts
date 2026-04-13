import type { Result } from "@/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@/error/create-fallback";

export async function writeTextToDisk({
  text,
  path,
}: {
  text: string;
  path: string;
}): Promise<Result<number, FallBackError>> {
  try {
    const bytesWritten = await Bun.write(path, text);
    return {
      success: true,
      data: bytesWritten,
    };
  } catch (cause) {
    return {
      success: false,
      error: createFallbackError({
        message: "Failed to write text content to disk",
        context: {
          operation: writeTextToDisk.name,
          arguments: {
            text,
            path,
          },
        },
        cause,
      }),
    };
  }
}
