import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2021",
    },
    {
      format: "cjs",
      syntax: "es2021",
    },
  ],
  output: {
    target: "web",
  },
  // TypeScript declaration 파일 자동 생성
  // tsconfig.json의 declaration 설정과 함께 작동
});
