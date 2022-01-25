/*
 * @Author: Lixiao2
 * @Date: 2022-01-25 09:47:09
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 09:51:40
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/calendar',
  name: 'CalendarView',
  component: () => import('@/pages/calendar/view.vue'),
  children: [
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('@/pages/calendar/index.vue'),
      meta: {
        parent: 'Home',
      },
    },
    {
      path: 'single',
      name: 'Single',
      component: () =>
        import('@/pages/calendar/components/singleDateCard/index.vue'),
      meta: {
        parent: 'Calendar',
      },
    },
  ],
} as RouteRecordRaw;
