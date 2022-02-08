<!--
 * @Author: Lixiao2
 * @Date: 2022-01-17 10:12:29
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 16:25:49
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <transition name="fade">
    <div
      v-show="always || visible"
      ref="instance"
      :class="['kl-scroll__bar', 'is-' + bar.key]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        :class="['kl-scroll__thumb', { 'is-dark': dark }]"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  toRef,
  Ref,
} from 'vue';
import { BAR_MAP, renderThumbStyle } from './util';
import { useEventListener } from '@vueuse/core';

const COMPONENT_NAME = 'Bar';
export default defineComponent({
  name: COMPONENT_NAME,
  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    ratio: {
      type: Number,
      required: true,
    },
    always: Boolean,
    dark: Boolean,
  },

  setup(props) {
    const scrollbar: {
      scrollbarElement: Ref<HTMLElement>;
      wrapElement: Ref<HTMLElement>;
    } = inject('scroll');

    const instance = ref<HTMLDivElement>();
    const thumb = ref<HTMLDivElement>();

    const barStore = ref({});
    const visible = ref(false);

    let cursorDown = false;
    let cursorLeave = false;
    let onselectstartStore:
      | ((this: GlobalEventHandlers, ev: Event) => any)
      | null = null;

    const bar = computed(
      () => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'],
    );

    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value,
      }),
    );

    const offsetRatio = computed(
      () =>
        instance.value![bar.value.offset] ** 2 /
        scrollbar.wrapElement![bar.value.scrollSize] /
        props.ratio /
        thumb.value![bar.value.offset],
    );

    const clickThumbHandler = (e: MouseEvent) => {
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) return;

      window.getSelection()?.removeAllRanges();
      startDrag(e);

      const el = e.currentTarget as HTMLDivElement;
      if (!el) return;
      barStore.value[bar.value.axis] =
        el[bar.value.offset] -
        (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };

    const clickTrackHandler = (e: MouseEvent) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement) return;

      const offset = Math.abs(
        (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client],
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * offsetRatio.value) /
        instance.value[bar.value.offset];

      scrollbar.wrapElement[bar.value.scroll] =
        (thumbPositionPercentage *
          scrollbar.wrapElement[bar.value.scrollSize]) /
        100;
    };

    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      document.addEventListener('mousemove', mouseMoveDocumentHandler);
      document.addEventListener('mouseup', mouseUpDocumentHandler);
      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    };

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.value || !thumb.value) return;
      if (cursorDown === false) return;

      const prevPage = barStore.value[bar.value.axis];
      if (!prevPage) return;

      const offset =
        (instance.value.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]) *
        -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * offsetRatio.value) /
        instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] =
        (thumbPositionPercentage *
          scrollbar.wrapElement[bar.value.scrollSize]) /
        100;
    };

    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      barStore.value[bar.value.axis] = 0;
      document.removeEventListener('mousemove', mouseMoveDocumentHandler);
      document.removeEventListener('mouseup', mouseUpDocumentHandler);
      document.onselectstart = onselectstartStore;
      if (cursorLeave) visible.value = false;
    };

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = true;
    };

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };

    onBeforeUnmount(() =>
      document.removeEventListener('mouseup', mouseUpDocumentHandler),
    );

    useEventListener(
      toRef(scrollbar, 'scrollbarElement'),
      'mousemove',
      mouseMoveScrollbarHandler,
    );
    useEventListener(
      toRef(scrollbar, 'scrollbarElement'),
      'mouseleave',
      mouseLeaveScrollbarHandler,
    );

    return {
      instance,
      thumb,
      bar,
      thumbStyle,
      visible,
      clickTrackHandler,
      clickThumbHandler,
    };
  },
});
</script>
<style lang="scss">
.kl-scroll__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;

  &.is-horizontal {
    height: 6px;
    left: 2px;

    & > div {
      height: 100%;
    }
  }

  &.is-vertical {
    width: 6px;
    top: 2px;

    & > div {
      width: 100%;
    }
  }

  .kl-scroll__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: themed(primary);
    transition: 0.3s background-color;
    opacity: 0.8;

    &.is-dark {
      background-color: themed(primary-light);
    }
  }
}
</style>
