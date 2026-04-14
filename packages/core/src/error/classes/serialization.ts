import { type BaseContext, BaseError } from "@/error/classes/base";

export class SerializationError extends BaseError<
  "SERIALIZATION_ERROR",
  BaseContext,
  TypeError
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: BaseContext;
    cause: TypeError;
  }) {
    super({
      name: "SerializationError",
      message: message ?? cause.message,
      code: "SERIALIZATION_ERROR",
      context,
      cause,
    });
  }
}
