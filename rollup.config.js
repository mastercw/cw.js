import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

// Read package.json
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default [
  {
    input: "src/index.ts",
    output: {
      name: "cw",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser()],
  },
  {
    input: "src/index.ts",
    external: ["cw"],
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
