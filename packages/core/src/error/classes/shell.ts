import type { $ } from "bun";

import { BaseError } from "@/error/classes/base";

export type ShellContext = {
  command: string;
  chainedMethods: string[];
  [key: string]: unknown;
};

export class ShellError extends BaseError {
  declare code: "SHELL_ERROR";
  declare context: ShellContext;
  declare cause: $.ShellError;

  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: ShellContext;
    cause: $.ShellError;
  }) {
    super({
      message: message ?? cause.message,
      code: "SHELL_ERROR",
      context,
      cause,
    });
  }
}
