/*
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:20:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:24:11
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { defineStore } from 'pinia';

export const useStore = defineStore('notice', {
  state: () => {
    return {
      back: false,
    };
  },
  actions: {
    setBack(payload: boolean) {
      this.back = payload;
    },
  },
  getters: {
    getBack: (state) => state.back,
  },
});
