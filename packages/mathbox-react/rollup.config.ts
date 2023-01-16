import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json" assert { type: "json" };

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
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        include: "./src/**/*",
        exclude: ["**/*.stories.*", "**/*.spec.*", "src/stories/*"],
      }),
      terser(),
    ],
    external: ["react", "mathbox", "three"],
  },
  {
    input: "build/esm/src/index.d.ts",
    output: [{
      file: "build/index.d.ts",
      format: "esm"
    }],
    plugins: [dts()],
  },
];
