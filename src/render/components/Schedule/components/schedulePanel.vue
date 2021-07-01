<template>
  <transition name="fade">
    <div v-if="visible">
      <div class="schedule-panel-container"></div>
      <div class="shelter-box" @click="onClose"></div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, toRefs } from 'vue';
export default defineComponent({
  name: '',
  emits: ['onClose'],
  components: {},
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const { visible } = toRefs(prop);
    const onClose = () => {
      emit('onClose');
    };
    return {
      visible,
      onClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.schedule-panel-container {
  @include background(primary);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  width: 360px;
  height: 240px;
  box-shadow: 0 0 5px themed(bg-dark);
}

.shelter-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  z-index: 200;
}
</style>
