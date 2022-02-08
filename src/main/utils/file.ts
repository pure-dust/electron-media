import { openSync, writeFileSync, readFileSync, closeSync } from 'fs';

/*
 * @Author: Lixiao2
 * @Date: 2022-01-17 11:20:13
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-17 11:27:52
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */

const READ_ERROR = {
  SUCCESS: '0',
  NOT_EXIST: '1',
  OTHER: '2',
};

export function readFile(
  path: string,
  format:
    | { encoding: BufferEncoding; flag?: string }
    | BufferEncoding = 'utf-8',
) {
  let fd;
  try {
    fd = openSync(path, 'r');
  } catch (err: any) {
    if (err.code == 'ENOENT') {
      throw new Error(READ_ERROR.SUCCESS);
    } else {
      throw new Error(READ_ERROR.OTHER);
    }
  }
  let buffer: string = readFileSync(fd, format);
  closeSync(fd);
  return buffer;
}
