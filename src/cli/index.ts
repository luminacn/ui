#!/usr/bin/env node
/// <reference types="node" />
import { init } from "./commands/init.ts";
import { addComponent, getPackageRoot } from "./commands/add.ts";
import { listComponents } from "./commands/list.ts";
import { upgradeComponent } from "./commands/upgrade.ts";
import { doctor } from "./commands/doctor.ts";
import { diff } from "./commands/diff.ts";

const args = process.argv.slice(2);
const packageRoot = getPackageRoot();
const command = args[0];

async function main() {
  if (command === "init") {
    init();
  } else if (command === "add") {
    const components = args.slice(1);

    if (components.length === 0) {
      console.error(
        "❌ Please specify at least one component, e.g., `npx luminacn add button sheet`",
      );
      process.exit(1);
    }

    const targetPath = process.cwd();

    for (const componentName of components) {
      console.log(`\n📦 Processing ${componentName}...\n`);
      await addComponent(componentName, targetPath);
    }
  } else if (command === "list") {
    listComponents();
  } else if (command === "diff") {
    diff(packageRoot, process.cwd());
  } else if (command === "upgrade") {
    const components = args.slice(1);

    if (components.length === 0) {
      console.error(
        "❌ Please specify a component, e.g., `npx luminacn upgrade button`",
      );
      process.exit(1);
    }

    const targetPath = process.cwd();

    for (const componentName of components) {
      console.log(`\n⬆ Upgrading ${componentName}...\n`);
      await upgradeComponent(componentName, targetPath);
    }
  } else if (command === "doctor") {
    doctor(packageRoot, process.cwd());
  } else {
    console.log("❌ Unknown command:", command);
    console.log("Available commands: init, add <component>, list");
  }
}

main();
