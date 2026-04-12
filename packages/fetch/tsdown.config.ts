import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: "src/**/*.ts",
  unbundle: true,
});
