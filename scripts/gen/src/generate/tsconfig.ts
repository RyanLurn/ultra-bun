import type { Runtime } from "@/types";

import { TYPESCRIPT_CONFIG_PACKAGE_NAME } from "@/constants";

function createTsconfig({ runtime }: { runtime: Runtime }) {
  const tsconfig = {
    extends: `${TYPESCRIPT_CONFIG_PACKAGE_NAME}/src/runtime/${runtime}.json`,
    compilerOptions: {
      paths: {
        "@/*": ["./src/*"],
      },
    },
    include: ["src/**/*", "eslint.config.js", "tsdown.config.ts"],
  };

  return JSON.stringify(tsconfig, null, 2);
}
