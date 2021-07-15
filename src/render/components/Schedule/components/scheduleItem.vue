<template>
  <div class="schedule-item-container flex" :style="style" @click="onClick">
    <p class="ellipsis">
      {{ schedule.theme }}
    </p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
export default defineComponent({
  name: '',
  emits: ['onClick'],
  components: {},
  props: {
    position: {
      type: Object as PropType<SchedulePos>,
      default: () => ({}),
    },
    schedule: {
      type: Object as PropType<Schedule>,
      default: () => ({}),
    },
  },
  setup(prop, { emit }) {
    const { position, schedule } = toRefs(prop);
    const style = computed(() => {
      return {
        top: position.value.top + 'px',
        left: position.value.left + 'px',
        width: position.value.width + 'px',
        height: position.value.height + 'px',
      };
    });

    const onClick = (ev: MouseEvent) => {
      emit('onClick', ev);
    };
    return {
      schedule,
      style,
      onClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.schedule-item-container {
  position: absolute;
  padding-left: 5px;
  pointer-events: all;
  @include size(small);
  @include color(primary);
  @include background(bg-light);
  border: 1px solid themed(success);
  border-radius: 3px;
  align-items: center;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    border-radius: 2px;
    @include background(success);
  }
}
</style>
