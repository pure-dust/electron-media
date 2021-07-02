<template>
  <div class="schedule-item-container"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: '',
  emits: ['onClick'],
  components: {},
  props: {
    top: {
      type: Number,
    },
    left: {
      type: Number,
    },
    heigh: {
      type: Number,
    },
    schedule: {
      type: Object,
    },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
.schedule-item-container {
  position: absolute;
}
</style>
