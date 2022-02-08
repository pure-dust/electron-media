/*
 * @Author: Lixiao2
 * @Date: 2021-06-08 16:58:43
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 11:26:24
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/home/index.vue';

import calendar from './module/calendar';
import account from './module/account';
import fish from './module/fish';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/pages/setting/index.vue'),
    meta: {
      parent: 'Home',
    },
  },
  calendar,
  account,
  fish,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Setting') {
    to.meta.parent = from.name || 'Home';
  }
  next();
});

export default router;
