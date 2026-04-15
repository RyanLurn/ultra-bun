import type { Result } from "@/types/result";

import { InvalidJsonError } from "@/error/classes/invalid-json";

export type JsonParseReviver = (
  this: unknown,
  key: string,
  value: unknown
) => unknown;

export function jsonParse({
  text,
  reviver,
}: {
  text: string;
  reviver?: JsonParseReviver;
}): Result<unknown, InvalidJsonError> {
  try {
    const data = JSON.parse(text, reviver) as unknown;
    return {
      success: true,
      data,
    };
  } catch (cause) {
    return {
      success: false,
      error: new InvalidJsonError({
        cause: cause as SyntaxError,
      }),
    };
  }
}
