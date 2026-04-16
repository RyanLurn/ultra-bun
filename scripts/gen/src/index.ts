#!/usr/bin/env bun

import {
  isCancel,
  select,
  cancel,
  intro,
  outro,
  text,
  log,
} from "@clack/prompts";
import { join } from "node:path";

import {
  PACKAGES_DIR_NAME,
  PACKAGES_DIR_PATH,
  SCRIPTS_DIR_NAME,
  SCRIPTS_DIR_PATH,
  APPS_DIR_NAME,
  APPS_DIR_PATH,
  DEFAULT_SCOPE,
} from "@/constants";
import { generateEslintconfig } from "@/generate/eslint-config";
import { generatePackageJson } from "@/generate/package-json";
import { preflightCheck } from "@/utils/preflight-check";
import { generateTsconfig } from "@/generate/tsconfig";

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
  cancel("Operation cancelled");
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
      cancel("Operation cancelled");
      process.exit(0);
    }

    scope = customScope;
  }
}

// Get package type
const type = await select({
  message: "Choose a package type:",
  options: [
    {
      label: "Library",
      hint: `${PACKAGES_DIR_NAME}/${name}`,
      value: "LIBRARY",
    },
    { label: "Script", hint: `${SCRIPTS_DIR_NAME}/${name}`, value: "SCRIPT" },
    { label: "Web app", hint: `${APPS_DIR_NAME}/${name}`, value: "WEB" },
    { label: "API server", hint: `${APPS_DIR_NAME}/${name}`, value: "API" },
  ],
});

if (isCancel(type)) {
  cancel("Operation cancelled");
  process.exit(0);
}

let directoryPath: string;
switch (type) {
  case "LIBRARY": {
    directoryPath = join(PACKAGES_DIR_PATH, name);
    break;
  }
  case "SCRIPT": {
    directoryPath = join(SCRIPTS_DIR_PATH, name);
    break;
  }
  case "API":
  case "WEB": {
    directoryPath = join(APPS_DIR_PATH, name);
    break;
  }
}

// Library branch
if (type === "LIBRARY") {
  // Get the package's runtime
  const runtime = await select({
    message: "Choose the package's runtime",
    options: [
      { label: "Bun", value: "bun" },
      { label: "Browser", value: "browser" },
      { label: "Both", value: "isomorphic" },
    ],
  });

  if (isCancel(runtime)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  log.info("Begin generating files...");

  // Generate package.json file
  const generatePackageJsonResult = await generatePackageJson({
    scope,
    name,
    directoryPath,
  });

  if (generatePackageJsonResult.success === false) {
    log.error(generatePackageJsonResult.error.message);
    cancel("Script failed. Exiting...");
    process.exit(1);
  }

  // Generate tsconfig.json file
  const generateTsconfigResult = await generateTsconfig({
    runtime,
    directoryPath,
  });

  if (generateTsconfigResult.success === false) {
    log.error(generateTsconfigResult.error.message);
    cancel("Script failed. Exiting...");
    process.exit(1);
  }

  // Generate eslint.config.js file
  const generateEslintconfigResult = await generateEslintconfig({
    runtime,
    directoryPath,
  });

  if (generateEslintconfigResult.success === false) {
    log.error(generateEslintconfigResult.error.message);
    cancel("Script failed. Exiting...");
    process.exit(1);
  }

  // Finish code file generation
  log.success("Files generation complete.");
} else {
  log.warn("Not yet supported package type");
}

outro(`${scope ? `@${scope}/${name}` : `${name}`} created at ${directoryPath}`);
process.exit(0);
