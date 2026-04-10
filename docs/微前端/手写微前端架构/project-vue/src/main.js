import './public-path'
import { createApp } from 'vue'
import App from './App.vue'

let app = null

function render(props = {}) {
  const { container } = props
  const root = container ? container.querySelector('#app') : document.querySelector('#app')

  app = createApp(App)
  app.mount(root)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  // Vue3 子应用通常无需在这里做额外初始化
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  console.log(app);
  
  if (app) app.unmount()
  app = null
}