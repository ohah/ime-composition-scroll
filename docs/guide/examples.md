# 사용 예제

IME Composition Scroll 라이브러리의 다양한 사용 예제를 살펴봅니다.

## React 예제

```tsx
import { useEffect, useRef } from 'react';
import { createIMECompositionScroll, IMECompositionScroll } from 'ime-composition-scroll';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<IMECompositionScroll | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      scrollRef.current = createIMECompositionScroll({
        container: containerRef.current,
      });

      const handleCompositionStart = (e: CompositionEvent) => {
        scrollRef.current?.handleCompositionStart(e);
      };

      const input = containerRef.current.querySelector('input');
      input?.addEventListener('compositionstart', handleCompositionStart);

      return () => {
        input?.removeEventListener('compositionstart', handleCompositionStart);
      };
    }
  }, []);

  return (
    <div ref={containerRef}>
      <input type="text" />
    </div>
  );
}
```

## Vanilla JavaScript 예제

```javascript
import { createIMECompositionScroll } from 'ime-composition-scroll';

const container = document.querySelector('.container');
const scroll = createIMECompositionScroll({ container });

const input = document.querySelector('input');

input.addEventListener('compositionstart', (e) => {
  scroll.handleCompositionStart(e);
});

input.addEventListener('compositionupdate', (e) => {
  scroll.handleCompositionUpdate(e);
});

input.addEventListener('compositionend', (e) => {
  scroll.handleCompositionEnd(e);
});
```

