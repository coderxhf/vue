import { createPinia } from "pinia"
import type { App } from "vue"
import useLoginStore from "./login"

function registerStore(app: App<Element>) {
  const pinia = createPinia()
  app.use(pinia)

  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
