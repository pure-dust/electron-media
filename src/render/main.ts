import { createApp } from "vue"
import App from "./App.vue"

import "./styles/index.scss"
// import router from "./router"


createApp(App).mount("#app").$nextTick(window.ClosePreloadLoading)
