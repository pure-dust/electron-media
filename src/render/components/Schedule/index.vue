<template>
  <div class="schedule-container">
    <time-slot v-for="i in 24" :key="i" :hour="i - 1" @on-slot-click="addNewSchedule"></time-slot>
    <kl-dialog :visible="visible" @on-close="closeSchedule" title="111">
      <div class="schedule-item flex">
        <kl-icon icon="icon-ic_document" width="36px" height="28px" :svg-style="svgStyle" />
        <kl-input class="row-fill" v-model="schedule.theme" placeholder="日程主题"></kl-input>
      </div>
      <div class="schedule-item flex">
        <kl-icon icon="icon-ic_calendar" width="36px" height="28px" :svg-style="svgStyle" />
        <div class="row-fill flex">
          <kl-select :options="time" v-model="schedule.start" placeholder="开始时间"></kl-select>
          <span class="split-line">-</span>
          <kl-select :options="time" v-model="schedule.end" placeholder="结束时间"></kl-select>
        </div>
      </div>
      <div class="schedule-item flex">
        <kl-icon icon="icon-type" width="36px" height="28px" :svg-style="svgStyle" />
        <kl-select
          class="row-fill"
          :options="scheduleType"
          v-model="schedule.end"
          placeholder="日程类型"
        ></kl-select>
      </div>
      <div class="schedule-item flex">
        <kl-icon width="36px" height="28px" icon="icon-ic_edit_round" :svg-style="svgStyle" />
        <kl-input class="row-fill" type="textarea"></kl-input>
      </div>
    </kl-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, Ref } from 'vue';
import TimeSlot from './components/timeSlot.vue';
import { useStore } from '@/store';
import { CalenarType } from '@/utils/calendar';
import { SCHEDULE_SELECT } from '@/utils/constant';
export default defineComponent({
  name: 'Schedule',
  components: { TimeSlot },
  props: {},
  setup() {
    const store = useStore();
    const visible = ref(false);

    const svgStyle = {
      width: '18px',
      height: '18px',
    };

    const schedule = reactive({
      theme: '',
      start: '',
      end: '',
      type: '',
    });
    const dateInfo: Ref<CalenarType | {}> = ref({});

    const addNewSchedule = (payload: AddScheduleOption) => {
      visible.value = true;
    };

    const closeSchedule = () => {
      visible.value = false;
    };

    const scheduleType = SCHEDULE_SELECT;

    const time = [
      { name: '3:30', value: '3:30' },
      { name: '4:00', value: '4:00' },
      { name: '4:30', value: '4:30' },
      { name: '5:00', value: '5:00' },
      { name: '5:30', value: '5:30' },
    ];

    onMounted(() => {
      dateInfo.value = store.getters.getCardInfo;
    });

    return {
      addNewSchedule,
      closeSchedule,
      visible,
      schedule,
      time,
      scheduleType,
      svgStyle,
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
    height: 28px;
    margin-bottom: 10px;
  }

  .split-line {
    margin: 0 5px;
    align-self: center;
  }
}
</style>
