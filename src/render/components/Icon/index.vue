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
    <svg>
      <use :xlink:href="`#${icon}`" />
    </svg>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { fill } from 'lodash';
import { defineComponent, computed, toRefs } from 'vue';

export default defineComponent({
  name: 'KlIcon',
  props: {
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
    fixedHover: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    auto: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop, { emit }) {
    const { color, icon, animate, hover, fixedHover } = toRefs(prop);

    const iconStyle = computed(() => {
      let style: {
        fill: string;
        fontSize: string;
        width?: string;
        height?: string;
      } = {
        fill: color.value,
        fontSize: typeof prop.size === 'number' ? prop.size + 'px' : prop.size,
      };
      if (prop.auto) {
        style.width = '100%';
        style.height = '100%';
      }
      return style;
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
  width: 1em;
  height: 1em;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1em;
    height: 1em;
    font-size: 16px;
    pointer-events: none;
  }
}

.hover {
  @include bg-hover('primary');
}

.fixed-hover {
  @include background('primary-hover');
}
</style>
