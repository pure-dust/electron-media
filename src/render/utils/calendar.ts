import { Solar } from 'lunar-typescript';
import _ from 'lodash';
export interface CalenarType {
  [key: string]: any;
  year: string | number;
  month: string | number;
  date: string | number;
  week: string;
  day: number;
  current: boolean;
  lunar: string;
  festivals: Array<string>;
  otherFestivals: Array<string>;
  now?: boolean;
}
export class Calenar {
  private current: Date;
  private preview: Date;

  constructor() {
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
    return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth();
  }

  private createDateItem(date: Date): CalenarType {
    let dateMap: Index = {
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
      lunar: this.getLunarDate(date),
      festivals: this.getFestivals(date),
      otherFestivals: this.getOtherFestivals(date),
      now: this.isSameDate(new Date(), date),
    };
  }

  public setDate(date: Date) {
    this.preview = date;
  }

  public getCalendar(): Array<CalenarType> {
    let currentDate = new Array<CalenarType>();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    let curNum = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= curNum; i++) {
      let curDate = new Date(year, month, i);
      currentDate.push(this.createDateItem(curDate));
    }
    for (let i = currentDate[0].day == 0 ? 7 : currentDate[0].day; i > 1; i--) {
      let preNum = new Date(year, month, 0).getDate();
      let preDate = new Date(year, month - 1, preNum + i - currentDate[0].day);
      currentDate.unshift(this.createDateItem(preDate));
    }
    let len = currentDate.length;
    for (let i = currentDate[len - 1].day == 0 ? 7 : currentDate[len - 1].day; i < 7; i++) {
      let nextDate = new Date(year, month + 1, i - currentDate[len - 1].day + 1);
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
}
