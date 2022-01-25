<template>
  <div class="novel-card zcoo flex">
    <div class="title">{{ data.name.replace('.txt', '') }}</div>
    <div class="novel-card-shelter">
      <kl-button type="error" text @click="$emit('delete')">删除</kl-button>
    </div>
  </div>
</template>
<script lang="ts">
import { FileInfo } from '@root/typings/novel';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'NovelCard',
  props: {
    data: {
      type: Object as PropType<FileInfo>,
    },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
.novel-card {
  width: 100%;
  height: 120px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  background: themed(primary);
  color: themed(font-light);
  cursor: pointer;
  position: relative;

  &:hover &-shelter {
    opacity: 1;
    z-index: 10;
  }

  &-shelter {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
