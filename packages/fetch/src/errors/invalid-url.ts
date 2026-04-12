/* eslint-disable perfectionist/sort-object-types */
import { BaseError } from "@repo/core/error/classes/base";

type InvalidUrlErrorContext = {
  arguments: {
    url: string;
    base?: string;
    [key: string]: unknown;
  };
  operation: string;
};

export class InvalidUrlError extends BaseError {
  declare context: InvalidUrlErrorContext;
  declare code: "INVALID_URL_ERROR";
  declare cause: TypeError;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: InvalidUrlErrorContext;
    cause: TypeError;
  }) {
    super(message ?? cause.message, {
      code: "INVALID_URL_ERROR",
      context,
      cause,
    });
  }
}
