<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:44:18
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 11:53:25
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="card-container animate"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {},
})
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

.card-container {
  width: 100%;
  height: 100%;
  min-height: 145px;
  @include background("primary");
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px 5px themed("border-light-color");
  }

  &:active {
    transform: scale(1);
  }
}
</style>
