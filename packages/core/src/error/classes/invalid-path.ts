import { BaseError } from "@/error/classes/base";

type InvalidPathContext = {
  operation: string;
  input: unknown;
  [key: string]: unknown;
};

export class InvalidPathError extends BaseError {
  declare code: "INVALID_PATH_ERROR";
  declare context: InvalidPathContext;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: InvalidPathContext;
    cause?: unknown;
  }) {
    const errorMessage =
      message ??
      `File path cannot be ${typeof context.input === "string" ? "an empty string" : typeof context.input}`;

    super(errorMessage, { code: "INVALID_PATH_ERROR", context, cause });
  }
}
