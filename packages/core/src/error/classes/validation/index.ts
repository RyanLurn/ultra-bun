import { BaseError } from "@/error/classes/base";

export class ValidationError<
  TCode extends string = "VALIDATION_ERROR",
> extends BaseError {
  declare code: TCode;

  constructor({
    message,
    code,
    context,
    cause,
  }: {
    message: string;
    code: TCode;
    context?: Record<string, unknown>;
    cause?: unknown;
  }) {
    super({ message, code, context, cause });
  }
}
