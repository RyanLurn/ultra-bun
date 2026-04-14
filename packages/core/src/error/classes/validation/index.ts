import { BaseError } from "@/error/classes/base";

type ValidationContext = {
  operation: string;
  input: unknown;
  [key: string]: unknown;
};

export class ValidationError<
  TCode extends string = "VALIDATION_ERROR",
> extends BaseError {
  declare code: TCode;
  declare context: ValidationContext;

  constructor({
    message,
    code,
    context,
    cause,
  }: {
    message: string;
    code: TCode;
    context: ValidationContext;
    cause?: unknown;
  }) {
    super({ message, code, context, cause });
  }
}
