import { Index } from '../typings/global';
/**
 * @description: 阻止事件一定时间内多次触发
 * @param {Function} fn
 * @param {number} circle
 * @return {Function}
 */
export declare function timing(fn: Function, circle: number): Function;
/**
 * @description: 生成三次贝塞尔曲线方程
 * @param {*} 控制点坐标
 * @return {*}
 */
export declare class Cubic {
    px1: number;
    px2: number;
    px3: number;
    py1: number;
    py2: number;
    py3: number;
    epsilon: number;
    constructor(a: number, b: number, c: number, d: number);
    getX(t: number): number;
    getY(t: number): number;
    solve(x: number): number;
}
export declare function themed(key: string): string;
/**
 * @description: 重置源对象属性
 * @param {target} 源对象
 * @return {void}
 */
export declare function reset(target: Index<any>, init?: boolean): void;
export declare function dateFormat(date: Date, fmt?: string): string;
