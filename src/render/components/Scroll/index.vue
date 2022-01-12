<template>
  <div class="kl-scroll">
    <div class="kl-scroll-inner">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'KlScroll',
  components: {},
  props: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
.kl-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-right: -8px;

  &-inner {
    overflow: auto;
    width: calc(100% + 8px);
    height: 100%;

    &::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      width: 8px;
      box-shadow: inset 0 0 0 8px themed(primary);
    }
  }
}
</style>
