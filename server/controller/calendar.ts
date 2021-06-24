import service from '../service/index';
export default {
  getDate(params) {
    return service.calendar.getDate(params);
  },
};
