import type { JsonSerializableValue } from "@/types/json-serializable-value";

import { BaseError } from "@/error/classes/base";

type UnexpectedContext = {
  operation: string;
  arguments: JsonSerializableValue;
};

export class UnexpectedError extends BaseError<
  "UNEXPECTED_ERROR",
  UnexpectedContext,
  Error
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: UnexpectedContext;
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
