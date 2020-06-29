import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "cw",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: "src/index.js",
    external: ["cw"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
