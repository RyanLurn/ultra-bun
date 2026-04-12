import type { Result } from "@repo/core/types/result";

import type { UrlString } from "@/types";

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

export function parseUrlString({
  url,
}: {
  url: string;
}): Result<UrlString, InvalidUrlError> {
  const createUrlObjectResult = createUrlObject({ url });

  if (createUrlObjectResult.success) {
    return {
      data: url as UrlString,
      success: true,
    };
  }

  const error = new InvalidUrlError({
    ...createUrlObjectResult.error,
    context: {
      ...createUrlObjectResult.error.context,
      operation: parseUrlString.name,
    },
  });
  return {
    success: false,
    error,
  };
}
