import z from "zod";

export const DependencyListSchema = z.record(z.string(), z.string());

export const CatalogSchema = z
  .object({
    "@clack/prompts": z.string(),
    "@types/bun": z.string(),
    eslint: z.string(),
    tsdown: z.string(),
    typescript: z.string(),
    zod: z.string(),
  })
  .catchall(z.string());
