<!--
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:11:47
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 17:48:33
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="col-fill calendar-container">
    <div class="calendar-inner"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Calendar',
  components: {},
  props: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
$padding: 20px;
.calendar-container {
  padding: $padding;

  .calendar-inner {
    @include background('primary');
    height: 100%;
  }
}
</style>
