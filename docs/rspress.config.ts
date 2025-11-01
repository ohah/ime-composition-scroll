import { defineConfig } from "rspress/config";

export default defineConfig({
  root: ".",
  base: process.env.NODE_ENV === "production" ? "/ime-composition-scroll/" : "/",
  title: "IME Composition Scroll",
  description: "IME composition scroll utility library",
  lang: "ko",
  logo: "/logo.png",
  logoText: "IME Composition Scroll",
  locales: [
    {
      lang: "ko",
      label: "한국어",
      title: "IME Composition Scroll",
      description: "IME composition scroll 유틸리티 라이브러리",
    },
    {
      lang: "en",
      label: "English",
      title: "IME Composition Scroll",
      description: "IME composition scroll utility library",
    },
  ],
  themeConfig: {
    locales: [
      {
        lang: "ko",
        label: "한국어",
        outlineTitle: "이 페이지에서",
        prevPageText: "이전 페이지",
        nextPageText: "다음 페이지",
        nav: [
          {
            text: "가이드",
            link: "/guide/",
          },
          {
            text: "API",
            link: "/api/",
          },
        ],
      },
      {
        lang: "en",
        label: "English",
        outlineTitle: "ON THIS PAGE",
        prevPageText: "Previous Page",
        nextPageText: "Next Page",
        nav: [
          {
            text: "Guide",
            link: "/en/guide/",
          },
          {
            text: "API",
            link: "/en/api/",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/ohah/ime-composition-scroll",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "가이드",
          items: [
            {
              text: "시작하기",
              link: "/guide/getting-started",
            },
            {
              text: "사용 예제",
              link: "/guide/examples",
            },
          ],
        },
      ],
      "/en/guide/": [
        {
          text: "Guide",
          items: [
            {
              text: "Getting Started",
              link: "/en/guide/getting-started",
            },
            {
              text: "Examples",
              link: "/en/guide/examples",
            },
          ],
        },
      ],
      "/api/": [
        {
          text: "API",
          items: [
            {
              text: "API 레퍼런스",
              link: "/api/",
            },
          ],
        },
      ],
      "/en/api/": [
        {
          text: "API",
          items: [
            {
              text: "API Reference",
              link: "/en/api/",
            },
          ],
        },
      ],
    },
  },
  builderConfig: {
    output: {
      distPath: {
        root: "doc_build",
      },
    },
    dev: {
      client: {
        overlay: false,
      },
    },
  },
});

