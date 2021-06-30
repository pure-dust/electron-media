<template>
  <router-view v-slot="{ Component }">
    <transition name="card" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AccountView',
  components: {},
  props: {},
  setup() {},
});
</script>
<style lang="scss" scoped></style>
