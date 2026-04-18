import { parse } from "path";
import { Glob } from "bun";

import { formatOutput } from "@/utils/format-output";

const ignoredBases = ["routeTree.gen.ts"];
const ignoredExts = [".lock", ".svg"];

const migrationMetadataGlob = new Glob("**/migrations/meta/*.json");

export async function processFile({ path }: { path: string }) {
  const parsedPath = parse(path);
  const ext = parsedPath.ext;

  let content: string;
  if (
    ignoredExts.includes(ext) ||
    ignoredBases.includes(parsedPath.base) ||
    migrationMetadataGlob.match(path)
  ) {
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
