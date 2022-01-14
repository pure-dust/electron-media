import { defineStore } from 'pinia';
import { CalendarType, ScheduleMonitor, dateFormat } from '@/utils';

export const useStore = defineStore('calendar', {
  state: () => {
    return {
      cardInfo: null as unknown as CalendarType,
      currentDate: null as unknown as Date,
      monitor: new ScheduleMonitor(dateFormat(new Date())),
    };
  },
  actions: {
    setCardInfo(payload: CalendarType) {
      this.cardInfo = payload;
    },
    setCurrentDate(payload: Date) {
      this.currentDate = payload;
    },
    updateMonitor() {
      this.monitor.update();
    },
  },
  getters: {
    getCardInfo: (state) => state.cardInfo,
    getCurrentDate: (state) => state.currentDate,
  },
});
