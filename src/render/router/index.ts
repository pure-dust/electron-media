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
    name: 'HelloWorld',
    component: Home,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/pages/calendar/index.vue'),
    children: [
      {
        path: 'single',
        name: 'single',
        component: () => import('@/pages/calendar/singleDate/index.vue'),
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
