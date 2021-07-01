<template>
  <div class="schedule-container">
    <time-slot v-for="i in 24" :key="i" :hour="i - 1" @on-slot-click="addNewSchedule"></time-slot>
    <schedule-panel :visible="visible" @on-close="closeSchedule"></schedule-panel>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TimeSlot from './components/timeSlot.vue';
import SchedulePanel from './components/schedulePanel.vue';
export default defineComponent({
  name: 'Schedule',
  components: { TimeSlot, SchedulePanel },
  props: {},
  setup() {
    const addNewSchedule = (payload: AddScheduleOption) => {
      visible.value = true;
    };

    const closeSchedule = () => {
      visible.value = false
    }

    const visible = ref(false);

    return {
      addNewSchedule,
      closeSchedule,
      visible,
    };
  },
});
</script>
<style lang="scss" scoped>
.schedule-container {
  height: 100%;
  width: 100%;
  overflow: hidden auto;
  @include font-color(light);
  @include font-size(small);

  &::-webkit-scrollbar {
    width: 0;
  }

  .hour-block {
    height: 40px;
    border-right: 1px solid themed(light-boder);
    border-bottom: 1px solid themed(light-boder);
    line-height: 40px;

    &:first-child {
      border-top: 1px solid themed(light-boder);
    }

    .hour {
      width: 40px;
      border-right: 1px solid themed(light-boder);
    }
  }
}
</style>
