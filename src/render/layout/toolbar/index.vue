<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:03:50
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 17:05:51
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="toolbar-container animate" @mousedown.self="onMouseDown" @mouseup="windowMove(false)">
    <div class="color-bar"></div>
    <div class="fun-box flex">
      <span class="text-box animate"> mini </span>
      <span class="icon-box animate" @click.self="open" ref="btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ic_skin" />
        </svg>
        <transition name="cross">
          <div class="color-panel animate" v-if="colorPanel">
            <ColorSelector v-click-outside:[btn]="open" />
          </div>
        </transition>
      </span>
      <span class="icon-box animate" :class="{ fixed: isFixed }" @click="fixedScreen">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ic_tack" />
        </svg>
      </span>
      <span class="icon-box animate" @click="minScreen">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ic_reduce" />
        </svg>
      </span>
      <span class="icon-box animate" @click="closeWindow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ic_cancel" />
        </svg>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';
import { windowMove, minScreen, fixWindow, closeWindow } from '@/utils/control';

import ColorSelector from './components/ColorSelector/index.vue';
export default defineComponent({
  name: 'ToolBar',
  components: { ColorSelector },
  props: {},
  setup() {
    let colorPanel = ref(false);
    const btn: Ref<HTMLElement | null> = ref(null);
    let isFixed = ref(false);

    const open = () => {
      colorPanel.value = !colorPanel.value;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        windowMove(false);
        return;
      }
      windowMove(true);
    };

    const fixedScreen = () => {
      fixWindow(!isFixed.value).then((sign) => {
        isFixed.value = sign as boolean;
      });
    };

    onMounted(() => {
      fixWindow().then((sign) => {
        isFixed.value = sign as boolean;
      });
    });

    return {
      colorPanel,
      open,
      btn,
      onMouseDown,
      windowMove,
      closeWindow,
      minScreen,
      fixedScreen,
      isFixed,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/styles/_handle.scss';
$height: 30px;
.toolbar-container {
  @include background('primary');
  height: $height;
  display: flex;
  align-items: center;
  user-select: none;
  box-shadow: 0 1px 2px themed('border-light-color');
  position: relative;
  z-index: 999;

  .color-bar {
    margin-left: auto;
    height: 100%;
    position: relative;
  }

  .fun-box {
    align-items: center;
    height: 100%;

    .fixed {
      background: themed('primary-hover');
    }

    .text-box {
      font-family: Dance;
      height: 100%;
      padding: 0 10px;
      text-align: center;
      line-height: $height - 2;
      @include bg-hover('primary');
      cursor: pointer;
      color: #ffffff;
    }

    .icon-box {
      height: 100%;
      width: 32px;
      text-align: center;
      line-height: $height;
      @include bg-hover('primary');
      cursor: pointer;
      position: relative;

      .icon {
        fill: #ffffff;
        width: 14px;
        pointer-events: none;
      }
    }

    .color-panel {
      @include background('primary');
      position: absolute;
      left: -64px;
      // top: calc(100% + 1px);
      width: 160px;
      height: 120px;
      padding: 5px;
      box-shadow: 0 2px 8px themed('border-dark-color');
    }
  }
}
</style>
