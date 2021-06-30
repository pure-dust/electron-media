/*
 * @Author: Lixiao2
 * @Date: 2021-06-08 16:58:43
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:13:05
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
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
        component: () => import('@/pages/calendar/singleDateCard/index.vue'),
        meta: {
          parent: 'Calendar',
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'AccountView',
    component: () => import('@/pages/account/view.vue'),
    children: [
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/pages/account/index.vue'),
        meta: {
          parent: 'Home',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
