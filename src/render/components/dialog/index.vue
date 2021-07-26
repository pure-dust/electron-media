<template>
  <transition name="fade">
    <div class="kl-dialog flex-col" v-if="visible">
      <div v-if="slots.header" class="kl-dialog-header">
        <slot name="header"> </slot>
      </div>
      <div
        class="kl-dialog-body col-fill"
        :class="{ 'bottom-offset': slots.footer, 'top-offset': slots.header }"
      >
        <slot></slot>
      </div>
      <div v-if="slots.footer" class="kl-dialog-footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </transition>
  <teleport to="body">
    <transition name="fade">
      <div v-if="visible" class="shelter-box" @click="onClose"></div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
export default defineComponent({
  name: 'KlDialog',
  emits: ['onClose'],
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
    title: {
      type: [String, Boolean],
      default: false,
    },
  },
  setup(prop, { emit, slots }) {
    const { visible, title } = toRefs(prop);
    const onClose = () => {
      emit('onClose');
    };

    return {
      visible,
      title,
      onClose,
      slots,
    };
  },
});
</script>
<style lang="scss">
.kl-dialog {
  @include background(primary);
  position: fixed;
  // left: 50%;
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  width: 360px;
  height: 240px;
  box-shadow: 0 0 5px themed(bg-dark);
  overflow: hidden;

  &-header {
    padding: 10px;
  }

  &-body {
    padding: 20px;
    overflow: hidden auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .bottom-offset {
    padding-bottom: 0;
  }

  .top-offset {
    padding-top: 0;
  }

  &-footer {
    padding: 10px;
    text-align: center;
  }
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
