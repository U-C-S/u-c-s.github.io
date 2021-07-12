import { execSync } from "child_process";

export function cleanPreviousOutput() {
  console.log("Clearing the previous build output for a new clean build....\n");

  //clear the contents of following array of directories
  let outdir = ["public", "static/styles", "static/scripts"];
  outdir.forEach((path) => {
    execSync(`rm -rf ${path}`);
  });
}
