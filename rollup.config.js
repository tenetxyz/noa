import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

import { defineConfig } from "rollup"

export default defineConfig({
    input: "./src/index.js",
    // treeshake: true,
    output: {
        file: "dist/index.js",
        sourcemap: true,
    },
    plugins: [nodeResolve()],
})
