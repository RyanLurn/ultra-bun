import { BaseError } from "@repo/core/error/classes/base";

export type InvalidJsonErrorContext = {
  arguments: {
    reviver?: (this: unknown, key: string, value: unknown) => unknown;
    text: string;
  };
  operation: string;
};

export class InvalidJsonError extends BaseError {
  declare context: InvalidJsonErrorContext;
  declare code: "INVALID_JSON_ERROR";
  declare cause: SyntaxError;

  constructor({
    message,
    context,
    cause,
  }: {
    context: InvalidJsonErrorContext;
    cause: SyntaxError;
    message?: string;
  }) {
    super(message ?? cause.message, {
      code: "INVALID_JSON_ERROR",
      context,
      cause,
    });
  }
}
