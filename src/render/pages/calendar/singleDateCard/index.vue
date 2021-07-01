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
        <p class="schedule-title zcoo">今日日程安排</p>
        <div class="col-fill">
          <Schedule />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { CalenarType } from '@/utils/calendar';
import Schedule from '@/components/Schedule/index.vue';

export default defineComponent({
  name: 'SingleDateCard',
  components: { Schedule },
  props: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const dateInfo: Ref<CalenarType | {}> = ref({});

    const holiday = computed(() => {
      let copy = dateInfo.value as CalenarType;
      return copy?.festivals?.length > 0
        ? '节日: ' + copy.festivals.join(',')
        : copy.rest
        ? '快乐休息日: 今天可要好好休息呢!'
        : '苦逼工作日: 今天也要好好工作哦!';
    });

    const festivals = computed(() => {
      let copy = dateInfo.value as CalenarType;
      return copy?.otherFestivals?.length > 0
        ? '特殊的一天: ' + copy.otherFestivals.join(',')
        : '平平无奇的一天: 今天也要充满元气哦!';
    });

    const yi = computed(() => {
      let copy = dateInfo.value as CalenarType;
      return copy?.yi?.join('、');
    });

    const ji = computed(() => {
      let copy = dateInfo.value as CalenarType;
      return copy?.ji?.join('、');
    });

    onMounted(() => {
      if (!store.getters.getCardInfo)
        router.push({
          name: useRoute().meta.parent as string,
        });
      else dateInfo.value = store.getters.getCardInfo;
    });

    return {
      dateInfo,
      holiday,
      festivals,
      yi,
      ji,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;
.calendar-container {
  padding: $padding;
  position: relative;
  @include font-color(light);

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
        @include font-color(light);
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
      }
    }
  }
}
</style>
