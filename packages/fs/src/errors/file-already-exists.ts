import { BaseError } from "@repo/core/error/classes/base";

import type { FilePath } from "@/types";

type FileAlreadyExistsErrorContext = {
  operation: string;
  path: FilePath;
};

export class FileAlreadyExistsError extends BaseError {
  declare context: FileAlreadyExistsErrorContext;
  declare code: "FILE_ALREADY_EXISTS_ERROR";

  constructor(
    message: string,
    { context }: { context: FileAlreadyExistsErrorContext }
  ) {
    super(message, { code: "FILE_ALREADY_EXISTS_ERROR", context });
  }
}
