/*
 * @Author: Lixiao2
 * @Date: 2021-06-01 17:51:25
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:20:35
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export interface ThemeStateType {
  theme: string;
}

const state: ThemeStateType = {
  theme: '',
};

const mutations: MutationTree<ThemeStateType> = {
  setTheme(state, payload: string) {
    state.theme = payload;
  },
};

const actions: ActionTree<ThemeStateType, any> = {};

const getters: GetterTree<ThemeStateType, any> = {
  getTheme: (state) => state.theme,
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
