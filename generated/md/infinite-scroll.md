# Infinite-scroll

Loads more content as the user scrolls, enabling seamless data fetching.

---

## Installation

Run the following command in your terminal:

| Manager | Command |
| :--- | :--- |
| **npm** | `npx luminacn@latest add infinite-scroll` |
| **pnpm** | `pnpx luminacn@latest add infinite-scroll` |
| **yarn** | `yarn dlx luminacn@latest add infinite-scroll` |
| **bun** | `bunx luminacn@latest add infinite-scroll` |

---

## Usage

```tsx
import { Component } from "@angular/core";
import { LuminaInfiniteScrollDirective } from "../components/ui/infinite-scroll"

@Component({
  standalone: true,
  imports: [LuminaInfiniteScrollDirective],
  template: \`
    <div lmInfiniteScroll>
    </div>
  \`
})
export class DemoInfinite-scrollComponent {}
```

---

## Composition

This component follows a **composition pattern**, where you combine smaller primitives:

```text
Infinite-scroll
└── infinite-scroll.ts
```

---

---

## Required Context

- **LuminaInfiniteScrollDirective**: Must be used within a `[lmInfiniteScroll]` that provides `ElementRef`.

---

---

## Variants

_No variants defined_

---

## API Reference

Refer to the individual source files in your registry for full API details.
