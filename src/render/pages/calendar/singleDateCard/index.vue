<template>
  <div class="col-fill calendar-container flex-col">
    <div class="calendar-inner col-fill flex">
      <div class="row-fill flex-col date">
        <div class="date-container flex-col col-fill">
          <div class="calendar-date flex col-fill">
            <p class="star-sign zcoo">{{ dateInfo.starSign }}座</p>
            <p class="solar-date baloo">{{ dateInfo.date }}</p>
            <p class="lunar-date zcoo">{{ dateInfo.lunarDate }}</p>
          </div>
          <div class="date-year-month flex zcoo">
            <p>{{ dateInfo.year }}年</p>
            <p>{{ dateInfo.month }}月</p>
            <p>{{ dateInfo.lunarYear }}年</p>
            <p>{{ dateInfo.lunarMonth }}月</p>
          </div>
        </div>
        <div class="festivals-lunar flex-col col-fill zcoo">
          <div class="flex-col festivals-inner">
            <p class="ellipsis">{{ holiday }}</p>
            <p class="ellipsis">{{ festivals }}</p>
            <p>今日宜忌:</p>
            <p>宜: {{ yi }}</p>
            <p>忌: {{ ji }}</p>
          </div>
        </div>
      </div>
      <div class="row-fill schedule zcoo flex-col">
        <p class="schedule-title zcoo">
          <span>今日日程安排</span>
          <span v-if="scheduleList.length > 0">
            今天有{{ ` ${scheduleList.length} ` }}个日程计划
          </span>
          <span v-else> 今天暂时没有日程计划哦 </span>
        </p>
        <div class="col-fill">
          <Schedule @refresh="getSchedule" :list="scheduleList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import _ from 'lodash';

import { useStore } from '@/store/calendar';
import { useDatabase } from '@/utils/control';
import { CalenarType } from '@/utils/calendar';
import Schedule from '@/components/Schedule/index.vue';

export default defineComponent({
  name: 'SingleDateCard',
  components: { Schedule },
  props: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const dateInfo: Ref<CalenarType> = ref({
      year: 0,
      month: 0,
      date: 0,
      week: '',
      day: 0,
      current: false,
      lunarYear: '',
      lunarMonth: '',
      lunarDate: '',
      starSign: '',
      festivals: [],
      otherFestivals: [],
      now: false,
      yi: [],
      ji: [],
      rest: false,
      dateTime: '',
    });

    let scheduleList: Ref<Schedule[]> = ref([]);

    const holiday = computed(() => {
      return dateInfo.value?.festivals?.length > 0
        ? '节日: ' + dateInfo.value.festivals.join(',')
        : dateInfo.value.rest
        ? '快乐休息日: 今天可要好好休息呢!'
        : '苦逼工作日: 今天也要好好工作哦!';
    });

    const festivals = computed(() => {
      return dateInfo.value?.otherFestivals?.length > 0
        ? '特殊的一天: ' + dateInfo.value.otherFestivals.join(',')
        : '平平无奇的一天: 今天也要充满元气哦!';
    });

    const yi = computed(() => {
      return dateInfo.value?.yi?.join('、');
    });

    const ji = computed(() => {
      return dateInfo.value?.ji?.join('、');
    });

    const getSchedule = () => {
      useDatabase('calendar', 'find', {
        query: {
          date: dateInfo.value.dateTime,
        },
        cond: {
          sort: {
            createdAt: 1,
          },
        },
      }).then((res) => {
        scheduleList.value = res as Schedule[];
      });
    };

    onMounted(() => {
      if (!store.getCardInfo) {
        router.push({
          name: useRoute().meta.parent as string,
        });
        return;
      } else {
        dateInfo.value = store.getCardInfo;
        getSchedule();
      }
    });

    return {
      dateInfo,
      holiday,
      festivals,
      yi,
      ji,
      scheduleList,
      getSchedule,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;
.calendar-container {
  padding: $padding;
  position: relative;
  @include color(light);

  p::selection {
    background: #ffffff;
    color: themed(primary);
  }

  .calendar-inner {
    @include background(primary);

    .date {
      border-right: calc(#{$padding}/ 2) solid #ffffff;
      flex: 1 0 50%;

      .date-container {
        align-items: center;
        padding: $padding;
        border-bottom: calc(#{$padding}/ 2) solid #ffffff;

        .calendar-date {
          align-items: center;
          justify-content: center;

          .star-sign {
            font-size: 18px;
            line-height: 24px;
            width: 18px;
            margin-right: $padding;
          }

          .solar-date {
            font-size: 128px;
            height: 128px;
            line-height: calc(128px * 1.5);
            margin: 0 $padding;
            overflow: hidden;
          }

          .lunar-date {
            font-size: 24px;
            line-height: 48px;
            width: 24px;
            margin-left: $padding;
          }
        }

        .date-year-month {
          justify-content: center;
          align-items: center;

          & > p {
            margin: 0 calc(#{$padding}/ 2);
          }
        }
      }

      .festivals-lunar {
        padding: $padding;
        border-top: calc(#{$padding}/ 2) solid #ffffff;
        @include color(light);
        overflow: auto;

        .festivals-inner {
          justify-content: space-around;
          font-size: 14px;
          line-height: 18px;
          flex: 1;
        }

        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }

    .schedule {
      border-left: calc(#{$padding}/ 2) solid #ffffff;
      padding: $padding;
      flex: 1 0 50%;

      &-title {
        font-size: 14px;
        margin-bottom: $padding;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
