import z from "zod";

export const PackageJsonSchema = z.looseObject({
  name: z.string(),
  workspaces: z.looseObject({
    packages: z.array(z.string()),
    catalog: z.array(z.string()),
  }),
});
export type PackageJson = z.infer<typeof PackageJsonSchema>;
