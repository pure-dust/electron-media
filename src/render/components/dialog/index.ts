import { App } from '@vue/runtime-dom';
import Dialog from './src/index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-dialog', Dialog);
  },
};
