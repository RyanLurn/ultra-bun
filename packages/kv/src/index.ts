import { createEnv } from "@t3-oss/env-core";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const envVars = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  runtimeEnv: process.env,
});

export const kv = new Redis({
  url: envVars.UPSTASH_REDIS_REST_URL,
  token: envVars.UPSTASH_REDIS_REST_TOKEN,
});
