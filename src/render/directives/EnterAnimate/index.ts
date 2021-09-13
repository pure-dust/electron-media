/*
 * @Author: Lixiao2
 * @Date: 2021-06-17 08:55:36
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-17 17:17:11
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ObjectDirective, DirectiveBinding } from 'vue';

type scrollHandler = (top: HTMLElement) => void;

type scrollBox = Map<HTMLElement, Map<HTMLElement, scrollHandler>>;

const scrollList: scrollBox = new Map();

function createScrollHandler(
  el: HTMLElement,
  binding: DirectiveBinding,
  style: string,
): scrollHandler {
  let isload: boolean = false;
  return function (top: HTMLElement) {
    let height = top.offsetHeight + top.scrollTop;
    if (el.offsetTop <= height && !isload) {
      isload = true;
      setTimeout(() => {
        el.setAttribute(
          'style',
          `transition: all .5s cubic-bezier(.32,.7,.47,.83);
          position:relative;
          top: 0;
          opacity: 1;` + style,
        );
        setTimeout(() => {
          el.setAttribute('style', style);
        }, 500);
      }, 0);
    } else if (el.offsetTop > height && isload) {
      el.setAttribute(
        'style',
        `transition: all .5s cubic-bezier(.32,.7,.47,.83); 
        position:relative; top:0;` + style,
      );
      setTimeout(() => {
        el.setAttribute('style', el.getAttribute('style') + 'top: 20px; opacity: 0.5;');
      }, 0);
      isload = false;
    }
  };
}

function onScroll(e: Event) {
  let box: HTMLElement = e.target as HTMLElement;
  if (!box) return;
  let child = scrollList.get(box) as Map<HTMLElement, scrollHandler>;
  for (const scrollHandler of child.values()) {
    scrollHandler(box);
  }
}

export default <ObjectDirective>{
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let parent = binding.arg as unknown as HTMLElement;
    if (!scrollList.has(parent)) {
      parent && scrollList.set(parent, new Map());
      parent.addEventListener('scroll', onScroll);
    }
    let style = el.getAttribute('style') as string;

    scrollList.get(parent)?.set(el, createScrollHandler(el, binding, style));
    el.setAttribute(
      'style',
      'transition: none; position:relative; top: 20px; opacity: 0.5;' + style,
    );
    createScrollHandler(el, binding, style)(parent);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {},
  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    let parent = binding.arg as unknown as HTMLElement;
    scrollList.get(parent)?.delete(el);
    let len = Object.keys(
      scrollList.get(parent) as unknown as Map<HTMLElement, scrollHandler>,
    ).length;
    if (len == 0) {
      parent.removeEventListener('scroll', onScroll);
    }
  },
};
