import type { JsonSerializableValue } from "@/types/json-serializable-value";

import { BaseError } from "@/error/classes/base";

type UnknownContext = {
  operation: string;
  arguments: JsonSerializableValue;
};

export class UnknownError extends BaseError<
  "UNKNOWN_ERROR",
  UnknownContext,
  unknown
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: UnknownContext;
    cause: unknown;
  }) {
    super({
      name: "UnknownError",
      message:
        message ?? `An unknown value of type "${typeof cause}" was thrown`,
      code: "UNKNOWN_ERROR",
      context,
      cause,
    });
  }
}
