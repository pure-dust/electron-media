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

/**
 * @description: 生成三次贝塞尔曲线方程
 * @param {string} 变量名
 * @return {string} css变量值
 */

export function themed(key: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${key}`);
}
