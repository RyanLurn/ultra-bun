import { BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError {
  declare code: "UNEXPECTED_ERROR";
  declare cause: Error;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context?: Record<string, unknown>;
    cause: Error;
  }) {
    super({
      message: message ?? cause.message,
      code: "UNEXPECTED_ERROR",
      context,
      cause,
    });
  }
}
