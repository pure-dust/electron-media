/*
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:20:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:24:11
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { RouteRecord } from 'vue-router';
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export interface NoticeStateType {
  back: boolean;
}

const state: NoticeStateType = {
  back: false,
};

const mutations: MutationTree<NoticeStateType> = {
  setBack(state, payload: boolean) {
    state.back = payload;
  },
};

const actions: ActionTree<NoticeStateType, any> = {};

const getters: GetterTree<NoticeStateType, any> = {
  getBack: (state) => state.back,
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
