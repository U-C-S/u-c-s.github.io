#!/usr/bin/env node
import concurrently from "concurrently";

let developCmds = [
  { command: "sass --watch --no-source-map src/sass:static/styles", name: "sass", prefixColor: "magenta" },
  { command: "tsc --watch", name: "tsc", prefixColor: "blue" },
  { command: "sleep 3 && zola serve --port 7321", name: "zola", prefixColor: "white" },
];
concurrently(developCmds);
