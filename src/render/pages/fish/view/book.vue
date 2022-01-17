<!--
 * @Author: Lixiao2
 * @Date: 2022-01-17 10:58:33
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 17:18:22
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="novel-container col-fill flex-col">
    <kl-scroll class="col-fill">
      <div class="novel-inner">
        <div
          v-for="c in list.list"
          :key="c.name"
          class="chapter zcoo animate"
          @click="toChapter(c.name)"
        >
          {{ c.name }}
        </div>
      </div>
    </kl-scroll>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { analyseFile, getChapter } from '@/utils';
import { NovelInfo } from '@root/typings/novel';
export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    const { query } = useRoute();
    const list = ref<NovelInfo>({
      name: '',
      list: [],
    });

    const toChapter = (chapter: string) => {
      getChapter(chapter)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    };

    onMounted(() => {
      if (query.path) {
        analyseFile(query.path as string).then((res) => {
          list.value = res;
        });
      }
    });

    return {
      list,
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
