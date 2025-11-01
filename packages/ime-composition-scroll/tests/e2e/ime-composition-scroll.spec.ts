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
            
            const imeScroll = createIMECompositionScroll({ container });
            
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
