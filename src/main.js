import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createHead } from '@vueuse/head'

// ✅ 加這一行！
import 'vue3-json-viewer/dist/index.css'

const app = createApp(App)

const head = createHead()
app.use(head)

app.mount('#app')
