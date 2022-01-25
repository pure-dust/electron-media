/*
 * @Author: Lixiao2
 * @Date: 2022-01-18 13:41:26
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 14:23:11
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ChapterInfo, NovelInfo } from '@root/typings/novel';
import { defineStore } from 'pinia';

export const useStore = defineStore('novel', {
  state: () => {
    return {
      path: '',
      novel: {
        name: '',
        list: [] as Array<ChapterInfo>,
      } as NovelInfo,
      current: 0,
      next: 0,
      prev: 0,
    };
  },
  actions: {
    prev() {
      this.current < this.novel.list.length - 1 ? this.current-- : undefined;
      this.prev = this.current === 0 ? this.current : this.current - 1;
      this.next =
        this.current === this.novel.list.length - 1
          ? this.current
          : this.current + 1;
    },
    next() {
      this.current < this.novel.list.length - 1 ? this.current++ : undefined;
      this.prev = this.current === 0 ? this.current : this.current - 1;
      this.next =
        this.current === this.novel.list.length - 1
          ? this.current
          : this.current + 1;
    },
    setPath(path: string) {
      this.path = path;
    },
    setNovel(novel: NovelInfo) {
      this.novel = novel;
    },
    setCurrent(index: number) {
      if (index > -1 && index < this.novel.list.length) {
        this.current = index;
      }
      this.prev = this.current === 0 ? this.current : this.current - 1;
      this.next =
        this.current === this.novel.list.length - 1
          ? this.current
          : this.current + 1;
    },
  },
  getters: {
    getCurrent: (state) => {
      let cur = state.novel.list[state.current]?.name;
      let next =
        state.next === state.current
          ? undefined
          : state.novel.list[state.next]?.name;
      return [cur, next];
    },
    title: (state) => state.novel.list[state.current]?.name,
  },
});
