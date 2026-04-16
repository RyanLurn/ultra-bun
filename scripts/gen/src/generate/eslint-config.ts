import type { Runtime } from "@/types";

import { ESLINT_CONFIG_PACKAGE_NAME } from "@/constants";

function createEslintConfig({ runtime }: { runtime: Runtime }) {
  const eslintConfig = `
// @ts-check

import { ${runtime}Config } from "${ESLINT_CONFIG_PACKAGE_NAME}/${runtime}";

export default ${runtime}Config;  
`;

  return eslintConfig.trim();
}
