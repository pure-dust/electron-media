/*
 * @Author: Lixiao2
 * @Date: 2022-01-17 10:15:13
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 10:15:14
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import type { CSSProperties } from 'vue'

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
}

export const renderThumbStyle = ({ move, size, bar }): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
})
