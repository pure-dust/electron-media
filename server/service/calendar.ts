import http from '@src/request';
export default {
  async getDate(params: GetDateParams) {
    return await http
      .get('http://v.juhe.cn/calendar/day', {
        date: params.date,
        key: 'f881f9a4c04e5865fda4713e240e4527',
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
};
