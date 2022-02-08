import { Solar, Lunar } from 'lunar-typescript';
import _ from 'lodash';
import { dateFormat } from './utils';
import { Index } from '../../../typings/global';

interface CalenlarOptions {
  cycle?: string;
  lunar?: boolean;
  holiday?: boolean;
}
export interface CalendarType extends Index<any> {
  year: string | number; //年
  month: string | number; //月
  date: string | number; //日
  week: string; //礼拜
  day: number; //礼拜索引
  current: boolean; //当前月份?
  lunarYear: string; //农历年
  lunarMonth: string; //农历月
  lunarDate: string; //农历日
  starSign: string; //星座
  festivals: Array<string>; //节假日
  otherFestivals: Array<string>; //特殊日期
  now: boolean; //当天?
  yi: Array<string>; //宜
  ji: Array<string>; //忌
  rest: boolean; //休息日?
  dateTime: string; //年月日 yyyy-MM-dd
}
export class Calenar {
  private current: Date;
  private preview: Date;

  constructor(options?: CalenlarOptions) {
    this.current = new Date();
    this.preview = new Date();
  }

  private isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() == d2.getFullYear() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getDate() == d2.getDate()
    );
  }

  private isSameMonth(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth()
    );
  }

  private createDateItem(date: Date): CalendarType {
    let dateMap: Index<string> = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期天',
    };
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      day: date.getDay(),
      week: dateMap[date.getDay()],
      current: this.isSameMonth(date, this.current),
      lunarYear: this.getLunarYear(date),
      lunarMonth: this.getLunarMonth(date),
      lunarDate: this.getLunarDate(date),
      starSign: this.getStarSign(date),
      festivals: this.getFestivals(date),
      otherFestivals: this.getOtherFestivals(date),
      now: this.isSameDate(new Date(), date),
      yi: this.getDateYi(date),
      ji: this.getDateJi(date),
      rest: _.findIndex([0, 6], (el) => el == date.getDay()) > -1,
      dateTime: dateFormat(date),
    };
  }

  public setDate(date: Date) {
    this.preview = date;
  }

  public getCalendar(): Array<CalendarType> {
    let currentDate = new Array<CalendarType>();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    let curNum = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= curNum; i++) {
      let curDate = new Date(year, month, i);
      currentDate.push(this.createDateItem(curDate));
    }

    let first = currentDate[0].day == 0 ? 7 : currentDate[0].day;
    for (let i = first; i > 1; i--) {
      let preNum = new Date(year, month, 0).getDate();
      let preDate = new Date(year, month - 1, preNum + i - first);
      currentDate.unshift(this.createDateItem(preDate));
    }
    let len = currentDate.length;
    first = currentDate[len - 1].day == 0 ? 7 : currentDate[len - 1].day;
    for (let i = first; i < 7; i++) {
      let nextDate = new Date(year, month + 1, i - first + 1);
      currentDate.push(this.createDateItem(nextDate));
    }
    return currentDate;
  }

  public getNext() {
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month + 1, 1);
  }

  public getPreious() {
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month - 1, 1);
  }

  public getCurrent() {
    return this.preview;
  }

  public getYear(): number {
    return this.current.getFullYear();
  }

  public getMonth(): number {
    return this.current.getMonth() + 1;
  }

  public getDate(): number {
    return this.current.getDate();
  }

  public getLunarYear(date: Date): string {
    return Solar.fromDate(date).getLunar().getYearInChinese();
  }

  public getLunarMonth(date: Date): string {
    return Solar.fromDate(date).getLunar().getMonthInChinese();
  }

  public getLunarDate(date: Date): string {
    return Solar.fromDate(date).getLunar().getDayInChinese();
  }

  public getStarSign(date: Date): string {
    return Solar.fromDate(date).getXingZuo();
  }

  public getFestivals(date: Date): Array<string> {
    return _.concat(
      Solar.fromDate(date).getFestivals(),
      Solar.fromDate(date).getLunar().getFestivals(),
    );
  }

  public getOtherFestivals(date: Date): Array<string> {
    return _.concat(
      Solar.fromDate(date).getOtherFestivals(),
      Solar.fromDate(date).getLunar().getOtherFestivals(),
    );
  }

  public getDateYi(date: Date): Array<string> {
    return Lunar.fromDate(date).getDayYi();
  }

  public getDateJi(date: Date): Array<string> {
    return Lunar.fromDate(date).getDayJi();
  }
}
