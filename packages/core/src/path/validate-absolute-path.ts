import { isAbsolute } from "node:path";

import { InvalidPathError } from "@/error/classes/invalid-path";

export function validateAbsolutePath({ path }: { path: string }) {
  try {
    const isAbsolutePath = isAbsolute(path);
    return isAbsolutePath;
  } catch (cause) {
    const error = new InvalidPathError({
      context: { operation: validateAbsolutePath.name, input: path },
      cause,
    });
  }
}
