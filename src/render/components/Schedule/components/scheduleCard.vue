<template>
  <div class="schedule-card-container">
    {{ schedule?.theme }}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'ScheduleCard',
  components: {},
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
    },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
.schedule-card-container {
  line-height: normal;
  background: themed(bg-light);
  border-radius: 2px;
  cursor: pointer;
  color: themed(warning);
  padding: 5px 10px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
  }
}
</style>
