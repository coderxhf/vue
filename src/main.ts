import { createApp } from "vue"

import router from "./router"
import store from "./store"
import App from "./App.vue"

import "./assets/css/index.less"
import "normalize.css"

// 0.针对ElMessage和ElLoading等组件引入样式
// 1.全局引入样式(所有样式全部引入)
// import "element-plus/dist/index.css"
// 2.组件样式引入
// import "element-plus/theme-chalk/el-message.css"
/**
 * 3.使用vite-plugin-style-import
 *   * npm install vite-plugin-style-import consola -D
 *   * 在vite.config.ts中配置
 */

import registerIcons from "./global/register-icons"

const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(router)

app.mount("#app")
