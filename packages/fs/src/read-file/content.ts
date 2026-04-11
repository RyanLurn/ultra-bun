import type { FilePath } from "@/types";

export async function readFileContent({
  format = "text",
  path,
}: {
  format?: "text";
  path: FilePath;
}) {
  const file = Bun.file(path);
  const content = await file[format]();
  return content;
}
