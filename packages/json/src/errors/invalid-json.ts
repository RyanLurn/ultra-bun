import { BaseError } from "@repo/core/error/classes/base";

type InvalidJsonErrorContext = {
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
    context,
    cause,
  }: {
    context: InvalidJsonErrorContext;
    cause: SyntaxError;
  }) {
    super(cause.message, { code: "INVALID_JSON_ERROR", context, cause });
  }
}
