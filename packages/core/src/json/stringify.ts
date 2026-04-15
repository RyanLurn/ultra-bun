import type { Result } from "@/types/result";

import { SerializationError } from "@/error/classes/serialization";

export function jsonStringify({
  value,
  space = 2,
}: {
  value: unknown;
  space?: number;
}): Result<string, SerializationError> {
  if (value === undefined) {
    return {
      data: "undefined",
      success: true,
    };
  }

  if (typeof value === "function") {
    return {
      data: value.toString(),
      success: true,
    };
  }

  try {
    const jsonString = JSON.stringify(value, null, space);
    return {
      data: jsonString,
      success: true,
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
