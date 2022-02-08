import KlIcon from './icon';
import KlInput from './input';
import KlDialog from './dialog';
import KlSelect from './select';
import KlButton from './button';
import KlColorSelector from './color-selector';
import KlScroll from './scroll';
import klCheckbox from './checkbox';
import { App } from 'vue';

export default {
  install(app: App<Element>) {
    KlIcon.install(app);
    KlInput.install(app);
    KlDialog.install(app);
    KlSelect.install(app);
    KlButton.install(app);
    KlColorSelector.install(app);
    KlScroll.install(app);
    klCheckbox.install(app);
  },
};
