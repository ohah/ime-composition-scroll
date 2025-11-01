/**
 * IME Composition Scroll Library
 *
 * @packageDocumentation
 */

/**
 * 디버그 모드 활성화 여부
 * 환경 변수나 빌드 타임에 설정 가능
 */
const DEBUG = true;

/**
 * 윈도우 환경인지 확인하는 헬퍼 함수
 */
function isWindowsPlatform(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  // navigator.platform 또는 navigator.userAgent를 통해 윈도우 감지
  const platform = navigator.platform || "";
  const userAgent = navigator.userAgent || "";

  return (
    platform.includes("Win") ||
    userAgent.includes("Windows") ||
    platform.includes("Win32") ||
    platform.includes("Win64")
  );
}

/**
 * 입력 요소인지 확인하는 헬퍼 함수
 * input, textarea, contenteditable 요소를 감지
 */
function isInputElement(element: Element): boolean {
  const tagName = element.tagName.toLowerCase();

  // textarea 요소
  if (tagName === "textarea") {
    return true;
  }

  // input 요소 (type이 text이거나 type 속성이 없는 경우)
  if (tagName === "input") {
    const inputElement = element as HTMLInputElement;
    const type = inputElement.type?.toLowerCase();
    return !type || type === "text";
  }

  // contenteditable 요소
  if (element instanceof HTMLElement && element.contentEditable === "true") {
    return true;
  }

  return false;
}

export interface IMECompositionScrollOptions {
  /**
   * 스크롤 컨테이너 요소
   */
  container?: HTMLElement;

  /**
   * 스크롤 동작을 활성화할지 여부
   * @default true
   */
  enabled?: boolean;

  /**
   * 디버그 모드 활성화 여부 (상세한 콘솔 로그 출력)
   * @default false
   */
  debug?: boolean;

  /**
   * 플랫폼 체크를 무시하고 강제로 실행할지 여부 (테스트용)
   * @default false
   */
  forceEnable?: boolean;
}

/**
 * IME composition 이벤트 중 스크롤을 처리하는 유틸리티 클래스
 */
export class IMECompositionScroll {
  private container: HTMLElement | null = null;
  private enabled: boolean = true;
  private mutationObserver: MutationObserver | null = null;
  private observedElements: Set<HTMLElement> = new Set();
  private isInitialized: boolean = false;
  private debug: boolean = false;
  private isWindows: boolean = false;

  constructor(options: IMECompositionScrollOptions = {}) {
    this.container = options.container ?? null;
    this.enabled = options.enabled ?? true;
    this.debug = options.debug ?? DEBUG;
    this.isWindows = options.forceEnable ?? isWindowsPlatform();

    // 윈도우 환경이 아닌 경우 아무것도 실행하지 않음 (forceEnable이 false인 경우만)
    if (!this.isWindows && !options.forceEnable) {
      this.logDebug("윈도우 환경이 아니므로 실행을 건너뜁니다");
      return;
    }

    // DOMContentLoaded 이벤트 리스너 등록
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          this.handleDOMContentLoaded();
        });
      } else {
        // 이미 로드된 경우 즉시 실행
        this.handleDOMContentLoaded();
      }
    }
  }

  /**
   * 디버그 로그 출력
   */
  private logDebug(...args: unknown[]): void {
    if (this.debug) {
      console.log("[IMECompositionScroll]", ...args);
    }
  }

  /**
   * DOMContentLoaded 이벤트 핸들러
   */
  private handleDOMContentLoaded(): void {
    this.logDebug("DOMContentLoaded 이벤트 발생");
    this.startObserving();
  }

  /**
   * 노드 트리에서 입력 요소 찾기 (재귀)
   */
  private findInputElementsInNode(node: Node): HTMLElement[] {
    const inputElements: HTMLElement[] = [];

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // 현재 요소가 입력 요소인지 확인
      if (isInputElement(element) && element instanceof HTMLElement) {
        inputElements.push(element);
      }

      // 자식 노드들을 재귀적으로 탐색
      for (const child of Array.from(element.childNodes)) {
        inputElements.push(...this.findInputElementsInNode(child));
      }
    }

    return inputElements;
  }

  /**
   * 초기 스캔 수행 (문서 내 모든 입력 요소 찾기)
   */
  private performInitialScan(root: Element | Document = document): void {
    this.logDebug("초기 스캔 시작");

    const rootElement = root === document ? document.body : root;
    if (!rootElement) {
      this.logDebug("루트 요소를 찾을 수 없습니다");
      return;
    }

    const foundElements = this.findInputElementsInNode(rootElement);

    foundElements.forEach((element) => {
      this.observedElements.add(element);
      this.logDebug("입력 요소 발견:", element.tagName, element);
    });

    this.logDebug(`초기 스캔 완료: ${foundElements.length}개의 입력 요소 발견`);
  }

  /**
   * MutationObserver 콜백
   */
  private handleMutations(mutations: MutationRecord[]): void {
    this.logDebug(`Mutation 감지: ${mutations.length}개의 변경 사항`);

    mutations.forEach((mutation) => {
      // 추가된 노드 처리
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const inputElements = this.findInputElementsInNode(node);
          inputElements.forEach((element) => {
            if (!this.observedElements.has(element)) {
              this.observedElements.add(element);
              this.logDebug(
                "새로운 입력 요소 추가됨:",
                element.tagName,
                element
              );
            }
          });
        }
      });

      // 제거된 노드 처리
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const inputElements = this.findInputElementsInNode(node);
          inputElements.forEach((element) => {
            if (this.observedElements.has(element)) {
              this.observedElements.delete(element);
              this.logDebug("입력 요소 제거됨:", element.tagName, element);
            }
          });
        }
      });

      // 속성 변경 처리 (contenteditable 속성 변경 감지)
      if (
        mutation.type === "attributes" &&
        mutation.target instanceof HTMLElement
      ) {
        const element = mutation.target;
        const isInput = isInputElement(element);
        const isObserved = this.observedElements.has(element);

        if (isInput && !isObserved) {
          // contenteditable이 true로 변경되어 입력 요소가 된 경우
          this.observedElements.add(element);
          this.logDebug(
            "속성 변경으로 입력 요소가 됨:",
            element.tagName,
            element
          );
        } else if (!isInput && isObserved) {
          // contenteditable이 false로 변경되어 입력 요소가 아닌 경우
          this.observedElements.delete(element);
          this.logDebug(
            "속성 변경으로 입력 요소가 아님:",
            element.tagName,
            element
          );
        }
      }
    });

    this.logDebug(`현재 추적 중인 입력 요소 수: ${this.observedElements.size}`);
  }

  /**
   * 관찰 시작 및 초기 스캔
   */
  startObserving(root?: Element | null): void {
    // 윈도우 환경이 아닌 경우 실행하지 않음 (forceEnable이 설정된 경우는 예외)
    if (!this.isWindows) {
      this.logDebug("윈도우 환경이 아니므로 관찰을 시작하지 않습니다");
      return;
    }

    if (this.isInitialized && this.mutationObserver) {
      this.logDebug("이미 관찰이 시작되었습니다");
      return;
    }

    this.logDebug("관찰 시작");

    const observeRoot =
      root ?? (typeof document !== "undefined" ? document.body : null);
    if (!observeRoot) {
      this.logDebug("관찰할 루트 요소를 찾을 수 없습니다");
      return;
    }

    // 초기 스캔 수행
    this.performInitialScan(observeRoot);

    // MutationObserver 생성 및 시작
    this.mutationObserver = new MutationObserver((mutations) => {
      this.handleMutations(mutations);
    });

    this.mutationObserver.observe(observeRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["contenteditable"],
    });

    this.isInitialized = true;
    this.logDebug("MutationObserver 관찰 시작 완료");
  }

  /**
   * 관찰 중지 및 정리
   */
  stopObserving(): void {
    if (!this.mutationObserver) {
      this.logDebug("관찰이 시작되지 않았습니다");
      return;
    }

    this.logDebug("관찰 중지");

    this.mutationObserver.disconnect();
    this.mutationObserver = null;
    this.observedElements.clear();
    this.isInitialized = false;

    this.logDebug("관찰 중지 완료");
  }

  /**
   * 현재 추적 중인 입력 요소의 개수 반환 (테스트용)
   */
  getObservedElementsCount(): number {
    return this.observedElements.size;
  }

  /**
   * MutationObserver가 활성화되어 있는지 확인 (테스트용)
   */
  isObserving(): boolean {
    return this.mutationObserver !== null;
  }

  /**
   * 컨테이너 설정
   */
  setContainer(container: HTMLElement | null): void {
    this.container = container;
  }

  /**
   * 활성화 상태 설정
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * IME composition start 이벤트 핸들러
   */
  handleCompositionStart(_event: CompositionEvent): void {
    if (!this.enabled) return;
    // TODO: composition start 로직 구현
  }

  /**
   * IME composition update 이벤트 핸들러
   */
  handleCompositionUpdate(_event: CompositionEvent): void {
    if (!this.enabled) return;
    // TODO: composition update 로직 구현
  }

  /**
   * IME composition end 이벤트 핸들러
   */
  handleCompositionEnd(_event: CompositionEvent): void {
    if (!this.enabled) return;
    // TODO: composition end 로직 구현
  }
}

/**
 * IME composition scroll 유틸리티 함수
 */
export function createIMECompositionScroll(
  options?: IMECompositionScrollOptions
): IMECompositionScroll {
  return new IMECompositionScroll(options);
}

// 모듈 import 시 자동으로 실행
// import '@ohah/ime-composition-scroll' 만으로도 동작하도록 함
if (typeof window !== "undefined") {
  createIMECompositionScroll();
}
