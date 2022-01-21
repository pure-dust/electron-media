/*
 * @Author: Lixiao2
 * @Date: 2022-01-20 11:53:18
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-21 11:19:59
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { useStore as useConfigStore } from '@/store/config';
import { useStore as useNoticeStore } from '@/store/notice';
import { fixWindow, miniMode } from '@/utils';

export function useNovelMini() {
  const conf = useConfigStore();
  const notice = useNoticeStore();
  if (notice.mini) {
    miniMode(conf.theme.width, conf.theme.height, !notice.mini);
  } else {
    miniMode(300, Number(conf.getNovel.lineHeight), !notice.mini);
    useFixedWindow(true);
  }
  notice.setMini(!notice.mini);
}

export async function useFixedWindow(fixed?: boolean): Promise<boolean> {
  const notice = useNoticeStore();
  let result = await fixWindow(fixed);
  notice.setFixed(result);
  return result;
}
