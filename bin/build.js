#!/usr/bin/env node
import { execSync } from "child_process";
import { cleanPreviousOutput } from "./_clean.js";

// for zola build cmd, we take arguments
// since, the base_url argument for zola changes depending upon the deployment URL
let args = process.argv.slice(2).join(" ");

console.log(`Current directory: ${process.cwd()}`);
console.log(execSync("zola --version").toString());

cleanPreviousOutput();

console.log("Starting a new clean build....\n");

// execute the following commands
// in the same order
let buildCmds = ["tsc", "sass --no-source-map --style=compressed src/sass:static/styles", `zola build ${args}`];

buildCmds.forEach((cmd) => {
  console.log(`-> Executing Command: ${cmd}\n`);
  let out = execSync(cmd).toString(); //execute the commands and store the output text
  console.log(out);
});

// A sample code for proving that child_process.exec which is async doesnt execute the commands in order
//
// let x = ["aaa", "bbb", "ccc", "ddd"];

// x.forEach(async (lol) => {
//   //console.log(lol);
//   let out = await exec(`echo ${lol}`);
//   console.log(out.kill);
// });

//    "build": "sass --no-source-map --style=compressed src/sass:static/styles && tsc && zola build",
