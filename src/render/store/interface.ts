/*
 * @Author: Lixiao2
 * @Date: 2021-06-02 09:18:36
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 11:21:38
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { SystemState } from './module/config';
import { NoticeStateType } from './module/notice';
import { CanlendarStateType } from './module/calendar';

export interface RootTypes {}

export default interface AllStateType {
  system: SystemState;
  notice: NoticeStateType;
  calendar: CanlendarStateType;
}
