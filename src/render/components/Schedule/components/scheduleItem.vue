<template>
  <div class="schedule-item-container" :style="style">
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
      type: Object as PropType<SchedulePosType>,
      default: () => ({}),
    },
    schedule: {
      type: Object as PropType<ScheduleType>,
    },
  },
  setup(prop) {
    const { position, schedule } = toRefs(prop);
    const style = computed(() => {
      return {
        top: position.value.top + 'px',
        left: position.value.left + 'px',
        width: position.value.width + 'px',
        height: position.value.height + 'px',
      };
    });

    return {
      schedule,
      style,
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
  @include color(light);

  &::before {
    content: '';
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    border-radius: 2px;
    @include background(success);
  }
}
</style>
