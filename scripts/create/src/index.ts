import z from "zod";

const FlagsSchema = z.object({
  type: z.enum(["lib", "api", "spa", "ssr"]).default("lib"),
  scope: z.string().min(1).default("repo"),
  name: z.string().min(1),
});
type Flags = z.infer<typeof FlagsSchema>;
