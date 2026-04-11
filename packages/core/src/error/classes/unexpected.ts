import { BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError {
  declare code: "UNEXPECTED_ERROR";
  declare cause: Error;

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context?: Record<string, unknown>;
      cause: Error;
    }
  ) {
    super(message, {
      code: "UNEXPECTED_ERROR",
      context,
      cause,
    });
  }
}
