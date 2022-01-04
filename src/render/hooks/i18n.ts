import locales from '@/locales';
import _ from 'lodash';

let lang = 'zh-cn';
export function useI18n() {
  const t = (key: string) => {
    let search = key.split('.');
    let val = _.cloneDeep(locales[lang]);
    for (let i = 0; i < search.length; i++) {
      // @ts-ignore
      val = val?.[search[i]];
    }
    return val || key;
  };

  const setLang = (l: string) => {
    lang = l;
  };
  return {
    locales,
    lang,
    t,
    setLang,
  };
}
