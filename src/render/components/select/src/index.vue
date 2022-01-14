<template>
  <div class="kl-select" v-click-outside="inputBlur" ref="selectRef">
    <input
      class="animate zcoo"
      type="text"
      spellcheck="false"
      :readonly="true"
      @click="inputClick"
      :placeholder="placeholder"
      :value="inputVal"
    />
    <kl-icon
      icon="icon-ic_horn_down"
      height="100%"
      width="30px"
      class="select-arrow"
      :class="{ 'select-arrow-active': dropVisible }"
      :svg-style="{ width: '20px', height: '20px' }"
      :color="themed('primary')"
    ></kl-icon>
    <teleport to="body">
      <transition :name="tansitionName">
        <div v-show="dropVisible" :style="dropStyle" class="drop-menu zcoo">
          <div v-if="options.length === 0" class="tool-tip">空</div>
          <div
            v-else
            class="drop-menu-item animate"
            :class="{ 'drop-menu-selected': inputVal === item.name }"
            v-for="(item, i) in options"
            @click="onItemClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs, onMounted, reactive } from 'vue';
import { themed } from '../../../utils';
import _ from 'lodash';

interface SelectOption {
  name: string;
  value: string | number;
}

export default defineComponent({
  name: 'KlSelect',
  props: {
    modelValue: [String, Number],
    placeholder: {
      type: [String],
      default: '请选择',
    },
    options: {
      type: Array as PropType<Array<SelectOption>>,
      default: () => [],
    },
  },
  setup(prop, { emit }) {
    const { placeholder, options } = toRefs(prop);
    const selectRef: Ref<HTMLElement | null> = ref(null);
    const inputVal = ref(prop.modelValue);
    const dropVisible: Ref<boolean> = ref(false);
    const tansitionName: Ref<string> = ref('');

    const dropStyle = reactive({
      width: '',
      top: '',
      left: '',
      maxHeight: '',
      bottom: '',
    });

    const inputBlur = () => {
      dropVisible.value = false;
    };

    const inputClick = () => {
      dropVisible.value = !dropVisible.value;
    };

    const onItemClick = (item: SelectOption) => {
      inputVal.value = item.name;
      emit('update:modelValue', item.value);
      dropVisible.value = false;
    };

    onMounted(() => {
      inputVal.value = _.find(options.value, (el) => el.value === prop.modelValue)?.name;

      const ele = selectRef.value as HTMLElement;

      let mid = ele.getBoundingClientRect().top + ele.offsetHeight / 2;
      dropStyle.width = ele.offsetWidth + 'px';
      dropStyle.left = ele.getBoundingClientRect().left + 'px';
      if (mid < window.innerHeight / 2) {
        dropStyle.top = ele.getBoundingClientRect().top + ele.offsetHeight + 4 + 'px';
        dropStyle.maxHeight =
          window.innerHeight - ele.getBoundingClientRect().top - ele.offsetHeight - 14 + 'px';
        tansitionName.value = 'scale-top';
      } else {
        dropStyle.bottom = ele.getBoundingClientRect().top - ele.offsetHeight + 4 + 'px';
        dropStyle.maxHeight = ele.getBoundingClientRect().top - 14 + 'px';
        tansitionName.value = 'scale-bottom';
      }
    });

    return {
      inputVal,
      placeholder,
      themed,
      dropVisible,
      inputBlur,
      options,
      onItemClick,
      selectRef,
      dropStyle,
      tansitionName,
      inputClick,
    };
  },
});
</script>
<style lang="scss">
.kl-select {
  display: inline-block;
  height: 100%;
  position: relative;
  height: 28px;

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
    cursor: pointer;

    &:focus {
      border: 1px solid themed(primary-dark);
      box-shadow: 0 0 5px 2px themed(primary-hover);
    }

    &::-webkit-input-placeholder {
      color: themed(disabled);
    }
  }

  .select-arrow {
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;

    &-active {
      transform-origin: center;
      transform: rotate(180deg);
    }
  }
}

.drop-menu {
  position: absolute;
  background: #ffffff;
  border: 1px solid themed(primary-dark);
  border-radius: 2px;
  padding: 5px 0;
  z-index: 9999;
  overflow: hidden auto;
  box-shadow: 0 0 5px 1px themed(border-dark);
  @include size(middle);

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: themed(primary);
  }

  &-item {
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    color: themed(primary);
    padding: 0 8px;

    &:hover {
      color: themed(font-light);
      @include background(primary);
    }
  }

  &-selected {
    color: themed(font-light);
    @include background(primary);
  }

  .tool-tip {
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: themed(disabled);
  }
}
</style>
