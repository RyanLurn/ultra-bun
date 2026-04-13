import { BaseError } from "@/error/classes/base";

type InvalidPathContext = {
  operation: string;
  input: unknown;
  // eslint-disable-next-line perfectionist/sort-object-types
  [key: string]: unknown;
};

export class InvalidPathError extends BaseError {
  declare code: "INVALID_PATH_ERROR";
  // eslint-disable-next-line perfectionist/sort-classes
  declare context: InvalidPathContext;

  constructor({
    message,
    context,
  }: {
    message?: string;
    // eslint-disable-next-line perfectionist/sort-object-types
    context: InvalidPathContext;
  }) {
    const errorMessage =
      message ??
      `File path cannot be ${typeof context.input === "string" ? "an empty string" : typeof context.input}`;

    super(errorMessage, { code: "INVALID_PATH_ERROR", context });
  }
}
