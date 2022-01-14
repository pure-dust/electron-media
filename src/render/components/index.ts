import KLIcon from './icon/src/index.vue';
import KLInput from './input/src/index.vue';
import KLDialog from './dialog/src/index.vue';
import KLSelect from './select/src/index.vue';
import KLButton from './button/src/index.vue';
import KLColorSelector from './color-selector/src/index.vue';
import KLScroll from './scroll/src/index.vue';
import { App } from 'vue';

export default {
  install(app: App<Element>) {
    app.component(KLDialog.name, KLDialog);
    app.component(KLIcon.name, KLIcon);
    app.component(KLInput.name, KLInput);
    app.component(KLSelect.name, KLSelect);
    app.component(KLButton.name, KLButton);
    app.component(KLColorSelector.name, KLColorSelector);
    app.component(KLScroll.name, KLScroll);
  },
};
