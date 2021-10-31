#!/usr/bin/env node

import { build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import { readdirSync } from "fs";

var IsWatch = process.argv.at(2) === "--watch";

// get array of files loacted in the "./src/typescript" directory
const rawfiles = readdirSync("./src/typescript", { withFileTypes: true });
// All the files in the root of "./src/typescript" dir
// are considered as main files
let Files = [];

rawfiles.forEach((i) => {
  if (i.isFile()) {
    Files.push("./src/typescript/" + i.name);
  }
});

build({
  platform: "browser",
  entryPoints: Files,
  format: "esm",
  outdir: "./static/scripts",
  target: "es2019",
  watch: IsWatch,
  bundle: true,
  minify: !IsWatch,
  sourcemap: false,
  tsconfig: "./tsconfig.json",
  logLevel: "info",
  plugins: [solidPlugin()],
});
