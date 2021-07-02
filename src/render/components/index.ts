import KLIcon from '@/components/Icon/index.vue';
import KLInput from '@/components/Input/index.vue';
import KLDialog from '@/components/dialog/index.vue';
import { App } from 'vue';

export default {
  install(app: App<Element>) {
    app.component('kl-dialog', KLDialog);
    app.component('kl-icon', KLIcon);
    app.component('kl-input', KLInput);
  },
};
