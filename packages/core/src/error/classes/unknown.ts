import { BaseError } from "@/error/classes/base";

export class UnknownError extends BaseError {
  declare code: "UNKNOWN_ERROR";
  declare cause: unknown;

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context?: Record<string, unknown>;
      cause: unknown;
    }
  ) {
    super(message, {
      code: "UNKNOWN_ERROR",
      context,
      cause,
    });
  }
}
