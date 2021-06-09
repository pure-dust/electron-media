<template>
  <div class="app-box">
    <CanvasBg />
  </div>
</template>

<script>
import CanvasBg from "@/pages/canvasBg/index.vue"
export default {
  name: "App",
  components: { CanvasBg },
}
</script>

<style lang="scss">
.app-box {
  height: 100%;
  background: rgba(0, 0, 0, 0);
  filter: blur(10px);
}
</style>
