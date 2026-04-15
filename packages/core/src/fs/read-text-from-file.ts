import type { NonExistentPathError } from "@/error/classes/non-existent-path";
import type { Result } from "@/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@/error/create-fallback";
import { verifyFile } from "@/fs/verify-file";

export async function readTextFromFile({
  path,
}: {
  path: string;
}): Promise<Result<string, NonExistentPathError | FallBackError>> {
  const verifyFileResult = await verifyFile({ path });

  if (verifyFileResult.success === false) {
    return verifyFileResult;
  }

  try {
    const text = await verifyFileResult.data.file.text();
    return {
      success: true,
      data: text,
    };
  } catch (cause) {
    return {
      success: false,
      error: createFallbackError({
        message: `Failed to read file at path: ${path}`,
        context: {},
        cause,
      }),
    };
  }
}
