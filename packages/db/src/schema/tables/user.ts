import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import type { UserId } from "@/types/ids";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";
import { USER_ROLES } from "@/constants";

export const userTable = pgTable("users", {
  id: id.$type<UserId>(),
  role: text("role", { enum: USER_ROLES }).notNull().default("user"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  ...timestampsWithDelete,
});
