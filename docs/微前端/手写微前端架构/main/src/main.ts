import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './apps'
import router from './router'

const app = createApp(App)

app.use(router as any)

app.mount('#app')
