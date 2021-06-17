<!--
 * @Author: Lixiao2
 * @Date: 2021-06-16 10:31:58
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-17 17:46:34
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="app-main col-fill" ref="scrollBox" @mousewheel.capture="onMouseWheel">
    <Card
      v-for="(item, i) in cardList"
      :key="i"
      v-enter-ani:[scrollInstance]
      :option="{ height: height }"
    />
  </div>
  <div class="space-block"></div>
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

    const onMouseWheel = timing((e: WheelEvent) => {
      let dom = e.target as HTMLElement;
      if (
        (e.deltaY > 0 && dom.scrollTop + dom.offsetHeight >= dom.scrollHeight) ||
        (e.deltaY < 0 && dom.scrollTop <= 0)
      )
        return;
      let dir = Math.abs(e.deltaY) / e.deltaY;
      let interval = height.value * dir + 20 * dir;
      let clock: NodeJS.Timeout | null = null;
      let t = 0;
      let origin: number = dom.scrollTop;
      clock = setInterval(() => {
        t += 1 / 100;
        let rate = Math.round(cubic.solve(t) * 100) / 100;
        if (rate >= 1) {
          rate = 1;
          clearInterval(clock as NodeJS.Timeout);
          clock = null;
        }
        dom.scrollTop = origin + rate * interval;
      }, 10);
      if (Math.abs(dom.scrollTop) < 10 && Math.abs(dom.scrollTop) > 0) {
        dom.scrollTop = 0;
      }
      if (
        Math.abs(dom.scrollTop + dom.offsetHeight - dom.scrollHeight) < 10 &&
        Math.abs(dom.scrollTop + dom.offsetHeight - dom.scrollHeight) > 0
      ) {
        dom.scrollTop = dom.scrollHeight;
      }
      e.preventDefault();
    }, 1000);

    onMounted(() => {
      cardList.value = [1, 2, 3, 4, 5, 6, 7];
      height.value = scrollBox.value?.offsetHeight as number;
      height.value = (height.value - 40) / 2;
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
@import '@/styles/_handle.scss';
.app-main {
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto auto;
  overflow: hidden auto;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}
.space-block {
  height: 20px;
}
</style>
