import { expect, test } from "@playwright/test";

test.describe("IME Composition Scroll", () => {
  test.beforeEach(async ({ page }) => {
    // 테스트용 HTML 페이지를 직접 작성하여 테스트
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .container {
              height: 200px;
              overflow-y: auto;
              border: 1px solid #ccc;
              padding: 10px;
            }
            .content {
              height: 500px;
              padding: 10px;
            }
            textarea {
              width: 100%;
              height: 100px;
              padding: 10px;
              border: 1px solid #ddd;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container" id="scroll-container">
            <div class="content">
              <h1>IME Composition Scroll Test</h1>
              <p>이 페이지는 IME composition 이벤트 테스트를 위한 페이지입니다.</p>
              <textarea id="test-input" placeholder="여기에 텍스트를 입력하세요 (IME 입력 테스트)"></textarea>
              <div id="output"></div>
            </div>
          </div>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            const container = document.getElementById('scroll-container');
            const input = document.getElementById('test-input');
            const output = document.getElementById('output');
            
            const imeScroll = createIMECompositionScroll({ container, forceEnable: true });
            
            let eventLog = [];
            
            input.addEventListener('compositionstart', (e) => {
              imeScroll.handleCompositionStart(e);
              eventLog.push('compositionstart');
              updateOutput();
            });
            
            input.addEventListener('compositionupdate', (e) => {
              imeScroll.handleCompositionUpdate(e);
              eventLog.push('compositionupdate');
              updateOutput();
            });
            
            input.addEventListener('compositionend', (e) => {
              imeScroll.handleCompositionEnd(e);
              eventLog.push('compositionend');
              updateOutput();
            });
            
            function updateOutput() {
              output.textContent = 'Events: ' + eventLog.join(', ');
            }
          </script>
        </body>
      </html>
    `);
  });

  test("should load the library correctly", async ({ page }) => {
    const container = page.locator("#scroll-container");
    await expect(container).toBeVisible();
  });

  test("should handle text input", async ({ page }) => {
    const input = page.locator("#test-input");
    await input.click();
    await input.fill("Hello World");

    const value = await input.inputValue();
    expect(value).toBe("Hello World");
  });

  test("should track composition events", async ({ page }) => {
    const input = page.locator("#test-input");
    const output = page.locator("#output");

    await input.click();

    // Composition 이벤트를 수동으로 디스패치하여 시뮬레이션
    await page.evaluate(() => {
      const inputElement = document.getElementById(
        "test-input"
      ) as HTMLTextAreaElement;

      // CompositionStart 이벤트 디스패치
      const startEvent = new CompositionEvent("compositionstart", {
        bubbles: true,
        cancelable: true,
        data: "",
      });
      inputElement.dispatchEvent(startEvent);

      // CompositionUpdate 이벤트 디스패치
      const updateEvent = new CompositionEvent("compositionupdate", {
        bubbles: true,
        cancelable: true,
        data: "안",
      });
      inputElement.dispatchEvent(updateEvent);

      // CompositionEnd 이벤트 디스패치
      const endEvent = new CompositionEvent("compositionend", {
        bubbles: true,
        cancelable: true,
        data: "안녕",
      });
      inputElement.dispatchEvent(endEvent);
    });

    // composition 이벤트가 발생했는지 확인
    await expect(output).toContainText("Events:");
    await expect(output).toContainText("compositionstart");
    await expect(output).toContainText("compositionupdate");
    await expect(output).toContainText("compositionend");
  });

  test("should handle scroll container", async ({ page }) => {
    const container = page.locator("#scroll-container");

    // 스크롤 가능한지 확인
    const scrollHeight = await container.evaluate((el) => el.scrollHeight);
    const clientHeight = await container.evaluate((el) => el.clientHeight);

    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });
});

test.describe("MutationObserver - 입력 요소 감지", () => {
  test("should detect input elements using MutationObserver", async ({
    page,
  }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.detectedElements = new Set();
            
            // MutationObserver가 감지하는지 확인하기 위한 콜백
            setTimeout(() => {
              window.imeScroll.startObserving();
              
              // 초기 스캔 결과 확인
              const initialCount = window.imeScroll.observedElements?.size || 0;
              window.detectedElements.add('initial:' + initialCount);
            }, 100);
          </script>
        </head>
        <body>
          <input type="text" id="text-input" />
          <textarea id="textarea-input"></textarea>
          <div contenteditable="true" id="editable-div"></div>
        </body>
      </html>
    `);

    // 초기 스캔이 완료될 때까지 대기
    await page.waitForTimeout(200);

    const detectedCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // 3개의 입력 요소가 감지되어야 함
    expect(detectedCount).toBeGreaterThanOrEqual(3);
  });

  test("should detect dynamically added input elements", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.imeScroll.startObserving();
            
            // 동적으로 요소 추가
            setTimeout(() => {
              const container = document.body;
              
              const newInput = document.createElement('input');
              newInput.type = 'text';
              newInput.id = 'dynamic-input';
              container.appendChild(newInput);
              
              const newTextarea = document.createElement('textarea');
              newTextarea.id = 'dynamic-textarea';
              container.appendChild(newTextarea);
              
              const newEditable = document.createElement('div');
              newEditable.contentEditable = 'true';
              newEditable.id = 'dynamic-editable';
              container.appendChild(newEditable);
            }, 100);
          </script>
        </head>
        <body>
          <input type="text" id="initial-input" />
        </body>
      </html>
    `);

    // 동적 요소 추가 후 MutationObserver가 감지할 때까지 대기
    await page.waitForTimeout(300);

    const detectedCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // 초기 1개 + 동적 추가 3개 = 최소 4개 이상 감지되어야 함
    expect(detectedCount).toBeGreaterThanOrEqual(4);

    // 동적으로 추가된 요소들이 실제로 존재하는지 확인
    const dynamicInput = page.locator("#dynamic-input");
    const dynamicTextarea = page.locator("#dynamic-textarea");
    const dynamicEditable = page.locator("#dynamic-editable");

    await expect(dynamicInput).toBeVisible();
    await expect(dynamicTextarea).toBeVisible();
    await expect(dynamicEditable).toBeVisible();
  });

  test("should detect contenteditable attribute changes", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.imeScroll.startObserving();
          </script>
        </head>
        <body>
          <div id="editable-div">Editable content</div>
        </body>
      </html>
    `);

    // 초기 상태 (contenteditable이 없음)
    await page.waitForTimeout(100);
    const initialCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // contenteditable 속성 추가
    await page.evaluate(() => {
      const div = document.getElementById("editable-div");
      if (div) {
        div.contentEditable = "true";
      }
    });

    // MutationObserver가 속성 변경을 감지할 때까지 대기
    await page.waitForTimeout(200);

    const afterChangeCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // contenteditable이 추가되면 요소가 감지되어야 함
    expect(afterChangeCount).toBeGreaterThan(initialCount);
  });

  test("should automatically initialize on DOMContentLoaded", async ({
    page,
  }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            // DOMContentLoaded 이벤트를 기다리지 않고 즉시 인스턴스 생성
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.initTime = Date.now();
          </script>
        </head>
        <body>
          <input type="text" id="test-input" />
          <textarea id="test-textarea"></textarea>
        </body>
      </html>
    `);

    // DOMContentLoaded 후 자동 초기화가 완료될 때까지 대기
    await page.waitForTimeout(200);

    const isObserving = await page.evaluate(() => {
      return (window as any).imeScroll?.isObserving() || false;
    });

    const detectedCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // MutationObserver가 시작되었는지 확인
    expect(isObserving).toBe(true);
    // 최소 2개의 입력 요소가 감지되어야 함
    expect(detectedCount).toBeGreaterThanOrEqual(2);
  });

  test("should detect various input element types", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.imeScroll.startObserving();
          </script>
        </head>
        <body>
          <input type="text" id="text-input" />
          <input type="email" id="email-input" />
          <input id="default-input" />
          <textarea id="textarea-input"></textarea>
          <div contenteditable="true" id="editable-div"></div>
        </body>
      </html>
    `);

    await page.waitForTimeout(200);

    const detectedCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // text input, default input (text), textarea, contenteditable = 4개 감지
    // email input은 감지되지 않아야 함
    expect(detectedCount).toBe(4);
  });

  test("should handle debug mode with console logs", async ({ page }) => {
    const consoleMessages: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("[IMECompositionScroll]")) {
        consoleMessages.push(text);
      }
    });

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ debug: true });
            window.imeScroll.startObserving();
          </script>
        </head>
        <body>
          <input type="text" id="test-input" />
        </body>
      </html>
    `);

    await page.waitForTimeout(200);

    // 디버그 모드일 때 콘솔 로그가 출력되어야 함
    expect(consoleMessages.length).toBeGreaterThan(0);
    expect(consoleMessages.some((msg) => msg.includes("초기 스캔"))).toBe(true);
  });

  test("should remove elements from tracking when removed from DOM", async ({
    page,
  }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { createIMECompositionScroll } from '../../dist/index.js';
            
            window.imeScroll = createIMECompositionScroll({ forceEnable: true });
            window.imeScroll.startObserving();
          </script>
        </head>
        <body>
          <div id="container">
            <input type="text" id="input1" />
            <textarea id="textarea1"></textarea>
          </div>
        </body>
      </html>
    `);

    await page.waitForTimeout(200);

    const initialCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });
    expect(initialCount).toBeGreaterThanOrEqual(2);

    // 요소 제거
    await page.evaluate(() => {
      const container = document.getElementById("container");
      if (container) {
        container.remove();
      }
    });

    await page.waitForTimeout(200);

    const afterRemoveCount = await page.evaluate(() => {
      return (window as any).imeScroll?.getObservedElementsCount() || 0;
    });

    // 제거된 요소들이 추적에서 제외되어야 함
    expect(afterRemoveCount).toBeLessThan(initialCount);
  });
});
