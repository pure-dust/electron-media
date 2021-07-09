import _ from 'lodash';
/**
 * @description 生成日程卡片坐标与大小
 * @param target 目标日程数据
 */
interface LeftAndWidth {
  x: number,
  
}

export function getPositon(
  target: ScheduleType,
  existedList: Array<ScheduleListType>,
  height: number = 40,
  width: number = 160,
): SchedulePosType {
  const { start, end } = target;

  return {
    top: getTop(start, height),
    left: getLeft(target, existedList, width),
    width: getWidth(target, existedList, width),
    height: getHeight(start, end),
  };
}

function getTop(start: string, height: number): number {
  let time = start.split(':');
  return parseInt(time[0]) * height + (time[1] === '00' ? 0 : height / 2);
}

export function getLeft(
  target: ScheduleType,
  existedList: Array<ScheduleListType>,
  width: number,
  exclude?: boolean,
): number {
  const overlopList: Array<ScheduleListType> = [];
  if (exclude) {
    let index = _.findIndex(existedList, (el) => el.schedule._id === target._id);
    _.forEach(_.slice(existedList, 0, index), (el) => {
      if (isOverlap(target, el.schedule)) overlopList.push(el);
    });
  } else {
    _.forEach(existedList, (el) => {
      if (isOverlap(target, el.schedule)) overlopList.push(el);
    });
    let t = _.sortBy(overlopList, (v) => {
      return parseInt(v.schedule.start.replace(':', ''));
    });
    if (t.length === 1) {
      if (t[0].position.left > 0) return 0;
    }
    let i = 0;
    while (i < t.length - 1) {
      if (t[i].position.left > 0) return 0;
      else if (t[i].position.left + t[i].position.width < t[i + 1].position.left) {
        return t[i].position.left + t[i].position.width;
      }
      i++;
    }
  }
  let w = getWidth(target, existedList, width);
  return overlopList.length * w;
}

export function getLeftAndWidth(
  target: ScheduleType,
  existedList: Array<ScheduleListType>,
  width: number,
  exclude?: boolean,
) {}

export function getWidth(
  target: ScheduleType,
  existedList: Array<ScheduleListType>,
  width: number,
  exclude?: boolean,
): number {
  const overlopList = [];
  _.forEach(existedList, (el) => {
    if (isOverlap(target, el.schedule)) overlopList.push(el);
  });
  if (exclude) {
  } else {
    let length = overlopList.length + 1;
    return Math.floor(width / length);
  }
  let length = overlopList.length + 1;
  return Math.floor(width / length);
}

function getHeight(start: string, end: string): number {
  let startTime = start.split(':');
  let endTime = end.split(':');
  let hour = parseInt(end[0]) - parseInt(start[0]);
  let height = hour * 40;
  if (startTime[1] == '30') height -= 20;
  if (endTime[1] == '30') height += 20;
  return height - 1;
}

function isOverlap(target: ScheduleType, source: ScheduleType): boolean {
  let t_start = parseInt(target.start.split(':').join(''));
  let t_end = parseInt(target.end.split(':').join(''));
  let s_start = parseInt(source.start.split(':').join(''));
  let s_end = parseInt(source.end.split(':').join(''));
  return !(t_end <= s_start || t_start >= s_end) && target._id !== source._id;
}
