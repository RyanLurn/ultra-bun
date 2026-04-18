import { $ } from "bun";

export async function getFilePaths({ dir }: { dir: string }) {
  const gitLsFilesOutput = await $`git ls-files`.cwd(dir).text();
  return gitLsFilesOutput.trim().split("\n");
}
