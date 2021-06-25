import { createApp } from 'vue';
import { AxiosInstance } from 'axios';

import http from '../request';

import { perload } from '@/utils/preload';
import Store, { key } from '@/store';
import router from './router';
import App from './App.vue';

import ClickWave from '@/directives/ClickWave';
import ClickOuntside from '@/directives/ClickOutside';
import EnterAnimate from './directives/EnterAnimate';

import './styles/index.scss';
import '@/assets/iconfont/iconfont.js';
import '@/assets/font/font.scss';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}

perload().then(() => {
  const app = createApp(App);
  app.config.globalProperties.$http = http;

  app.use(Store, key);
  app.use(router);
  app.directive('click-wave', ClickWave);
  app.directive('click-outside', ClickOuntside);
  app.directive('enter-ani', EnterAnimate);
  app.mount('#app');
});
