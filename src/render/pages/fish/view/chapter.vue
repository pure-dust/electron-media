<!--
 * @Author: Lixiao2
 * @Date: 2022-01-18 13:33:40
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-03-11 13:54:55
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div :class="['chapter-container', 'col-fill']">
    <kl-scroll
      v-if="!notice.mini"
      :class="['col-fill', { 'mini-size': notice.mini }]"
    >
      <div class="chapter-inner zcoo" :style="style" v-html="content"></div>
    </kl-scroll>
    <teleport to="body">
      <div
        :class="['zcoo', { 'mini-size': notice.mini }]"
        :style="style"
        v-if="notice.mini"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
      >
        {{ currentContent }}
      </div>
    </teleport>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  StyleValue,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/novel';
import { useStore as useConfigStore } from '@/store/config';
import { useStore as useNoticeStore } from '@/store/notice';
import { transChapter, windowMove } from '@/utils';
import { ipcRenderer } from 'electron';
import { useNovelMini } from '@/control/screen';

export default defineComponent({
  name: 'Chapter',
  setup() {
    const store = useStore();
    const config = useConfigStore();
    const notice = useNoticeStore();
    const router = useRouter();

    const content = ref('');
    const miniContent = ref([]);
    const current = ref(0);

    const currentContent = computed(() => {
      return miniContent.value[current.value];
    });

    const style = computed(() => {
      return {
        color: config.novel.color,
        fontSize: config.novel.size + 'px',
        background: config.novel.transparent
          ? notice.mini
            ? 'transparent'
            : config.novel.background
          : config.novel.background,
        lineHeight: config.novel.lineHeight + 'px',
      } as StyleValue;
    });

    const nextPage = async () => {
      if (!notice.mini) return;
      if (current.value === miniContent.value.length - 1) {
        if (store.current === store.novel.list.length - 1) {
          return;
        }
        store.setCurrent(store.current + 1);
        await getChapter();
        current.value = 0;
      } else {
        current.value++;
      }
    };

    const prevPage = async () => {
      if (!notice.mini) return;
      if (current.value - 1 < 0) {
        if (store.current === 0) {
          return;
        }
        store.setCurrent(store.current - 1);
        await getChapter();
        current.value = miniContent.value.length - 1;
      } else {
        current.value--;
      }
    };

    const onMouseDown = () => {
      if (!notice.mini) {
        return;
      }
      windowMove(true);
    };

    const onMouseUp = () => {
      if (!notice.mini) {
        return;
      }
      windowMove(false);
    };

    const getChapter = async () => {
      let res = await transChapter(store.getCurrent[0], store.getCurrent[1]);
      content.value = res?.replace(/(\r)/g, '<br />') || '';
      let str = res?.replace(/(\r|\n)/g, '') || '';
      miniContent.value = [];
      for (let i = 0; i < str.length; i += config.novel.count) {
        miniContent.value.push(str.substring(i, i + config.novel.count));
      }
    };

    onMounted(() => {
      if (!store.path) {
        router.push({
          name: useRoute().meta.ancestor as string,
        });
      } else {
        getChapter();
        ipcRenderer.on('mini-size', useNovelMini);
        ipcRenderer.on('next-page', nextPage);
        ipcRenderer.on('prev-page', prevPage);
      }
    });

    onUnmounted(() => {
      ipcRenderer.off('mini-size', useNovelMini);
      ipcRenderer.off('next-page', nextPage);
      ipcRenderer.off('prev-page', prevPage);
    });

    return {
      content,
      style,
      notice,
      currentContent,
      miniContent,
      current,
      onMouseDown,
      onMouseUp,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;

.chapter-container {
  padding: $padding;
  position: relative;

  .chapter-inner {
    width: 100%;
    height: 100%;
    padding: $padding;
    background: themed(primary);
    word-wrap: break-word;
  }
}
.mini-size {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: transparent;
  z-index: 9999;
  user-select: none;
}
</style>
