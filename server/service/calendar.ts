import http from '@src/request';
import iconv from 'iconv-lite';
export default {
  async getDate(params: GetDateParams) {
    return await http
      .get('http://v.juhe.cn/calendar/day', {
        date: '2020-5-1',
        key: 'f881f9a4c04e5865fda4713e240e4527',
      })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  },
};
