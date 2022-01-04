import { App } from '@vue/runtime-dom';
import KlColorSelector from './index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-color-selector', KlColorSelector);
  },
};
