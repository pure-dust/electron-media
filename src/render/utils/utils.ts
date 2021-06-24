/*
 * @Author: Lixiao2
 * @Date: 2021-06-17 15:19:35
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 09:24:29
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
/**
 * @description: 阻止事件一定时间内多次触发
 * @param {Function} fn
 * @param {number} circle
 * @return {Function}
 */
export function timing(fn: Function, circle: number): Function {
  let startTime = +new Date();
  let timestamp;
  return function () {
    let arg = arguments;
    if (arg[0] && arg[0] instanceof WheelEvent) arg[0].preventDefault();
    timestamp = +new Date();
    if (fn(...arg, true)) {
      startTime -= circle;
      return;
    }
    if (timestamp - startTime < circle) return;
    fn(...arg);
    startTime = +new Date();
  };
}

/**
 * @description: 生成三次贝塞尔曲线方程
 * @param {*} 控制点坐标
 * @return {*}
 */
export class Cubic {
  px1: number;
  px2: number;
  px3: number;
  py1: number;
  py2: number;
  py3: number;
  epsilon: number = 1e-7;

  constructor(a: number, b: number, c: number, d: number) {
    this.px3 = 3 * a;
    this.px2 = 3 * (c - a) - this.px3;
    this.px1 = 1 - this.px3 - this.px2;
    this.py3 = 3 * b;
    this.py2 = 3 * (d - b) - this.py3;
    this.py1 = 1 - this.py3 - this.py2;
  }

  getX(t: number): number {
    return ((this.px1 * t + this.px2) * t + this.px3) * t;
  }

  getY(t: number): number {
    return ((this.py1 * t + this.py2) * t + this.py3) * t;
  }

  solve(x: number): number {
    if (x === 0 || x === 1) {
      return this.getY(x);
    }
    let t = x;
    for (let i = 0; i < 8; i++) {
      let g = this.getX(t) - x;
      if (Math.abs(g) < this.epsilon) {
        return this.getY(t);
      }
      let d = (3 * this.px1 * t + 2 * this.px2) * t + this.px3;
      if (Math.abs(d) < 1e-6) {
        break;
      }
      t = t - g / d;
    }
    return this.getY(t);
  }
}

export interface CalenarType {
  [key: string]: any;
  year: string | number;
  month: string | number;
  date: string | number;
  week: string;
  day: number;
  current: boolean;
}
export class Calenar {
  private current: Date;
  private preview: Date;

  constructor() {
    this.current = new Date();
    this.preview = new Date();
  }

  public setDate(date: Date) {
    this.preview = date;
  }

  public getCalendar(): Array<CalenarType> {
    let dateMap: Index = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期天',
    };
    let currentDate = new Array<CalenarType>();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    let curNum = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= curNum; i++) {
      let week = new Date(year, month, i).getDay();
      currentDate.push({
        year: year,
        month: month + 1,
        date: i,
        day: week,
        week: dateMap[week],
        current: true,
      });
    }
    for (let i = currentDate[0].day == 0 ? 7 : currentDate[0].day; i > 1; i--) {
      let preNum = new Date(year, month, 0).getDate();
      let preDate = new Date(year, month - 1, preNum + i - currentDate[0].day);
      currentDate.unshift({
        year: preDate.getFullYear(),
        month: preDate.getMonth() + 1,
        date: preNum + i - currentDate[0].day,
        week: dateMap[preDate.getDay()],
        day: preDate.getDay(),
        current: false,
      });
    }
    let len = currentDate.length;
    for (let i = currentDate[len - 1].day == 0 ? 7 : currentDate[len - 1].day; i < 7; i++) {
      let nextDate = new Date(year, month + 1, i - currentDate[len - 1].day + 1);
      currentDate.push({
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        date: i - currentDate[len - 1].day + 1,
        week: dateMap[nextDate.getDay()],
        day: nextDate.getDay(),
        current: false,
      });
    }
    return currentDate;
  }

  public getNext() {
    let date = this.preview.getDate();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month + 1, date);
  }

  public getPreious() {
    let date = this.preview.getDate();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month - 1, date);
  }

  public getYear() {}

  public getMonth() {}

  public getDate() {}
}
