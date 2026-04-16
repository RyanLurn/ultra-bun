import z from "zod";

import {
  TYPESCRIPT_CONFIG_PACKAGE_NAME,
  ESLINT_CONFIG_PACKAGE_NAME,
  CORE_PACKAGE_NAME,
  PACKAGES_DIR_NAME,
  CONFIGS_DIR_NAME,
} from "@/constants";
import { DependencyListSchema, CatalogSchema } from "@/schemas/dependency";

const WorkspaceSchema = z.looseObject({
  name: z.string(),
  dependencies: DependencyListSchema.optional(),
  devDependencies: DependencyListSchema.optional(),
});

export const LockfileSchema = z.looseObject({
  workspaces: z
    .object({
      "": WorkspaceSchema,
      [`${CONFIGS_DIR_NAME}/eslint`]: z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal(ESLINT_CONFIG_PACKAGE_NAME),
      }),
      [`${CONFIGS_DIR_NAME}/typescript`]: z.looseObject({
        name: z.literal(TYPESCRIPT_CONFIG_PACKAGE_NAME),
      }),
      [`${PACKAGES_DIR_NAME}/core`]: z.looseObject({
        ...WorkspaceSchema.shape,
        name: z.literal(CORE_PACKAGE_NAME),
      }),
    })
    .catchall(WorkspaceSchema),
  catalog: CatalogSchema,
});
export type Lockfile = z.infer<typeof LockfileSchema>;
