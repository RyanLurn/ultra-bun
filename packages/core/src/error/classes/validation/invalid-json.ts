import { ValidationError } from "@/error/classes/validation";

export type JsonParseReviver = (
  this: unknown,
  key: string,
  value: unknown
) => unknown;

type InvalidJsonContext = {
  operation: string;
  arguments: {
    text: string;
    reviver?: JsonParseReviver;
  };
};

export class InvalidJsonError extends ValidationError<"INVALID_JSON_ERROR"> {
  declare context: InvalidJsonContext;
  declare cause: SyntaxError;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: InvalidJsonContext;
    cause: SyntaxError;
  }) {
    super({
      message: message ?? cause.message,
      code: "INVALID_JSON_ERROR",
      context,
      cause,
    });
  }
}
