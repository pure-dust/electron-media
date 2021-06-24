<!--
 * @Author: Lixiao2
 * @Date: 2021-06-22 18:08:31
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 09:11:48
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="icon-box" :class="iconClass" :style="iconStyle">
    <svg>
      <use :xlink:href="icon" />
    </svg>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Icon',
  components: {},
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
    hover: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop) {
    const { width, height, color, icon, hover } = prop;

    const iconStyle = computed(() => {
      return {
        width,
        height,
        fill: color,
      };
    });
    const iconClass = computed(() => {
      let classArr = []
      if(hover) classArr.push("animate")
      return classArr.join(" ")
    })

    return {
      iconStyle,
      iconClass,
      icon,
    };
  },
});
</script>
<style lang="scss" scoped>
.icon-box {
  text-align: center;
  cursor: pointer;
  position: relative;
  @include bg-hover('primary');
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 50%;
    height: 50%;
  }
}
</style>
