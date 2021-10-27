#!/usr/bin/env node

import { build } from "esbuild";
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
  entryPoints: Files,
  outdir: "./static/scripts",
  target: "es2019",
  platform: "browser",
  watch: IsWatch,
  bundle: true,
  minify: false,
  sourcemap: false,
  tsconfig: "./tsconfig.json",
  logLevel: "debug",
});
