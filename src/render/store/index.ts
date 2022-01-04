/*
 * @Author: Lixiao2
 * @Date: 2021-06-01 17:49:34
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:22:07
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseStore } from 'vuex';

import moduleTypes, { RootTypes } from './interface';

import ThemeModule from './module/config';
import NoticeModule from './module/notice';
import CalendarModule from './module/calendar';

export default createStore({
  modules: {
    theme: ThemeModule,
    notice: NoticeModule,
    calendar: CalendarModule,
  },
});

export const key: InjectionKey<Store<RootTypes>> = Symbol();

export function useStore<T = moduleTypes>() {
  return baseStore<T>(key);
}
