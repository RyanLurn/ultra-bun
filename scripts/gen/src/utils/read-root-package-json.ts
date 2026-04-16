import type { NonExistentPathError } from "@repo/core/error/classes/non-existent-path";
import type { InvalidJsonError } from "@repo/core/error/classes/invalid-json";
import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { ValidationError } from "@repo/core/error/classes/validation";
import { readTextFromFile } from "@repo/core/fs/read-text-from-file";
import { jsonParse } from "@repo/core/json/parse";
import { join } from "node:path";

import {
  RootPackageJsonSchema,
  type RootPackageJson,
} from "@/schemas/package-json";
import { ROOT_WORKSPACE_DIR } from "@/constants";

export async function readRootPackageJson(): Promise<
  Result<
    RootPackageJson,
    | ValidationError<"RootPackageJson">
    | NonExistentPathError
    | InvalidJsonError
    | FallBackError
  >
> {
  const rootPackageJsonPath = join(ROOT_WORKSPACE_DIR, "package.json");

  const readTextFromFileResult = await readTextFromFile({
    path: rootPackageJsonPath,
  });
  if (readTextFromFileResult.success === false) {
    return readTextFromFileResult;
  }

  const jsonParseResult = jsonParse({
    text: readTextFromFileResult.data,
  });
  if (jsonParseResult.success === false) {
    return jsonParseResult;
  }

  const validateRootPackageJsonResult = RootPackageJsonSchema.safeParse(
    jsonParseResult.data
  );

  if (validateRootPackageJsonResult.success === false) {
    return {
      success: false,
      error: new ValidationError({
        message: `Failed to validate root package.json's content at path: ${rootPackageJsonPath}`,
        context: {
          schema: "RootPackageJson",
          rootPackageJsonPath,
        },
        cause: validateRootPackageJsonResult.error,
      }),
    };
  }

  return {
    success: true,
    data: validateRootPackageJsonResult.data,
  };
}
