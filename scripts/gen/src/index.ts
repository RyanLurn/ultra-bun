#!/usr/bin/env bun

import { isCancel, select, text } from "@clack/prompts";

import { readLockfile } from "@/utils/read-lockfile";
import { DEFAULT_SCOPE } from "@/constants";

const readLockfileResult = await readLockfile();
if (readLockfileResult.success === false) {
  console.error(readLockfileResult.error);
  process.exit(1);
}
const lockfile = readLockfileResult.data;
const rootWorkspaceName = lockfile.workspaces[""].name;

// Get package's scope
let scope: string | null = DEFAULT_SCOPE;

const scopeOption = await select({
  message: "Choose how to name the package's scope:",
  options: [
    {
      value: "DEFAULT",
      label: "Use default",
      hint: `@${DEFAULT_SCOPE}/package-name`,
    },
    {
      value: "ROOT",
      label: "Use root workspace's name",
      hint: `@${rootWorkspaceName}/package-name`,
    },
    {
      value: "NONE",
      label: "Don't add scope to package's name",
      hint: "package-name",
    },
    {
      value: "CUSTOM",
      label: "Provide a custom scope",
    },
  ],
});

if (isCancel(scopeOption)) {
  console.log("Operation cancelled");
  process.exit(0);
}

switch (scopeOption) {
  case "DEFAULT": {
    break;
  }
  case "ROOT": {
    scope = rootWorkspaceName;
    break;
  }
  case "NONE": {
    scope = null;
    break;
  }
  case "CUSTOM": {
    const customScope = await text({
      message: `What is the package's scope? (Don't put "@" at the start or "/" at the end)`,
      validate: (value) => {
        if (typeof value === "string") {
          if (value.startsWith("@")) {
            return `Don't put "@" at the start`;
          }
          if (value.endsWith("/")) {
            return `Don't put "/" at the end`;
          }
          return undefined;
        }
        return "Package's scope cannot be empty";
      },
    });

    if (isCancel(customScope)) {
      console.log("Operation cancelled");
      process.exit(0);
    }

    scope = customScope;
  }
}

// Get package's name
const name = await text({
  message: "What is the package's name?",
  validate: (value) => {
    if (typeof value === "string" && value.length > 0) {
      return undefined;
    }
    return "Package's name cannot be empty";
  },
});

if (isCancel(name)) {
  console.log("Operation cancelled");
  process.exit(0);
}

console.log(`The package name is ${scope ? `@${scope}/${name}` : `${name}`}`);
