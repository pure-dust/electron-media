import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { CalenarType, ScheduleMonitor, dateFormat } from '@/utils';

export interface CanlendarStateType {
  cardInfo: CalenarType | null;
  currentDate: Date | null;
  monitor: ScheduleMonitor;
}

const state: CanlendarStateType = {
  cardInfo: null,
  currentDate: null,
  monitor: new ScheduleMonitor(dateFormat(new Date())),
};

const mutations: MutationTree<CanlendarStateType> = {
  setCardInfo(state, payload: CalenarType) {
    state.cardInfo = payload;
  },
  setCurrentDate(state, payload: Date) {
    state.currentDate = payload;
  },
  updateMonitor(state) {
    state.monitor.update();
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
