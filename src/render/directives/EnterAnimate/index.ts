/*
 * @Author: Lixiao2
 * @Date: 2021-06-17 08:55:36
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-20 11:01:47
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ObjectDirective, DirectiveBinding } from 'vue';

type scrollHandler = (top: HTMLElement, offset: number) => void;

type scrollBox = Map<
  HTMLElement,
  {
    offset: number;
    map: Map<HTMLElement, scrollHandler>;
  }
>;

const scrollList: scrollBox = new Map();

function createScrollHandler(
  el: HTMLElement,
  binding: DirectiveBinding,
  style: string,
): scrollHandler {
  let isload: boolean = false;
  return function (top: HTMLElement, offset: number) {
    let height = top.offsetHeight + top.scrollTop;
    if (el.offsetTop <= height && !isload) {
      isload = true;
      setTimeout(() => {
        el.setAttribute(
          'style',
          `transition: transform .5s cubic-bezier(.32,.7,.47,.83);
          transform: translateY(0);
          opacity: 1;` + style,
        );
        setTimeout(() => {
          el.setAttribute('style', style);
        }, 500);
      }, 0);
    } else if (el.offsetTop > height && isload) {
      el.setAttribute(
        'style',
        `transition: transform .5s cubic-bezier(.32,.7,.47,.83); 
        transform: translateY(0);` + style,
      );
      setTimeout(() => {
        el.setAttribute(
          'style',
          `transform: translateY(${offset}px); opacity: 0.5;` + style,
        );
      }, 0);
      isload = false;
    }
  };
}

function onScroll(e: Event) {
  let box: HTMLElement = e.target as HTMLElement;
  if (!box) return;
  let child = scrollList.get(box);
  for (const scrollHandler of child.map.values()) {
    scrollHandler(box, child.offset);
  }
}

export default <ObjectDirective>{
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let parent = binding.arg as unknown as HTMLElement;
    let offset = binding.value || 40;
    if (!scrollList.has(parent)) {
      parent &&
        scrollList.set(parent, {
          offset,
          map: new Map(),
        });
      parent.addEventListener('scroll', onScroll);
    }
    let style = el.getAttribute('style');

    scrollList
      .get(parent)
      ?.map.set(el, createScrollHandler(el, binding, style));

    if (el.offsetTop > parent.offsetHeight) {
      el.setAttribute(
        'style',
        `transition: none; transform: translateY(${offset}px); opacity: 0.5;` +
          style,
      );
    }
    createScrollHandler(el, binding, style)(parent, offset);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {},
  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    let parent = binding.arg as unknown as HTMLElement;
    scrollList.get(parent)?.map.delete(el);
    let len = Object.keys(scrollList.get(parent)).length;
    if (len === 0) {
      parent.removeEventListener('scroll', onScroll);
    }
  },
};
