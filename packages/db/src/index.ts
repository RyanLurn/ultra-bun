import { drizzle } from "drizzle-orm/neon-http";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { userTable } from "@/schema/tables/user";

const envVars = createEnv({
  server: {
    NEON_POOLED_CONNECTION_STRING: z.url(),
  },
  runtimeEnv: process.env,
});

export const db = drizzle(envVars.NEON_POOLED_CONNECTION_STRING, {
  schema: {
    userTable,
  },
});
