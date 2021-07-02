<template>
  <div class="kl-input">
    <input
      class="animate zcoo"
      type="text"
      spellcheck="false"
      @input="updateInput"
      :placeholder="placeholder"
      :value="inputVal"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
export default defineComponent({
  name: 'KLInput',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
    },
  },
  setup(prop, { emit }) {
    const inputVal = ref(prop.modelValue);
    const { placeholder } = toRefs(prop);

    const updateInput = (e: KeyboardEvent) => {
      const val = (e.target as HTMLInputElement).value;
      inputVal.value = val;

      emit('update:modelValue', val);
    };

    return {
      inputVal,
      updateInput,
      placeholder,
    };
  },
});
</script>
<style lang="scss" scoped>
.kl-input {
  display: inline-block;
  width: 100%;
  height: 100%;

  input {
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
}
</style>
