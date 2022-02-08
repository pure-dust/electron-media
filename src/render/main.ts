import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { preload } from '@/utils/preload';
import router from './router';
import App from './App.vue';

import ClickWave from '@/directives/ClickWave';
import ClickOuntside from '@/directives/ClickOutside';
import EnterAnimate from './directives/EnterAnimate';

import './styles/index.scss';
import '@/assets/font/font.scss';

import KlUI from '@/components';

import { useStore } from '@/store/config';

const app = createApp(App);
app.use(createPinia());
app.use(KlUI);
app.use(router);
app.directive('click-wave', ClickWave);
app.directive('click-outside', ClickOuntside);
app.directive('enter-ani', EnterAnimate);
preload().then((message) => {
  const store = useStore();
  store.setTheme(message.theme);
  store.setNovel(message.novel);
  store.setLang(message.lang);
  app.mount('#app');
});
