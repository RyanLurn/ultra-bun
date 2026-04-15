import { BaseError } from "@/error/classes/base";

export class SerializationError extends BaseError<
  "SERIALIZATION_ERROR",
  null,
  TypeError
> {
  constructor({ message, cause }: { message?: string; cause: TypeError }) {
    super({
      name: "SerializationError",
      message: message ?? cause.message,
      code: "SERIALIZATION_ERROR",
      context: null,
      cause,
    });
  }
}
