<!--
 * @Author: Lixiao2
 * @Date: 2022-01-19 09:40:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-03-11 11:08:02
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="kl-dynamic-input">
    <label class="kl-dynamic-input-name" :style="style">
      {{ label }}{{ split ? split : '' }}
    </label>
    <div class="kl-dynamic-input-inner">
      <kl-input
        v-if="type === 'text'"
        v-model="value"
        @change="onChange"
        :color="color"
        :background="background"
      ></kl-input>
      <kl-input
        v-else-if="type === 'number'"
        :type="type"
        v-model="value"
        @change="onChange"
        :color="color"
        :background="background"
      ></kl-input>
      <kl-color-selector
        v-else-if="type === 'color'"
        :default-value="value"
        auto-size
        v-model="value"
        @change="onChange"
      >
        <template #reference>
          <kl-input
            v-model="value"
            :readonly="true"
            :color="color"
            :background="background"
          ></kl-input>
        </template>
      </kl-color-selector>
      <kl-checkbox v-else v-model="value" @change="onChange"> </kl-checkbox>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, CSSProperties } from 'vue';
export default defineComponent({
  name: 'KlDynamicInput',
  props: {
    label: {
      type: String,
    },
    type: {
      type: String as PropType<'text' | 'color' | 'check' | 'number'>,
    },
    modelValue: {
      type: [String, Number, Boolean],
    },
    split: {
      type: [Boolean, String],
      deafult: false,
    },
    color: {
      type: String,
    },
    background: {
      type: String,
    },
    align: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'right',
    },
    labelWidth: {
      type: [String],
      default: 'auto',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(prop, { emit }) {
    const value = computed({
      get: () => prop.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    const style = computed(() => {
      return {
        textAlign: prop.align,
        width: prop.labelWidth,
      } as CSSProperties;
    });

    const onChange = (value: any) => {
      emit('change', value);
    };

    return {
      value,
      style,
      onChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.kl-dynamic-input {
  width: 100%;
  display: inline-flex;
  align-items: center;
  font-size: themed(small-size);

  &-name {
    margin-right: 8px;
  }

  &-inner {
    flex: 1;
    width: 0;
  }
}
</style>
