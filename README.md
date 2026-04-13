# 🚀 luminacn/ui

[![npm version](https://img.shields.io/npm/v/luminacn)](https://www.npmjs.com/package/luminacn) [![npm downloads](https://img.shields.io/npm/dw/luminacn)](https://www.npmjs.com/package/luminacn) [![license](https://img.shields.io/npm/l/luminacn)](https://github.com/luminacn/ui/blob/main/LICENSE)

**Signal-first, headless UI primitives for Angular.**  
Build accessible, composable components — owned directly in your codebase.

> CLI-generated UI system for Angular 19+ and Tailwind CSS v4.

---

## ✨ Overview

`luminacn/ui` is a modern UI architecture for Angular that gives you **full ownership of your components**.

Instead of installing opaque dependencies, you generate components directly into your project — fully customizable, fully transparent, and fully yours.

### Core Ideas

- 🧠 **Primitives over components** — build from composable building blocks
- ⚡ **Signal-native** — designed for Angular Signals (zoneless-ready)
- 🧩 **Headless-first** — logic separated from styling
- 📦 **Locally owned** — components live in your source, not `node_modules`
- 🛠 **CLI-driven** — install, update, diff, and rollback with precision

---

## ⚡ Quick Start

### Initialize your project

```bash
npx luminacn@latest init
```

### Add components

```bash
npx luminacn add sheet navigation-menu input-otp
```

---

## 🧩 How it works

```text
CLI → Registry → Generator → Your Codebase
                     ↓
            Angular Signals UI
```

Every component is:

- generated into your repo
- fully editable
- version-tracked via CLI

No runtime lock-in. No hidden abstraction.

---

## 🛠 CLI

| Command    | Description                          |
| ---------- | ------------------------------------ |
| `init`     | Initialize luminacn in your project  |
| `add`      | Add components to your codebase      |
| `list`     | View available components            |
| `upgrade`  | Update components to latest versions |
| `rollback` | Revert to a previous state           |
| `diff`     | Compare local vs registry            |
| `doctor`   | Validate environment setup           |
| `remove`   | Remove components safely             |

---

## 🧱 Component Categories

### Navigation & Layout

Navigation Menu · Sheet · Accordion · Tabs · Tooltip · Dropdown · Context Menu · Pagination · Stepper

### Data Display

Data Table · Carousel · Infinite Scroll · Badge · Alert · Progress · Skeleton · Spinner

### Form Controls

Input · Input OTP · Textarea · Checkbox · Radio · Switch · Toggle · Toggle Group · Slider · FormField

### Overlays & Feedback

Dialog · Popover · Toast · Sheet · Tooltip

### Typography

Headings · Text · Lead · Kbd · Utilities

---

## 🧪 Example — Stepper

```html
<nav lmStepper [activeStep]="0" #stepper="lmStepper">
  <button lmStepperTrigger [index]="0">Profile</button>

  <button lmStepperTrigger [index]="1" [disabled]="profileInvalid()">
    Security
  </button>

  <section class="mt-4">
    @if (stepper.activeStep() === 0) {
    <profile-form />
    } @if (stepper.activeStep() === 1) {
    <security-settings />
    }
  </section>
</nav>
```

---

## 🧠 Philosophy

### 1. You own the code

Every component is generated into your project. No black boxes.

### 2. Headless by default

Logic is isolated from styling. Use your own design system freely.

### 3. Signal-native architecture

Built for Angular Signals and future zoneless Angular.

### 4. Zero dependency core

No runtime UI framework lock-in.

---

## 🆚 Why luminacn/ui?

| Feature               | luminacn/ui | Angular Material | CDK        |
| --------------------- | ----------- | ---------------- | ---------- |
| Source ownership      | ✅ Yes      | ❌ No            | ⚠️ Partial |
| Headless architecture | ✅ Yes      | ❌ No            | ⚠️ Partial |
| Signals-ready         | ✅ Yes      | ❌ No            | ❌ No      |
| Tailwind-first        | ✅ Yes      | ❌ No            | ❌ No      |
| CLI-driven updates    | ✅ Yes      | ❌ No            | ❌ No      |

---

## 🗺️ Roadmap

### Core Interactions

- Sheet (Drawer) ✅
- Navigation Menu ✅
- Input OTP ✅
- Combobox / Autocomplete ⏳
- Command Palette (Cmd+K) ⏳

### Data & Display

- Infinite Scroll ✅
- Data Table ⏳
- Carousel ⏳

### Forms

- Toggle Group ✅
- Calendar / Date Picker ⏳

### Layout

- Resizable Panels ⏳
- Pagination ⏳
- Context Menu ✅

---

## ⚡ Installation Philosophy

No lock-in. No runtime magic.

Everything is generated:

- You inspect it
- You modify it
- You ship it

---

## 📦 License

MIT

---

## 🔥 Final Note

`luminacn/ui` is built for developers who want:

> “Shadcn-style ownership — but for Angular.”
