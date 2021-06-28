import service from '../service/index';
export default {
  async getDate(params: GetDateParams) {
    return await service.calendar.getDate(params);
  },
};
