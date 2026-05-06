import { USER_ROLES } from "@repo/db/constants";
import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  encodedSecretHash: z.string(), // base64-encoded, since Redis stores strings
  createdAt: z.number(), // result of Date.now()
  userId: z.string(),
  userRole: z.enum(USER_ROLES),
});

export type Session = z.infer<typeof SessionSchema>;
