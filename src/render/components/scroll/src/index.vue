<template>
  <div class="kl-scroll">
    <div class="kl-scroll-wrapper" ref="wrapperRef" @wheel="onMouseWheel">
      <div
        class="kl-scroll-inner"
        ref="scrollRef"
        @mouseenter="mouseEnter"
        @mouseleave="mouseleave"
      >
        <slot></slot>
      </div>
    </div>

    <div
      v-if="showX"
      v-show="showThumb"
      :style="width"
      class="kl-scroll-thumb-x"
    ></div>
    <div
      v-if="showY"
      v-show="showThumb"
      :style="height"
      class="kl-scroll-thumb-y"
    ></div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  onUnmounted,
  computed,
  nextTick,
} from 'vue';

export default defineComponent({
  name: 'KlScroll',
  setup() {
    const wrapperRef: Ref<HTMLElement> = ref(null);
    const scrollRef: Ref<HTMLElement> = ref(null);
    const wrapperHeight = ref(0);
    const wrapperWidth = ref(0);
    const realHeight = ref(0);
    const realWidth = ref(0);
    const showX = ref(false);
    const showY = ref(false);
    const showThumb = ref(false);

    const translateX = ref(0);
    const translateY = ref(0);

    const mouseEnter = () => {
      showThumb.value = true;
    };

    const height = computed(() => {
      return {
        height:
          ((wrapperHeight.value / realHeight.value) * 100).toFixed(2) + '%',
        transform: `translateY(${translateY.value}px)`,
      };
    });

    const width = computed(() => {
      return {
        width: ((wrapperWidth.value / realWidth.value) * 100).toFixed(2) + '%',
      };
    });

    const mouseleave = () => {
      showThumb.value = false;
    };

    const update = () => {
      wrapperHeight.value = wrapperRef.value.offsetHeight;
      wrapperWidth.value = wrapperRef.value.offsetWidth;
      realHeight.value = scrollRef.value.offsetHeight;
      realWidth.value = scrollRef.value.offsetWidth;
      showX.value = realWidth.value > wrapperWidth.value;
      showY.value = realHeight.value > wrapperHeight.value;
    };

    const resizeObserver = new ResizeObserver(update);

    onMounted(() => {
      update();
      resizeObserver.observe(scrollRef.value);
    });

    onUnmounted(() => {
      resizeObserver.disconnect();
    });

    const onMouseWheel = (e: WheelEvent) => {
      translateY.value = wrapperRef.value.scrollTop;
    };

    return {
      scrollRef,
      wrapperRef,
      width,
      height,
      showX,
      showY,
      showThumb,
      mouseEnter,
      mouseleave,
      onMouseWheel,
    };
  },
});
</script>
<style lang="scss" scoped>
$offset: calc(100% + 0px);
.kl-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0;
      background: transparent;
    }
  }

  &-thumb-x,
  &-thumb-y {
    position: absolute;
    box-shadow: inset 0 0 0 8px themed(primary);
  }

  &-thumb-x {
    bottom: 0;
    left: 0;
    height: 5px;
  }

  &-thumb-y {
    right: 0;
    width: 5px;
    top: 0;
  }
}
</style>
