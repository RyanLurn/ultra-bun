import type { PathLike, BlobPart, BunFile, Archive, S3File } from "bun";
import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

export async function writeFile({
  destination,
  input,
}: {
  input:
    | NodeJS.TypedArray<ArrayBufferLike>
    | ArrayBufferLike
    | BlobPart[]
    | Archive
    | string
    | Blob;
  destination: PathLike | BunFile | S3File;
}): Promise<Result<number, FallBackError>> {
  try {
    const bytes = await Bun.write(destination, input);
    return {
      success: true,
      data: bytes,
    };
  } catch (error) {
    const context = {
      arguments: {
        destination,
        input,
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
