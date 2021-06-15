import { createApp } from "vue"

import { perload } from "@/utils/preload"
import App from "./App.vue"

import Store, { key } from "@/store"
import "./styles/index.scss"
// import router from "./router"
perload().then(() => {
  const app = createApp(App).use(Store, key)
  app.mount("#app")
})
