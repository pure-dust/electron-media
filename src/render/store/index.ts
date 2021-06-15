/*
 * @Author: Lixiao2
 * @Date: 2021-06-01 17:49:34
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-15 10:40:34
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseStore } from "vuex"

import moduleTypes, { RootTypes } from "./interface"

import ThemeModule from "./module/theme"

export default createStore({
  modules: {
    theme: ThemeModule,
  },
})

export const key: InjectionKey<Store<RootTypes>> = Symbol()

export function useStore<T = moduleTypes>() {
  return baseStore<T>(key)
}
