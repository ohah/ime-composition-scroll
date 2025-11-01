# API Reference

API documentation for the IME Composition Scroll library.

## Classes

### IMECompositionScroll

A utility class for handling scroll during IME composition events.

#### Constructor

```typescript
constructor(options?: IMECompositionScrollOptions)
```

#### Methods

##### setContainer

Sets the container element.

```typescript
setContainer(container: HTMLElement | null): void
```

##### setEnabled

Sets the enabled state.

```typescript
setEnabled(enabled: boolean): void
```

##### handleCompositionStart

Handles IME composition start event.

```typescript
handleCompositionStart(event: CompositionEvent): void
```

##### handleCompositionUpdate

Handles IME composition update event.

```typescript
handleCompositionUpdate(event: CompositionEvent): void
```

##### handleCompositionEnd

Handles IME composition end event.

```typescript
handleCompositionEnd(event: CompositionEvent): void
```

## Interfaces

### IMECompositionScrollOptions

```typescript
interface IMECompositionScrollOptions {
  container?: HTMLElement;
  enabled?: boolean;
}
```

## Functions

### createIMECompositionScroll

Creates an IME Composition Scroll instance.

```typescript
function createIMECompositionScroll(
  options?: IMECompositionScrollOptions
): IMECompositionScroll
```

