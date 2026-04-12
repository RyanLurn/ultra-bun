import type { Result } from "@repo/core/types/result";

import { InvalidUrlError } from "@/errors/invalid-url";

export function createUrlObject({
  base,
  url,
}: {
  base?: string;
  url: string;
}): Result<URL, InvalidUrlError> {
  try {
    const urlObject = new URL(url, base);
    return {
      data: urlObject,
      success: true,
    };
  } catch (cause) {
    const error = new InvalidUrlError({
      context: {
        arguments: {
          base,
          url,
        },
        operation: createUrlObject.name,
      },
      cause: cause as TypeError,
    });
    return {
      success: false,
      error,
    };
  }
}
