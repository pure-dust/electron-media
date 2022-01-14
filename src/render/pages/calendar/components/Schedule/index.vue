<template>
  <div class="schedule-container">
    <time-slot
      v-for="i in 24"
      :hour="i - 1"
      :schedule="splitItems[i - 1]"
      @on-slot-click="addSchedule"
      @on-card-click="editSchedule"
      @on-card-close="deleteSchedule"
    ></time-slot>
    <kl-dialog :visible="visible" @on-close="closeSchedule" title="111">
      <div class="schedule-item flex">
        <span class="schedule-item-label">
          <kl-icon icon="icon-ic_document" :auto="false" />
        </span>
        <kl-input class="row-fill" v-model="schedule.theme" placeholder="日程主题"></kl-input>
      </div>
      <div class="schedule-item flex">
        <span class="schedule-item-label">
          <kl-icon icon="icon-ic_calendar" :auto="false" />
        </span>
        <div class="row-fill flex">
          <kl-select :options="time" v-model="schedule.start" placeholder="开始时间"></kl-select>
          <span class="split-line">-</span>
          <kl-select :options="time" v-model="schedule.end" placeholder="结束时间"></kl-select>
        </div>
      </div>
      <div class="schedule-item flex">
        <span class="schedule-item-label">
          <kl-icon icon="icon-type" :auto="false" />
        </span>
        <kl-select
          class="row-fill"
          :options="scheduleType"
          v-model="schedule.type"
          placeholder="日程类型"
        ></kl-select>
      </div>
      <div class="schedule-item flex">
        <span class="schedule-item-label">
          <kl-icon icon="icon-ic_edit_round" :auto="false" />
        </span>
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
import { defineComponent, reactive, ref, onMounted, Ref, PropType, toRef, computed } from 'vue';
import { useStore } from '@/store/calendar';
import { SCHEDULE_SELECT } from '@/contants/constant';
import { reset } from '@/utils/utils';
import { useDatabase } from '@/utils/control';
import _ from 'lodash';
import TimeSlot from './components/timeSlot.vue';
export default defineComponent({
  name: 'Schedule',
  components: { TimeSlot },
  emits: ['refresh'],
  props: {
    list: Array as PropType<Schedule[]>,
  },
  setup(props, { emit }) {
    const store = useStore();
    const cardInfo = store.cardInfo;
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

    const time: Ref<Array<SelectOption>> = ref([]);
    const scheduleType = SCHEDULE_SELECT;

    let submitType = 'add';

    const addSchedule = (payload: AddScheduleOption) => {
      submitType = 'add';
      schedule.start = payload.start;
      schedule.end = payload.end;
      visible.value = true;
    };

    const splitItems = computed(() => {
      let arr: Schedule[][] = new Array();
      for (let i = 0; i < 24; i++) {
        arr.push(new Array<Schedule>());
      }
      props.list?.forEach((el) => {
        arr[parseInt(el.start.split(':')[0])].push(el);
      });
      return arr;
    });

    const closeSchedule = () => {
      reset(schedule);
      visible.value = false;
    };

    const submitSchedule = () => {
      if (submitType === 'add') {
        useDatabase('calendar', 'insert', {
          data: { ...schedule, date: cardInfo?.dateTime },
        }).then(() => {
          emit('refresh');
          store.updateMonitor();
          closeSchedule();
        });
      } else if (submitType === 'edit') {
        useDatabase('calendar', 'update', {
          query: { _id: schedule._id },
          data: {
            $set: {
              theme: schedule.theme,
              start: schedule.start,
              end: schedule.end,
              type: schedule.type,
              event: schedule.event,
            },
          },
          update: {},
        }).then(() => {
          emit('refresh');
          store.updateMonitor();
          closeSchedule();
        });
      }
    };

    const editSchedule = (sc: Schedule) => {
      submitType = 'edit';
      Object.assign(schedule, sc);
      visible.value = true;
    };

    const deleteSchedule = (id: string) => {
      useDatabase('calendar', 'remove', {
        query: {
          _id: id,
        },
        remove: {},
      }).then(() => {
        emit('refresh');
      });
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
    });

    return {
      addSchedule,
      closeSchedule,
      visible,
      schedule,
      time,
      scheduleType,
      svgStyle,
      submitSchedule,
      editSchedule,
      splitItems,
      deleteSchedule,
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
  border: 2px solid themed(bg-light);
  border-width: 2px 0;
  background: themed(primary);
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

    &-label {
      margin-right: 10px;
      padding-top: 6px;
    }

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
