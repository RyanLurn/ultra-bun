import type { JsonParseReviver } from "@/json/parse";
import type { Result } from "@/types/result";

import { SerializationError } from "@/error/classes/serialization";

export function jsonStringify({
  value,
  replacer = null,
  space = 2,
}: {
  value: unknown;
  replacer?: (number | string)[] | JsonParseReviver | null;
  space?: number | string;
}): Result<string, SerializationError> {
  if (typeof value === "undefined") {
    return {
      success: true,
      data: "undefined",
    };
  }

  if (typeof value === "function" || typeof value === "symbol") {
    return {
      success: true,
      data: value.toString(),
    };
  }

  try {
    /**
     * TypeScript has 2 overloads for JSON.stringify
     * The type guard exists to make TypeScript happy
     * There's no runtime difference
     */
    const jsonString =
      typeof replacer === "function"
        ? JSON.stringify(value, replacer, space)
        : JSON.stringify(value, replacer, space);
    return {
      success: true,
      data: jsonString,
    };
  } catch (cause) {
    return {
      success: false,
      error: new SerializationError({
        message: `Cannot stringify ${typeof value === "bigint" ? "BigInt" : "cyclic object"} value`,
        cause: cause as TypeError,
      }),
    };
  }
}
