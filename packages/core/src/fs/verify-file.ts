import type { ExistentFile, ExistentPath } from "@/types/fs";
import type { Result } from "@/types/result";

import { NonExistentPathError } from "@/error/classes/non-existent-path";

export type VerifiedFileData = {
  file: ExistentFile;
  path: ExistentPath;
};

export async function verifyFile({
  path,
}: {
  path: string;
}): Promise<Result<VerifiedFileData, NonExistentPathError>> {
  const file = Bun.file(path);

  if (await file.exists()) {
    return {
      success: true,
      data: {
        file: file as ExistentFile,
        path: path as ExistentPath,
      },
    };
  }

  return {
    success: false,
    error: new NonExistentPathError({ path }),
  };
}
