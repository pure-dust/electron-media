import { App } from '@vue/runtime-dom';
import Icon from './index.vue';

export default {
  install(app: App<Element>) {
    app.component('Icon', Icon);
  },
};
