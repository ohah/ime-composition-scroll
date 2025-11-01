# Getting Started

Learn how to install and use the IME Composition Scroll library.

## Installation

```bash
npm install ime-composition-scroll
# or
pnpm add ime-composition-scroll
# or
yarn add ime-composition-scroll
```

## Basic Usage

```typescript
import { createIMECompositionScroll } from 'ime-composition-scroll';

// Basic usage
const scroll = createIMECompositionScroll({
  container: document.querySelector('.container'),
});

// Connect IME composition event handlers
const input = document.querySelector('input');
input?.addEventListener('compositionstart', (e) => {
  scroll.handleCompositionStart(e);
});
```

## Advanced Usage

```typescript
import { IMECompositionScroll } from 'ime-composition-scroll';

const scroll = new IMECompositionScroll({
  container: document.querySelector('.scroll-container'),
  enabled: true,
});

// Change container
scroll.setContainer(document.querySelector('.new-container'));

// Enable/Disable
scroll.setEnabled(false);
```

