import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/**/*.ts", "!src/try.ts"],
  unbundle: true,
});
