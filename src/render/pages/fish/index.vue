<template>
  <div class="col-fill fish-container flex-col">
    <div class="fish-inner flex">
      <div class="book-list flex-col">
        <div class="book-list-title zcoo">
          <span>
            {{ t('书籍列表') }}
            <kl-icon></kl-icon>
          </span>
        </div>
        <div class="book-list-wrapper col-fill"></div>
      </div>
      <div class="book-setting row-fill">
        <div class="config-item flex zcoo" v-for="(v, k) in config" :key="k">
          <span class="config-item-name">{{ t('novel.' + k) }}:</span>
          <template v-if="k === 'color' || k === 'background'">
            <kl-color-selector
              :default-value="config[k]"
              @change="(v) => configWacther(k, v)"
              v-model="config[k]"
            >
              <template #reference>
                <kl-input
                  :color="config.color"
                  :background="config.background"
                  :readonly="true"
                  v-model="config[k]"
                ></kl-input>
              </template>
            </kl-color-selector>
          </template>
          <kl-input v-else @change="(v) => configWacther(k, v)" v-model="config[k]"></kl-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useStore } from '@/store/config';
import { useI18n } from '@/hooks/i18n';
import { setConfig } from '@/utils';
export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    const bookList = ref([]);
    const store = useStore();
    const config: Ref<NovelConfig> = ref(store.getNovel);
    const { t } = useI18n();

    const configWacther = (key: string, value: any) => {
      setConfig({ key: 'novel.' + key, value }).then((done) => {
        console.log(done);
        if (done) {
          store.setNovel(config.value);
        }
      });
    };

    return {
      bookList,
      config,
      t,
      configWacther,
    };
  },
});
</script>
<style lang="scss" scoped>
$padding: 10px;
.fish-container {
  padding: $padding;
  position: relative;

  .fish-inner {
    flex: 1;

    .book-list {
      margin-right: 5px;
      background: themed(primary);
      padding: 5px;
      flex: 1.5;

      &-title {
        font-size: themed(middle-size);
        color: themed(font-light);
      }

      &-wrapper {
        padding: $padding 0;
      }
    }

    .book-setting {
      margin-left: 5px;
      background: themed(primary);
      padding: 5px;

      .config-item {
        color: themed(font-light);
        align-items: center;
        margin-bottom: 10px;

        &-name {
          font-size: themed(small-size);
          width: 80px;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
