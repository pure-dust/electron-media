/*
 * @Author: Lixiao2
 * @Date: 2021-06-01 17:51:25
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:20:35
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export interface SystemState extends SystemConfig {}

const state: SystemState = {
  theme: {
    theme: '',
  },
  novel: {
    color: '',
    size: 0,
    count: 0,
    background: '',
  },
  lang: 'zh-cn',
};

const mutations: MutationTree<SystemState> = {
  setTheme(state, payload: ConfigItem | SystemState) {
    Object.keys(state.theme).forEach((key) => {
      payload[key] ? (state.theme[key] = payload[key]) : undefined;
    });
  },
  setNovel(state, payload) {
    Object.keys(state.novel).forEach((key) => {
      payload[key] ? (state.novel[key] = payload[key]) : undefined;
    });
  },
  setLang(state, lang: string) {
    state.lang = lang;
  },
};

const actions: ActionTree<SystemState, any> = {};

const getters: GetterTree<SystemState, any> = {
  getTheme: (state): ThemeConfig => state.theme,
  getNovel: (state): NovelConfig => state.novel,
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
