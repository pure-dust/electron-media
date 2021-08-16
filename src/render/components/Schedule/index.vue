<template>
  <div class="schedule-container">
    <time-slot v-for="i in 24" :key="i" :hour="i - 1" @on-slot-click="addNewSchedule"></time-slot>
    <div class="schedule-panel">
      <schedule-item
        v-for="item in scheduleCardList"
        :position="item.position"
        :schedule="item.schedule"
        :key="item.schedule._id"
        @on-click="onClick(item.schedule)"
      ></schedule-item>
    </div>
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
          v-model="schedule.type"
          placeholder="日程类型"
        ></kl-select>
      </div>
      <div class="schedule-item flex">
        <kl-icon width="36px" height="28px" icon="icon-ic_edit_round" :svg-style="svgStyle" />
        <kl-input class="row-fill" type="textarea" v-model="schedule.event"></kl-input>
      </div>
      <template #footer>
        <kl-button type="primary" @click="submitSchedule">确定</kl-button>
        <kl-button @click="closeSchedule">取消</kl-button>
      </template>
    </kl-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, Ref } from 'vue';
import { useStore } from '@/store';
import { CalenarType } from '@/utils/calendar';
import { SCHEDULE_SELECT } from '@/utils/constant';
import { reset } from '@/utils/utils';
import { ScheduleGenerator } from './utils';
import { useDatabase } from '@/utils/control';
import _ from 'lodash';
import TimeSlot from './components/timeSlot.vue';
import ScheduleItem from './components/scheduleItem.vue';
export default defineComponent({
  name: 'Schedule',
  components: { TimeSlot, ScheduleItem },
  props: {},
  setup() {
    const store = useStore();
    const cardInfo = store.state.calendar.cardInfo;
    const visible = ref(false);
    const svgStyle = {
      width: '18px',
      height: '18px',
    };
    const schedule: Schedule = reactive({
      theme: '',
      start: '',
      end: '',
      type: '',
      event: '',
    });
    const scheduleCardList: Ref<Array<ScheduleCard>> = ref([]);
    const scheduleList: Ref<Array<Schedule>> = ref([]);
    const time: Ref<Array<SelectOption>> = ref([]);
    const scheduleType = SCHEDULE_SELECT;

    const sg = new ScheduleGenerator();

    const addNewSchedule = (payload: AddScheduleOption) => {
      schedule.start = payload.start;
      schedule.end = payload.end;
      visible.value = true;
    };

    const closeSchedule = () => {
      reset(schedule);
      visible.value = false;
    };

    const submitSchedule = () => {
      useDatabase('calendar', 'insert', {
        data: { ...schedule, date: cardInfo?.dateTime },
      }).then((res) => {
        let r = res as unknown as Schedule;
        scheduleCardList.value = sg.add(r);
        closeSchedule();
      });
    };

    const onClick = (sc: Schedule) => {
      Object.assign(schedule, sc);
      visible.value = true;
    };

    onMounted(() => {
      for (let i = 0; i < 24; i++) {
        time.value.push({
          name: i + ':00',
          value: i + ':00',
        });
        time.value.push({
          name: i + ':30',
          value: i + ':30',
        });
      }
      useDatabase('calendar', 'find', {
        query: { date: cardInfo?.dateTime },
      }).then((res) => {
        scheduleList.value = res as Schedule[];
        sg.setList(scheduleList.value);
      });
    });

    return {
      addNewSchedule,
      closeSchedule,
      visible,
      schedule,
      time,
      scheduleType,
      svgStyle,
      submitSchedule,
      scheduleCardList,
      onClick,
      sg,
    };
  },
});
</script>
<style lang="scss" scoped>
.schedule-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden auto;
  @include color(light);
  @include size(small);

  .schedule-panel {
    position: absolute;
    inset: 0;
    left: 40px;
    width: 160px;
    pointer-events: none;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  .schedule-item {
    min-height: 28px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .split-line {
    margin: 0 5px;
    align-self: center;
  }
}
</style>
