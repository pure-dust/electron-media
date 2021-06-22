<!--
 * @Author: Lixiao2
 * @Date: 2021-06-18 11:11:47
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-22 18:07:03
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
-->
<template>
  <div class="col-fill calendar-container flex-col">
    <div class="calendar-tool flex">
      <span class="icon-box">
        <svg>
          <use xlink:href="#icon-ic_horn_left" />
        </svg>
      </span>
      <div @click="nextMonth">下一月</div>
    </div>
    <div class="calendar-inner col-fill">
      <div
        class="calendar-date flex-col animate"
        v-for="(item, i) in date"
        :key="i"
        :class="calendarClass(item.current)"
      >
        <p>{{ item.date }}</p>
        <p>{{ item.week }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { Calenar, CalenarType } from '@/utils/utils';
export default defineComponent({
  name: 'Calendar',
  components: {},
  props: {},
  setup() {
    const calendar = new Calenar();
    const date: Ref<Array<CalenarType>> = ref([]);

    onMounted(() => {
      calendar.setDate(new Date('2021/6/20'));
      date.value = calendar.getCalendar();
    });

    const calendarClass = (current: boolean) => {
      return current ? '' : 'disabled-date';
    };

    const nextMonth = () => {
      calendar.getNext();
      date.value = calendar.getCalendar();
    };

    const preMonth = () => {
      calendar.getNext();
      date.value = calendar.getCalendar();
    };

    return {
      date,
      calendarClass,
      nextMonth,
      preMonth,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;
.calendar-container {
  padding: 0 $padding $padding;

  .calendar-tool {
    height: 30px;
    margin-bottom: 10px;
    @include background('primary');
  }

  .calendar-inner {
    @include background('primary');
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-template-rows: auto auto;

    .calendar-date {
      @include font-color('light');
      @include font-size('small');
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      @include border('light');
      margin-left: -1px;
      margin-top: -1px;
      overflow: hidden;
      font-family: Zcoo;
      padding-bottom: 10px;

      @include bg-hover('primary');

      & > p:nth-child(1) {
        @include font-size('large');
        font-family: Baloo Regular;
        height: 0;
        flex: 1;
      }
    }

    .disabled-date {
      @include background('disabled');
      cursor: default;

      &:hover {
        @include background('disabled');
      }
    }
  }

  .icon-box {
    height: 100%;
    width: 32px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    position: relative;
  }
}
</style>
