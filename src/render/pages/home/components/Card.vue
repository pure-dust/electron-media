<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:44:18
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-18 17:48:43
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="card-container animate flex" :style="style" @click="linkTo">
    <div class="card-detail flex-col row-fill">
      <div class="card-title">{{ option.name }}</div>
      <div class="card-intro">{{ option.intro }}</div>
    </div>
    <div class="card-img">
      <svg class="svg-box">
        <use :xlink:href="`#${option.icon}`" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, PropType, computed } from 'vue';
import { useRouter } from 'vue-router';

interface CardOption {
  height: number;
  name: string;
  intro: string;
  icon?: string;
  path: string;
}

export default defineComponent({
  name: 'Card',
  props: {
    option: {
      type: Object as PropType<CardOption>,
    },
  },
  setup(prop, _) {
    const { option } = toRefs(prop);
    const router = useRouter();
    const style = computed(() => {
      let style = {
        height: option?.value?.height + 'px',
      };
      return style;
    });

    const intro = computed(() => {
      return option?.value?.intro.split(/,|，/);
    });

    const linkTo = () => {
      if (option?.value?.path) {
        router.push({
          path: option?.value?.path as string,
        });
      }
    };

    return {
      style,
      option,
      intro,
      linkTo,
    };
  },
});
</script>
<style lang="scss" scoped>
.card-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 20px;
  font-family: Zcoo;
  @include background('primary');
  @include font-color('light');
  transform-origin: center 100%;
  user-select: none;

  .card-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .card-intro {
    font-size: 12px;
    line-height: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 1px;
  }

  .card-img {
    margin-left: 10px;
    width: 80px;

    .svg-box {
      width: 80px;
      height: 80px;
      fill: themed('primary-light');
    }
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px 5px themed('border-light-color');
  }

  &:active {
    transform: scale(1);
  }
}
</style>
