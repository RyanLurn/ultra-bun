import { BaseError } from "@/error/classes/base";

type NonExistentPathContext = {
  path: string;
};

export class NonExistentPathError extends BaseError<
  "NON_EXISTENT_PATH_ERROR",
  NonExistentPathContext,
  null
> {
  constructor({ message, path }: { message?: string; path: string }) {
    super({
      name: "NonExistentPathError",
      message: message ?? `Path does not exist: ${path}`,
      code: "NON_EXISTENT_PATH_ERROR",
      context: {
        path,
      },
      cause: null,
    });
  }
}
