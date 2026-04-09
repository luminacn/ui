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

Button · Input · Label · Card · Badge · Checkbox · Switch · Radio · Separator · Skeleton

```html
<lumina-card>
  <lumina-card-content>
    <input luminaInput />
    <button luminaButton>Submit</button>
  </lumina-card-content>
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

**v1** – Core components, CLI, Tailwind v4
**v2** – Dialog / Popover / Tooltip, Dropdown / Select, Toast
**v3** – Data table, Date picker, Theming system

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

---

This version is **perfect for npm**:

- Minimal, scannable for new users
- Includes badges, quick install, usage snippet
- Highlights features, philosophy, and comparison
- Shows components and project structure
- Roadmap included for clarity on future development
