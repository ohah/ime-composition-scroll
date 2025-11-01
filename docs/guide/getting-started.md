# 시작하기

IME Composition Scroll 라이브러리를 설치하고 사용하는 방법을 알아봅니다.

## 설치

```bash
npm install ime-composition-scroll
# 또는
pnpm add ime-composition-scroll
# 또는
yarn add ime-composition-scroll
```

## 기본 사용법

```typescript
import { createIMECompositionScroll } from 'ime-composition-scroll';

// 기본 사용
const scroll = createIMECompositionScroll({
  container: document.querySelector('.container'),
});

// IME composition 이벤트 핸들러 연결
const input = document.querySelector('input');
input?.addEventListener('compositionstart', (e) => {
  scroll.handleCompositionStart(e);
});
```

## 고급 사용법

```typescript
import { IMECompositionScroll } from 'ime-composition-scroll';

const scroll = new IMECompositionScroll({
  container: document.querySelector('.scroll-container'),
  enabled: true,
});

// 컨테이너 변경
scroll.setContainer(document.querySelector('.new-container'));

// 활성화/비활성화
scroll.setEnabled(false);
```

