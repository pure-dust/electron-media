<template>
  <div class="schedule-container">
    <time-slot v-for="i in 24" :key="i" :hour="i - 1" @on-slot-click="addNewSchedule"></time-slot>
    <kl-dialog :visible="visible" @on-close="closeSchedule" title="111">
      <div class="schedule-item flex">
        <kl-icon icon="icon-ic_document" width="30px" height="30px" />
        <kl-input v-model="schedule.theme" placeholder="日程主题"></kl-input>
      </div>
    </kl-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import TimeSlot from './components/timeSlot.vue';
export default defineComponent({
  name: 'Schedule',
  components: { TimeSlot },
  props: {},
  setup() {
    const addNewSchedule = (payload: AddScheduleOption) => {
      visible.value = true;
    };

    const onClick = () => {};

    const schedule = reactive({
      theme: '',
    });

    const closeSchedule = () => {
      visible.value = false;
    };

    const visible = ref(false);

    return {
      addNewSchedule,
      closeSchedule,
      visible,
      schedule,
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

  .schedule-item {
    height: 30px;
  }
}
</style>
