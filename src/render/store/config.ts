/*
 * @Author: Lixiao2
 * @Date: 2021-06-01 17:51:25
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-18 14:44:20
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import {
  ThemeConfig,
  NovelConfig,
  themeKey,
  novelKey,
} from '@root/typings/user-config';
import { defineStore } from 'pinia';

export const useStore = defineStore('config', {
  state: () => {
    return {
      theme: {
        theme: '',
      } as ThemeConfig,
      novel: {
        color: '',
        size: 0,
        count: 0,
        background: '',
        lineHeight: 0,
      } as NovelConfig,
      lang: 'zh-cn',
    };
  },
  getters: {
    getTheme: (state): ThemeConfig => state.theme,
    getNovel: (state): NovelConfig => state.novel,
  },
  actions: {
    setTheme(payload: ThemeConfig) {
      Object.keys(this.theme).forEach((key) => {
        payload[key as themeKey]
          ? (this.theme[key as themeKey] = payload[key as themeKey])
          : undefined;
      });
    },
    setNovel(payload: NovelConfig) {
      Object.keys(this.novel).forEach((key) => {
        payload[key as novelKey]
          ? (this.novel[key as novelKey] = payload[key as novelKey] as never)
          : undefined;
      });
    },
    setLang(lang: string) {
      this.lang = lang;
    },
  },
});
