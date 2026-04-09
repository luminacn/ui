# 🚀 luminacn/ui

**Copy-paste UI for Angular**
Beautiful, accessible components you actually own. Built for **Angular 19+** and **Tailwind CSS v4**.

[![npm version](https://img.shields.io/npm/v/luminacn)](https://www.npmjs.com/package/luminacn) [![license](https://img.shields.io/npm/l/luminacn)](https://github.com/luminacn/ui/blob/main/LICENSE)

---

## ✨ Features

- **Full Control** – Generate code directly into your project and modify freely
- **Tailwind CSS v4** – Utility-first, `@theme` tokens, OKLCH colors
- **Zero Bloat** – Only include the components you actually use
- **Angular-first** – Directives and primitives, no heavy abstractions

---

## 🛠️ Quick Start

```bash
# Initialize your Angular project for luminacn/ui
npx luminacn init

# Add a component
npx luminacn add button
```

- **`init`** – Detects Angular project, installs Tailwind, sets up utilities
- **`add <component>`** – Generates the component directly in your project

---

## 🎨 Components

Layout: Card · Separator · Skeleton
Forms: Button · Input · Checkbox · Switch · Radio Group
Display: Badge · Label

## Usage Example

```html
<lumina-card class="w-[350px]">
  <lumina-card-header>
    <lumina-card-title>Account Settings</lumina-card-title>
    <lumina-card-description
      >Update your profile and preferences.</lumina-card-description
    >
  </lumina-card-header>

  <lumina-card-content class="grid gap-4">
    <!-- Input Directive -->
    <div class="grid gap-2">
      <label luminaLabel>Username</label>
      <input luminaInput placeholder="johndoe" />
    </div>

    <!-- Checkbox Component -->
    <div class="flex items-center gap-2">
      <lumina-checkbox id="notifications" [(ngModel)]="emailNotify" />
      <label for="notifications" class="text-sm"
        >Enable email notifications</label
      >
    </div>

    <!-- Separator Component -->
    <lumina-separator />

    <!-- Skeleton (Loading State) -->
    @if (isSyncing) {
    <div class="flex items-center gap-2">
      <lumina-skeleton class="h-4 w-4 rounded-full" />
      <lumina-skeleton class="h-4 w-[100px]" />
    </div>
    }
  </lumina-card-content>

  <lumina-card-footer>
    <button luminaButton class="w-full">Save Changes</button>
  </lumina-card-footer>
</lumina-card>
```

---

## ⚡ Philosophy

- **Copy, Don’t Install** – No abstractions or hidden layers
- **Directives Over Components** – Enhance native elements cleanly
- **Tailwind as Design Engine** – No custom styling system
- **Build Only What You Need** – Minimal bundle size

---

## ⚔️ Comparison

| Feature        | luminacn/ui             | Angular Material      | PrimeNG               |
| -------------- | ----------------------- | --------------------- | --------------------- |
| Installation   | CLI (code generation)   | npm install           | npm install           |
| Code Ownership | ✅ Full                 | ❌ Library-controlled | ❌ Library-controlled |
| Bundle Size    | ✅ Minimal              | ❌ Large              | ❌ Large              |
| Styling        | Tailwind CSS v4         | Material Design       | Custom themes         |
| Customization  | ✅ Unlimited            | ⚠️ Limited            | ⚠️ Moderate           |
| Architecture   | Directives + primitives | Components            | Components            |

---

## 🔮 Roadmap

- v1.0 (Core) – Standardize Directives & Components, Signals-based state, and Full CVA (Control Value Accessor) support for all form elements.
- v2.0 (Overlays) – Implement Angular CDK for accessible Dialogs, Popovers, Tooltips, and Select menus with smart positioning.
- v3.0 (Advanced) – High-performance Data Table with sorting/filtering, Signal-based Theming System, and Accessible Date Pickers.

---

## 📂 Project Structure

```text
src/
 ├── app/
 │   ├── lib/
 │   └── components/ui/
 └── styles.css
```

---

## 💡 Positioning

> Copy-paste UI for Angular. Inspired by **shadcn/ui**.
> Generate, customize, and own your UI—no compromises.
