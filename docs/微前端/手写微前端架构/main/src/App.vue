<template>
  <div class="app-root">
    <header class="app-header">
      <nav class="app-nav" aria-label="主导航">
        <div @click="jumpTo('/')">首页</div>
        <div @click="jumpTo('/app-react')">app-react</div>
        <div @click="jumpTo('/app-vue')">app-vue</div>
      </nav>
    </header>
    <main class="app-main">
      <HomeView v-if="viewPath === '/'" />
      <div id="content"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeView from "./views/HomeView.vue";

const viewPath = ref(location.pathname);
window.addEventListener("popstate", () => {
  viewPath.value = location.pathname;
});
function jumpTo(path) {
  if (viewPath.value === path) {
    return;
  }
  viewPath.value = path;
  history.pushState({}, "", path);
}
</script>

<style scoped>
#content {
  /* 处理margin塌陷，使用BFC */
  display: flow-root;
}
</style>