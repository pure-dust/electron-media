import '@/assets/iconfont/font_2613851_qf2knv5dw7l.js';
import { createApp } from 'vue';
import { CusAxiosInstance } from '../request';
import { createPinia } from 'pinia';

import http from '../request';

import { perload } from '@/utils/preload';
import router from './router';
import App from './App.vue';

import ClickWave from '@/directives/ClickWave';
import ClickOuntside from '@/directives/ClickOutside';
import EnterAnimate from './directives/EnterAnimate';

import './styles/index.scss';
import '@/assets/font/font.scss';

import KLUI from '@/components';

import { useStore } from '@/store/config';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: CusAxiosInstance;
  }
}

const app = createApp(App);
app.config.globalProperties.$http = http;
app.use(createPinia());
app.use(KLUI);
app.use(router);
app.directive('click-wave', ClickWave);
app.directive('click-outside', ClickOuntside);
app.directive('enter-ani', EnterAnimate);
perload().then((message) => {
  const store = useStore();
  store.setTheme(message.theme);
  store.setNovel(message.novel);
  store.setLang(message.lang);
  app.mount('#app');
});
