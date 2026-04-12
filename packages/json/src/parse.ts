import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

import type { InvalidJsonErrorContext } from "@/errors/invalid-json";

export function jsonParse({
  reviver,
  text,
}: {
  reviver?: (this: unknown, key: string, value: unknown) => unknown;
  text: string;
}): Result<unknown, FallBackError> {
  try {
    const value = JSON.parse(text, reviver) as unknown;
    return { success: true, data: value };
  } catch (error) {
    const context: InvalidJsonErrorContext = {
      arguments: {
        reviver,
        text,
      },
      operation: "jsonParse",
    };

    const fallbackError = createFallbackError({ cause: error, context });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
