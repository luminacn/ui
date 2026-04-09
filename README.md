## 🚀 luminacn/ui

**Copy-paste UI for Angular.**
Beautiful, accessible, and fully customizable components you actually own.
Built for **Angular 19+** and **Tailwind CSS v4**.

---

## ✨ Why luminacn/ui?

luminacn/ui is **not** a traditional component library.

Instead of installing a dependency, it provides a CLI that **generates code directly into your project**.

- **Full Control** – The code is yours. Modify it however you want.
- **Tailwind v4 Native** – Uses `@theme` and OKLCH colors for precise theming.
- **Zero Bloat** – Only generate the components you actually use.
- **Angular-first** – Built with directives and primitives, not heavy abstractions.

---

## 🧠 Philosophy

luminacn/ui is built on a simple idea: **you should own your UI.**

### 1. Copy, Don’t Install

Traditional UI libraries lock you into abstractions and update cycles.
luminacn/ui generates real code into your project—no hidden layers, no black boxes.

You don’t depend on it.
**It becomes part of your codebase.**

---

### 2. Directives Over Components

```html
<button luminaButton>Click</button> <input luminaInput />
```

- Enhance native elements
- Keep DOM clean and semantic
- Compose behavior instead of nesting abstractions

---

### 3. Tailwind as the Design Engine

- Utility-first
- `@theme` tokens
- OKLCH colors

No custom styling system. Just Tailwind.

---

### 4. Build Only What You Need

```bash
npx luminacn add button
```

---

### 5. Designed for Real Projects

- Design systems
- Enterprise apps
- Scalable frontends

---

### 6. Angular, Done Right

- Directives
- Standalone APIs
- Strong typing

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

## 🧱 Component Architecture

### Primitives

- `<lumina-card>`
- `<lumina-input-group>`

### Directives

- `luminaButton`
- `luminaInput`
- `luminaLabel`

### Utilities

```
src/app/lib/
```

- `cn.ts`
- `cva.ts`

---

### Example

```html
<lumina-card>
  <lumina-card-content>
    <input luminaInput />
    <button luminaButton>Submit</button>
  </lumina-card-content>
</lumina-card>
```

---

## 🛠️ Getting Started

```bash
npx luminacn init
```

```bash
npx luminacn add button
```

---

## 🎨 Components

Button · Input · Label · Card · Badge · Checkbox · Switch · Radio · Separator · Skeleton

---

## 🎯 Roadmap

### v1

- Core components
- CLI generator
- Tailwind v4

### v2

- Dialog / Popover / Tooltip
- Dropdown / Select
- Toast

### v3

- Data table
- Date picker
- Theming system

---

## 🧩 Project Structure

```
src/
 ├── app/
 │   ├── lib/
 │   └── components/ui/
 └── styles.css
```

---

## 🧰 CLI Experience (Design)

luminacn/ui is designed to feel **interactive, safe, and predictable**—just like shadcn.

### `init`

```bash
npx luminacn init
```

**What it does:**

- Detects Angular project
- Installs Tailwind CSS v4
- Configures `styles.css` with theme tokens
- Sets up `lib/` utilities
- Prompts for:
  - Base color (zinc, slate, etc.)
  - Prefix (optional)
  - Directory structure

**Example flow:**

```
✔ Detected Angular 19 project
✔ Tailwind CSS not found. Install? (yes)

? Choose a base color:
❯ Zinc
  Slate
  Neutral

? Component directory:
❯ src/app/components/ui

✔ Project initialized successfully.
```

---

### `add`

```bash
npx luminacn add button
```

**What it does:**

- Fetches component template
- Injects into your project
- Updates dependencies if needed

**Interactive mode:**

```
? Which components would you like to add?
❯ button
  input
  card

✔ Added button
✔ Updated imports
```

---

## 📚 Docs Structure (Planned)

To make luminacn/ui truly take off, a **docs site is essential**.

### Structure

```
/docs
 ├── getting-started
 │   ├── installation
 │   ├── tailwind-setup
 │   └── project-structure
 │
 ├── components
 │   ├── button
 │   ├── input
 │   ├── card
 │   └── ...
 │
 ├── fundamentals
 │   ├── theming
 │   ├── directives
 │   └── composition
 │
 ├── cli
 │   ├── init
 │   └── add
 │
 └── examples
     ├── forms
     ├── dashboards
     └── auth-pages
```

---

### Each Component Page Should Have

- Preview (live)
- Copy-paste code
- Variants
- Accessibility notes
- Usage patterns

---

### Tech Stack Suggestion

- **Next.js / VitePress / Astro**
- Tailwind CSS v4
- Embedded code blocks with copy button

---

### End Goal

A docs experience where users:

1. Browse a component
2. Copy the code
3. Paste into Angular
4. Done

---

## 💡 Positioning

> **Copy-paste UI for Angular. Inspired by shadcn/ui.**
