<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:03:50
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 17:52:22
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div
    class="toolbar-container animate"
    @mousedown.self="onMouseDown"
    @mouseup="windowMove(false)"
  >
    <transition name="left">
      <span
        class="text-box back animate zcoo"
        v-if="back"
        @click.stop.capture="backToHome"
        >返回</span
      >
    </transition>
    <div class="fun-box flex">
      <span class="text-box mini dance animate" @click="miniSize"> mini </span>
      <div class="icon-box">
        <kl-color-selector
          :default-value="theme"
          v-model="theme"
          @change="themeChange"
        >
          <template #reference>
            <kl-icon hover icon="icon-ic_skin" width="32px" />
          </template>
        </kl-color-selector>
      </div>
      <div class="icon-box">
        <kl-icon
          hover
          icon="icon-ic_tack"
          @on-click="fixedScreen"
          :fixed-hover="isFixed"
        />
      </div>
      <div class="icon-box">
        <kl-icon
          hover
          icon="icon-ic_reduce"
          width="32px"
          @on-click="minScreen"
        />
      </div>
      <div class="icon-box">
        <kl-icon
          hover
          icon="icon-ic_cancel"
          width="32px"
          @on-click="closeWindow"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store/config';
import { useStore as useNoticeStore } from '@/store/notice';
import {
  setConfig,
  setTheme,
  windowMove,
  minScreen,
  fixWindow,
  closeWindow,
  miniMode,
} from '@/utils';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const store = useStore();
    const noticeStore = useNoticeStore();
    const isFixed = ref(false);
    const router = useRouter();
    const route = useRoute();
    const theme = ref(store.getTheme.theme as string);
    const mini = ref(false);

    const backToHome = () => {
      router.push({ name: route.meta?.parent as string });
    };

    const back = computed(() => {
      return noticeStore.getBack;
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

    const themeChange = () => {
      setConfig({ key: 'theme.theme', value: theme.value });
      setTheme(theme.value);
      store.setTheme({ theme: theme.value });
    };

    const miniSize = () => {
      if (mini.value) {
        miniMode(540, 400);
      } else {
        miniMode(200, 200);
      }
      mini.value = !mini.value;

      console.log(mini.value);
    };

    onMounted(() => {
      fixWindow().then((sign) => {
        isFixed.value = sign as boolean;
      });
    });

    return {
      onMouseDown,
      windowMove,
      closeWindow,
      minScreen,
      fixedScreen,
      isFixed,
      back,
      backToHome,
      theme,
      themeChange,
      miniSize,
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
    & > * {
      flex: 1;
    }

    .mini {
      line-height: $height - 2;
    }

    .fixed {
      background: themed('primary-hover');
    }

    .icon-box {
      width: 30px;
      height: 100%;
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
