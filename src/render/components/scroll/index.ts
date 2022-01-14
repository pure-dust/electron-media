import { App } from '@vue/runtime-dom';
import KlScroll from './src/index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-scroll', KlScroll);
  },
};
