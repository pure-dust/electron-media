<template>
  <div class="schedule-card-container">
    {{ schedule?.theme }}
    <!-- <div class="shelter animate"></div> -->
    <i class="close-icon iconfont icon-ic_close animate" @click.stop="onCloseClick"></i>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'ScheduleCard',
  emits: ['on-close'],
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
    },
  },
  setup(props, { emit }) {
    const onCloseClick = () => {
      emit('on-close', props.schedule?._id);
    };

    return {
      onCloseClick,
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
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .close-icon {
      right: 3px;
    }

    .shelter {
      opacity: 0.2;
    }
  }

  .shelter {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    background: themed(bg-dark);
    opacity: 0;
  }

  .close-icon {
    color: themed(error-light);
    display: block;
    position: absolute;
    top: 50%;
    font-size: 14px;
    right: -15px;
    transform: translateY(-50%);
  }
}
</style>
