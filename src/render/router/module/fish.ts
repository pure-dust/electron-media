/*
 * @Author: Lixiao2
 * @Date: 2022-01-25 09:47:38
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-25 09:51:38
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { RouteRecordRaw } from 'vue-router';

export default {
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
    {
      path: '/fish/chapter',
      name: 'Chapter',
      component: () => import('@/pages/fish/view/chapter.vue'),
      meta: {
        parent: 'Novel',
        ancestor: 'Fish',
        mini: 'novel',
      },
    },
  ],
} as RouteRecordRaw;
