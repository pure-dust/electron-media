<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 13:51:44
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-11 17:14:55
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="bg-canvas">
    <div class="color-bg" @mousedown="pointMove" ref="colorBox">
      <div class="color-cover"></div>
      <div class="point" :style="pointStyle"></div>
    </div>
    <div class="control-box">
      <div class="slide-bar" @mousedown="slideMove" ref="slideBar">
        <div class="slide-thumb" :style="`left: ${slide}px`"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed, reactive, watch } from "vue"
export default defineComponent({
  name: "ColorSelector",
  props: {},
  emits: [],
  setup() {
    const colorBox: Ref<HTMLElement | null> = ref(null)
    const slideBar: Ref<HTMLElement | null> = ref(null)
    const width: Ref<number> = ref(0)
    const height: Ref<number> = ref(0)
    const slide: Ref<number> = ref(0)
    const slideWidth: Ref<number> = ref(0)

    const point = reactive({
      x: 0,
      y: 0,
    })

    watch(slide, (v) => {
      let per: number = parseFloat((v / slideWidth.value).toFixed(2))
      console.log(per * 360)
    })

    const pointStyle = computed(() => `top: ${point.y}px; left: ${point.x}px`)

    const pointMove = (ev: MouseEvent) => {
      let dom = ev.target as HTMLElement

      point.x = ev.offsetX
      point.y = ev.offsetY

      // dom.onmouseleave = () => {
      //   dom.onmousemove = null
      //   dom.onmouseup = null
      // }

      dom.onmousemove = (mouseEv: MouseEvent) => {
        point.x = mouseEv.offsetX
        point.y = mouseEv.offsetY
        mouseEv.preventDefault()
      }

      dom.onmouseup = () => {
        dom.onmousemove = null
      }
    }

    const slideMove = (ev: MouseEvent) => {
      let dom = ev.target as HTMLElement
      slide.value = ev.offsetX

      dom.onmousemove = (mouseEv: MouseEvent) => {
        slide.value = mouseEv.offsetX
        mouseEv.preventDefault()
      }

      // dom.onmouseleave = () => {
      //   dom.onmousemove = null
      //   dom.onmouseup = null
      // }

      dom.onmouseup = () => {
        dom.onmousemove = null
        dom.onmouseup = null
      }
    }

    onMounted(() => {
      width.value = colorBox.value?.offsetWidth as number
      height.value = colorBox.value?.offsetHeight as number
      slideWidth.value = slideBar.value?.offsetWidth as number
    })
    return {
      colorBox,
      slideBar,
      pointMove,
      pointStyle,
      slideMove,
      slide,
    }
  },
})
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.bg-canvas {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .color-bg {
    width: 100%;
    height: 0;
    flex: 1;
    position: relative;
    background: linear-gradient(to right, #ffffff, #ff0000);
    overflow: hidden;

    .color-cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, #000000, #00000000);
      pointer-events: none;
    }

    .point {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid #ffffff;
      transform: translate(-50%, -50%);
      background: radial-gradient(to center, #999999, #ffffff);
      box-shadow: 0 0 5px 1px #333;
      pointer-events: none;
    }
  }

  .control-box {
    height: 50px;
    padding: 5px 0;

    .slide-bar {
      height: 6px;
      position: relative;
      background: linear-gradient(
        to right,
        #ff0000,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff,
        #ff0000
      );
      color: hsl(0, 100%, 50%);

      .slide-thumb {
        position: absolute;
        width: 4px;
        height: 12px;
        border-width: 2px;
        top: -3px;
        background: #fff;
        transform: translateX(-2px);
        pointer-events: none;
      }
    }
  }
}
</style>
