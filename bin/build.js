#!/usr/bin/env node
import { execSync } from "child_process";
import { cleanPreviousOutput } from "./_clean.js";

let args = process.argv.slice(2).join(" ");

console.log(`Current directory: ${process.cwd()}`);

cleanPreviousOutput();

console.log("Starting a new clean build....\n");

let zolaCmd = `zola build ${args}`;
let buildCmds = ["tsc", "sass --no-source-map --style=compressed src/sass:static/styles", zolaCmd];
buildCmds.forEach((cmd) => {
  console.log(`-> Executing Command: ${cmd}\n`);
  let out = execSync(cmd).toString();
  if (out) {
    console.log(out);
  }
});

// let x = ["aaa", "bbb", "ccc", "ddd"];

// x.forEach(async (lol) => {
//   //console.log(lol);
//   let out = await exec(`echo ${lol}`);
//   console.log(out.kill);
// });

//    "build": "sass --no-source-map --style=compressed src/sass:static/styles && tsc && zola build",
