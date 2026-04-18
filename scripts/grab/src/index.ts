import { isCancel, cancel, select, log } from "@clack/prompts";
import { parse, join } from "node:path";

import { getWorkspaces } from "@/utils/get-workspaces";
import { getFilePaths } from "@/utils/get-file-paths";
import { processFile } from "@/utils/process-file";
import { OUT_DIR } from "@/constants";

const workspaces = await getWorkspaces();

const selectedWorkspace = await select({
  message: "Which workspace would you like to grab?",
  options: workspaces.map(({ name, path }) => ({
    value: path,
    label: name,
    hint: path,
  })),
});

if (isCancel(selectedWorkspace)) {
  cancel("Operation cancelled.");
  process.exit(0);
}

log.step("Getting files from Git...");
const filePaths = await getFilePaths({ dir: selectedWorkspace });

let outputContent = "";

log.step("Processing files...");
for (const path of filePaths) {
  const content = await processFile({ path });

  outputContent += content;
  outputContent += "\n";
}

const outputFile = `${parse(selectedWorkspace).name}.md`;
await Bun.write(join(OUT_DIR, `${outputFile}`), outputContent);

log.success(`Grabbed files and saved them in ${outputFile}`);
