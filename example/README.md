# IME Composition Scroll - Example

이 예제 프로젝트는 `ime-composition-scroll` 라이브러리를 테스트하기 위한 React + React Router 애플리케이션입니다.

## 실행 방법

```bash
# 의존성 설치 (루트에서 실행)
pnpm install

# 개발 서버 실행
pnpm --filter ime-composition-scroll-example dev
```

또는 example 디렉토리에서 직접 실행:

```bash
cd example
pnpm install
pnpm dev
```

## 기능

### 라우터 페이지들:

- **홈 페이지** (`/`): 기본 Input, Textarea 필드
- **소개 페이지** (`/about`): 이름, 자기소개, ContentEditable 필드
- **연락처 페이지** (`/contact`): 이메일, 메시지, 동적 추가 필드
- **블로그 페이지** (`/blog`): 제목, 동적 포스트 리스트

### 테스트 시나리오:

1. **기본 입력 필드**: 각 페이지마다 다른 입력 필드 배치
2. **조건부 렌더링**: 페이지 내에서 동적으로 추가/제거되는 입력 필드
3. **라우터 이동**: 페이지 이동 시 DOM이 완전히 교체되는 경우 테스트
4. **동적 리스트**: 리스트에서 항목 추가/제거 시 입력 필드 변화

## 목적

리액트 라우터를 사용한 페이지 이동 시에도 MutationObserver가 동적으로 추가/제거되는 모든 입력 요소(textarea, input, contentEditable)의 blur 이벤트를 감지하는 기능을 테스트합니다.
