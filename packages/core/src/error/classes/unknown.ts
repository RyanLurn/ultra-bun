import type { ExceptionContext } from "@/error/classes/unexpected";

import { BaseError } from "@/error/classes/base";

export class UnknownError extends BaseError<
  "UNKNOWN_ERROR",
  ExceptionContext,
  unknown
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: ExceptionContext;
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
