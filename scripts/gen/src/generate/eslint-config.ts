import { writeTextToDisk } from "@repo/core/fs/write-text-to-disk";
import { join } from "node:path";

import type { Runtime } from "@/types";

import { ESLINT_CONFIG_PACKAGE_NAME } from "@/constants";

function createEslintConfig({ runtime }: { runtime: Runtime }) {
  const eslintConfig = `
// @ts-check

import { ${runtime}Config } from "${ESLINT_CONFIG_PACKAGE_NAME}/${runtime}";

export default ${runtime}Config;  
`;

  return eslintConfig.trim();
}

export async function generateTsconfig({
  runtime,
  directoryPath,
}: {
  runtime: Runtime;
  directoryPath: string;
}) {
  const path = join(directoryPath, "tsconfig.json");
  const content = createEslintConfig({ runtime });

  const writeToDiskResult = await writeTextToDisk({
    text: content,
    path,
  });

  return writeToDiskResult;
}
