import z from "zod";

export const DependencyListSchema = z.record(z.string(), z.string());
