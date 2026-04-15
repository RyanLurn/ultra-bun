import z from "zod";

import { DependencyListSchema } from "@/schemas/dependency";

const WorkspaceSchema = z.looseObject({
  name: z.string(),
  dependencies: DependencyListSchema.optional(),
  devDependencies: DependencyListSchema.optional(),
});

export const BunLockfileSchema = z.looseObject({
  workspaces: z
    .object({
      "": WorkspaceSchema,
      "configs/eslint": z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal("@repo/eslint-config"),
      }),
      "configs/typescript": z.looseObject({
        name: z.literal("@repo/typescript-config"),
      }),
      "packages/core": z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal("@repo/core"),
      }),
    })
    .catchall(WorkspaceSchema),
  catalog: DependencyListSchema.optional(),
});
export type BunLockfile = z.infer<typeof BunLockfileSchema>;
