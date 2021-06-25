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
      <Icon @click="preMonth" width="30px" icon="#icon-ic_arrow_left" hover />
      <div class="tool-box row-fill flex"></div>
      <Icon @click="nextMonth" width="30px" icon="#icon-ic_arrow_right" hover />
    </div>
    <div class="calendar-inner col-fill">
      <div class="calendar-header" v-for="(item, i) in dateMap" :key="i">{{ item }}</div>
      <div
        class="calendar-date flex-col animate"
        v-for="(item, i) in date"
        :key="i"
        :class="calendarClass(item)"
      >
        <p>{{ item.date }}</p>
        <p>{{ item.week }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  Ref,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import { Calenar, CalenarType } from '@/utils/calendar';
import _ from 'lodash';
import Icon from '@/components/Icon/index.vue';
export default defineComponent({
  name: 'Calendar',
  components: { Icon },
  props: {},
  setup() {
    const calendar = new Calenar();
    const date: Ref<Array<CalenarType>> = ref([]);
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const dateMap = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    onMounted(() => {
      calendar.setDate(new Date('2021/6/20'));
      date.value = calendar.getCalendar();
    });

    const calendarClass = (data: CalenarType) => {
      let classArr = [];
      if (data.current) classArr.push('current-date');
      else classArr.push('disabled-date');
      if (_.findIndex([0, 6], (el) => el == data.day) > -1 && data.current)
        classArr.push('rest-date');
      return classArr.join(' ');
    };

    const nextMonth = () => {
      calendar.getNext();
      date.value = calendar.getCalendar();
    };

    const preMonth = () => {
      calendar.getPreious();
      date.value = calendar.getCalendar();
    };

    return {
      date,
      calendarClass,
      nextMonth,
      preMonth,
      dateMap,
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

    .calendar-date {
      user-select: none;
      @include font-color('light');
      @include font-size('small');
      @include border('light');
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      margin-left: -1px;
      margin-top: -1px;
      overflow: hidden;
      font-family: Zcoo;
      padding-bottom: 10px;

      & > p:nth-child(1) {
        @include font-size('large');
        font-family: Baloo Regular;
        height: 0;
        flex: 1;
      }
    }

    .calendar-header {
      @include font-color('light');
      @include font-size('small');
      @include border('light');
      @include background('primary');
      margin-left: -1px;
      margin-top: -1px;
      overflow: hidden;
      font-family: Zcoo;
      text-align: center;
      padding: 12px 0;
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
  }
}
</style>
