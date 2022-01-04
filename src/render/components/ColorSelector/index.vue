<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 13:51:44
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 11:57:16
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
        >
          <div class="color-bg" :style="bgStyle" @mousedown="pointMove" ref="colorBox">
            <div class="color-cover"></div>
            <div class="point" :style="pointStyle"></div>
          </div>
          <div class="control-box">
            <div class="slide-bar" @mousedown.capture="slideMove" ref="slideBar">
              <div class="slide-thumb" :style="`left: ${slide}px`"></div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed, reactive, watch, nextTick } from 'vue';
import { HSBToRGB, RGBToHEX, HSB, HEXToRGB, RGBToHSB } from '@/utils/color';

interface pos {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export default defineComponent({
  name: 'KlColorSelector',
  props: {
    modelValue: [String],
    defaultValue: {
      type: String,
      default: '#ffffff',
    },
  },
  emits: ['on-change', 'update:modelValue'],
  setup(prop, { emit }) {
    const colorBox: Ref<HTMLElement | null> = ref(null);
    const slideBar: Ref<HTMLElement | null> = ref(null);
    const reference: Ref<HTMLElement | null> = ref(null);

    const width: Ref<number> = ref(0);
    const height: Ref<number> = ref(0);
    const slide: Ref<number> = ref(0);
    const slideWidth: Ref<number> = ref(0);
    const visible = ref(false);
    const computedStyle: Ref<pos> = ref({});

    let hsb: HSB = reactive(RGBToHSB(HEXToRGB(prop.modelValue || prop.defaultValue)));

    const inputVal = ref(RGBToHEX(HSBToRGB(hsb)));

    const point = reactive({ x: 0, y: 0 });

    const pointStyle = computed(() => `top: ${point.y}px; left: ${point.x}px`);

    const bgStyle = computed(() => {
      let c: HSB = { h: hsb.h, s: 100, b: 100 };
      const { r, g, b } = HSBToRGB(c);
      return `background: linear-gradient(to right, #ffffff, rgba(${r},${g},${b}))`;
    });

    const pointMove = (ev: MouseEvent) => {
      point.x = ev.offsetX;
      point.y = ev.offsetY;
      let width: number = colorBox.value?.offsetWidth as number;
      let height: number = colorBox.value?.offsetHeight as number;

      hsb.s = Math.round((100 * point.x) / width);
      hsb.b = Math.round((100 * (height - point.y)) / height);

      document.onmousemove = (mouseEv: MouseEvent) => {
        let left: number = colorBox.value?.getBoundingClientRect().x as number;
        let top: number = colorBox.value?.getBoundingClientRect().y as number;
        let minX: number = Math.min(mouseEv.pageX - left, Number(colorBox.value?.offsetWidth));
        let minY: number = Math.min(mouseEv.pageY - top, Number(colorBox.value?.offsetHeight));
        point.x = Math.max(0, minX);
        point.y = Math.max(0, minY);
        hsb.s = Math.round((100 * point.x) / width);
        hsb.b = Math.round((100 * (height - point.y)) / height);
        mouseEv.preventDefault();
        updateModel();
      };

      document.onmouseup = () => {
        updateModel();
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    const slideMove = (ev: MouseEvent) => {
      slideWidth.value = slideBar.value?.offsetWidth as number;
      slide.value = ev.offsetX;
      let x: number = parseFloat((slide.value / slideWidth.value).toFixed(2));

      hsb.h = Math.round(360 * x);

      document.onmousemove = (mouseEv: MouseEvent) => {
        let left: number = slideBar.value?.getBoundingClientRect().x as number;
        let min: number = Math.min(mouseEv.pageX - left, Number(slideBar.value?.offsetWidth));
        slide.value = Math.max(0, min);
        x = parseFloat((slide.value / slideWidth.value).toFixed(2));
        hsb.h = Math.round(360 * x);
        mouseEv.preventDefault();
        updateModel();
      };

      document.onmouseup = () => {
        updateModel();
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    const updateModel = () => {
      inputVal.value = RGBToHEX(HSBToRGB(hsb));
      emit('update:modelValue', inputVal.value);
      emit('on-change', inputVal.value);
    };

    const initSlideAndPoint = () => {
      let t = RGBToHSB(HEXToRGB(prop.modelValue || prop.defaultValue));
      hsb.h = t.h;
      hsb.s = t.s;
      hsb.b = t.b;
      slide.value = Math.round((hsb.h / 360) * slideWidth.value);
      console.log(t);
      point.x = Math.round((hsb.s * colorBox.value!.offsetWidth) / 100);
      point.y =
        colorBox.value!.offsetHeight - Math.round((hsb.b * colorBox.value!.offsetHeight) / 100);
    };

    const close = () => {
      visible.value = false;
    };

    const open = () => {
      visible.value = true;
      nextTick(() => {
        width.value = colorBox.value?.offsetWidth as number;
        height.value = colorBox.value?.offsetHeight as number;
        slideWidth.value = slideBar.value?.offsetWidth as number;

        let rect = reference.value?.getBoundingClientRect()!;

        if (rect.top + height.value > window.innerHeight) {
          computedStyle.value.bottom = rect.top - 2 + 'px';
        } else {
          computedStyle.value.top = rect.bottom + 2 + 'px';
        }

        if (rect.left + width.value > window.innerWidth) {
          computedStyle.value.right = '2px';
        } else {
          computedStyle.value.left = rect.left + 'px';
        }
        initSlideAndPoint();
      });
    };

    return {
      colorBox,
      slideBar,
      pointMove,
      pointStyle,
      slideMove,
      slide,
      hsb,
      bgStyle,
      visible,
      reference,
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
  padding: 5px;
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
