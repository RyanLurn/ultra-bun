import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  dts: {
    sourcemap: true,
  },
  unbundle: true,
});
