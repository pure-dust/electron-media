<template>
  <div class="novel-card zcoo flex">
    <div class="title">{{ data.name.replace('.txt', '') }}</div>
  </div>
</template>
<script lang="ts">
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
}
</style>
