<template>
  <div class="kl-input">
    <input
      v-if="type != 'textarea'"
      class="animate zcoo"
      :type="type"
      spellcheck="false"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      :readonly="readonly"
    />
    <textarea
      v-else
      class="animate zcoo"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      :readonly="readonly"
      rows="3"
    ></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, PropType, watch } from 'vue';
type inputType = 'text' | 'textarea';
export default defineComponent({
  name: 'KlInput',
  props: {
    modelValue: [String, Number],
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String as PropType<inputType>,
      default: 'text',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue'() {},
    change(payload: string | number | '') {
      return payload ?? false;
    },
  },
  setup(prop, { emit }) {
    const inputVal = ref(prop.modelValue);
    const { placeholder, type } = toRefs(prop);

    watch(
      () => prop.modelValue,
      (v) => {
        inputVal.value = v;
      },
    );

    const updateInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      inputVal.value = val;
      emit('update:modelValue', val);
      emit('change', val);
    };

    onMounted(() => {
      inputVal.value = prop.modelValue;
    });

    return {
      inputVal,
      updateInput,
      placeholder,
      type,
    };
  },
});
</script>
<style lang="scss">
.kl-input {
  display: inline-block;
  width: 100%;
  height: 28px;

  input,
  textarea {
    min-height: 24px;
    display: block;
    width: 100%;
    height: 100%;
    padding: 4px 8px;
    border: 1px solid themed(primary);
    border-radius: 2px;
    color: themed(primary);
    letter-spacing: 1px;
    text-decoration: none;

    &:focus {
      border: 1px solid themed(primary-dark);
      box-shadow: 0 0 5px 2px themed(primary-hover);
    }

    &::-webkit-input-placeholder {
      color: themed(disabled);
    }
  }

  textarea {
    outline: none;
    resize: none;
    min-height: 52px;
    font-size: 13.3333px;
    font-weight: 400;

    &::-webkit-scrollbar {
      width: 4px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      @include background(primary);
    }
  }
}
</style>
