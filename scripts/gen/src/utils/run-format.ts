import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { ShellError } from "@repo/core/error/classes/shell";
import { $ } from "bun";

import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function runFormat(): Promise<
  Result<string, FallBackError | ShellError>
> {
  const command = "bun run format";

  try {
    const output = await $`${command}`.cwd(ROOT_WORKSPACE_DIR).text();
    return {
      success: true,
      data: output,
    };
  } catch (cause) {
    const context = {
      operation: runFormat.name,
      command,
      chainedMethods: ["cwd", "text"],
      cwd: ROOT_WORKSPACE_DIR,
    };

    if (cause instanceof $.ShellError) {
      return {
        success: false,
        error: new ShellError({
          message: "Failed to format code",
          context,
          cause,
        }),
      };
    }

    return {
      success: false,
      error: createFallbackError({
        message: "Failed to format code due to an unknown exception",
        context,
        cause,
      }),
    };
  }
}
