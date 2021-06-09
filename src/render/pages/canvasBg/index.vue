<!--
 * @Author: Lixiao2
 * @Date: 2021-06-09 11:38:22
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-09 16:59:41
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <canvas :width="width" :height="height" class="bg-canvas" ref="canvas"></canvas>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, Ref, computed, readonly } from "vue"
import { CusMediaStream } from "@main/Event/getMediaStream/media"
import { VisualMedia } from "./utils/index"
import { desktopCapturer } from "electron"
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const canvas: Ref<HTMLCanvasElement | null> = ref(null)
    let ctx = computed(() => canvas.value?.getContext("2d"))
    let width = computed(() => canvas.value?.offsetWidth)
    let height = computed(() => canvas.value?.offsetHeight)

    onMounted(() => {
      let cusMediaStream = new CusMediaStream()
      let visualMedia = new VisualMedia({
        canvas: canvas.value as HTMLCanvasElement,
        ctx: ctx.value as CanvasRenderingContext2D,
        width: width.value as number,
        height: height.value as number,
      })

      cusMediaStream.onPrecess((stream) => {
        visualMedia.render(stream)
      })
    })
    return {
      canvas,
      width,
      height,
      ctx,
    }
  },
})
</script>
<style lang="scss" scoped>
.bg-canvas {
  height: 100%;
  width: 100%;
}
</style>
