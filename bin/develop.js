#!/usr/bin/env node
import concurrently from "concurrently";

console.log("Getting the tools ready for local development...");
let developCmds = [
  { command: "tsc --watch --preserveWatchOutput", name: "tsc", prefixColor: "blue" },
  { command: "sass --watch --no-source-map src/sass:static/styles", name: "sass", prefixColor: "magenta" },
  { command: "sleep 4 && zola serve --port 7321", name: "zola", prefixColor: "white" },
];
concurrently(developCmds);
