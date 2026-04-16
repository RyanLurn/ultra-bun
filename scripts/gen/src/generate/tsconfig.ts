import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { Runtime } from "@/types";

import { TYPESCRIPT_CONFIG_PACKAGE_NAME } from "@/constants";

function createTsconfig({ runtime }: { runtime: Runtime }) {
  const tsconfig = {
    extends: `${TYPESCRIPT_CONFIG_PACKAGE_NAME}/src/runtime/${runtime}.json`,
    compilerOptions: {
      paths: {
        "@/*": ["./src/*"],
      },
    },
    include: ["src/**/*", "eslint.config.js", "tsdown.config.ts"],
  };

  return JSON.stringify(tsconfig, null, 2);
}

export async function generateTsconfig({
  runtime,
  directoryPath,
}: {
  runtime: Runtime;
  directoryPath: string;
}) {
  const path = join(directoryPath, "tsconfig.json");
  const content = createTsconfig({ runtime });

  const writeToDiskResult = await writeTextToDisk({
    text: content,
    path,
  });

  return writeToDiskResult;
}
