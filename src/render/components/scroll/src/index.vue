<template>
  <div class='kl-scroll' ref='wrapperRef'>
    <div class='kl-scroll-inner' ref='scrollRef' @mouseenter='mouseEnter' @mouseleave='mouseleave'>
      <slot></slot>
    </div>
    <div v-if='showX' v-show='showThumb' class='kl-scroll-thumb-x'></div>
    <div v-if='showY' v-show='showThumb' class='kl-scroll-thumb-y'></div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, Ref, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'KlScroll',
  components: {},
  props: {},
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


    const thumb = ref({
      width: 0,
      height: 0,
    });

    const mouseEnter = () => {
      showThumb.value = true;
    };

    const mouseleave = () => {
      showThumb.value = false;
    };

    onMounted(() => {
      wrapperHeight.value = wrapperRef.value.offsetHeight;
      wrapperWidth.value = wrapperRef.value.offsetWidth;
      realHeight.value = scrollRef.value.offsetHeight;
      realWidth.value = scrollRef.value.offsetWidth;
      showX.value = realWidth.value > wrapperWidth.value;
      showY.value = realHeight.value > wrapperHeight.value;
    });


    return {
      scrollRef,
      wrapperRef,
      wrapperHeight,
      realWidth,
      wrapperWidth,
      realHeight,
      showX,
      showY,
      showThumb,
      mouseEnter,
      mouseleave,
    };
  },
});
</script>
<style lang='scss' scoped>
$offset: calc(100% + 8px);
.kl-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &-inner {
    overflow: auto;
    width: $offset;
    height: $offset;
    margin-right: -8px;
    margin-bottom: -8px;

    &::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }
  }

  &-thumb-x, &-thumb-y {
    position: absolute;
    box-shadow: inset 0 0 0 8px themed(primary);
  }

  &-thumb-x {
    height: 5px;
  }

  &-thumb-y {
    width: 5px;
  }
}
</style>
