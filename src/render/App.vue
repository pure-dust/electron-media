<template>
  <Layout @contextmenu.native="windowMove(false)" />
</template>

<script lang="ts">
import Layout from './layout/index.vue';
import { defineComponent, onMounted } from 'vue';
import { windowMove } from '@/utils/control';
import { useStore } from '@/store/config';

import { setTheme } from '@/utils';
export default defineComponent({
  name: 'App',
  components: { Layout },
  setup() {
    const store = useStore();
    let str: string = store.getTheme.theme;
    onMounted(() => {
      setTheme(str);
      store.setTheme({ theme: str });
    });

    return {
      windowMove,
    };
  },
});
</script>

<style lang="scss"></style>
