/*
 * @Author: Lixiao2
 * @Date: 2022-01-19 09:31:07
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 10:09:52
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { App } from 'vue';
import KlCheckbox from './src/index.vue';

export default {
  install(app: App<Element>) {
    app.component('kl-checkbox', KlCheckbox);
  },
};
