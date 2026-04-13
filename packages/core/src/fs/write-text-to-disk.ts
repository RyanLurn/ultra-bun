import type { AbsolutePath } from "@/types/path";

export async function writeTextToDisk({
  text,
  path,
}: {
  text: string;
  path: AbsolutePath;
}) {
  const bytesWritten = await Bun.write(path, text);
  return bytesWritten;
}
