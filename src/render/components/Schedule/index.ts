import { App } from '@vue/runtime-dom';
import Schedule from './index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-schedule', Schedule);
  },
};
