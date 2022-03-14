<template>
  <div class="kl-input">
    <input
      v-if="type === 'text'"
      class="animate zcoo"
      :type="type"
      spellcheck="false"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      :readonly="readonly"
      :style="computedStyle"
    />
    <input
      v-else-if="type === 'number'"
      class="animate zcoo"
      :type="type"
      spellcheck="false"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      :readonly="readonly"
      :style="computedStyle"
    />
    <textarea
      v-else="type === 'textarea'"
      class="animate zcoo"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
      :readonly="readonly"
      :style="computedStyle"
      rows="3"
    ></textarea>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  onMounted,
  PropType,
  watch,
  computed,
} from 'vue';
type inputType = 'text' | 'textarea' | 'number';
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
    color: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  emits: {
    'update:modelValue'() {
      return true;
    },
    change(payload: string | number | '') {
      return payload ?? false;
    },
  },
  setup(prop, { emit }) {
    const inputVal = ref(prop.modelValue);
    const { placeholder, type } = toRefs(prop);
    const computedStyle = computed(() => {
      let style: { color?: string; background?: string } = {};
      prop.color ? (style.color = prop.color) : undefined;
      prop.background ? (style.background = prop.background) : undefined;
      return style;
    });

    watch(
      () => prop.modelValue,
      (v) => {
        if (prop.type === 'number') {
          inputVal.value = +v;
        } else {
          inputVal.value = v;
        }
      },
    );

    const updateInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      if (prop.type === 'number') {
        inputVal.value = +val;
      } else {
        inputVal.value = val;
      }
      emit('update:modelValue', inputVal.value);
      emit('change', inputVal.value);
    };

    onMounted(() => {
      inputVal.value = prop.modelValue;
    });

    return {
      inputVal,
      updateInput,
      placeholder,
      type,
      computedStyle,
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
    appearance: none;
    outline: none;

    &:focus {
      border: 1px solid themed(primary-dark);
      box-shadow: 0 0 5px 2px themed(primary-hover);
    }

    &::-webkit-input-placeholder {
      color: themed(disabled);
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
