import { prettifyError, type ZodError, type ZodType } from "zod";

import { BaseError } from "@/error/classes/base";

type ValidationContext<TSchema extends ZodType> = {
  schema: TSchema;
};

export class ValidationError<TSchema extends ZodType> extends BaseError<
  "VALIDATION_ERROR",
  ValidationContext<TSchema>,
  ZodError
> {
  constructor({
    message,
    schema,
    cause,
  }: {
    message?: string;
    schema: TSchema;
    cause: ZodError;
  }) {
    super({
      name: "ValidationError",
      code: "VALIDATION_ERROR",
      message: message ?? prettifyError(cause),
      context: {
        schema,
      },
      cause,
    });
  }
}
