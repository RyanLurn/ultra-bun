import z from "zod";

import { DependencyListSchema } from "@/schemas/dependency";

const WorkspaceEntrySchema = z.looseObject({
  name: z.string(),
  dependencies: DependencyListSchema.optional(),
  devDependencies: DependencyListSchema.optional(),
});

export const BunLockfileSchema = z.looseObject({
  workspaces: z
    .object({
      "": WorkspaceEntrySchema,
    })
    .catchall(WorkspaceEntrySchema),
  catalog: DependencyListSchema.optional(),
});
export type BunLockfile = z.infer<typeof BunLockfileSchema>;
