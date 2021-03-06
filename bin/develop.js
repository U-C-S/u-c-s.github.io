#!/usr/bin/env node
import concurrently from "concurrently";
import { cleanPreviousOutput } from "./_clean.js";

cleanPreviousOutput();

console.log("Getting the tools ready for local development...");
let developCmds = [
  { command: "tsc --watch --preserveWatchOutput", name: "tsc", prefixColor: "blue" },
  { command: "sass --watch --no-source-map src/sass:static/styles", name: "sass", prefixColor: "magenta" },
  { command: "sleep 4 && zola serve --port 7321 --open", name: "zola", prefixColor: "white" },
];

//docs for concurrently package: https://github.com/kimmobrunfeldt/concurrently
//this pkg allows for parallel command execution...
concurrently(developCmds);
