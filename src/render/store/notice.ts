/*
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:20:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-20 11:32:07
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { defineStore } from 'pinia';

export const useStore = defineStore('notice', {
  state: () => {
    return {
      back: false,
      mini: false,
    };
  },
  actions: {
    setBack(payload: boolean) {
      this.back = payload;
    },
    setMini(mini: boolean) {
      this.mini = mini;
    },
  },
  getters: {
    getBack: (state) => state.back,
  },
});
