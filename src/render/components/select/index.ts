import { App } from '@vue/runtime-dom';
import KLSelect from './src/index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-select', KLSelect);
  },
};
