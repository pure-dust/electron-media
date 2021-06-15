<template>
  <Layout />
</template>

<script lang="ts">
import Layout from "./layout/index.vue"
import { defineComponent, onMounted } from "vue"
import { useStore } from "@/store/index"
import { createColor } from "@/utils/color"
export default defineComponent({
  name: "App",
  components: { Layout },
  setup() {
    const store = useStore()
    let str: string = createColor(store.getters.getTheme)
    onMounted(() => {
      document.querySelector(":root")?.setAttribute("style", str)
    })
  },
})
</script>

<style lang="scss"></style>
