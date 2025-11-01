import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { IMECompositionScroll, createIMECompositionScroll } from "./index";

describe("IMECompositionScroll", () => {
  let container: HTMLElement;
  let instance: IMECompositionScroll;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    instance = new IMECompositionScroll({ container });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should create an instance", () => {
    expect(instance).toBeInstanceOf(IMECompositionScroll);
  });

  it("should set container", () => {
    const newContainer = document.createElement("div");
    instance.setContainer(newContainer);
    // TODO: container가 제대로 설정되었는지 확인하는 로직 추가 필요
  });

  it("should set enabled state", () => {
    instance.setEnabled(false);
    // TODO: enabled 상태 확인 로직 추가 필요
  });

  it("should handle composition start", () => {
    const event = new CompositionEvent("compositionstart");
    expect(() => instance.handleCompositionStart(event)).not.toThrow();
  });

  it("should handle composition update", () => {
    const event = new CompositionEvent("compositionupdate");
    expect(() => instance.handleCompositionUpdate(event)).not.toThrow();
  });

  it("should handle composition end", () => {
    const event = new CompositionEvent("compositionend");
    expect(() => instance.handleCompositionEnd(event)).not.toThrow();
  });

  describe("blur event detection", () => {
    it("should detect blur events on all textarea elements in the document", () => {
      // Given: document에 textarea 요소들을 생성하고 추가
      const textarea1 = document.createElement("textarea");
      const textarea2 = document.createElement("textarea");
      document.body.appendChild(textarea1);
      document.body.appendChild(textarea2);

      // When: blur 이벤트 감지가 시작되면
      // TODO: 현재 화면의 모든 textarea 요소를 찾아서 blur 이벤트 리스너를 등록하는 메서드 호출
      // 예: instance.start() 또는 instance.attach() 같은 메서드
      // 이 메서드는 document.querySelectorAll('textarea')로 모든 textarea를 찾아야 함

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트가 발생했을 때 호출될 콜백을 등록하거나 확인
      // 예: instance.onBlur((event) => blurEvents.push(event));

      // blur 이벤트 발생 시뮬레이션
      textarea1.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      textarea2.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: document의 모든 textarea의 blur 이벤트가 감지되어야 함
      // TODO: blur 이벤트가 정상적으로 감지되었는지 확인
      expect(blurEvents.length).toBe(2);
      expect(blurEvents[0].target).toBe(textarea1);
      expect(blurEvents[1].target).toBe(textarea2);

      // Cleanup
      document.body.removeChild(textarea1);
      document.body.removeChild(textarea2);
    });

    it("should detect blur events on all input elements in the document", () => {
      // Given: document에 input 요소들을 생성하고 추가
      const input1 = document.createElement("input");
      const input2 = document.createElement("input");
      input1.type = "text";
      input2.type = "text";
      document.body.appendChild(input1);
      document.body.appendChild(input2);

      // When: blur 이벤트 감지가 시작되면
      // TODO: document.querySelectorAll('input[type="text"], input:not([type])') 등으로 모든 input을 찾아 blur 리스너 등록

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // blur 이벤트 발생 시뮬레이션
      input1.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      input2.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: document의 모든 input의 blur 이벤트가 감지되어야 함
      expect(blurEvents.length).toBe(2);
      expect(blurEvents[0].target).toBe(input1);
      expect(blurEvents[1].target).toBe(input2);

      // Cleanup
      document.body.removeChild(input1);
      document.body.removeChild(input2);
    });

    it("should detect blur events on all contentEditable elements in the document", () => {
      // Given: document에 contentEditable 요소들을 생성하고 추가
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      div1.contentEditable = "true";
      div2.contentEditable = "true";
      document.body.appendChild(div1);
      document.body.appendChild(div2);

      // When: blur 이벤트 감지가 시작되면
      // TODO: document.querySelectorAll('[contenteditable="true"]') 등으로 모든 contentEditable 요소를 찾아 blur 리스너 등록

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // blur 이벤트 발생 시뮬레이션
      div1.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      div2.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: document의 모든 contentEditable의 blur 이벤트가 감지되어야 함
      expect(blurEvents.length).toBe(2);
      expect(blurEvents[0].target).toBe(div1);
      expect(blurEvents[1].target).toBe(div2);

      // Cleanup
      document.body.removeChild(div1);
      document.body.removeChild(div2);
    });

    it("should detect blur events on all input elements (textarea, input, contentEditable) in the document", () => {
      // Given: document에 다양한 입력 요소들을 생성하고 추가
      const textarea = document.createElement("textarea");
      const input = document.createElement("input");
      input.type = "text";
      const contentEditable = document.createElement("div");
      contentEditable.contentEditable = "true";

      document.body.appendChild(textarea);
      document.body.appendChild(input);
      document.body.appendChild(contentEditable);

      // When: blur 이벤트 감지가 시작되면
      // TODO: document에서 textarea, input, contentEditable을 모두 찾아서 각각에 blur 리스너 등록
      // 예: querySelectorAll('textarea, input[type="text"], [contenteditable="true"]')

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // blur 이벤트 발생 시뮬레이션
      textarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      input.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      contentEditable.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: document의 모든 입력 요소의 blur 이벤트가 감지되어야 함
      expect(blurEvents.length).toBe(3);
      expect(blurEvents[0].target).toBe(textarea);
      expect(blurEvents[1].target).toBe(input);
      expect(blurEvents[2].target).toBe(contentEditable);

      // Cleanup
      document.body.removeChild(textarea);
      document.body.removeChild(input);
      document.body.removeChild(contentEditable);
    });

    it("should detect blur events on elements regardless of their container or nesting level", () => {
      // Given: 다양한 컨테이너와 중첩 레벨에 요소들을 생성
      const nestedContainer = document.createElement("div");
      nestedContainer.innerHTML = `
        <div>
          <textarea id="nested-textarea"></textarea>
          <input type="text" id="nested-input" />
          <div contenteditable="true" id="nested-editable"></div>
        </div>
      `;
      document.body.appendChild(nestedContainer);

      const topLevelTextarea = document.createElement("textarea");
      document.body.appendChild(topLevelTextarea);

      // When: blur 이벤트 감지가 시작되면
      // TODO: document의 모든 textarea, input, contentEditable을 찾아서 blur 리스너 등록
      // 중첩 레벨과 상관없이 모든 요소를 감지해야 함

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // blur 이벤트 발생 시뮬레이션
      const nestedTextarea = document.getElementById(
        "nested-textarea"
      ) as HTMLTextAreaElement;
      const nestedInput = document.getElementById(
        "nested-input"
      ) as HTMLInputElement;
      const nestedEditable = document.getElementById(
        "nested-editable"
      ) as HTMLElement;

      nestedTextarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      nestedInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      nestedEditable.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      topLevelTextarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: 모든 요소의 blur 이벤트가 감지되어야 함 (중첩 레벨과 무관하게)
      expect(blurEvents.length).toBe(4);
      expect(blurEvents.some((e) => e.target === nestedTextarea)).toBe(true);
      expect(blurEvents.some((e) => e.target === nestedInput)).toBe(true);
      expect(blurEvents.some((e) => e.target === nestedEditable)).toBe(true);
      expect(blurEvents.some((e) => e.target === topLevelTextarea)).toBe(true);

      // Cleanup
      document.body.removeChild(nestedContainer);
      document.body.removeChild(topLevelTextarea);
    });

    it("should detect blur events on elements that are dynamically added to the document", () => {
      // Given: 초기에 일부 요소만 존재
      const initialTextarea = document.createElement("textarea");
      document.body.appendChild(initialTextarea);

      // When: blur 이벤트 감지가 시작된 후
      // TODO: 초기 요소들에 blur 리스너 등록
      // TODO: MutationObserver를 설정하여 새로운 요소 추가를 감지하도록 구현 필요

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록
      // 예: instance.onBlur((event) => blurEvents.push(event));

      // 동적으로 새로운 요소가 추가되면 (리액트처럼)
      const dynamicInput = document.createElement("input");
      dynamicInput.type = "text";
      document.body.appendChild(dynamicInput);

      // TODO: MutationObserver가 새로 추가된 요소를 감지하고 자동으로 blur 리스너를 등록해야 함
      // MutationObserver는 childList: true, subtree: true 옵션으로 설정

      // blur 이벤트 발생 시뮬레이션
      initialTextarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      dynamicInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: 기존 요소와 동적으로 추가된 요소 모두의 blur 이벤트가 감지되어야 함
      expect(blurEvents.length).toBe(2);
      expect(blurEvents[0].target).toBe(initialTextarea);
      expect(blurEvents[1].target).toBe(dynamicInput);

      // Cleanup
      document.body.removeChild(initialTextarea);
      document.body.removeChild(dynamicInput);
    });

    it("should automatically detect and attach blur listeners to dynamically added elements (React-like scenario)", () => {
      // Given: 리액트처럼 요소가 동적으로 추가/제거되는 시나리오
      const reactContainer = document.createElement("div");
      reactContainer.id = "react-root";
      document.body.appendChild(reactContainer);

      // When: blur 이벤트 감지가 시작되면 (MutationObserver 활성화)
      // TODO: MutationObserver를 사용하여 document.body 또는 특정 컨테이너의 변경 사항 감지
      // MutationObserver 설정:
      //   - childList: true (자식 요소 추가/제거 감지)
      //   - subtree: true (모든 하위 트리 변경 감지)
      //   - attributes: false 또는 true (속성 변경 감지, contentEditable 변경 시 필요할 수 있음)

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // 리액트 컴포넌트가 렌더링되면서 요소 추가 (시뮬레이션)
      reactContainer.innerHTML = `
        <form>
          <textarea id="form-textarea"></textarea>
          <input type="text" id="form-input" />
        </form>
      `;

      // TODO: MutationObserver가 위의 innerHTML 변경을 감지하고
      // 새로 추가된 textarea, input에 blur 리스너를 자동으로 등록해야 함

      // 추가로 더 많은 요소가 동적으로 추가되는 경우 (조건부 렌더링 시뮬레이션)
      const conditionalInput = document.createElement("input");
      conditionalInput.type = "email";
      reactContainer.appendChild(conditionalInput);

      // TODO: 이 요소도 MutationObserver가 감지하여 blur 리스너 등록

      // blur 이벤트 발생 시뮬레이션
      const formTextarea = document.getElementById(
        "form-textarea"
      ) as HTMLTextAreaElement;
      const formInput = document.getElementById(
        "form-input"
      ) as HTMLInputElement;

      formTextarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      formInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      conditionalInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: 초기 렌더링과 동적 추가된 모든 요소의 blur 이벤트가 감지되어야 함
      expect(blurEvents.length).toBe(3);
      expect(blurEvents.some((e) => e.target === formTextarea)).toBe(true);
      expect(blurEvents.some((e) => e.target === formInput)).toBe(true);
      expect(blurEvents.some((e) => e.target === conditionalInput)).toBe(true);

      // Cleanup
      document.body.removeChild(reactContainer);
    });

    it("should handle elements being removed from the document (cleanup scenario)", () => {
      // Given: 요소가 추가되었다가 제거되는 리액트 시나리오
      const textarea1 = document.createElement("textarea");
      const textarea2 = document.createElement("textarea");
      document.body.appendChild(textarea1);
      document.body.appendChild(textarea2);

      // When: blur 이벤트 감지가 시작되면
      // TODO: 모든 요소에 blur 리스너 등록

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // 첫 번째 요소의 blur 이벤트 발생
      textarea1.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // 요소가 제거되는 경우 (리액트 언마운트 시뮬레이션)
      document.body.removeChild(textarea1);

      // TODO: MutationObserver가 요소 제거를 감지하고 해당 요소의 blur 리스너를 정리해야 함
      // 또는 요소가 제거된 후에는 blur 이벤트가 발생하지 않으므로 자동으로 처리됨

      // 두 번째 요소의 blur 이벤트 발생
      textarea2.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: 제거된 요소는 blur 이벤트가 감지되지 않아야 하고,
      // 남아있는 요소의 blur 이벤트는 정상적으로 감지되어야 함
      expect(blurEvents.length).toBe(2); // textarea1과 textarea2의 blur 모두 감지됨
      expect(blurEvents[0].target).toBe(textarea1);
      expect(blurEvents[1].target).toBe(textarea2);

      // Cleanup
      document.body.removeChild(textarea2);
    });

    it("should handle rapid addition and removal of elements (React state changes)", () => {
      // Given: 리액트 상태 변경으로 요소가 빠르게 추가/제거되는 시나리오
      const container = document.createElement("div");
      document.body.appendChild(container);

      // When: blur 이벤트 감지가 시작되면
      // TODO: MutationObserver 설정 및 초기 요소 스캔

      const blurEvents: FocusEvent[] = [];
      // TODO: blur 이벤트 콜백 등록

      // 빠르게 여러 요소가 추가되고 제거되는 시나리오
      const elements: HTMLElement[] = [];

      // 첫 번째 배치 추가
      for (let i = 0; i < 3; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `input-${i}`;
        container.appendChild(input);
        elements.push(input);
      }

      // TODO: MutationObserver가 모든 추가된 요소를 감지하여 blur 리스너 등록

      // 일부 요소 제거
      container.removeChild(elements[1]);

      // 새로운 요소 추가
      const newTextarea = document.createElement("textarea");
      newTextarea.id = "new-textarea";
      container.appendChild(newTextarea);
      elements.push(newTextarea);

      // TODO: 새로 추가된 요소에도 blur 리스너가 자동 등록되어야 함

      // 모든 남아있는 요소에서 blur 이벤트 발생
      elements[0].dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      elements[2].dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      newTextarea.dispatchEvent(new FocusEvent("blur", { bubbles: true }));

      // Then: 현재 DOM에 존재하는 모든 요소의 blur 이벤트가 감지되어야 함
      // (제거된 elements[1]은 blur 이벤트가 발생하지 않음)
      expect(blurEvents.length).toBe(3);
      expect(blurEvents.some((e) => e.target === elements[0])).toBe(true);
      expect(blurEvents.some((e) => e.target === elements[2])).toBe(true);
      expect(blurEvents.some((e) => e.target === newTextarea)).toBe(true);
      expect(blurEvents.some((e) => e.target === elements[1])).toBe(false); // 제거된 요소는 없어야 함

      // Cleanup
      document.body.removeChild(container);
    });
  });
});

describe("createIMECompositionScroll", () => {
  it("should create an instance with default options", () => {
    const instance = createIMECompositionScroll();
    expect(instance).toBeInstanceOf(IMECompositionScroll);
  });

  it("should create an instance with custom options", () => {
    const container = document.createElement("div");
    const instance = createIMECompositionScroll({ container, enabled: false });
    expect(instance).toBeInstanceOf(IMECompositionScroll);
  });
});
