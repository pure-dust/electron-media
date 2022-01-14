<template>
  <div class="time-slot-container flex animate" @click="onSlotClick">
    <span class="hour">
      {{ hour }}
    </span>
    <div class="schedule-box row-fill">
      <schedule-card
        v-for="sche in schedule"
        :schedule="sche"
        @on-close="onCardClose"
        @on-card-click="onCardClick"
      ></schedule-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Schedule, AddScheduleOption } from '@root/typings/schedule';
import { defineComponent, PropType } from 'vue';
import ScheduleCard from './scheduleCard.vue';

export default defineComponent({
  name: 'TimeDlot',
  components: { ScheduleCard },
  props: {
    hour: {
      required: true,
      type: Number,
    },
    schedule: {
      type: Array as PropType<Schedule[]>,
    },
  },
  emits: ['on-slot-click', 'on-card-click', 'on-card-close'],
  setup(prop, { emit }) {
    const onSlotClick = (e: MouseEvent) => {
      const dom = e.target as HTMLElement;
      const height = dom.offsetHeight;
      const { offsetY } = e;
      let f = offsetY > height / 2;
      const payload: AddScheduleOption = {
        hour: prop.hour,
        start: prop.hour + (f ? ':30' : ':00'),
        end: f ? (prop.hour + 1 === 24 ? '0' : prop.hour) + ':00' : prop.hour + ':30',
      };
      emit('on-slot-click', payload);
    };

    const onCardClick = (sche: Schedule) => {
      emit('on-card-click', sche);
    };

    const onCardClose = (id: string) => {
      emit('on-card-close', id);
    };

    return {
      onSlotClick,
      onCardClick,
      onCardClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.time-slot-container {
  height: 40px;
  line-height: 40px;
  user-select: none;
  border-bottom: 1px solid themed(bg-light);
  transform-origin: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    box-shadow: inset 0 0 5px themed(bg-dark);
  }

  .hour {
    width: 24px;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      themed(bg-light) calc(50% - 2px),
      transparent calc(50% - 2px),
      transparent calc(50% + 3px),
      themed(bg-light) calc(50% + 3px)
    );
    background-repeat: no-repeat;
    background-position: 100% 0;
    background-size: 1px 100%;
    pointer-events: none;
    text-align: center;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 4px;
      height: 4px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid themed(bg-light);
    }
  }

  .schedule-box {
    padding: 0 20px 0 10px;
    gap: 0 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
}
</style>
