/*
 * @Author: Lixiao2
 * @Date: 2022-01-20 11:53:18
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-20 15:03:20
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { useStore as useConfigStore } from '@/store/config';
import { useStore as useNoticeStore } from '@/store/notice';
import { miniMode } from '@/utils';

export function useNovelMini() {
  const conf = useConfigStore();
  const notice = useNoticeStore();
  if (notice.mini) {
    miniMode(conf.theme.width, conf.theme.height);
  } else {
    miniMode(300, Number(conf.getNovel.lineHeight));
  }
  notice.setMini(!notice.mini);
}
