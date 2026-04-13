import z from "zod";

export const CommandSchema = z.enum(["package", "script"]);
export type Command = z.infer<typeof CommandSchema>;

export const RuntimeSchema = z.enum(["bun", "browser", "isomorphic"]);
export type Runtime = z.infer<typeof RuntimeSchema>;

export const PackageCommandArgsSchema = z.object({
  command: CommandSchema.extract(["package"]),
  runtime: RuntimeSchema.default("bun"),
});
export type PackageCommandArgs = z.infer<typeof PackageCommandArgsSchema>;

export const ScriptCommandArgsSchema = z.object({
  command: CommandSchema.extract(["script"]),
  runtime: RuntimeSchema.extract(["bun"]),
});
export type ScriptCommandArgs = z.infer<typeof ScriptCommandArgsSchema>;

export const CommandArgsSchema = z.discriminatedUnion("command", [
  PackageCommandArgsSchema,
  ScriptCommandArgsSchema,
]);
export type CommandArgs = z.infer<typeof CommandArgsSchema>;
