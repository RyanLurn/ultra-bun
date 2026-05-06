import { Ratelimit } from "@upstash/ratelimit";

import { kv } from "@/index";

export const rateLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.tokenBucket(5, "10 s", 10),
  analytics: true,
});
