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
    />
    <textarea
      v-else
      class="animate zcoo"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      rows="3"
    ></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, PropType } from 'vue';
type inputType = 'text' | 'textarea';
export default defineComponent({
  name: 'KlInput',
  props: {
    modelValue: [String, Number],
    placeholder: {
      type: [String, Number],
      default: '请输入',
    },
    type: {
      type: String as PropType<inputType>,
      default: 'text',
    },
  },
  setup(prop, { emit }) {
    const inputVal = ref(prop.modelValue);
    const { placeholder, type } = toRefs(prop);

    const updateInput = (e: KeyboardEvent) => {
      const val = (e.target as HTMLInputElement).value;
      inputVal.value = val;

      emit('update:modelValue', val);
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
  height: 100%;

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
