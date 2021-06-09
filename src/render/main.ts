import { createApp } from "vue"
import App from "./App.vue"

import "./styles/theme.scss"
// import router from "./router"


createApp(App).mount("#app").$nextTick(window.ClosePreloadLoading)
