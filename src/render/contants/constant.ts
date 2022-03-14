/*
 * @Author: lixiao
 * @Date: 2021-07-05 16:39:47
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-03-11 11:07:55
 * @Description: Do not edit
 * @Email: 932184220@qq.com
 */
import { Index } from "@root/typings/global";

export const SCHEDULE_TYPE = {
  MEETING: 1,
  TRAVEL: 2,
};

export const SCHEDULE_SELECT = [
  { name: '会议', value: SCHEDULE_TYPE.MEETING },
  { name: '出行', value: SCHEDULE_TYPE.TRAVEL },
];

export const NOVEL_CONFIG: Index<'text'|'color'|'check'|'number'> = {
  color: 'color',
  size: 'number',
  background: 'color',
  count: 'number',
  lineHeight: 'number',
  transparent: 'check',
};
