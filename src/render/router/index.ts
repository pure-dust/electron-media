/*
 * @Author: Lixiao2
 * @Date: 2021-06-08 16:58:43
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 10:59:45
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
        component: () =>
          import('@/pages/calendar/components/singleDateCard/index.vue'),
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
  {
    path: '/fish',
    name: 'FishView',
    component: () => import('@/pages/fish/view.vue'),
    children: [
      {
        path: '/fish',
        name: 'Fish',
        component: () => import('@/pages/fish/view/index.vue'),
        meta: {
          parent: 'Home',
        },
      },
      {
        path: '/fish/novel',
        name: 'Novel',
        component: () => import('@/pages/fish/view/book.vue'),
        meta: {
          parent: 'Fish',
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
