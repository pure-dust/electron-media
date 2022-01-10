<!--
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:11:47
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-23 14:14:55
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="col-fill calendar-container flex-col">
    <div class="calendar-tool flex animate">
      <kl-icon @on-click="preMonth" width="30px" icon="icon-ic_arrow_left" hover />
      <div class="tool-box row-fill flex"></div>
      <kl-icon @on-click="nextMonth" width="30px" icon="icon-ic_arrow_right" hover />
    </div>
    <div class="calendar-inner zcoo col-fill" @mouseover="getDate" @click="toDetailCard">
      <div class="calendar-header" v-for="(item, i) in dateMap" :key="i">{{ item }}</div>
      <div
        class="calendar-date flex-col animate"
        v-for="(item, i) in date"
        :data-index="i"
        :key="i"
        :class="calendarClass(item)"
      >
        <p class="baloo">{{ item.date }}</p>
        <p>{{ item.festivals.length > 0 ? item.festivals[0] : item.lunarDate }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { Calenar, CalenarType } from '@/utils/calendar';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/calendar';
import _ from 'lodash';
export default defineComponent({
  name: 'Calendar',
  props: {},
  setup() {
    const calendar = new Calenar();
    const date: Ref<Array<CalenarType>> = ref([]);
    const router = useRouter();
    const store = useStore();

    const dateMap = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    onMounted(() => {
      let cacheDate = store.getCurrentDate ? store.getCurrentDate : new Date();
      calendar.setDate(cacheDate);
      date.value = calendar.getCalendar();
    });

    const calendarClass = (data: CalenarType) => {
      let classArr = [];
      if (data.now) classArr.push('now-date');
      if (data.current) classArr.push('current-date');
      else classArr.push('disabled-date');
      if (data.rest && data.current) classArr.push('rest-date');
      return classArr.join(' ');
    };

    const nextMonth = () => {
      calendar.getNext();
      date.value = calendar.getCalendar();
      store.setCurrentDate(calendar.getCurrent());
    };

    const preMonth = () => {
      calendar.getPreious();
      date.value = calendar.getCalendar();
      store.setCurrentDate(calendar.getCurrent());
    };

    const getDate = (e: MouseEvent) => {};

    const toDetailCard = (e: MouseEvent) => {
      let parent = e.currentTarget as HTMLElement;
      let cur = e.target as HTMLElement;
      let index = cur.dataset.index;
      while (
        (cur.dataset.index === undefined || cur.dataset.index === null) &&
        parent.contains(cur)
      ) {
        cur = cur.parentElement as HTMLElement;
        index = cur?.dataset?.index;
      }
      if (index !== undefined && index !== null) {
        let data = date.value[parseInt(index)];
        store.setCardInfo(data);
        router.push({
          name: 'Single',
        });
      }
    };

    return {
      date,
      calendarClass,
      nextMonth,
      preMonth,
      dateMap,
      getDate,
      toDetailCard,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;
.calendar-container {
  padding: $padding;
  position: relative;

  .calendar-tool {
    height: 30px;
    margin-bottom: 10px;
    @include background('primary');
    position: absolute;
    width: 100%;
    left: 0;
    top: -30px;
    opacity: 0;

    &::after {
      content: '';
      display: block;
      position: absolute;
      height: 10px;
      width: 100%;
      top: 100%;
    }

    &:hover {
      top: 0;
      opacity: 1;
      box-shadow: 0 1px 5px themed('bg-dark-color');
    }
  }

  .calendar-inner {
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-template-rows: auto auto;

    .calendar-header {
      @include color('light');
      @include size('small');
      @include border('light');
      @include background('primary');
      margin-left: -1px;
      margin-top: -1px;
      overflow: hidden;
      text-align: center;
      padding: 12px 0;
    }

    .calendar-date {
      position: relative;
      user-select: none;
      overflow: hidden;
      @include color('light');
      @include size('small');
      @include border('light');
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      margin-left: -1px;
      margin-top: -1px;
      padding-bottom: 10px;

      & > p:nth-child(1) {
        @include size('large');
        height: 0;
        flex: 1;
      }
    }

    .current-date {
      @include bg-hover('primary');
      @include background('primary');
    }

    .disabled-date {
      @include background('disabled');
      @include bg-hover('disabled');
    }

    .rest-date {
      @include background('success');
      @include bg-hover('success');
    }

    .now-date {
      background: repeating-linear-gradient(
        -45deg,
        themed('primary'),
        themed('primary'),
        themed('primary-hover'),
        themed('primary-hover') 10%
      );
    }
  }
}
</style>
