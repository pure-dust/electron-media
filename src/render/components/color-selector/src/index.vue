<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 13:51:44
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 15:49:16
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="kl-color-selector">
    <div class="kl-color-selector-reference" @click="open" ref="reference">
      <slot name="reference"> </slot>
    </div>
    <teleport to="body">
      <transition name="cross">
        <div
          v-show="visible"
          class="kl-color-selector-wrapper"
          :style="computedStyle"
          v-click-outside:[reference]="close"
          ref="boxRef"
        >
          <div
            class="color-bg"
            :style="bgStyle"
            @mousedown="pointMove"
            ref="innerRef"
          >
            <div class="color-cover"></div>
            <div class="point" :style="pointStyle"></div>
          </div>
          <div class="control-box">
            <div
              class="slide-bar"
              @mousedown.capture="slideMove"
              ref="slideBar"
            >
              <div class="slide-thumb" :style="`left: ${slide}px`"></div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script lang="ts">
import _ from 'lodash';
import {
  defineComponent,
  ref,
  Ref,
  computed,
  reactive,
  nextTick,
  CSSProperties,
  onMounted,
} from 'vue';
import { HSBToRGB, RGBToHEX, HSB, HEXToRGB, RGBToHSB } from '../../../utils';

export default defineComponent({
  name: 'KlColorSelector',
  props: {
    modelValue: [String],
    defaultValue: {
      type: String,
      default: '#ffffff',
    },
    autoSize: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(prop, { emit }) {
    const innerRef: Ref<HTMLElement> = ref();
    const slideBar: Ref<HTMLElement> = ref();
    const reference: Ref<HTMLElement> = ref();
    const boxRef: Ref<HTMLElement> = ref();

    const width = ref(0);
    const height = ref(0);
    const slide = ref(0);
    const slideWidth = ref(0);
    const visible = ref(false);
    const computedStyle = ref({} as CSSProperties);
    const point = reactive({ x: 0, y: 0 });

    const inputVal = computed({
      get: () => {
        return RGBToHSB(HEXToRGB(prop.modelValue || prop.defaultValue));
      },
      set: (val) => {
        emit('update:modelValue', RGBToHEX(HSBToRGB(val)));
        emit('change', RGBToHEX(HSBToRGB(val)));
      },
    });

    const pointStyle = computed(() => `top: ${point.y}px; left: ${point.x}px`);

    const bgStyle = computed(() => {
      let c: HSB = { h: inputVal.value.h, s: 100, b: 100 };
      const { r, g, b } = HSBToRGB(c);
      return `background: linear-gradient(to right, #ffffff, rgba(${r},${g},${b}))`;
    });

    const pointMove = (ev: MouseEvent) => {
      point.x = ev.offsetX;
      point.y = ev.offsetY;
      let width = innerRef.value.offsetWidth;
      let height = innerRef.value.offsetHeight;

      inputVal.value = {
        h: inputVal.value.h,
        s: Math.round((100 * point.x) / width),
        b: Math.round((100 * (height - point.y)) / height),
      };

      const on_move = (mouseEv: MouseEvent) => {
        const { x, y } = innerRef.value.getBoundingClientRect();
        let minX = Math.min(mouseEv.pageX - x, innerRef.value.offsetWidth);
        let minY = Math.min(mouseEv.pageY - y, innerRef.value.offsetHeight);
        point.x = Math.max(0, minX);
        point.y = Math.max(0, minY);
        inputVal.value = {
          h: inputVal.value.h,
          s: Math.round((100 * point.x) / width),
          b: Math.round((100 * (height - point.y)) / height),
        };
        mouseEv.preventDefault();
      };

      const on_mouseup = () => {
        document.removeEventListener('mousemove', on_move);
        document.removeEventListener('mouseup', on_mouseup);
      };

      document.addEventListener('mousemove', on_move);
      document.addEventListener('mouseup', on_mouseup);
    };

    const slideMove = (ev: MouseEvent) => {
      slideWidth.value = slideBar.value.offsetWidth;
      slide.value = ev.offsetX;
      let x = parseFloat((slide.value / slideWidth.value).toFixed(2));

      inputVal.value = {
        h: Math.round(360 * x),
        s: inputVal.value.s * 100,
        b: inputVal.value.b * 100,
      };

      const on_move = (mouseEv: MouseEvent) => {
        let left = slideBar.value.getBoundingClientRect().x;
        let min = Math.min(mouseEv.pageX - left, slideBar.value.offsetWidth);
        slide.value = Math.max(0, min);
        x = parseFloat((slide.value / slideWidth.value).toFixed(2));
        inputVal.value = {
          h: Math.round(360 * x),
          s: inputVal.value.s * 100,
          b: inputVal.value.b * 100,
        };
        mouseEv.preventDefault();
      };

      const on_mouseup = () => {
        document.removeEventListener('mousemove', on_move);
        document.removeEventListener('mouseup', on_mouseup);
      };

      document.addEventListener('mousemove', on_move);
      document.addEventListener('mouseup', on_mouseup);
    };

    const initSilde = () => {
      slideWidth.value = slideBar.value.offsetWidth;
      slide.value = Math.round((inputVal.value.h / 360) * slideWidth.value);
    };

    const initPoint = () => {
      point.x = Math.round(inputVal.value.s * innerRef.value.offsetWidth);
      point.y =
        innerRef.value.offsetHeight -
        Math.round(inputVal.value.b * innerRef.value.offsetHeight);
    };

    const close = () => {
      visible.value = false;
    };

    const computedSize = () => {
      width.value = boxRef.value.offsetWidth;
      height.value = boxRef.value.offsetHeight;
      let rect = reference.value.getBoundingClientRect()!;
      if (rect.top + height.value > window.innerHeight) {
        computedStyle.value.bottom = rect.top - 2 + 'px';
      } else {
        computedStyle.value.top = rect.bottom + 2 + 'px';
      }
      if (rect.left + width.value > window.innerWidth) {
        computedStyle.value.right = '10px';
      } else {
        computedStyle.value.left = rect.left + 'px';
      }
      if (prop.autoSize) {
        computedStyle.value.width = reference.value.offsetWidth + 'px';
        computedStyle.value.height = reference.value.offsetWidth * 0.7 + 'px';
      }
    };

    const open = () => {
      visible.value = true;
      if (prop.autoSize) {
        computedSize();
        nextTick(() => {
          initSilde();
          initPoint();
        });
      } else {
        nextTick(() => {
          computedSize();
          initSilde();
          initPoint();
        });
      }
    };

    onMounted(() => {});

    return {
      boxRef,
      innerRef,
      slideBar,
      reference,
      pointMove,
      pointStyle,
      slideMove,
      slide,
      bgStyle,
      visible,
      computedStyle,
      open,
      close,
    };
  },
});
</script>
<style lang="scss" scoped>
.kl-color-selector {
  width: 100%;
  height: 100%;

  &-reference {
    width: 100%;
    height: 100%;
  }
}
.kl-color-selector-wrapper {
  position: absolute;
  width: 160px;
  height: 120px;
  display: flex;
  flex-direction: column;
  @include background('primary');
  box-shadow: 0 2px 8px themed('border-dark-color');
  padding: 5px 5px 0;
  z-index: 9999;

  .color-bg {
    position: relative;
    width: 100%;
    flex: 1;
    background: linear-gradient(to right, #ffffff, #ff0000);
    overflow: hidden;

    .color-cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, #000000, #00000000);
      pointer-events: none;
    }

    .point {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid #ffffff;
      transform: translate(-50%, -50%);
      background: radial-gradient(to center, #999999, #ffffff);
      box-shadow: 0 0 5px 1px #333;
      pointer-events: none;
    }
  }

  .control-box {
    padding: 5px 0;

    .slide-bar {
      height: 6px;
      position: relative;
      background: linear-gradient(
        to right,
        #ff0000,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff,
        #ff0000
      );
      color: hsl(0, 100%, 50%);

      .slide-thumb {
        position: absolute;
        width: 4px;
        height: 12px;
        border-width: 2px;
        top: -3px;
        background: #fff;
        transform: translateX(-2px);
        pointer-events: none;
      }
    }
  }
}
</style>
