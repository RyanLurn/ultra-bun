import { BaseError } from "@/error/classes/base";

type ValidationContext = {
  operation: string;
  input: unknown;
  [key: string]: unknown;
};

export class ValidationError extends BaseError {
  declare code: "VALIDATION_ERROR";
  declare context: ValidationContext;

  constructor({
    message,
    context,
    cause,
  }: {
    message: string;
    context: ValidationContext;
    cause?: unknown;
  }) {
    super({ message, code: "VALIDATION_ERROR", context, cause });
  }
}
