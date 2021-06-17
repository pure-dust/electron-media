<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:44:18
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-17 16:45:37
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="card-container animate" :style="style"></div>
</template>
<script lang="ts">
import { defineComponent, toRefs, PropType, computed } from 'vue';
export default defineComponent({
  name: '',
  components: {},
  props: {
    option: {
      type: Object as PropType<CardOption>,
    },
  },
  setup(prop, _) {
    const { option } = toRefs(prop);

    const style = computed(() => {
      let style = {
        height: option?.value?.height + 'px',
      };
      return style;
    });

    return {
      style,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/_handle.scss';

.card-container {
  width: 100%;
  height: 100%;
  @include background('primary');
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px 5px themed('border-light-color');
  }

  &:active {
    transform: scale(1);
  }
}
</style>
