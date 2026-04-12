import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

import { FileAlreadyExistsError } from "@/errors/file-already-exists";

export async function writeFile({
  overwrite,
  content,
  path,
}: {
  path: string | URL;
  overwrite?: true;
  content: string;
}): Promise<Result<number, FallBackError>>;
export async function writeFile({
  overwrite,
  content,
  path,
}: {
  path: string | URL;
  overwrite: false;
  content: string;
}): Promise<Result<number, FileAlreadyExistsError | FallBackError>>;
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
              operation: writeFile.name,
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
  } catch (cause) {
    const context = {
      arguments: {
        content,
        path,
      },
      operation: writeFile.name,
    };

    const error = createFallbackError({
      message: "Failed to write file to destination",
      context,
      cause,
    });
    return {
      success: false,
      error,
    };
  }
}
