import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import 'element-plus/theme-chalk/src/common/var.scss'
import './assets/styles/index.scss'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const pinia = createPinia()
const app = createApp(App)
app
.use(pinia)
.use(router)
.use(ElementPlus, {
  locale: zhCn
})
.mount('#app')
