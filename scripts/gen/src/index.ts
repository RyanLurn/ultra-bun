#!/usr/bin/env bun

import { parseArgs } from "util";

import { DEFAULT_PACKAGE_RUNTIME } from "@/constants";
import { CommandArgsSchema } from "@/commands/schema";
import { generatePackage } from "@/commands/package";

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    name: {
      type: "string",
      short: "n",
    },
    runtime: {
      type: "string",
      short: "r",
      default: DEFAULT_PACKAGE_RUNTIME,
    },
  },
  strict: true,
  allowPositionals: true,
});

const validArgs = CommandArgsSchema.parse({
  command: positionals[0],
  ...values,
});

switch (validArgs.command) {
  case "package": {
    const generatePackageResult = await generatePackage({ ...validArgs });
    if (generatePackageResult.success === false) {
      console.error(generatePackageResult.error);
    } else {
      console.log(`@repo/${validArgs.name} package generated successfully!`);
    }
    break;
  }
  default: {
    console.error("Unsupported command.");
  }
}
