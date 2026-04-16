import z from "zod";

import {
  TYPESCRIPT_CONFIG_PACKAGE_NAME,
  ESLINT_CONFIG_PACKAGE_NAME,
  CORE_PACKAGE_NAME,
} from "@/constants";
import { DependencyListSchema } from "@/schemas/dependency";

const WorkspaceSchema = z.looseObject({
  name: z.string(),
  dependencies: DependencyListSchema.optional(),
  devDependencies: DependencyListSchema.optional(),
});

export const LockfileSchema = z.looseObject({
  workspaces: z
    .object({
      "": WorkspaceSchema,
      "configs/eslint": z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal(ESLINT_CONFIG_PACKAGE_NAME),
      }),
      "configs/typescript": z.looseObject({
        name: z.literal(TYPESCRIPT_CONFIG_PACKAGE_NAME),
      }),
      "packages/core": z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal(CORE_PACKAGE_NAME),
      }),
    })
    .catchall(WorkspaceSchema),
  catalog: DependencyListSchema.optional(),
});
export type Lockfile = z.infer<typeof LockfileSchema>;
