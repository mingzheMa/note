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
      "/vue2源码/": [
        "",
        {
          text: "准备",
          link: "/vue2源码/1.准备/1.目录结构",
          collapsible: true,
          prefix: "1.准备",
          children: ["1.目录结构", "2.源码构建", "3.vue入口"],
        },
        {
          text: "数据驱动",
          link: "/vue2源码/2.数据驱动/1.介绍",
          collapsible: true,
          prefix: "2.数据驱动",
          children: [
            "1.介绍",
            "2.new Vue发生了什么",
            "3.Vue.$mount",
            "4.Vue._render",
            "5.VNode",
            "6.createElement",
            "7.Vue._update",
          ],
        },
        {
          text: "组件化",
          link: "/vue2源码/3.组件化/1.介绍",
          collapsible: true,
          prefix: "3.组件化",
          children: ["1.介绍", "2.createComponent", "3.patch"],
        },
        {
          text: "响应式",
          link: "/vue2源码/4.响应式/1.介绍",
          collapsible: true,
          prefix: "4.响应式",
          children: [
            "1.介绍",
            "2.响应式对象",
            "3.依赖收集",
            "4.派发更新",
            "5.$nexttick",
            "6.检测数据变化",
            "7.计算属性和监听属性",
          ],
        },
        {
          text: "内置组件",
          link: "/vue2源码/6.内置组件/1.keep-alive",
          collapsible: true,
          prefix: "6.内置组件",
          children: ["1.keep-alive"],
        },
      ],
      "/vue3源码/": [
        "",
        "1.vnode到dom",
        "2.diff流程",
        "3.setup",
        "4.响应式",
        "5.计算属性",
        "6.监听器",
        "7.异步队列",
        "100.项目构建",
      ],
      "/vue-router3源码/": [
        "",
        "1.install",
        "2.VueRouter构造器",
        "3.matcher",
        {
          text: "路由跳转",
          link: "/vue-router3源码/4.路由跳转",
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
