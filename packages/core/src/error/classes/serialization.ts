import { BaseError } from "@/error/classes/base";

type SerializationContext = {
  operation: string;
  arguments: {
    [key: string]: unknown;
    value: unknown;
  };
};

export class SerializationError extends BaseError {
  declare code: "SERIALIZATION_ERROR";
  declare context: SerializationContext;
  declare cause: TypeError;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: SerializationContext;
    cause: TypeError;
  }) {
    super(message ?? cause.message, {
      code: "SERIALIZATION_ERROR",
      context,
      cause,
    });
  }
}
