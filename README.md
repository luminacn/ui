## 🚀 luminacn/ui

### Headless & Signal-based UI for Angular — v2.0

**Copy-paste UI for Angular.**
Beautiful, accessible, and high-performance components built for **Angular 19+** and **Tailwind CSS v4**.

[![npm version](https://img.shields.io/npm/v/luminacn)](https://www.npmjs.com/package/luminacn) [![npm downloads](https://img.shields.io/npm/dw/luminacn)](https://www.npmjs.com/package/luminacn) [![bundle size](https://img.shields.io/bundlephobia/minzip/luminacn?label=core%20size)](https://bundlephobia.com/package/luminacn) [![license](https://img.shields.io/npm/l/luminacn)](https://github.com/luminacn/ui/blob/main/LICENSE)

---

## ✨ Features (v2)

- **Signals Everywhere** – Deep integration with `input()`, `computed()`, and `model()`.
- **Interactive Primitives** – Fully accessible overlays: Dialog, Popover, Tooltip, Dropdown.
- **Service-Driven Toasts** – Global notification system built for Angular 19.
- **Zoneless Native** – Designed for high-performance, zoneless applications.
- **Tailwind CSS v4** – Powered by the lightning-fast Oxide engine.

---

## 🛠️ Quick Start

```bash
# Initialize your project
npx luminacn@latest init

# Add v2 components
npx luminacn add stepper dialog toast
```

---

## 🎨 Components (v2 Registry)

### 🧩 Interactive

Stepper · Dialog · Popover · Accordion · Tabs · Tooltip · Dropdown Menu · Toast

### 📝 Forms

Input · Textarea · Checkbox · Switch · Radio · Slider · FormField · ToggleGroup

### 🧱 Layout

Card · AspectRatio · Separator · ScrollArea · Collapsible · Skeleton

### 💬 Feedback & Typography

Badge · Alert · Progress · Spinner · H1–H5 · Kbd · Lead

---

## 🧩 Usage Example — Stepper

```html
<nav lmStepper [activeStep]="0" #stepper="lmStepper">
  <button lmStepperTrigger [index]="0">
    <span>Profile</span>
  </button>

  <button lmStepperTrigger [index]="1" [disabled]="profileInvalid()">
    <span>Security</span>
  </button>

  <div class="mt-4">
    @if (stepper.activeStep() === 0) {
    <profile-form />
    } @if (stepper.activeStep() === 1) {
    <security-settings />
    }
  </div>
</nav>
```

---

## ⚡ Philosophy

- **Zero Dependency Core** – Built on Angular primitives, not heavy third-party libraries.
- **Headless First** – Logic in directives, styling with Tailwind CSS.
- **Full Ownership** – Code lives in your project. Customize everything.

---

## 🔮 Roadmap

### Phase 3 — Enterprise Data

- Data Tables (TanStack integration)
- Advanced Combobox
- Command Palette (Cmd + K)

### Phase 4 — Visuals

- Motion primitives
- Charting wrappers
- Dynamic theme switching
