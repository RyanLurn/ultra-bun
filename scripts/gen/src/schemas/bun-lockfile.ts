import z from "zod";

import { DependencyListSchema } from "@/schemas/dependency";

export const BunLockfileSchema = z.looseObject({
  workspaces: z.record(
    z.string(),
    z.looseObject({
      name: z.string(),
      dependencies: DependencyListSchema.optional(),
      devDependencies: DependencyListSchema.optional(),
    })
  ),
  catalog: DependencyListSchema.optional(),
});
