import { BaseError } from "@/error/classes/base";

type SerializationErrorContext = {
  arguments: {
    [key: string]: unknown;
    value: unknown;
  };
  operation: string;
};

export class SerializationError extends BaseError {
  declare context: SerializationErrorContext;
  declare code: "SERIALIZATION_ERROR";
  declare cause: TypeError;

  constructor({
    message,
    context,
    cause,
  }: {
    context: SerializationErrorContext;
    message?: string;
    cause: TypeError;
  }) {
    super(message ?? cause.message, {
      code: "SERIALIZATION_ERROR",
      context,
      cause,
    });
  }
}
