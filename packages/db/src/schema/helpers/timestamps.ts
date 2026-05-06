import { timestamp } from "drizzle-orm/pg-core";

export const timestampConfig = {
  mode: "date",
  withTimezone: true,
  precision: 6,
} as const;

export const timestamps = {
  createdAt: timestamp("created_at", timestampConfig).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", timestampConfig)
    .defaultNow()
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
};

export const timestampsWithDelete = {
  ...timestamps,
  deletedAt: timestamp("deleted_at", timestampConfig).defaultNow(),
};
