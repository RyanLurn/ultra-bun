import type { $ } from "bun";

import { BaseError } from "@/error/classes/base";

export class ShellError extends BaseError<"SHELL_ERROR", null, $.ShellError> {
  constructor({ message, cause }: { message?: string; cause: $.ShellError }) {
    super({
      name: "ShellError",
      message: message ?? cause.message,
      code: "SHELL_ERROR",
      context: null,
      cause,
    });
  }
}
