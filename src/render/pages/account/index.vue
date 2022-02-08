<template>
  <div class="account-container flex col-fill">
    <div class="overview row-fill flex-col">
      <span class="item-name zcoo">统计</span>
    </div>
    <div class="current row-fill flex-col">
      <span class="item-name zcoo">今日消费</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: '',
  components: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
.account-container {
  padding: 10px;

  .item-name {
    color: themed(font-light);
    font-size: 14px;
  }

  .overview {
    margin-right: 5px;
    background: themed(primary);
    padding: 5px;
  }

  .current {
    margin-left: 5px;
    background: themed(primary);
    padding: 5px;
  }
}
</style>
