#!/usr/bin/env bun

import { readLockfile } from "@/utils/read-lockfile";

const readLockfileResult = await readLockfile();
if (readLockfileResult.success === false) {
  console.error(readLockfileResult.error);
  process.exit(1);
}
const lockfile = readLockfileResult.data;

console.log(
  `${lockfile.workspaces[""].name} is the name of the root workspace.`
);
