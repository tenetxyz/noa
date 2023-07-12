
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import json from '@rollup/plugin-json';

import { defineConfig } from "rollup"

export default defineConfig({
  input: "./src/index.js",
  treeshake: true,
  output: {
    dir: "dist",
    sourcemap: true,
  },
  plugins: [nodeResolve(), typescript(), commonjs(), json()],
})