#!/usr/bin/env bun

import { isCancel, select, cancel, intro, text, log } from "@clack/prompts";

import { preflightCheck } from "@/utils/preflight-check";
import { DEFAULT_SCOPE } from "@/constants";

intro("Code generation script initiated.");

// Preflight checks
log.info("Running preflight checks...");
const preflightCheckResult = await preflightCheck();

if (preflightCheckResult.success === false) {
  log.error(preflightCheckResult.error.message);
  process.exit(1);
}

log.success("Preflight checks completed. No problems found.");
const { lockfile } = preflightCheckResult.data;

const rootWorkspaceName = lockfile.workspaces[""].name;

// Begin main process
log.info("Begin code generation process.");

// Get package's name
const name = await text({
  message: "Enter the package's name:",
  validate: (value) => {
    if (typeof value === "string" && value.length > 0) {
      return undefined;
    }
    return "Package's name cannot be empty";
  },
});

if (isCancel(name)) {
  cancel("Operation cancelled");
  process.exit(0);
}

// Get package's scope
let scope: string | null = DEFAULT_SCOPE;

const scopeOption = await select({
  message: "Choose how to name the package's scope:",
  options: [
    {
      value: "DEFAULT",
      label: "Use default",
      hint: `@${DEFAULT_SCOPE}/${name}`,
    },
    {
      value: "ROOT",
      label: "Use root workspace's name",
      hint: `@${rootWorkspaceName}/${name}`,
    },
    {
      value: "NONE",
      label: "Don't add scope",
      hint: name,
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
      message: `Enter the package's scope (Don't put "@" at the start or "/" at the end):`,
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

// Get package type
const type = await select({
  message: "Choose a package type:",
  options: [
    { label: "Library", hint: `packages/${name}`, value: "LIBRARY" },
    { label: "Script", hint: `scripts/${name}`, value: "SCRIPT" },
    { label: "Web app", hint: `apps/${name}`, value: "WEB" },
    { label: "API server", hint: `apps/${name}`, value: "API" },
  ],
});

if (isCancel(type)) {
  console.log("Operation cancelled");
  process.exit(0);
}

let packageDirectory: string;
switch (type) {
  case "LIBRARY": {
    packageDirectory = "packages";
    break;
  }
  case "SCRIPT": {
    packageDirectory = "scripts";
    break;
  }
  case "API": {
    packageDirectory = "apps";
    break;
  }
  case "WEB": {
    packageDirectory = "apps";
    break;
  }
}

// Library branch
if (type === "LIBRARY") {
  // Get the package's runtime
  const runtime = await select({
    message: "Choose the package's runtime",
    options: [
      { label: "Bun", value: "BUN" },
      { label: "Browser", value: "BROWSER" },
      { label: "Both", value: "ISOMORPHIC" },
    ],
  });

  if (isCancel(runtime)) {
    console.log("Operation cancelled");
    process.exit(0);
  }
} else {
  console.warn("Not yet supported package type");
}

console.log(
  `${scope ? `@${scope}/${name}` : `${name}`} will be created at ${`${packageDirectory}/${name}`}`
);
