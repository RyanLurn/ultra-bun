import { parse } from "path";
import { Glob } from "bun";

import { formatOutput } from "@/utils/format-output";

const ignoredBases = ["routeTree.gen.ts"];
const ignoredExts = [".lock", ".svg"];

const migrationMetadataGlob = new Glob("**/migrations/meta/*.json");

export async function processFile({
  path,
  ignorePatterns = [],
}: {
  path: string;
  ignorePatterns?: Glob[];
}) {
  const parsedPath = parse(path);
  const ext = parsedPath.ext;

  let isIgnored = false;

  for (const pattern of ignorePatterns) {
    if (pattern.match(path)) {
      isIgnored = true;
      break;
    }
  }

  if (isIgnored === false) {
    if (
      ignoredExts.includes(ext) ||
      ignoredBases.includes(parsedPath.base) ||
      migrationMetadataGlob.match(path)
    ) {
      isIgnored = true;
    }
  }

  let content: string;
  if (isIgnored) {
    content = "[SKIPPED]";
  } else {
    content = await Bun.file(path).text();
  }

  const formattedOutput = formatOutput({
    content,
    path,
    ext,
  });

  return formattedOutput;
}
