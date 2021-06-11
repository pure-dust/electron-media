<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:01:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-11 09:05:06
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <Toolbar />
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
<style lang="scss" scoped></style>
