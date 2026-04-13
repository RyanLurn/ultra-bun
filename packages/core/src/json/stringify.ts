import type { Result } from "@/types/result";

import { SerializationError } from "@/error/classes/serialization";

export function jsonStringify({
  value,
  // eslint-disable-next-line perfectionist/sort-objects
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
    const error = new SerializationError({
      context: {
        arguments: {
          value,
          space,
        },
        operation: jsonStringify.name,
      },
      message: `Cannot stringify ${typeof value === "bigint" ? "BigInt" : "cyclic object"} value`,
      cause: cause as TypeError,
    });
    return {
      success: false,
      error,
    };
  }
}
