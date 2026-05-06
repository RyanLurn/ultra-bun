import { kv } from "@repo/kv";

import { SessionSchema } from "@/session/schema";

export async function getSession({ sessionId }: { sessionId: string }) {
  const key = `session:${sessionId}`;
  const value = await kv.get(key);

  if (typeof value === "string") {
    const parseResult = SessionSchema.safeParse(JSON.parse(value));
    if (parseResult.success) {
      return parseResult.data;
    }
  }

  return null;
}
