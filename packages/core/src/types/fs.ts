import type { BunFile } from "bun";

import type { Branded } from "@/types/branded";

export type ExistentPath = Branded<string, "ExistentPath">;
export type ExistentFile = Branded<BunFile, "ExistentFile">;
