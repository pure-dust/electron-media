import { createApp } from 'vue';

import { perload } from '@/utils/preload';
import Store, { key } from '@/store';
import router from './router';
import App from './App.vue';
import ClickWave from '@/directives/ClickWave';
import ClickOuntside from '@/directives/ClickOutside';

import './styles/index.scss';
import '@/assets/iconfont/iconfont.js';
import '@/assets/font/font.scss';

perload().then(() => {
  const app = createApp(App);
  app.use(Store, key);
  app.use(router);
  app.directive('click-wave', ClickWave);
  app.directive('click-outside', ClickOuntside);
  app.mount('#app');
});
