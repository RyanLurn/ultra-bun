import { BaseError } from "@repo/core/error/classes/base";

import type { RatelimitResponse } from "@/features/rate-limiting/types";

type RateLimitedContext = {
  inputs: {
    identifier: string;
  };
  processName: string;
  outputs: RatelimitResponse;
};

export class RateLimitedError extends BaseError<
  "RATE_LIMITED_ERROR",
  RateLimitedContext,
  null
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: RateLimitedContext;
    cause: Error;
  }) {
    super({
      name: "UnexpectedError",
      message: message ?? cause.message,
      code: "RATE_LIMITED_ERROR",
      context,
      cause: null,
    });
  }
}
