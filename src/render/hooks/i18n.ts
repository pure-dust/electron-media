import locales from '@/locales';
import { Index } from '@root/typings/global';
import _ from 'lodash';

interface RecursiveObject {
  [key: string]: string | RecursiveObject;
}

interface I18nOption {
  lang: string;
  message: RecursiveObject;
}

class I18n {
  private _lang: string;
  private readonly _message: RecursiveObject = {};

  constructor(option: I18nOption) {
    this._lang = option.lang;
    this._message = option.message;
  }

  set lang(lang: string) {
    this._lang = lang;
  }

  get lang(): string {
    return this._lang;
  }

  get message(): RecursiveObject {
    return this._message;
  }

  public t(key: string, template?: Index<any>): string | RecursiveObject {
    let arr = key.split('.');
    let locale: RecursiveObject | string = this._message[this._lang] as RecursiveObject;

    let i = 0;
    while (i < arr.length && locale) {
      if (typeof locale === 'string') break;
      locale = locale[arr[i]];
      i++;
    }
    let result = locale;
    if (result && /{*}/.test(result as unknown as string)) {
      if (template) {
        let keys = Object.keys(template);
        keys.forEach((el) => {
          result = (result as unknown as string).replace(new RegExp(`{${el}}`, 'g'), template[el]);
        });
      }
    }
    return result || key;
  }
}

const i18n = new I18n({
  lang: 'zh-CN',
  message: locales,
});

export function useI18n() {
  const setLang = (lang: string) => {
    i18n.lang = lang;
  };
  return {
    locales: i18n.message,
    lang: i18n.lang,
    t: i18n.t.bind(i18n),
    setLang,
  };
}
