import { rateLimiter } from "@/features/rate-limiting/limiter";

export async function checkRateLimit({ identifier }: { identifier: string }) {
  const { success } = await rateLimiter.limit(identifier);
  return success;
}
