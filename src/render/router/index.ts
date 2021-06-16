/*
 * @Author: Lixiao2
 * @Date: 2021-06-08 16:58:43
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 10:32:32
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Home from "@/pages/home/index.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HelloWorld",
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
