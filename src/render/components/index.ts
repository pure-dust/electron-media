import KLIcon from './Icon/index.vue';
import KLInput from './Input/index.vue';
import KLDialog from './Dialog/index.vue';
import KLSelect from './Select/index.vue';
import KLButton from './Button/index.vue';
import KLColorSelector from './ColorSelector/index.vue';
import KLScroll from './Scroll/index.vue';
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
