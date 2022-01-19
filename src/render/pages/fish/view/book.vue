<!--
 * @Author: Lixiao2
 * @Date: 2022-01-17 10:58:33
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-18 14:38:49
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="novel-container col-fill flex-col">
    <kl-scroll class="col-fill">
      <div class="novel-inner">
        <div
          v-for="(c, i) in novel.list"
          :key="c.name"
          class="chapter zcoo animate"
          @click="toChapter(i)"
        >
          {{ c.name }}
        </div>
      </div>
    </kl-scroll>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { analyseFile } from '@/utils';
import { NovelInfo } from '@root/typings/novel';
import { useStore } from '@/store/novel';
export default defineComponent({
  name: 'Book',
  props: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const novel = ref<NovelInfo>({
      name: '',
      list: [],
    });

    const toChapter = (index: number) => {
      store.setCurrent(index);
      router.push({
        name: 'Chapter',
      });
    };

    const analyseNovel = () => {
      if (store.path) {
        if (store.novel.name) {
          novel.value = store.novel;
        } else {
          analyseFile(store.path).then((res) => {
            novel.value = res;
            store.setNovel(novel.value);
          });
        }
      } else {
        router.push({
          name: useRoute().meta.parent as string,
        });
      }
    };

    onMounted(() => {
      analyseNovel();
    });

    return {
      novel,
      toChapter,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;

.novel-container {
  padding: $padding;
  position: relative;

  .novel-inner {
    width: 100%;
    height: 100%;
    padding: $padding;
    background: themed(primary);
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 20px) / 2));
    grid-template-rows: repeat(auto-fill, auto);
    align-items: center;
    gap: 5px 20px;

    .chapter {
      font-size: 14px;
      color: themed(font-light);
      text-align: left;
      padding: 5px 0 5px 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        background: themed(font-light);
        color: themed(primary);
        cursor: pointer;
      }
    }
  }
}
</style>
