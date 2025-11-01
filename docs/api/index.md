# API 레퍼런스

IME Composition Scroll 라이브러리의 API 문서입니다.

## 클래스

### IMECompositionScroll

IME composition 이벤트 중 스크롤을 처리하는 유틸리티 클래스입니다.

#### 생성자

```typescript
constructor(options?: IMECompositionScrollOptions)
```

#### 메서드

##### setContainer

컨테이너 요소를 설정합니다.

```typescript
setContainer(container: HTMLElement | null): void
```

##### setEnabled

활성화 상태를 설정합니다.

```typescript
setEnabled(enabled: boolean): void
```

##### handleCompositionStart

IME composition start 이벤트를 처리합니다.

```typescript
handleCompositionStart(event: CompositionEvent): void
```

##### handleCompositionUpdate

IME composition update 이벤트를 처리합니다.

```typescript
handleCompositionUpdate(event: CompositionEvent): void
```

##### handleCompositionEnd

IME composition end 이벤트를 처리합니다.

```typescript
handleCompositionEnd(event: CompositionEvent): void
```

## 인터페이스

### IMECompositionScrollOptions

```typescript
interface IMECompositionScrollOptions {
  container?: HTMLElement;
  enabled?: boolean;
}
```

## 함수

### createIMECompositionScroll

IME Composition Scroll 인스턴스를 생성합니다.

```typescript
function createIMECompositionScroll(
  options?: IMECompositionScrollOptions
): IMECompositionScroll
```

