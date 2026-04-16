import z from "zod";

import { DependencyListSchema } from "@/schemas/dependency";

export const ConditionalExportSchema = z.object({
  "node-addons": z.string(),
  node: z.string(),
  import: z.string(),
  require: z.string(),
  "module-sync": z.string(),
  types: z.string(),
  browser: z.string(),
  default: z.string(),
});

export const PackageJsonSchema = z.looseObject({
  name: z.string(),
  version: z.string().optional(),
  type: z.enum(["module", "commonjs"]).optional(),
  private: z.union([z.boolean(), z.enum(["true", "false"])]).optional(),
  bin: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
  scripts: z.record(z.string(), z.string()).optional(),
  exports: z
    .union([
      z.string(),
      ConditionalExportSchema,
      z.record(z.string(), z.union([z.string(), ConditionalExportSchema])),
    ])
    .optional(),
  dependencies: DependencyListSchema.optional(),
  devDependencies: DependencyListSchema.optional(),
});
export type PackageJson = z.infer<typeof PackageJsonSchema>;
