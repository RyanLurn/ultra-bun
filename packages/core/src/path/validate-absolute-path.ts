import { isAbsolute } from "node:path";

export function validateAbsolutePath({ path }: { path: string }) {
  const isAbsolutePath = isAbsolute(path);
  return isAbsolutePath;
}
