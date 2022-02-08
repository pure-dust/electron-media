/*
 * @Author: Lixiao2
 * @Date: 2022-01-25 09:47:26
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 09:51:19
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { RouteRecordRaw } from 'vue-router';

export default {
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
} as RouteRecordRaw;
