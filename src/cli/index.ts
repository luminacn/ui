#!/usr/bin/env node
/// <reference types="node" />

import { commands } from "./commands/index.ts";
import { getPackageRoot } from "./utils/common.ts";

const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

async function main() {
  const targetPath = process.cwd();
  const packageRoot = getPackageRoot();

  const handler = commands[command];

  if (!handler) {
    console.log(`❌ Unknown command: ${command}\n`);
    console.log("Available commands:");
    Object.keys(commands).forEach((cmd) => {
      console.log(`  - ${cmd}`);
    });
    process.exit(1);
  }

  await handler(commandArgs, { targetPath, packageRoot });
}

main();
