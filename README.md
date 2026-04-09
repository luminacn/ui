## 🚀 Lumina UI

The shadcn/ui for Angular.
Beautiful, accessible, and themed components that you can actually own. Built for Angular 19+ and Tailwind CSS v4.

## ✨ Why Lumina?

Lumina is not a library you install as a dependency. It's a CLI that generates code directly into your project.

- Full Control: The code is yours. Edit the components however you like.
- Tailwind v4 Native: Leverages @theme inline and OKLCH colors for high-precision theming.
- Zero Bloat: Only add the components you actually need.

---

## 🛠️ Getting Started

## 1. Initialize your project

This command sets up Tailwind CSS v4, PostCSS, and your base theme (Zinc, Slate, etc.).

npx lumina init

Note: It will check for uncommitted git changes to protect your styles.css!

## 2. Add your first component

npx lumina add button

---

## 🎨 Component Gallery (V1)## Button

A pro-grade directive for buttons and links.

<button luminaButton variant="default" size="md">Click Me</button>
<button luminaButton variant="outline">Secondary Action</button>

## Input & Label

Native inputs and labels with built-in theme support and error states.

<div class="grid gap-1.5">
  <label luminaLabel for="email" [required]="true" [error]="isInvalid">Email</label>
  <lumina-input-group>
    <span class="absolute left-3 text-muted-foreground">@</span>
    <input luminaInput id="email" [hasStartIcon]="true" [error]="isInvalid">
  </lumina-input-group>
</div>

## Badge

Pill-shaped status indicators for tags and notifications.

<lumina-badge variant="default">Active</lumina-badge>
<lumina-badge variant="destructive" class="rounded-full">99+</lumina-badge>

## Card

The standard container for modern layouts.

<lumina-card>
  <lumina-card-header>
    <lumina-card-title>Login</lumina-card-title>
    <lumina-card-description>Enter your credentials to continue.</lumina-card-description>
  </lumina-card-header>
  <lumina-card-content>
    <!-- Your form here -->
  </lumina-card-content>
</lumina-card>

## Form Controls

Accessible primitives for complex logic.

- Checkbox: <lumina-checkbox [(ngModel)]="accepted"></lumina-checkbox>
- Switch: <lumina-switch [(ngModel)]="isDark"></lumina-switch>
- Radio: <lumina-radio-group><lumina-radio-item value="A"></lumina-radio-item></lumina-radio-group>

## Utilities

- Separator: <lumina-separator></lumina-separator> (Horizontal or Vertical)
- Skeleton: <lumina-skeleton class="h-12 w-12 rounded-full"></lumina-skeleton>

---

## ⌨️ CLI Commands

| Command    | Description                                     | Flags                   |
| ---------- | ----------------------------------------------- | ----------------------- |
| init       | Prepares Angular project for Lumina.            | --theme <name>, --force |
| add <name> | Injects a component into src/app/components/ui. | --all                   |

## 🧩 Structure

After running init, your project will have:

- src/app/lib/: Core utilities (cn.ts, cva.ts).
- src/app/components/ui/: Your generated components.
- src/styles.css: Fully configured Tailwind v4 theme.
