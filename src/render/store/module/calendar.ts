import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { CalenarType } from '@/utils/calendar';

export interface CanlendarStateType {
  cardInfo: CalenarType | null;
  currentDate: Date | null
}

const state: CanlendarStateType = {
  cardInfo: null,
  currentDate: null
};

const mutations: MutationTree<CanlendarStateType> = {
  setCardInfo(state, payload: CalenarType) {
    state.cardInfo = payload;
  },
  setCurrentDate(state, payload: Date) {
    state.currentDate = payload;
  },
};

const actions: ActionTree<CanlendarStateType, any> = {};

const getters: GetterTree<CanlendarStateType, any> = {
  getCardInfo: (state) => state.cardInfo,
  getCurrentDate: (state) => state.currentDate,
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
