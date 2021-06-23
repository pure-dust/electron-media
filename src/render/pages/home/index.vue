<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:31:58
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-21 09:18:35
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="col-fill flex-col">
    <div class="app-main col-fill" ref="scrollBox" @mousewheel="onMouseWheel">
      <Card v-for="(item, i) in cardList" :key="i" v-enter-ani:[scrollInstance] :option="item" />
    </div>
    <div class="space-block"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
import Card from './components/Card.vue';

import { timing, Cubic } from '@/utils/utils';
export default defineComponent({
  name: 'Home',
  components: { Card },
  props: {},
  setup() {
    let cardList: Ref<Array<any> | null> = ref(null);
    let height: Ref<number> = ref(0);
    const scrollBox: Ref<HTMLElement | null> = ref(null);
    const cubic = new Cubic(0.56, 0.11, 0.42, 0.9);

    const scrollInstance = computed(() => {
      return scrollBox.value;
    });

    const onMouseWheel = timing((e: WheelEvent, auto: boolean) => {
      let dom = e.target as HTMLElement;
      let bottomHeight = dom.scrollTop + dom.offsetHeight;
      if (
        (e.deltaY > 0 && bottomHeight >= dom.scrollHeight) ||
        (e.deltaY < 0 && dom.scrollTop <= 0)
      )
        return auto;
      if (!auto) {
        let dir = Math.abs(e.deltaY) / e.deltaY;
        let interval = height.value * dir + 20 * dir;
        let clock: NodeJS.Timeout | null = null;
        let t = 0;
        let origin: number = dom.scrollTop;
        dom.setAttribute('data-scroll', '');
        clock = setInterval(() => {
          t += 1 / 100;
          let rate = Math.round(cubic.solve(t) * 100) / 100;
          if (rate >= 1) {
            rate = 1;
            clearInterval(clock as NodeJS.Timeout);
            clock = null;
            dom.removeAttribute('data-scroll');
          }
          dom.scrollTop = origin + rate * interval;
        }, 10);
        if (Math.abs(dom.scrollTop) < 10 && Math.abs(dom.scrollTop) > 0) {
          dom.scrollTop = 0;
        }
        if (
          Math.abs(bottomHeight - dom.scrollHeight) < 10 &&
          Math.abs(bottomHeight - dom.scrollHeight) > 0
        ) {
          dom.scrollTop = dom.scrollHeight;
        }
      }
    }, 1000);

    onMounted(() => {
      height.value = scrollBox.value?.offsetHeight as number;
      height.value = (height.value - 40) / 2;
      cardList.value = [
        {
          height: height.value,
          name: 'kl日历',
          intro: '一个小巧灵活的小日历,一个小巧灵活的小日历,一个小巧灵活的小日历',
          icon: 'icon-ic_calendar_add',
          path: '/calendar',
        },
        { height: height.value, name: 'kl日历', intro: '一个小巧灵活的小日历' },
        { height: height.value, name: 'kl日历', intro: '一个小巧灵活的小日历' },
        { height: height.value, name: 'kl日历', intro: '一个小巧灵活的小日历' },
        { height: height.value, name: 'kl日历', intro: '一个小巧灵活的小日历' },
        { height: height.value, name: 'kl日历', intro: '一个小巧灵活的小日历' },
      ];
    });
    return {
      cardList,
      scrollBox,
      scrollInstance,
      onMouseWheel,
      height,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 20px;
.app-main {
  display: grid;
  padding: $padding;
  grid-template-columns: repeat(2, calc(50% - #{$padding} / 2));
  grid-template-rows: auto auto;
  overflow: hidden auto;
  gap: $padding;
  transition: all 0.5s cubic-bezier(0.54, 0.27, 0.6, 0.86);
  color: rgba(0, 0, 0, 0);

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px;
    box-shadow: inset 0 0 0 8px;
  }
}

.app-main[data-scroll] {
  color: themed('primary');
}
.space-block {
  height: $padding;
}
</style>
