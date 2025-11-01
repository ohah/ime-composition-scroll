# IME Composition Scroll

IME composition scroll 유틸리티 라이브러리입니다.

## 설치

```bash
npm install ime-composition-scroll
```

## 사용법

```typescript
import { createIMECompositionScroll } from 'ime-composition-scroll';

const scroll = createIMECompositionScroll({
  container: document.querySelector('.container'),
});
```

## 개발

```bash
# 의존성 설치
pnpm install

# 테스트 실행
pnpm test

# 빌드
pnpm build

# 문서 개발 서버 실행
pnpm docs:dev
```

## 라이선스

MIT

