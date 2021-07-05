<template>
  <button class="kl-button" :class="buttonClass">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
type ButtonType = 'normal' | 'prmary' | 'error' | 'success' | 'warning';
export default defineComponent({
  name: 'KLButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'normal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop) {
    const { type, disabled } = toRefs(prop);

    const buttonClass = computed(() => {
      let styles = [];
      if (disabled.value) styles.push('kl-button-disabled');
      styles.push(`kl-button-${type.value}`);
      return styles.join(' ');
    });
    return {
      buttonClass,
    };
  },
});
</script>
<style lang="scss" scoped>
.kl-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 6px 12px;
  @include font-size(middle);
  border-radius: 2px;
}


</style>
