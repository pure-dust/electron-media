import { App } from '@vue/runtime-dom';
import KLInput from './index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-input', KLInput);
  },
};
