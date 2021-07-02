<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:03:50
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 14:07:42
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="toolbar-container animate" @mousedown.self="onMouseDown" @mouseup="windowMove(false)">
    <transition name="left">
      <span class="text-box back animate zcoo" v-if="back" @click.stop.capture="backToHome"
        >返回</span
      >
    </transition>
    <div class="fun-box flex">
      <span class="text-box mini dance animate"> mini </span>
      <kl-icon hover icon="icon-ic_skin" width="32px" @on-click="open" ref="btn">
        <transition name="cross">
          <div class="color-panel animate" v-if="colorPanel">
            <ColorSelector v-click-outside:[btn]="open" />
          </div>
        </transition>
      </kl-icon>
      <kl-icon hover icon="icon-ic_tack" width="32px" @on-click="fixedScreen" :fixed-hover="isFixed" />
      <kl-icon hover icon="icon-ic_reduce" width="32px" @on-click="minScreen" />
      <kl-icon hover icon="icon-ic_cancel" width="32px" @on-click="closeWindow" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed } from 'vue';
import { windowMove, minScreen, fixWindow, closeWindow } from '@/utils/control';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store/index';

import ColorSelector from './components/ColorSelector/index.vue';
export default defineComponent({
  name: 'ToolBar',
  components: { ColorSelector },
  props: {},
  setup() {
    const colorPanel = ref(false);
    const btn: Ref<HTMLElement | null> = ref(null);
    const store = useStore();
    const isFixed = ref(false);
    const router = useRouter();
    const route = useRoute();

    const open = () => {
      colorPanel.value = !colorPanel.value;
    };

    const backToHome = () => {
      router.push({ name: route.meta?.parent as string });
    };

    const back = computed(() => {
      return store.getters.getBack;
    });

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
      back,
      backToHome,
    };
  },
});
</script>
<style lang="scss" scoped>
$height: 30px;
.toolbar-container {
  @include background('primary');
  height: $height;
  display: flex;
  align-items: center;
  user-select: none;
  position: relative;
  z-index: 100;

  .back {
    font-size: 14px;
  }

  .fun-box {
    margin-left: auto;
    align-items: center;
    height: 100%;

    .mini {
      line-height: $height - 2;
    }

    .fixed {
      background: themed('primary-hover');
    }

    .color-panel {
      @include background('primary');
      position: absolute;
      left: -64px;
      top: 100%;
      width: 160px;
      height: 120px;
      padding: 5px;
      box-shadow: 0 2px 8px themed('border-dark-color');
    }
  }

  .text-box {
    height: 100%;
    padding: 0 10px;
    text-align: center;
    line-height: $height - 2;
    @include bg-hover('primary');
    cursor: pointer;
    color: #ffffff;
  }
}
</style>
