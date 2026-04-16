import type { Result } from "@repo/core/types/result";

import { BaseError } from "@repo/core/error/classes/base";

import type { RootPackageJson } from "@/schemas/package-json";
import type { Lockfile } from "@/schemas/lockfile";

import { readRootPackageJson } from "@/utils/read-root-package-json";
import { readLockfile } from "@/utils/read-lockfile";

export class MalformedCodebaseError extends BaseError<
  "MALFORMED_CODEBASE_ERROR",
  null,
  Error
> {
  constructor({ message, cause }: { message: string; cause: Error }) {
    super({
      name: "MalformedCodebaseError",
      message,
      code: "MALFORMED_CODEBASE_ERROR",
      context: null,
      cause,
    });
  }
}

export async function preflightCheck(): Promise<
  Result<
    {
      lockfile: Lockfile;
      rootPackageJson: RootPackageJson;
    },
    MalformedCodebaseError
  >
> {
  // Read lockfile
  const readLockfileResult = await readLockfile();

  if (readLockfileResult.success === false) {
    const readLockfileError = readLockfileResult.error;
    let message: string;

    switch (readLockfileError.code) {
      case "NON_EXISTENT_PATH_ERROR": {
        message = `Failed to find project's lockfile.\nPlease make sure that it exists at: ${readLockfileError.context.path}`;
        break;
      }
      case "VALIDATION_ERROR": {
        message = "The lockfile's content is malformed.";
        break;
      }
      case "UNEXPECTED_ERROR":
      case "UNKNOWN_ERROR": {
        message = readLockfileError.message;
        break;
      }
    }

    return {
      success: false,
      error: new MalformedCodebaseError({
        message,
        cause: readLockfileError,
      }),
    };
  }

  // Read root package.json
  const readRootPackageJsonResult = await readRootPackageJson();

  if (readRootPackageJsonResult.success === false) {
    const readRootPackageJsonError = readRootPackageJsonResult.error;
    let message: string;

    switch (readRootPackageJsonError.code) {
      case "NON_EXISTENT_PATH_ERROR": {
        message = `Failed to find workspace's root package.json file.\nPlease make sure that it exists at: ${readRootPackageJsonError.context.path}`;
        break;
      }
      case "INVALID_JSON_ERROR":
      case "VALIDATION_ERROR": {
        message = "The workspace's root package.json is malformed.";
        break;
      }
      case "UNEXPECTED_ERROR":
      case "UNKNOWN_ERROR": {
        message = readRootPackageJsonError.message;
        break;
      }
    }

    return {
      success: false,
      error: new MalformedCodebaseError({
        message,
        cause: readRootPackageJsonError,
      }),
    };
  }

  return {
    success: true,
    data: {
      lockfile: readLockfileResult.data,
      rootPackageJson: readRootPackageJsonResult.data,
    },
  };
}
