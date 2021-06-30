import { execSync } from "child_process";

export function cleanPreviousOutput() {
  console.log("Clearing the previous build output for a new clean build....\n");
  let outdir = ["public", "static/styles", "static/scripts"];
  outdir.forEach((path) => {
    execSync(`rm -rf ${path}`);
  });
}
