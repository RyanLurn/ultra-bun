import type { Ratelimit } from "@upstash/ratelimit";

export type RatelimitResponse = Awaited<ReturnType<Ratelimit["limit"]>>;
