import { Index } from "@root/typings/global";

export const SCHEDULE_TYPE = {
  MEETING: 1,
  TRAVEL: 2,
};

export const SCHEDULE_SELECT = [
  { name: '会议', value: SCHEDULE_TYPE.MEETING },
  { name: '出行', value: SCHEDULE_TYPE.TRAVEL },
];

export const NOVEL_CONFIG: Index<'input'|'color'|'check'> = {
  color: 'color',
  size: 'input',
  background: 'color',
  count: 'input',
  lineHeight: 'input',
  transparent: 'check',
};
