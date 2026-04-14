import type { JsonParseReviver } from "@/error/classes/validation/invalid-json";
import type { Result } from "@/types/result";

import { InvalidJsonError } from "@/error/classes/validation/invalid-json";

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
        context: {
          operation: jsonParse.name,
          arguments: {
            text,
            reviver,
          },
        },
        cause: cause as SyntaxError,
      }),
    };
  }
}
