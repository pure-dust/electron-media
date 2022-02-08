<template>
  <Layout v-show="!notice.mini" @contextmenu.native="windowMove(false)" />
</template>

<script lang="ts">
import Layout from './layout/index.vue';
import { defineComponent, onMounted } from 'vue';
import { windowMove } from '@/utils/control';
import { useStore } from '@/store/config';
import { useStore as useNoticeStore } from './store/notice';
import { setTheme } from '@/utils';
export default defineComponent({
  name: 'App',
  components: { Layout },
  setup() {
    const store = useStore();
    const notice = useNoticeStore();

    onMounted(() => {
      setTheme(store.getTheme.theme);
      store.setTheme({ theme: store.getTheme.theme });
    });

    return {
      windowMove,
      notice,
    };
  },
});
</script>

<style lang="scss"></style>
