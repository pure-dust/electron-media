<!--
 * @Author: Lixiao2
 * @Date: 2022-01-18 13:33:40
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-19 10:12:23
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="chapter-container col-fill flex-col">
    <kl-scroll class="col-fill">
      <div class="chapter-inner zcoo" :style="style" v-html="content"></div>
    </kl-scroll>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, StyleValue } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/novel';
import { useStore as useConfigStore } from '@/store/config';
import { transChapter } from '@/utils';

export default defineComponent({
  name: 'Chapter',
  setup() {
    const store = useStore();
    const configStore = useConfigStore();
    const router = useRouter();
    const content = ref('');

    const getChapter = () => {
      transChapter(store.getCurrent[0], store.getCurrent[1]).then((res) => {
        content.value = res.replace(/(\r)/g, '<br />');
      });
    };

    const style = computed(() => {
      return {
        color: configStore.getNovel.color,
        fontSize: configStore.getNovel.size + 'px',
        background: configStore.getNovel.background,
        lineHeight: configStore.getNovel.lineHeight + 'px',
      } as StyleValue;
    });

    onMounted(() => {
      if (!store.path) {
        router.push({
          name: useRoute().meta.ancestor as string,
        });
      } else {
        getChapter();
      }
    });
    return {
      content,
      style,
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
</style>
