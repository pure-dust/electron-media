import KLIcon from '@/components/Icon/index.vue';
import KLInput from '@/components/Input/index.vue';
import KLDialog from '@/components/Dialog/index.vue';
import KLSelect from '@/components/Select/index.vue';
import KLButton from '@/components/Button/index.vue';
import { App } from 'vue';

export default {
  install(app: App<Element>) {
    // app.component('kl-dialog', KLDialog);
    // app.component('kl-icon', KLIcon);
    // app.component('kl-input', KLInput);
    // app.component('kl-select', KLSelect);
    // app.component('kl-button', KLButton);

    app.component(KLDialog.name, KLDialog);
    app.component(KLIcon.name, KLIcon);
    app.component(KLInput.name, KLInput);
    app.component(KLSelect.name, KLSelect);
    app.component(KLButton.name, KLButton);
  },
};
