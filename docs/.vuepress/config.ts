import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  lang: "zh-CN",
  title: "marx的学习笔记",
  description: "部分内容是参考外部文章，属于个人复习使用",

  theme: hopeTheme({
    navbar: [
      {
        text: "JS",
        link: "/JS/README.md",
      },
      {
        text: "TS",
        link: "/TS/README.md",
      },
      {
        text: "webpack",
        link: "/webpack/README.md",
      },
      {
        text: "react",
        link: "/react/README.md",
      },
      {
        text: "redux",
        link: "/redux/README.md",
      },
      {
        text: "vue2源码",
        link: "/vue2源码/README.md",
      },
      {
        text: "vue3源码",
        link: "/vue3源码/README.md",
      },
      {
        text: "vue-router3源码",
        link: "/vue-router3源码/README.md",
      },
      {
        text: "网络",
        link: "/网络/README.md",
      },
    ],

    sidebar: {
      "/JS/": "structure",
      "/TS/": "structure",
      "/webpack/": "structure",
      "/react/": "structure",
      "/redux/": "structure",
      "/vue2源码/": "structure",
      "/vue3源码/": [
        "",
        "1.vnode到dom",
        "2.diff流程",
        "3.setup",
        "4.响应式",
        "100.项目构建",
      ],
      "/vue-router3源码/": [
        "",
        "1.install",
        "2.VueRouter构造器",
        "3.matcher",
        {
          text: "路由跳转",
          link: "4.路由跳转",
          collapsible: true,
          prefix: "4.路由跳转",
          children: [
            "README.md",
            "1.current",
            "2.confirmTransition",
            "3.路由守卫",
            "4.url",
            "5.内置组件",
            "6.总结",
          ],
        },
      ],
      "/网络/": "structure",
    },
  }),
});
