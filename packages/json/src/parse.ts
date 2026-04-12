import type { Result } from "@repo/core/types/result";

import type { JsonParseReviver } from "@/types";

import { InvalidJsonError } from "@/errors/invalid-json";

export function jsonParse({
  reviver,
  text,
}: {
  reviver?: JsonParseReviver;
  text: string;
}): Result<unknown, InvalidJsonError> {
  try {
    const value = JSON.parse(text, reviver) as unknown;
    return { success: true, data: value };
  } catch (cause) {
    const error = new InvalidJsonError({
      context: {
        arguments: {
          reviver,
          text,
        },
        operation: jsonParse.name,
      },
      cause: cause as SyntaxError,
    });
    return {
      success: false,
      error,
    };
  }
}
