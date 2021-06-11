<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:03:50
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-11 15:53:34
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="toolbar-container">
    <div class="color-bar">
      <div class="button" @click="open">主题</div>
      <transition name="cross">
        <div class="color-panel" v-if="colorPanel">
          <ColorSelector />
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import ColorSelector from "./components/ColorSelector/index.vue"
import { createColor } from "@/utils/color"
export default defineComponent({
  name: "",
  components: { ColorSelector },
  props: {},
  setup() {
    let colorPanel = ref(false)

    function setColor(color: string) {
      document.querySelector(":root")?.setAttribute("style", createColor(color))
    }

    function open() {
      colorPanel.value = !colorPanel.value
    }

    onMounted(() => {
      setColor("#3195ff")
    })
    return {
      colorPanel,
      open,
    }
  },
})
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.toolbar-container {
  @include background("primary");
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;

  .color-bar {
    margin-left: auto;
    height: 100%;
    position: relative;

    .button {
      @include font-color("light");
      @include font-size("middle");
      @include bg-hover("primary");
      cursor: pointer;
      line-height: 24px;
      padding: 0 5px;
    }

    .color-panel {
      @include background("primary");
      position: absolute;
      right: 0;
      width: 200px;
      height: 160px;
      padding: 5px;
    }
  }
}
</style>
