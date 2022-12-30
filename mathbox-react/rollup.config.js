import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        include: "./src/**/*",
        exclude: ["**/*.stories.*", "**/*.spec.*", "src/stories/*"],
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "build/esm/index.d.ts",
    output: [{ file: "build/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
