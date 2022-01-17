<template>
  <div ref="scrollbar$" class="kl-scroll">
    <div
      ref="wrap$"
      :class="['kl-scroll__wrap', 'kl-scroll__wrap--hidden-default']"
      :style="style"
      @scroll="handleScroll"
    >
      <component :is="tag" ref="resize$" :class="['kl-scroll__view']">
        <slot />
      </component>
    </div>
    <bar
      :move="moveX"
      :ratio="ratioX"
      :size="sizeWidth"
      :always="always"
      dark
    />
    <bar
      :move="moveY"
      :ratio="ratioY"
      :size="sizeHeight"
      vertical
      :always="always"
      dark
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  ref,
  watch,
  reactive,
} from 'vue';
import Bar from './bar.vue';
import type { StyleValue, CSSProperties } from 'vue';
import { isString, isNumber } from 'lodash';
import { useResizeObserver, useEventListener } from '@vueuse/core';

function addUnit(value: string | number) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  return '';
}

export default defineComponent({
  name: 'KlScroll',
  components: {
    Bar,
  },
  props: {
    height: {
      type: [String, Number],
      default: '',
    },
    maxHeight: {
      type: [String, Number],
      default: '',
    },
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div',
    },
    always: {
      type: Boolean,
      default: false,
    },
    minSize: {
      type: Number,
      default: 20,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['scroll'],

  setup(props, { emit }) {
    let stopResizeObserver: (() => void) | undefined = undefined;
    let stopResizeListener: (() => void) | undefined = undefined;

    const scrollbar$ = ref<HTMLDivElement>();
    const wrap$ = ref<HTMLDivElement>();
    const resize$ = ref<HTMLElement>();

    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);
    const ratioY = ref(1);
    const ratioX = ref(1);
    const GAP = 4; // top 2 + bottom 2 of bar instance

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {};
      if (props.height) style.height = addUnit(props.height);
      if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight);
      return [style];
    });

    const handleScroll = () => {
      if (wrap$.value) {
        const offsetHeight = wrap$.value.offsetHeight - GAP;
        const offsetWidth = wrap$.value.offsetWidth - GAP;

        moveY.value =
          ((wrap$.value.scrollTop * 100) / offsetHeight) * ratioY.value;
        moveX.value =
          ((wrap$.value.scrollLeft * 100) / offsetWidth) * ratioX.value;

        emit('scroll', {
          scrollTop: wrap$.value.scrollTop,
          scrollLeft: wrap$.value.scrollLeft,
        });
      }
    };

    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        return;
      }
      wrap$.value!.scrollTop = value;
    };

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        return;
      }
      wrap$.value!.scrollLeft = value;
    };

    const update = () => {
      if (!wrap$.value) return;

      const offsetHeight = wrap$.value.offsetHeight - GAP;
      const offsetWidth = wrap$.value.offsetWidth - GAP;

      const originalHeight = offsetHeight ** 2 / wrap$.value.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap$.value.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);

      ratioY.value =
        originalHeight /
        (offsetHeight - originalHeight) /
        (height / (offsetHeight - height));
      ratioX.value =
        originalWidth /
        (offsetWidth - originalWidth) /
        (width / (offsetWidth - width));

      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : '';
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : '';
    };

    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver?.();
          stopResizeListener?.();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resize$, update));
          stopResizeListener = useEventListener('resize', update);
        }
      },
      { immediate: true },
    );

    provide(
      'scroll',
      reactive({
        scrollbarElement: scrollbar$,
        wrapElement: wrap$,
      }),
    );

    onMounted(() => {
      nextTick(() => update());
    });

    return {
      scrollbar$,
      wrap$,
      resize$,

      moveX,
      moveY,
      ratioX,
      ratioY,
      sizeWidth,
      sizeHeight,
      style,
      update,
      handleScroll,
      setScrollTop,
      setScrollLeft,
    };
  },
});
</script>
<style lang="scss">
.kl-scroll {
  overflow: hidden;
  position: relative;
  height: 100%;

  &__wrap {
    overflow: auto;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
