import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";

import type { RatelimitResponse } from "@/features/rate-limiting/types";

import { RateLimitedError } from "@/features/rate-limiting/error";
import { rateLimiter } from "@/features/rate-limiting/limiter";

export async function checkRateLimit({
  identifier,
}: {
  identifier: string;
}): Promise<Result<RatelimitResponse, RateLimitedError | FallBackError>> {
  const startContext = {
    inputs: {
      identifier,
    },
    processName: "checkRateLimit",
  };

  try {
    const response = await rateLimiter.limit(identifier);

    if (response.success) {
      return {
        success: true,
        data: response,
      };
    }

    return {
      success: false,
      error: new RateLimitedError({
        context: { ...startContext, outputs: response },
      }),
    };
  } catch (cause) {
    return {
      success: false,
      error: createFallbackError({
        message: "Failed to check rate limit due to an unknown cause.",
        context: startContext,
        cause,
      }),
    };
  }
}
