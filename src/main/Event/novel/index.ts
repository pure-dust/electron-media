/*
 * @Author: Lixiao2
 * @Date: 2022-01-17 11:18:33
 * @LastEditors: Lixiao
 * @LastEditTime: 2022-01-18 16:55:39
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */

import { NovelInfo } from '@root/typings/novel';
import { readFile } from '@src/main/utils/file';
import { dirname } from 'path';

function toRegExp(str: string) {
  return str
    .replace(/\./g, '\\.')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\s/g, '\\s')
    .replace(/\?/g, '\\?');
}

function search(str: RegExp, source: string | Array<string>) {
  try {
    if (typeof source === 'string') {
      return source.match(str);
    } else {
      for (let i = 0; i < source.length; i++) {
        if (source[i].match(str)) {
          // return source[i].match(str);
          return source[i].match(str);
        }
      }
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

class NovelAnalyser {
  private name: string;
  private path: string;
  private novel: NovelInfo;
  private content: string;

  static instance: NovelAnalyser;

  static getInstance(): NovelAnalyser {
    if (!this.instance) {
      this.instance = new NovelAnalyser();
    }
    return this.instance;
  }

  public analyse(path: string) {
    try {
      let content = readFile(path);
      this.name = dirname(path);
      this.path = path;
      if (content.length) {
        this.content = content;
        return this.divideChapter();
      }
    } catch (error) {
      switch (error) {
        case '1':
          break;
        case '2':
          break;
        default:
          break;
      }
      return '';
    }
  }

  divideChapter() {
    let chapterList = this.content.match(
      /第[零一二三四五六七八九十百千万0-9]+章\s+[^\r]*\r/g,
    );
    this.novel = {
      name: this.name,
      list: chapterList.map((el) => ({
        name: el,
        content: '',
      })),
    };
    return this.novel;
  }

  getChapter(str: string) {
    let reg = new RegExp(str, 'g');
    return this.content.match(reg)?.[0] || '';
  }
}

export default NovelAnalyser.getInstance();
