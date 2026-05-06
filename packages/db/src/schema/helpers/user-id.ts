import { uuid } from "drizzle-orm/pg-core";

import type { UserId } from "@/types/ids";

import { userTable } from "@/schema/tables/user";

export const userId = uuid("user_id")
  .notNull()
  .$type<UserId>()
  .references(() => userTable.id, { onDelete: "cascade" });
