<template>
  <div class="col-fill flex-col setting-container">
    <div class="setting-inner">
      <kl-scroll></kl-scroll>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Setting',
  components: {},
  props: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
.setting-container {
  padding: 10px;

  .setting-inner {
    flex: 1;
    height: 0;
    background: themed(primary);
  }
}
</style>
