import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { ShellError } from "@repo/core/error/classes/shell";
import { $ } from "bun";

import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function runBunInstall(): Promise<
  Result<undefined, FallBackError | ShellError>
> {
  try {
    await $`bun install`.cwd(ROOT_WORKSPACE_DIR);
    return {
      success: true,
      data: undefined,
    };
  } catch (cause) {
    const context = {
      operation: runBunInstall.name,
      command: "bun install",
      chainedMethods: ["cwd"],
      cwd: ROOT_WORKSPACE_DIR,
    };

    if (cause instanceof $.ShellError) {
      return {
        success: false,
        error: new ShellError({
          message: "Failed to run bun install",
          context,
          cause,
        }),
      };
    }

    return {
      success: false,
      error: createFallbackError({
        message: "Failed to run bun install due to an unknown exception",
        context,
        cause,
      }),
    };
  }
}
