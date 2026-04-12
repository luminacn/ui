// commands/index.ts
import { init } from "./init.ts";
import { addComponent } from "./add.ts";
import { listComponents } from "./list.ts";
import { upgradeComponent } from "./upgrade.ts";
import { rollback } from "./rollback.ts";
import { doctor } from "./doctor.ts";
import { diff } from "./diff.ts";

export const commands: Record<
  string,
  (
    args: string[],
    ctx: { targetPath: string; packageRoot: string },
  ) => Promise<void> | void
> = {
  init: async () => {
    await init();
  },

  add: async (args, ctx) => {
    if (args.length === 0) {
      console.error("❌ Specify component(s)");
      process.exit(1);
    }

    for (const name of args) {
      console.log(`\n📦 Processing ${name}...\n`);
      await addComponent(name, ctx.targetPath);
    }
  },

  list: async () => {
    await listComponents();
  },

  diff: (args, ctx) => {
    diff(ctx.packageRoot, ctx.targetPath);
  },

  doctor: (args, ctx) => {
    doctor(ctx.packageRoot, ctx.targetPath);
  },

  upgrade: async (args, ctx) => {
    if (args.length === 0) {
      console.error("❌ Specify component(s)");
      process.exit(1);
    }

    for (const name of args) {
      console.log(`\n⬆ Upgrading ${name}...\n`);
      await upgradeComponent(name, ctx.targetPath);
    }
  },

  rollback: async (args, ctx) => {
    if (args.length === 0) {
      console.error("❌ Specify component(s)");
      process.exit(1);
    }

    for (const name of args) {
      console.log(`\n⏪ Rolling back ${name}...\n`);
      await rollback(name, ctx.targetPath);
    }
  },
};
