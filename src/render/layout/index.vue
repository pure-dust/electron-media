<!--
 * @Author: Lixiao2
 * @Date: 2021-06-11 09:01:27
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-20 10:09:42
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="layout-container flex-col">
    <Toolbar />
    <router-view v-slot="{ Component }">
      <transition name="card" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store/notice';
import { defineComponent, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Toolbar from './toolbar/index.vue';
export default defineComponent({
  name: 'Layout',
  components: { Toolbar },
  setup() {
    const route = useRoute();
    const store = useStore();

    watchEffect(() => {
      store.setBack(route.path != '/');
    });
  },
});
</script>
<style lang="scss" scoped>
.layout-container {
  @include background('light');
  height: 100%;
  overflow: hidden;
}
</style>
