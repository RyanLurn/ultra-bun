import type { JsonSerializableValue } from "@/types/json-serializable-value";

import { BaseError } from "@/error/classes/base";

export type ExceptionContext = {
  operation: string;
  arguments: JsonSerializableValue;
};

export class UnexpectedError extends BaseError<
  "UNEXPECTED_ERROR",
  ExceptionContext,
  Error
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: ExceptionContext;
    cause: Error;
  }) {
    super({
      name: "UnexpectedError",
      message: message ?? cause.message,
      code: "UNEXPECTED_ERROR",
      context,
      cause,
    });
  }
}
