import { BaseError } from "@/error/classes/base";

type NonExistentPathContext = {
  operation: string;
  arguments: {
    path: string;
  };
};

export class NonExistentPathError extends BaseError {
  declare code: "NON_EXISTENT_PATH_ERROR";
  declare context: NonExistentPathContext;

  constructor({
    message,
    context,
  }: {
    message?: string;
    context: NonExistentPathContext;
  }) {
    const errorMessage =
      message ?? `Path does not exist: ${context.arguments.path}`;

    super({ message: errorMessage, code: "NON_EXISTENT_PATH_ERROR", context });
  }
}
