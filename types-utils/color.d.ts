export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface HSB {
    h: number;
    s: number;
    b: number;
}
/**
 * @description: 创建系列颜色
 * @param {string} color base color
 * @return {string} 根元素颜色定义代码
 */
export declare function createColor(color: string): string;
/**
 * @description: HSB格式颜色 转 RGB格式颜色
 * @param {HSB} hsb
 * @return {RGB} rgb
 */
export declare function HSBToRGB(hsb: HSB): RGB;
/**
 * @description: RGB格式颜色 转 HSB 格式颜色
 * @param {RGB} rgb
 * @return {*} hsb
 */
export declare function RGBToHSB(rgb: RGB): HSB;
/**
 * @description: RGB格式颜色 转 HEX 格式颜色
 * @param {RGB} rgb
 * @return {string} hex
 */
export declare function RGBToHEX(rgb: RGB): string;
/**
 * @description: HEX格式颜色 转 RGB格式颜色
 * @param {string} hex
 * @return {RGB} rgb
 */
export declare function HEXToRGB(color: string): RGB;
export declare class ThemeHanlder {
    callBacks: Map<string, Function>;
    static instance: ThemeHanlder;
    constructor();
    static getInstance(): ThemeHanlder;
    watch(fn: Function): string;
    destroyed(key: string): void;
    dispatch(): void;
}
export declare const handler: ThemeHanlder;
export declare function setTheme(theme: string): void;
