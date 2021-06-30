/*
 * @Author: Lixiao2
 * @Date: 2021-06-11 10:05:23
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 09:15:04
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */

type colorType = {
  [key: string]: string;
  '--theme': string;
  '--primary': string;
  '--primary-hover': string;
  '--primary-light': string;
  '--success': string;
  '--success-hover': string;
  '--success-light': string;
  '--disabled': string;
  '--disabled-hover': string;
  '--disabled-light': string;
  '--bg-light': string;
  '--bg-dark': string;
  '--font-dark': string;
  '--font-light': string;
  '--border-dark': string;
  '--border-light': string;
};

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
 * @description: 混色器
 * @param {string} color1
 * @param {string} color2
 * @param {number} color2 rate
 * @return {string} HEX color
 */
function colourBlend(c1: string, c2: string, ratio: number): string {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  let r1 = parseInt(c1.substring(1, 3), 16);
  let g1 = parseInt(c1.substring(3, 5), 16);
  let b1 = parseInt(c1.substring(5, 7), 16);
  let r2 = parseInt(c2.substring(1, 3), 16);
  let g2 = parseInt(c2.substring(3, 5), 16);
  let b2 = parseInt(c2.substring(5, 7), 16);
  let r = Math.round(r1 * (1 - ratio) + r2 * ratio) + '';
  let g = Math.round(g1 * (1 - ratio) + g2 * ratio) + '';
  let b = Math.round(b1 * (1 - ratio) + b2 * ratio) + '';
  r = parseInt(r).toString(16);
  g = parseInt(g).toString(16);
  b = parseInt(b).toString(16);
  r.length == 1 && (r = '0' + r);
  g.length == 1 && (g = '0' + g);
  b.length == 1 && (b = '0' + b);
  return '#' + r + g + b;
}

/**
 * @description: 颜色加深减淡
 * @param {string} col color
 * @param {number} amt rate +减淡 -加深
 * @return {string} HEX color
 */
function LightenDarkenColor(col: string, amt: number): string {
  let usePound = false;
  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

/**
 * @description: 创建系列颜色
 * @param {string} color base color
 * @return {string} 根元素颜色定义代码
 */
export function createColor(color: string): string {
  let success = colourBlend(color, '#00ff00', 0.6);
  let disabled = colourBlend(color, '#AAAAAA', 0.7);
  let theme: colorType = {
    '--theme': color,
    '--primary': color,
    '--primary-hover': colourBlend(color, '#FFFFFF', 0.2),
    '--primary-light': LightenDarkenColor(color, 50),
    '--success': colourBlend(color, '#00ff00', 0.6),
    '--success-hover': colourBlend(success, '#FFFFFF', 0.2),
    '--success-light': LightenDarkenColor(success, 50),
    '--disabled': disabled,
    '--disabled-hover': colourBlend(disabled, '#FFFFFF', 0.2),
    '--disabled-light': LightenDarkenColor(disabled, 50),
    '--bg-light': colourBlend(color, '#FFFFFF', 0.95),
    '--bg-dark': colourBlend(color, '#000000', 0.8),
    '--font-dark': colourBlend(color, '#000000', 0.7),
    '--font-light': colourBlend(color, '#FFFFFF', 0.9),
    '--border-dark': LightenDarkenColor(colourBlend(color, '#000000', 0.9), 50),
    '--border-light': LightenDarkenColor(colourBlend(color, '#FFFFFF', 0.9), -30),
  };
  let str: string = '';
  for (const key in theme) {
    str += `${key}: ${theme[key]};`;
  }
  return str;
}

/**
 * @description: HSB格式颜色 转 RGB格式颜色
 * @param {HSB} hsb
 * @return {RGB} rgb
 */
export function HSBToRGB(hsb: HSB): RGB {
  let rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let h = Math.round(hsb.h);
  let s = Math.round((hsb.s * 255) / 100);
  let v = Math.round((hsb.b * 255) / 100);

  if (s == 0) {
    rgb.r = rgb.g = rgb.b = v;
  } else {
    let t1 = v;
    let t2 = ((255 - s) * v) / 255;
    let t3 = ((t1 - t2) * (h % 60)) / 60;

    if (h == 360) h = 0;

    if (h < 60) {
      rgb.r = t1;
      rgb.b = t2;
      rgb.g = t2 + t3;
    } else if (h < 120) {
      rgb.g = t1;
      rgb.b = t2;
      rgb.r = t1 - t3;
    } else if (h < 180) {
      rgb.g = t1;
      rgb.r = t2;
      rgb.b = t2 + t3;
    } else if (h < 240) {
      rgb.b = t1;
      rgb.r = t2;
      rgb.g = t1 - t3;
    } else if (h < 300) {
      rgb.b = t1;
      rgb.g = t2;
      rgb.r = t2 + t3;
    } else if (h < 360) {
      rgb.r = t1;
      rgb.g = t2;
      rgb.b = t1 - t3;
    } else {
      rgb.r = 0;
      rgb.g = 0;
      rgb.b = 0;
    }
  }

  return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
}

/**
 * @description: RGB格式颜色 转 HSB 格式颜色
 * @param {RGB} rgb
 * @return {*} hsb
 */
export function RGBToHSB(rgb: RGB): HSB {
  let hsb = { h: 0, s: 0, b: 0 };
  let min = Math.min(rgb.r, rgb.g, rgb.b);
  let max = Math.max(rgb.r, rgb.g, rgb.b);
  let delta = max - min;
  hsb.b = max;
  hsb.s = max != 0 ? (255 * delta) / max : 0;
  if (hsb.s != 0) {
    if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
    else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
    else hsb.h = 4 + (rgb.r - rgb.g) / delta;
  } else hsb.h = -1;
  hsb.h *= 60;
  if (hsb.h < 0) hsb.h += 360;
  hsb.s *= 100 / 255;
  hsb.b *= 100 / 255;
  hsb.h = Math.round(hsb.h);
  hsb.s = Math.round(hsb.s);
  hsb.b = Math.round(hsb.b);
  return hsb;
}

/**
 * @description: RGB格式颜色 转 HEX 格式颜色
 * @param {RGB} rgb
 * @return {string} hex
 */
export function RGBToHEX(rgb: RGB) {
  let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
  hex.map(function (str, i) {
    if (str.length == 1) {
      hex[i] = '0' + str;
    }
  });
  return '#' + hex.join('');
}

/**
 * @description: HEX格式颜色 转 RGB格式颜色
 * @param {string} hex
 * @return {RGB} rgb
 */
export function HEXToRGB(color: string): RGB {
  let rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  rgb.r = parseInt(color.substring(1, 3), 16);
  rgb.g = parseInt(color.substring(3, 5), 16);
  rgb.b = parseInt(color.substring(5, 7), 16);
  return rgb;
}
