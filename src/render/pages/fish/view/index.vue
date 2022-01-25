<template>
  <div class="col-fill fish-container flex-col">
    <div class="fish-inner flex">
      <div class="book-list flex-col">
        <div class="book-list-title zcoo flex">
          <span>
            {{ t('novel.title') }}
          </span>
          <kl-button size="small" @click="importNovel" icon="icon-add">
            {{ t('novel.import') }}
          </kl-button>
        </div>
        <kl-scroll class="col-fill">
          <div class="book-list-wrapper">
            <NovelCard
              v-for="item in bookList"
              :data="item"
              :key="item.path"
              @click="toNovel(item)"
              @delete="deleteNovel(item)"
            ></NovelCard>
          </div>
        </kl-scroll>
      </div>
      <div class="book-setting row-fill">
        <div class="config-item flex zcoo" v-for="(v, k) in config" :key="k">
          <dynamic-input
            v-model="config[k]"
            label-width="50px"
            split=" :"
            :label="t('novel.' + k)"
            :type="NOVEL_CONFIG[k]"
            :color="config.color"
            :background="config.background"
            @change="(v) => configWatcher(k, v)"
          ></dynamic-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { nanoid } from 'nanoid';
import { useStore } from '@/store/config';
import { useStore as useNovelStore } from '@/store/novel';
import { useI18n } from '@/hooks/i18n';
import { selectFile, setConfig, useDatabase } from '@/utils';
import { FileInfo } from '@root/typings/novel';
import { NovelConfig } from '@root/typings/user-config';
import { NOVEL_CONFIG } from '@/contants/constant';

import NovelCard from '../components/novel-card.vue';
import dynamicInput from '../components/dynamic-input.vue';

interface BookInfo extends FileInfo {
  id: string;
  _id: string;
  createAt: string;
  updateAt: string;
}

export default defineComponent({
  name: '',
  components: { NovelCard, dynamicInput },
  props: {},
  setup() {
    const bookList: Ref<Array<BookInfo>> = ref([]);
    const store = useStore();
    const novelStore = useNovelStore();
    const config: Ref<NovelConfig> = ref(store.getNovel);
    const { t } = useI18n();
    const router = useRouter();

    const configWatcher = (key: string, value: any) => {
      setConfig({ key: 'novel.' + key, value }).then((done) => {
        if (done) {
          store.setNovel(config.value);
        }
      });
    };

    const importNovel = () => {
      selectFile()
        .then((fileList) => {
          fileList = fileList.filter((el) => {
            return !bookList.value.some((file) => file.path === el.path);
          });
          if (fileList.length > 0) {
            useDatabase('novel', 'insert', {
              data: fileList.map((file) => ({ id: nanoid(), ...file })),
            }).then(() => {
              getNovel();
            });
          }
        })
        .catch((err) => {});
    };

    const getNovel = () => {
      useDatabase('novel', 'find', {
        query: {},
      }).then((res) => {
        bookList.value = res as [];
      });
    };

    const deleteNovel = (file: BookInfo) => {
      useDatabase('novel', 'remove', {
        query: {
          id: file.id,
        },
        remove: {
          multi: true,
        },
      }).then(() => {
        getNovel();
      });
    };

    const toNovel = (file: BookInfo) => {
      novelStore.setPath(file.path);
      router.push({
        name: 'Novel',
      });
    };

    onMounted(() => {
      getNovel();
    });

    return {
      NOVEL_CONFIG,
      bookList,
      config,
      t,
      configWatcher,
      importNovel,
      toNovel,
      deleteNovel,
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
    height: 0;

    .book-list {
      margin-right: 5px;
      background: themed(primary);
      padding: 5px;
      flex: 1.5;

      &-title {
        font-size: themed(middle-size);
        color: themed(font-light);
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      &-wrapper {
        height: 313px;
        padding: $padding;
        background: themed(bg-light);
        display: grid;
        grid-template-columns: repeat(3, calc((100% - 20px) / 3));
        grid-template-rows: repeat(auto-fill, 120px);
        align-items: center;
        justify-items: center;
        gap: $padding;
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
