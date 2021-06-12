#!/usr/bin/env node
import { exec, execSync } from "child_process";

console.log(`Current directory: ${process.cwd()}`);

let outdir = ["public", "static/styles", "static/scripts"];
outdir.forEach((path) => {
  execSync(`rm -rf ${path}`);
});

console.log("Cleared the previous build output for a new clean build....");

let buildCmds = ["tsc", "sass --no-source-map --style=compressed src/sass:static/styles", "zola build"];
buildCmds.forEach((cmd) => {
  console.log(`Executing Command: ${cmd}`);
  let out = execSync(cmd);
  console.log(out.toString());
});

// let x = ["aaa", "bbb", "ccc", "ddd"];

// x.forEach(async (lol) => {
//   //console.log(lol);
//   let out = await exec(`echo ${lol}`);
//   console.log(out.kill);
// });

//    "build": "sass --no-source-map --style=compressed src/sass:static/styles && tsc && zola build",
