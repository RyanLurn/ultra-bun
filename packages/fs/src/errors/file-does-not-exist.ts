import { BaseError } from "@repo/core/error/classes/base";

import type { FilePath } from "@/types";

type FileDoesNotExistErrorContext = {
  operation: string;
  path: FilePath;
};

export class FileDoesNotExistError extends BaseError {
  declare context: FileDoesNotExistErrorContext;
  declare code: "FILE_DOES_NOT_EXIST_ERROR";

  constructor(
    message: string,
    { context }: { context: FileDoesNotExistErrorContext }
  ) {
    super(message, { code: "FILE_ALREADY_EXISTS_ERROR", context });
  }
}
