#!/usr/bin/env node
/// <reference types="node" />
import { init } from "./commands/init.ts";
import { addComponent } from "./commands/add.ts";

const args = process.argv.slice(2); // all CLI args
const command = args[0];

if (command === "init") {
  init();
} else if (command === "add") {
  const componentName = args[1]; // e.g., "button" or "toggle"
  if (!componentName) {
    console.error(
      "❌ Please specify a component to add, e.g. `npx luminacn add button`",
    );
    process.exit(1);
  }

  const targetPath = process.cwd(); // the user's Angular project
  addComponent(componentName, targetPath);
} else {
  console.log("❌ Unknown command:", command);
  console.log("Available commands: init, add <component>");
}
