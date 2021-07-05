import { App } from '@vue/runtime-dom';
import KLButton from './index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-button', KLButton);
  },
};
