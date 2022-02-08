import { App } from '@vue/runtime-dom';
import Icon from './src/index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-icon', Icon);
  },
};
