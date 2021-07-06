/**
 * @description 生成日程卡片坐标与大小
 * @param target 目标日程数据
 */
export function getPositon(
  target: ScheduleType,
  existedList: Array<ScheduleType>,
): SchedulePosType {
  const { start } = target;

  return {
    top: getTop(start),
    left: 0,
    width: getWidth(target, existedList),
    height: 0,
  };
}
// TODO
function getWidth(target: ScheduleType, existedList: Array<ScheduleType>): number {
  return 0;
}

function getTop(start: string): number {
  let time = start.split(':');
  return parseInt(time[0]) * 40 + (time[1] === '00' ? 0 : 20);
}
