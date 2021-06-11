#!/usr/bin/env node
import { exec, execSync } from "child_process";
import { access, accessSync } from "fs";

console.log(`Current directory: ${process.cwd()}`);

async function ClearPrevBuildFiles() {
  console.log("meow");
  let outdir = ["public", "static/styles", "static/scripts"];
  outdir.forEach((path) => {
    access(path, (err) => {
      if (!err) {
        exec(`rm -rf ${path}`);
        console.log("something is worong");
      }
    });
  });
  console.log("Cleared the previous build output for a new clean build....");
}

let buildCmds = ["sass --no-source-map --style=compressed src/sass:static/styles", "tsc", "zola build"];

await ClearPrevBuildFiles().then(() => {
  buildCmds.forEach((cmd) => {
    console.log(`Executing Command: ${cmd}`);
    exec(cmd, (err, out) => {
      if (err) {
        console.error(`Build Failed: ${err}`);
        process.exit();
      }
      console.log(out);
    });
  });
});
