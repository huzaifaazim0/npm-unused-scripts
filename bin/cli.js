#!/usr/bin/env node

const minimist = require("minimist");
const findUnusedScripts = require("../lib/findUnused");

const args = minimist(process.argv.slice(2), {
  boolean: ["dry", "remove"],
  alias: { d: "dry", r: "remove", p: "path" },
  default: { path: "package.json" }
});

findUnusedScripts({
  pathToPkg: args.path,
  dry: args.dry,
  remove: args.remove
}).catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
