import { BaseError } from "@/error/classes/base";

export class InvalidJsonError extends BaseError<
  "INVALID_JSON_ERROR",
  null,
  SyntaxError
> {
  constructor({ message, cause }: { message?: string; cause: SyntaxError }) {
    super({
      name: "InvalidJsonError",
      message: message ?? cause.message,
      code: "INVALID_JSON_ERROR",
      context: null,
      cause,
    });
  }
}
