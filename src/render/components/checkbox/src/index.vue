<!--
 * @Author: Lixiao2
 * @Date: 2022-01-19 09:31:14
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 14:44:14
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <label :class="['kl-checkbox', computedClass]">
    <span role="checkbox" :aria-checked="is_check" class="kl-checkbox-inner">
    </span>
    <input
      type="checkbox"
      @change="onChange"
      @focus="is_focus = true"
      @blur="is_focus = false"
    />
  </label>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'KlCheckbox',
  props: {
    modelValue: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(prop, { emit }) {
    const is_check = ref(prop.modelValue);
    const is_focus = ref(false);

    const onChange = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).checked);
      emit('change', (e.target as HTMLInputElement).checked);
      is_check.value = (e.target as HTMLInputElement).checked;
    };

    const computedClass = computed(() => {
      let arr = [];
      prop.disabled ? arr.push('is-disabled') : undefined;
      is_check.value ? arr.push('is-check') : undefined;
      is_focus.value ? arr.push('is-focus') : undefined;
      return arr.join(' ');
    });
    return {
      onChange,
      is_check,
      is_focus,
      computedClass,
    };
  },
});
</script>
<style lang="scss" scoped>
.kl-checkbox {
  width: 16px;
  height: 16px;
  display: block;

  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    background: themed(bg-light);
    border: 1px solid themed(border-light);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &::after {
      position: absolute;
      content: '';
      display: block;
      border: 2px solid themed(font-light);
      border-top: 0;
      border-right: 0;
      width: 7px;
      height: 3px;
      top: 3px;
      left: 3px;
      transform-origin: center;
      transform: rotate(-50deg) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  input {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  &.is-check {
    .kl-checkbox-inner {
      background: themed(primary);

      &::after {
        transform: rotate(-50deg) scale(1);
      }
    }
  }
}
</style>
