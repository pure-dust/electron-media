<!--
 * @Author: Lixiao2
 * @Date: 2021-06-22 18:08:31
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 09:11:48
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="kl-icon" :class="iconClass" :style="iconStyle" @click.self="onClick">
    <svg :style="svgStyle">
      <use :xlink:href="`#${icon}`" />
    </svg>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, toRefs } from 'vue';

interface SvgStyleOption {
  width: string;
  height: string;
}
export default defineComponent({
  name: 'KlIcon',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#FFFFFF',
    },
    animate: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    svgStyle: {
      type: Object as PropType<SvgStyleOption>,
      default: {},
    },
    fixedHover: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const { width, height, color, icon, animate, hover, fixedHover } = toRefs(prop);

    const iconStyle = computed(() => {
      return {
        width: width.value,
        height: height.value,
        fill: color.value,
      };
    });
    const iconClass = computed(() => {
      let classArr = [];
      if (animate.value) classArr.push('animate');
      if (hover.value) classArr.push('hover');
      if (fixedHover.value) classArr.push('fixed-hover');
      return classArr.join(' ');
    });

    const onClick = () => {
      emit('onClick');
    };

    return {
      iconStyle,
      iconClass,
      icon,
      onClick,
    };
  },
});
</script>
<style lang="scss">
.kl-icon {
  text-align: center;
  cursor: pointer;
  position: relative;
  display: inline-block;

  svg {
    width: 50%;
    height: 50%;
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.hover {
  @include bg-hover('primary');
}

.fixed-hover {
  @include background('primary-hover');
}
</style>
