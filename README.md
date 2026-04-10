# 🚀 luminacn/ui

### Headless & Signal-based UI for Angular

**Copy-paste UI for Angular.**
Beautiful, accessible, and high-performance components built for **Angular 19+** and **Tailwind CSS v4**.

[![npm version](https://img.shields.io/npm/v/luminacn)](https://www.npmjs.com/package/luminacn) [![npm downloads](https://img.shields.io/npm/dw/luminacn)](https://www.npmjs.com/package/luminacn) [![bundle size](https://img.shields.io/bundlephobia/minzip/luminacn?label=core%20size)](https://bundlephobia.com/package/luminacn) [![license](https://img.shields.io/npm/l/luminacn)](https://github.com/luminacn/ui/blob/main/LICENSE)

---

## ✨ Features

- **Signals Everywhere** – Built with `input()`, `computed()`, and `model()` for maximum performance
- **Zoneless Ready** – Designed for Angular’s zoneless future
- **Headless Directives** – Enhance native elements without extra DOM
- **Smart Coordination** – Form fields, labels, and messages work together automatically
- **Tailwind CSS v4** – Fully aligned with the latest utility-first workflow

---

## 🛠️ Quick Start

```bash
# Initialize your project
npx luminacn init

# Add a component
npx luminacn add button
```

---

## 🎨 Components (v2 – Atoms)

**Forms**:
Input · Textarea · Checkbox · Switch · Radio · Slider · FormField

**Layout**:
Card · AspectRatio · Separator · ScrollArea · Collapsible

**Typography**:
H1–H5 · P · Lead · Muted · Inline Code · Kbd

**Feedback**:
Badge · Alert · Progress · Skeleton · Spinner

**Navigation**:
Button · Avatar · Breadcrumb · ToggleGroup

---

## 🧩 Usage Example

```html
<section lmCard class="w-[350px]">
  <header lmCardHeader>
    <h3 lmCardTitle>Account Settings</h3>
    <p lmMuted>Update your profile and preferences.</p>
  </header>

  <div lmCardContent class="grid gap-4">
    <!-- Smart Form Field Coordination -->
    <lm-form-field>
      <label lmLabel lmRequired>Username</label>
      <input lmInput placeholder="johndoe" [formControl]="userCtrl" />
      <p lmFormDescription>This is your public display name.</p>
      <lm-form-message />
    </lm-form-field>

    <div lmSeparator></div>

    <!-- Closable Alert -->
    <div lmAlert="warning" #myAlert="lmAlert">
      <lucide-icon name="alert-triangle" class="h-4 w-4" />
      <h5 lmAlertTitle>Pro Tip</h5>
      <div lmAlertDescription>Use Signals for better performance.</div>
      <button
        lmButton
        variant="plain"
        size="fit"
        (click)="myAlert.close()"
        class="absolute right-2 top-2"
      >
        <lucide-icon name="x" class="h-4 w-4" />
      </button>
    </div>
  </div>

  <footer lmCardFooter>
    <button lmButton class="w-full" [loading]="isSaving">Save Changes</button>
  </footer>
</section>
```

---

## ⚡ Philosophy

- **Zero Dependency Core** – Most components require no external packages
- **Headless First** – Logic in directives, styling in Tailwind
- **You Own the Code** – No hidden abstractions or runtime lock-in

---

## 🔮 Roadmap

- **Phase 3 (Overlays)**
  Angular CDK-powered Dialogs, Popovers, Tooltips, Accordions

- **Phase 4 (Advanced)**
  Command Palette (Cmd+K), Sonner-style Toasts, Signal-based theming

---

## 💡 Positioning

Inspired by shadcn/ui — built for the **Signal era of Angular**.

Generate, customize, and own your UI. No compromises.
