<template>
  <div class="time-slot-container flex">
    <span class="hour">{{ hour }}:00</span>
    <div class="schedule-box row-fill" @click.self="onSlotClick"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';

export default defineComponent({
  name: 'TimeDlot',
  props: {
    hour: {
      required: true,
      type: Number,
    },
  },
  setup(prop, { emit }) {
    const slot: Ref<Array<number>> = ref([]);

    onMounted(() => {
      slot.value = [prop.hour, prop.hour + 1];
    });

    const onSlotClick = (e: MouseEvent) => {
      const dom = e.target as HTMLElement;
      const height = dom.offsetHeight;
      const { offsetY } = e;
      let f = offsetY > height / 2;
      const payload: AddScheduleOption = {
        hour: prop.hour,
        start: prop.hour + (f ? ':30' : ':00'),
        end: f ? prop.hour + 1 + ':00' : prop.hour + ':30',
      };
      emit('onSlotClick', payload);
    };

    return {
      slot,
      onSlotClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.time-slot-container {
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

  .schedule-box {
    cursor: pointer;
  }
}
</style>
