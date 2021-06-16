<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:31:58
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 11:55:43
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="app-main col-fill">
    <Card v-for="(item, i) in cardList" :key="i" />
  </div>
  <div class="space-block"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Card from "./components/Card.vue"
export default defineComponent({
  name: "Home",
  components: { Card },
  props: {},
  setup() {
    let cardList = [1, 2, 3, 4, 5, 6, 7]

    return {
      cardList,
    }
  },
})
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.app-main {
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto auto;
  overflow: hidden auto;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 0;
  }
}
.space-block {
  height: 20px;
}
</style>
