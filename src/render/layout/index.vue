<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:01:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 13:42:15
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="layout-container flex-col">
    <Toolbar />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Toolbar from "./toolbar/index.vue"
export default defineComponent({
  name: "Layout",
  components: { Toolbar },
  props: {},
  setup() {},
})
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.layout-container {
  @include background("light");
  height: 100%;
}
</style>
