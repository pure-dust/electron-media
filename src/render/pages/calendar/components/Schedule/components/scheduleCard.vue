<template>
  <transition class="schedule-card-container">
    <div class="schedule-card-container" @click.stop="onCardClick">
      {{ schedule?.theme }}
      <kl-icon
        class="close-icon"
        icon="icon-ic_close"
        @click.stop="onCloseClick"
        :size="14"
        :auto="false"
        :color="themed('error-light')"
      ></kl-icon>
    </div>
  </transition>
</template>
<script lang="ts">
import { Schedule } from '@root/typings/schedule';
import { defineComponent, PropType } from 'vue';
import { themed } from '@/utils';
export default defineComponent({
  name: 'ScheduleCard',
  emits: ['on-close', 'on-card-click'],
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
    },
  },
  setup(props, { emit }) {
    const onCloseClick = () => {
      emit('on-close', props.schedule?._id);
    };

    const onCardClick = () => {
      emit('on-card-click', props.schedule);
    };

    return {
      onCloseClick,
      onCardClick,
      themed,
    };
  },
});
</script>
<style lang="scss" scoped>
.schedule-card-container {
  position: relative;
  line-height: normal;
  background: themed(bg-light);
  border-radius: 2px;
  cursor: pointer;
  color: themed(warning);
  padding: 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 12px;
  box-shadow: 0 0 5px themed(bg-dark);

  &:hover {
    box-shadow: 0 0 2px themed(bg-dark);
    position: absolute;
    width: calc(100% - 30px);
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    z-index: 100;
    .close-icon {
      right: 3px;
      opacity: 1;
    }
  }
}
</style>
